# QCB · MultiCharts 策略代码定制

中文服务介绍页，包含服务范围、交付内容、PowerLanguage 双均线演示、合作流程和邮件咨询入口。

## 本地预览

在仓库根目录运行：

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8000/`。也可以直接在浏览器打开 `index.html`。

## 维护

- `index.html` 存放页面文案、咨询邮箱和 PowerLanguage 示例。更新邮箱时，同步更新链接里的 `mailto:` 地址和页面显示的地址。
- `style.css` 控制页面样式和移动端排版。
- `strategy-demo.js` 根据固定的虚拟价格序列计算 5 周期和 13 周期均线，并绘制开平仓信号。如果修改示例周期，记得同步更新页面里的标签、参数说明和示例代码。

## GitHub Pages

在仓库的 **Settings → Pages**，选择 **Deploy from a branch → `main` → `/ (root)`**。部署完成后，客户可通过 [QCB 服务网站](https://vincentcyf.github.io/QCB/) 访问。后续更新推送到 `main` 即会触发部署。
