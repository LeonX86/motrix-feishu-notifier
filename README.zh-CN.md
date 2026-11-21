# 飞书下载通知（Motrix 插件）

[English](./README.md) | 简体中文

下载完成后，通过飞书群自定义机器人发送一条文本消息。

## 安装

1. 打开 Motrix → 插件 → 添加插件。
2. 选择 `leonx86.feishu-notifier-0.5.0.moext`，或粘贴下载地址。
3. 确认 `http` 权限。
4. 打开插件设置，填写 `larkKey`。

## 配置

在飞书群里创建自定义机器人，复制 Webhook：

```text
https://open.feishu.cn/open-apis/bot/v2/hook/<key>
```

`larkKey` 支持完整地址，或只填 `/hook/` 后面的 key。

按需修改时区偏移，默认 `8`（中国标准时间）。

## 消息示例

```text
✅ Motrix 下载完成
任务：example.zip
大小：117.74 MB
完成时间：2026-11-14 21:09:48
位置：/downloads/example.zip
来自插件 飞书下载通知 v0.5.0
```

## 许可证

[MIT](./LICENSE)