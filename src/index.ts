import { hooks, http, config, log } from 'motrix:plugin-api'

const PLUGIN_NAME = '飞书下载通知'
const PLUGIN_VERSION = '0.5.0'
const FEISHU_HOSTS = ['open.feishu.cn', 'open.larksuite.com']

log.info('飞书插件已加载', { plugin: PLUGIN_VERSION })

function normalizeWebhook(value: unknown): string {
  const key = String(value ?? '').trim()
  if (!key) return ''
  if (/^http:\/\//i.test(key)) return key.replace(/^http:/i, 'https:')
  if (/^https:\/\//i.test(key)) return key
  return `https://open.feishu.cn/open-apis/bot/v2/hook/${encodeURIComponent(key)}`
}

function hostOf(url: string): string {
  const match = /^https?:\/\/([^/?#]+)/i.exec(url)
  if (!match) return ''
  return match[1].split(':')[0].toLowerCase()
}

function formatBytes(value: unknown): string {
  const bytes = Number(value)
  if (!Number.isFinite(bytes) || bytes <= 0) return '未知'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit += 1
  }
  return `${size.toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`
}

async function getUtcOffset(): Promise<number> {
  try {
    const value = Number(await config.get('utcOffset'))
    if (Number.isFinite(value) && value >= -12 && value <= 14) return value
  } catch {
    // ignore
  }
  return 8
}

function formatTime(value: unknown, utcOffset: number): string {
  const ms = Number(value)
  if (!Number.isFinite(ms) || ms <= 0) return '未知'

  const date = new Date(ms + utcOffset * 60 * 60 * 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`,
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`,
  ].join(' ')
}

function versionLine(): string {
  return `来自插件 ${PLUGIN_NAME} v${PLUGIN_VERSION}`
}

function buildText(ctx: any, utcOffset: number): string {
  const task = ctx.task || {}
  const name = String(task.name || task.filename || '未命名任务')
    .replace(/\s+/g, ' ')
    .slice(0, 200)
  const path = String(ctx.filePath || task.filePath || task.saveDir || '未知').slice(
    0,
    500
  )

  return [
    '✅ Motrix 下载完成',
    `任务：${name}`,
    `大小：${formatBytes(task.totalBytes || task.sizeWhenDone)}`,
    `完成时间：${formatTime(task.finishedAt, utcOffset)}`,
    `位置：${path}`,
    versionLine(),
  ].join('\n')
}

async function sendText(text: string): Promise<void> {
  const larkKey = await config.get('larkKey')
  const url = normalizeWebhook(larkKey)

  if (!url) {
    throw new Error('未配置 larkKey，请先在插件设置里填写并保存')
  }

  const host = hostOf(url)
  if (!FEISHU_HOSTS.includes(host)) {
    throw new Error(`不支持的飞书域名：${host || '未知'}`)
  }

  const response = await http.request({
    method: 'POST',
    url,
    body: {
      type: 'json',
      data: {
        msg_type: 'text',
        content: {
          text,
        },
      },
    },
    responseType: 'json',
    timeoutMs: 5000,
  })

  const body: any = response.body || {}
  const code = body.code ?? body.StatusCode
  if (
    response.status < 200 ||
    response.status >= 300 ||
    (code !== undefined && code !== 0)
  ) {
    throw new Error(
      `HTTP ${response.status} code=${code ?? '?'} body=${JSON.stringify(body).slice(0, 200)}`
    )
  }
}

hooks.afterComplete(async (ctx: any) => {
  try {
    const utcOffset = await getUtcOffset()
    await sendText(buildText(ctx, utcOffset))
    log.info('飞书通知已发送', {
      task: ctx.taskId,
      plugin: PLUGIN_VERSION,
    })
  } catch (error: any) {
    log.error('飞书通知发送失败', {
      task: ctx.taskId,
      plugin: PLUGIN_VERSION,
      error: String(error?.message || error),
    })
    throw error
  }
})