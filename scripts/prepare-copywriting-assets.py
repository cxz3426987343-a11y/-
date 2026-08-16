import argparse
from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "public" / "assets" / "copywriting"

ASSETS = [
    ("news", "digital-memory", "新闻稿/数字记忆新闻稿.png", None),
    ("news", "youth-service", "新闻稿/新闻稿2.png", None),
    ("news", "better-self", "新闻稿/新闻稿3.png", None),
    ("planning", "new-year-1", "活动策划/元旦晚会策划1.png", None),
    ("planning", "new-year-2", "活动策划/元旦晚会策划案2.png", None),
    ("planning", "promo-plan", "活动策划/宣传片活动方案.png", None),
    ("planning", "dongchedi-may", "活动策划/活动策划1.png", 0.18),
    ("planning", "dongchedi-july", "活动策划/活动策划2.png", 0.10),
    ("planning", "dongchedi-auto-show", "活动策划/活动策划3.png", 0.09),
    ("planning", "variety-1", "活动策划/综艺策划1.png", None),
    ("planning", "variety-2", "活动策划/综艺策划2.png", None),
    ("commentary", "news-comment", "评论网宣/新闻评论.png", None),
    ("commentary", "publicity-1", "评论网宣/网宣文章1.png", None),
    ("commentary", "publicity-2", "评论网宣/网宣文章2.png", None),
    ("commentary", "comment-cover", "评论网宣/评论封面.png", None),
    ("case-study", "ai-collaboration", "案例萃取/案例萃取-1.png", 0.14),
    ("case-study", "finance-penetration", "案例萃取/案例萃取-2.png", 0.12),
    ("case-study", "lead-to-store", "案例萃取/案例萃取3.png", 0.15),
    ("transcript", "host-script", "解说串词/主持串词.png", None),
    ("transcript", "documentary-narration", "解说串词/纪录片解说词.png", None),
    ("scripts", "cocoon", "剧本脚本/剧本-破茧.png", None),
    ("scripts", "blood-flower", "剧本脚本/剧本-血中花.png", None),
    ("scripts", "youth-diary", "剧本脚本/短视频脚本-青春日记.png", None),
    ("scripts", "stage-live", "剧本脚本/话剧直播脚本.png", None),
]


def protect_body(image: Image.Image, clear_ratio: float) -> Image.Image:
    base = image.convert("RGB")
    width, height = base.size
    clear_y = max(1, min(height - 1, round(height * clear_ratio)))
    body = base.crop((0, clear_y, width, height))

    small_width = max(18, width // 22)
    small_height = max(18, body.height // 22)
    protected = body.resize((small_width, small_height), Image.Resampling.BILINEAR)
    protected = protected.resize(body.size, Image.Resampling.NEAREST)
    protected = protected.filter(ImageFilter.GaussianBlur(radius=max(10, width / 90)))

    wash = Image.new("RGB", body.size, (236, 238, 224))
    protected = Image.blend(protected, wash, 0.28)

    result = base.copy()
    result.paste(protected, (0, clear_y))
    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prepare copywriting images for the portfolio site.")
    parser.add_argument("source", type=Path, help="Directory containing the original copywriting folders.")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Output directory (default: project public assets).")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source_root = args.source.expanduser().resolve()
    output_root = args.output.expanduser().resolve()
    output_root.mkdir(parents=True, exist_ok=True)
    for category, slug, relative_path, clear_ratio in ASSETS:
        source_path = source_root / relative_path
        if not source_path.exists():
            raise FileNotFoundError(source_path)

        destination = output_root / category / f"{slug}.webp"
        destination.parent.mkdir(parents=True, exist_ok=True)

        with Image.open(source_path) as image:
            prepared = protect_body(image, clear_ratio) if clear_ratio else image.convert("RGB")
            prepared.save(destination, "WEBP", quality=88, method=6)
        print(destination.relative_to(output_root))


if __name__ == "__main__":
    main()
