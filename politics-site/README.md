# 政治一页纸 · 单页阅读站

把《27考研一页纸-知识点手册（最新）.pdf》逐页渲染成 WebP，在浏览器里一页一页翻看。

- 访问地址：<http://127.0.0.1:40810/>
- Compose service：`politics`
- 镜像：`study-politics:local`
- 源 PDF：`../政治/27考研一页纸-知识点手册（最新）.pdf`（39 页，不进 Git）

## 页面结构

```text
politics-site/
├── Dockerfile
├── deploy/nginx.conf
└── site/
    ├── index.html
    ├── pages.json          # 阅读顺序、章节、图片路径
    ├── assets/reader.css
    ├── assets/reader.js
    └── pages/01.webp … 39.webp
```

PDF 的第 2、6、12 页是空白页，阅读器跳过它们，所以页数是 36 页。
`pages.json` 里的 `pdf` 字段保留原始 PDF 页码，`n` 是阅读器页码，`section` 是章节名。

## 使用

| 操作 | 方式 |
| --- | --- |
| 上一页 / 下一页 | 底部按钮、`←` `→`、`PageUp` / `PageDown`、空格 |
| 手机翻页 | 左右滑动，或点底部按钮 |
| 目录 | 顶部“目录”、页码、`M` |
| 跳首尾 | `Home` / `End` |
| 全屏 | 顶部全屏按钮或 `F` |

阅读位置会写入 `localStorage`，刷新后回到上次那一页；网址也会带上 `#p=页码`。

## 更新页面

如果源 PDF 改了，重新渲染全部页面：

```bash
cd /Users/wch/workspace/Study

mkdir -p /tmp/politics-render
rm -f /tmp/politics-render/*.png politics-site/site/pages/*.webp
pdftoppm -r 200 -png -hide-annotations \
  "政治/27考研一页纸-知识点手册（最新）.pdf" /tmp/politics-render/p

for f in /tmp/politics-render/p-*.png; do
  n=$(basename "$f" .png | sed 's/^p-//')
  cwebp -quiet -q 86 -m 6 -sharp_yuv "$f" -o "politics-site/site/pages/${n}.webp"
done
```

然后按实际页码更新 `site/pages.json`，重新构建：

```bash
docker compose build politics
docker compose up -d --force-recreate politics
```

## 部署

服务器上：

```bash
cd /opt/study
git pull --ff-only
sudo docker compose build politics
sudo docker compose up -d --force-recreate politics
```

原来的 `exam408` service 已从 `compose.yaml` 移除；旧容器会被
`docker compose up -d --remove-orphans` 或手工 `docker rm` 清掉。
`408-exam/` 目录只作为历史代码保留，不再构建、不再占用 40810 端口。
