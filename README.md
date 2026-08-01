# EAT 心情选餐

适用于 GitHub Pages 的静态部署包，页面尺寸为 375×812，并保留当前版本的轮播、心情选择、重选、结果页、分享页和返回交互。

## 文件结构

- `index.html`：页面结构
- `style.css`：页面样式与轮播动画
- `app.js`：按钮选择及页面切换逻辑
- `assets/svg/`：全部 SVG 页面和按钮素材
- `assets/images/`：从 SVG 中拆出的图片素材

## GitHub Pages 部署

1. 将本目录中的所有文件和文件夹上传到 GitHub 仓库根目录。
2. 在仓库的 `Settings → Pages` 中选择 `Deploy from a branch`。
3. 选择目标分支和 `/ (root)`，保存后等待部署完成。

不要只上传 `index.html`，`style.css`、`app.js` 和整个 `assets` 目录必须同时上传。

## 本地预览

可以直接打开 `index.html`。如浏览器限制本地资源，请在本目录启动静态服务器：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080/`。
