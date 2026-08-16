from __future__ import annotations

import shutil
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
DESIGN_DIR = ROOT / "public" / "assets" / "design"

QR_BOXES = {
    "01.webp": [(590, 1640, 742, 1808)],
    "02.webp": [(78, 1705, 308, 2090)],
    "03.webp": [(112, 1760, 338, 2100)],
    "06.webp": [(28, 552, 172, 708)],
    "11.webp": [(755, 1590, 1035, 1890)],
    "16.webp": [
        (34, 615, 84, 687),
        (240, 548, 292, 622),
        (545, 998, 602, 1062),
    ],
    "18.webp": [(488, 1388, 705, 1620)],
    "19.webp": [(692, 1388, 920, 1632)],
    "20.webp": [(705, 1190, 925, 1450)],
    "22.webp": [
        (34, 1958, 208, 2168),
        (178, 1958, 368, 2168),
        (332, 1958, 528, 2168),
        (492, 1958, 710, 2168),
    ],
}


def pixelate_and_blur(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    left, top, right, bottom = box
    region = image.crop(box)
    width, height = region.size
    small = region.resize(
        (max(4, width // 24), max(4, height // 24)),
        Image.Resampling.BOX,
    )
    obscured = small.resize((width, height), Image.Resampling.NEAREST)
    obscured = obscured.filter(ImageFilter.GaussianBlur(radius=max(5, min(width, height) * 0.055)))
    image.paste(obscured, (left, top))


def convert_community_assets(source_paths: list[Path]) -> None:
    output_dir = DESIGN_DIR / "community"
    for index, source in enumerate(source_paths, start=7):
        with Image.open(source) as image:
            normalized = ImageOps.exif_transpose(image).convert("RGB")
            normalized.save(output_dir / f"{index:02d}.webp", "WEBP", quality=90, method=6)


def protect_posters() -> Path:
    poster_dir = DESIGN_DIR / "posters"
    backup_dir = Path(tempfile.gettempdir()) / "cxz-portfolio-poster-backup-20260815"
    backup_dir.mkdir(parents=True, exist_ok=True)

    for filename, boxes in QR_BOXES.items():
        poster_path = poster_dir / filename
        backup_path = backup_dir / filename
        if not backup_path.exists():
            shutil.copy2(poster_path, backup_path)

        with Image.open(backup_path) as source:
            protected = source.convert("RGB")
            for box in boxes:
                pixelate_and_blur(protected, box)
            protected.save(poster_path, "WEBP", quality=92, method=6)

    return backup_dir


def create_contact_sheet() -> Path:
    poster_dir = DESIGN_DIR / "posters"
    paths = sorted(poster_dir.glob("*.webp"))
    thumb_size = (220, 330)
    columns = 6
    rows = (len(paths) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * 240, rows * 372), "#eceee4")
    draw = ImageDraw.Draw(sheet)

    for index, path in enumerate(paths):
        with Image.open(path) as image:
            thumb = ImageOps.contain(image.convert("RGB"), thumb_size)
        x = (index % columns) * 240 + (220 - thumb.width) // 2 + 10
        y = (index // columns) * 372 + 10
        sheet.paste(thumb, (x, y))
        draw.text((x, y + 336), path.stem, fill="#14241b", anchor="la")

    audit_path = Path(tempfile.gettempdir()) / "cxz-poster-privacy-audit.webp"
    sheet.save(audit_path, "WEBP", quality=92, method=6)
    return audit_path


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("Provide the three new community image paths in display order.")

    sources = [Path(value) for value in sys.argv[1:]]
    missing = [str(path) for path in sources if not path.is_file()]
    if missing:
        raise SystemExit(f"Missing source images: {', '.join(missing)}")

    convert_community_assets(sources)
    backup_dir = protect_posters()
    audit_path = create_contact_sheet()
    print(f"Poster backups: {backup_dir}")
    print(f"Privacy audit sheet: {audit_path}")


if __name__ == "__main__":
    main()
