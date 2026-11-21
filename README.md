# Feishu Download Notifier for Motrix

English | [简体中文](./README.zh-CN.md)

Send a Feishu/Lark group bot message when a Motrix download completes.

## Install

1. Open Motrix → Plugins → Add plugin.
2. Select `leonx86.feishu-notifier-0.5.0.moext` or paste the release URL.
3. Approve the `http` permission.
4. Open the plugin settings and fill `larkKey`.

## Configure

Create a custom bot in the Feishu group, then copy its webhook:

```text
https://open.feishu.cn/open-apis/bot/v2/hook/<key>
```

`larkKey` accepts the full URL or only the key after `/hook/`.

Set the UTC offset if needed; default is `8` (China Standard Time).

## Message example

```text
✅ Motrix 下载完成
任务：example.zip
大小：117.74 MB
完成时间：2026-11-14 21:09:48
位置：/downloads/example.zip
来自插件 飞书下载通知 v0.5.0
```

## License

[MIT](./LICENSE)