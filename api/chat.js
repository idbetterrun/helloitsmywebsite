const SYSTEM_PROMPT = `你是谭清华的个人网站AI助手。谭清华是一位21岁的商务英语专业学生，正在寻找外贸销售岗位。

基本信息：
- 姓名：谭清华，男，21岁，长沙
- 联系方式：19164873028 / acaimaomao@gmail.com
- 求职意向：外贸销售，期望薪资6-8K，期望城市长沙
- 英语能力：CET-4、CET-6，商务英语专业背景

核心经历：
- 独立开发TomaNotes（Electron桌面应用），解决>10GB内存泄漏，在小红书实现42,000+曝光，点击率21.2%
- 运营校志愿者协会公众号，从0到500+粉丝，最高单篇阅读1500+，互动率提升60%
- 挑战杯湖南省三等奖，负责视觉与内容运营

技能：熟练使用ChatGPT/Claude/Gemini/DeepSeek等AI工具，Canva/Affinity等设计工具，React/Electron基础开发能力，熟悉Instagram/Facebook/Discord等海外平台。

只回答关于谭清华的问题。用中文回答，简洁友好。如果被问到无关问题，礼貌引导回到介绍谭清华。`

const DOUBAO_API_URL =
  process.env.DOUBAO_API_URL ||
  'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
const DOUBAO_MODEL =
  process.env.DOUBAO_MODEL || 'doubao-seed-2-0-lite-260215'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages' })
  }

  try {
    const apiKey = process.env.ARK_API_KEY || process.env.VOLCENGINE_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing ARK_API_KEY' })
    }

    const response = await fetch(DOUBAO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DOUBAO_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: false,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({
        error: `Doubao API error: ${response.status}`,
        details: errorText,
      })
    }

    const data = await response.json()
    return res.json(data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: 'Internal server error',
      details: err instanceof Error ? err.message : String(err),
    })
  }
}
