import argparse
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "public" / "assets" / "operations"

ASSETS = [
    ("xiaohongshu", "profile", "小红书/小红书-主页.jpg"),
    ("xiaohongshu", "header", "小红书/小红书头图.jpg"),
    ("xiaohongshu", "post-01", "小红书/小红书具体内容.jpg"),
    ("xiaohongshu", "post-02", "小红书/小红书具体内容2.jpg"),
    ("douyin", "profile", "抖音-川外/抖音 川外 展示.jpg"),
    ("douyin", "official-account", "抖音-川外/抖音-学校官方账号运营.jpg"),
    ("douyin", "campus-variety", "抖音-川外/抖音-校园自制综艺节目.jpg"),
    ("douyin", "no-class-day", "抖音-川外/抖音 川外 川外学子没课的一天.jpg"),
    ("douyin", "hundred-yuan-food", "抖音-川外/抖音-100元吃遍川外.jpg"),
    ("douyin", "gandong-chongqing-01", "抖音-感动重庆/抖音-感动重庆十大人物.jpg"),
    ("douyin", "gandong-chongqing-02", "抖音-感动重庆/抖音-感动重庆十大人物2.jpg"),
    ("douyin", "gandong-chongqing-03", "抖音-感动重庆/抖音-感动重庆十大人物3.jpg"),
    ("wechat/student-home", "profile", "公众号-学生之家/公众号-学生之家首页.jpg"),
    ("wechat/student-home", "article-01", "公众号-学生之家/公众号-学生之家1.jpg"),
    ("wechat/student-home", "article-02", "公众号-学生之家/公众号 学生之家2.jpg"),
    ("wechat/student-home", "article-03", "公众号-学生之家/公众号 学生之家3.jpg"),
    ("wechat/happy-station", "profile", "公众号-幸福加油站/公众号-幸福加油站.jpg"),
    ("wechat/happy-station", "article-01", "公众号-幸福加油站/公众号-心协-推文长图1.jpg"),
    ("wechat/happy-station", "article-02", "公众号-幸福加油站/公众号-心协-推文长图2.jpg"),
    ("wechat/happy-station", "article-03", "公众号-幸福加油站/公众号-心协-推文长图3.jpg"),
    ("wechat/laugh-book", "profile", "公众号-笑不忘书/公众号-笑不忘书 首页.jpg"),
    ("wechat/laugh-book", "article-index", "公众号-笑不忘书/公众号-重大人列表.jpg"),
    ("wechat/laugh-book", "article-01", "公众号-笑不忘书/公众号-重大人1.jpg"),
    ("wechat/laugh-book", "article-02", "公众号-笑不忘书/公众号-重大人2.jpg"),
    ("wechat/laugh-book", "article-03", "公众号-笑不忘书/公众号-重大人3.jpg"),
    ("wechat/laugh-book", "chongqing-scenes", "公众号-笑不忘书/公众号-重庆百景.jpg"),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prepare operations images for the portfolio site.")
    parser.add_argument("source", type=Path, help="Directory containing the original operations folders.")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Output directory (default: project public assets).")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source_root = args.source.expanduser().resolve()
    output_root = args.output.expanduser().resolve()
    output_root.mkdir(parents=True, exist_ok=True)
    for folder, slug, relative_path in ASSETS:
        source_path = source_root / relative_path
        if not source_path.exists():
            raise FileNotFoundError(source_path)
        destination = output_root / folder / f"{slug}.webp"
        destination.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source_path) as image:
            image.convert("RGB").save(destination, "WEBP", quality=86, method=6)
        print(destination.relative_to(output_root))


if __name__ == "__main__":
    main()
