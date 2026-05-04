import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LangContext'

interface SkillNode {
  id: string
  zh: string
  en: string
  ring: number
  angle: number
  desc: { zh: string[]; en: string[] }
}

const SKILL_NODES: SkillNode[] = [
  { id: 'biz-en', zh: '商务英语', en: 'Business English', ring: 0, angle: -30, desc: {
    zh: ['CET-4 / CET-6 认证', '商务信函、合同撰写', '跨文化沟通与谈判', '双语内容策划'],
    en: ['CET-4 / CET-6', 'Business letters & contracts', 'Cross-cultural negotiation', 'Bilingual content planning'],
  }},
  { id: 'content-ops', zh: '内容运营', en: 'Content Ops', ring: 0, angle: 150, desc: {
    zh: ['公众号 0→500+ 粉', '平均阅读量 800+', '单篇最高阅读 1500', '互动率提升 60%'],
    en: ['WeChat 0→500+ followers', 'Avg. reads 800+', 'Top single-post 1500+', 'Engagement +60%'],
  }},
  { id: 'ai-tools', zh: 'AI 工具链', en: 'AI Toolchain', ring: 1, angle: 0, desc: {
    zh: ['ChatGPT / Claude / Gemini', 'DeepSeek / Kimi / Perplexity', 'NotebookLM / Suno / MidJourney', 'Prompt Engineering'],
    en: ['ChatGPT / Claude / Gemini', 'DeepSeek / Kimi / Perplexity', 'NotebookLM / Suno / MidJourney', 'Prompt engineering'],
  }},
  { id: 'prompt', zh: 'Prompt 工程', en: 'Prompt Eng.', ring: 1, angle: 72, desc: {
    zh: ['文案策划与优化', '竞品分析自动化', '多语言信息处理', '工作流程提效'],
    en: ['Copywriting & polish', 'Competitor research', 'Multilingual processing', 'Workflow optimization'],
  }},
  { id: 'design', zh: '视觉设计', en: 'Visual Design', ring: 1, angle: 144, desc: {
    zh: ['VI 体系建设', 'Canva / Affinity', '海报、封面设计', '路演物料制作'],
    en: ['VI system design', 'Canva / Affinity', 'Posters & covers', 'Pitch deck assets'],
  }},
  { id: 'cross-culture', zh: '跨文化沟通', en: 'Cross-Cultural', ring: 1, angle: 216, desc: {
    zh: ['海外社媒运营', 'Instagram / Facebook', 'Discord / X', '跨境电商理解'],
    en: ['Overseas social ops', 'Instagram / Facebook', 'Discord / X', 'Cross-border e-comm'],
  }},
  { id: 'social', zh: '社媒运营', en: 'Social Media', ring: 1, angle: 288, desc: {
    zh: ['小红书冷启动', '42,000+ 曝光', '21.2% 点击率', '95% 平台推荐流量'],
    en: ['Cold-start on RED', '42,000+ impressions', '21.2% CTR', '95% from recommendations'],
  }},
  { id: 'dev', zh: '基础开发', en: 'Dev Skills', ring: 2, angle: -20, desc: {
    zh: ['Electron / React / Vite', 'Node.js 应用开发', '内存问题排查', '从 0 到 1 独立交付'],
    en: ['Electron / React / Vite', 'Node.js apps', 'Memory debugging', 'Solo end-to-end delivery'],
  }},
  { id: 'data', zh: '数据分析', en: 'Data Analysis', ring: 2, angle: 50, desc: {
    zh: ['内容数据追踪', 'A/B 测试思维', 'Excel 数据分析', '策略反馈迭代'],
    en: ['Content metrics', 'A/B test mindset', 'Excel analysis', 'Iterative strategy'],
  }},
  { id: 'growth', zh: '新媒体增长', en: 'Media Growth', ring: 2, angle: 120, desc: {
    zh: ['选题策略', '封面优化', '推送时间策略', '内容分发逻辑'],
    en: ['Topic selection', 'Cover optimization', 'Posting cadence', 'Distribution logic'],
  }},
  { id: 'office', zh: 'Office 套件', en: 'Office Suite', ring: 2, angle: 190, desc: {
    zh: ['Word / Excel / PPT', '文档处理', '演示表达', '基础数据处理'],
    en: ['Word / Excel / PPT', 'Document processing', 'Presentation', 'Basic data handling'],
  }},
  { id: 'intl', zh: '国际贸易', en: 'Intl. Trade', ring: 2, angle: 260, desc: {
    zh: ['外贸基础知识', '国际商务礼仪', '跨境业务理解', '求职方向'],
    en: ['Trade fundamentals', 'Business etiquette', 'Cross-border ops', 'Career focus'],
  }},
  { id: 'brand', zh: '品牌建设', en: 'Branding', ring: 2, angle: 325, desc: {
    zh: ['志愿协会 VI 升级', '挑战杯视觉体系', 'Logo 设计', '品牌调性把控'],
    en: ['VI rebrand for assoc.', 'Challenge Cup visuals', 'Logo design', 'Brand tonality'],
  }},
]

const RING_RADII = [70, 145, 220]
const CENTER = { x: 280, y: 280 }

function nodePos(node: SkillNode) {
  const r = RING_RADII[node.ring]
  const rad = (node.angle * Math.PI) / 180
  return { x: CENTER.x + r * Math.cos(rad), y: CENTER.y + r * Math.sin(rad) }
}

const CONNECTIONS: [string, string][] = [
  ['biz-en', 'content-ops'], ['biz-en', 'cross-culture'], ['biz-en', 'intl'],
  ['content-ops', 'social'], ['content-ops', 'growth'],
  ['ai-tools', 'prompt'], ['ai-tools', 'dev'], ['ai-tools', 'data'],
  ['design', 'brand'], ['design', 'content-ops'],
  ['social', 'growth'], ['prompt', 'content-ops'],
  ['dev', 'data'], ['cross-culture', 'intl'], ['social', 'brand'],
]

export default function SkillMap() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [detailNode, setDetailNode] = useState<SkillNode>(SKILL_NODES[0])

  const positions = useMemo(() => Object.fromEntries(SKILL_NODES.map(n => [n.id, nodePos(n)])), [])

  const isConnected = (id: string) => {
    if (!hoveredId) return false
    return CONNECTIONS.some(([a, b]) => (a === hoveredId && b === id) || (b === hoveredId && a === id))
  }

  const isActiveConnection = (a: string, b: string) =>
    hoveredId !== null && (a === hoveredId || b === hoveredId)

  const label = (n: SkillNode) => (lang === 'zh' ? n.zh : n.en)
  const desc = (n: SkillNode) => (lang === 'zh' ? n.desc.zh : n.desc.en)

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 max-w-3xl"
        >
          <div className="section-eyebrow mb-8">{t.skills.eyebrow}</div>
          <h2 className="section-heading">{t.skills.heading}</h2>
        </motion.div>

        <div className="flex gap-10 lg:gap-16 items-start flex-wrap lg:flex-nowrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[560px] flex-shrink-0 mx-auto"
          >
            <svg className="w-full h-auto" viewBox="0 0 560 560" role="img" aria-label={t.skills.heading}>
              {RING_RADII.map((r, i) => (
                <circle
                  key={i}
                  cx={CENTER.x} cy={CENTER.y} r={r}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={1}
                  strokeDasharray="3 8"
                />
              ))}

              {CONNECTIONS.map(([a, b], i) => {
                const pa = positions[a]
                const pb = positions[b]
                const active = isActiveConnection(a, b)
                return (
                  <line
                    key={i}
                    x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke={active ? 'var(--accent)' : 'var(--border)'}
                    strokeWidth={active ? 1.5 : 0.8}
                    style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                  />
                )
              })}

              <circle cx={CENTER.x} cy={CENTER.y} r={3} fill="var(--accent)" />

              {SKILL_NODES.map(node => {
                const pos = positions[node.id]
                const isHovered = hoveredId === node.id
                const connected = isConnected(node.id)
                const dimmed = hoveredId !== null && !isHovered && !connected

                return (
                  <g
                    key={node.id}
                    style={{
                      cursor: 'pointer',
                      opacity: dimmed ? 0.2 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={() => { setHoveredId(node.id); setDetailNode(node) }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setDetailNode(node)}
                  >
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={isHovered ? 6 : 4}
                      fill={isHovered || connected ? 'var(--accent)' : 'var(--ink)'}
                      style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + (node.ring === 0 ? -14 : node.ring === 1 ? -12 : -10)}
                      textAnchor="middle"
                      style={{
                        fontFamily: 'Inter, Noto Sans SC, sans-serif',
                        fontSize: node.ring === 0 ? '12px' : '11px',
                        fontWeight: isHovered ? 600 : 400,
                        fill: isHovered ? 'var(--accent)' : 'var(--ink)',
                        transition: 'fill 0.3s ease, font-weight 0.3s ease',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {label(node)}
                    </text>
                  </g>
                )
              })}
            </svg>
          </motion.div>

          {/* Detail card */}
          <div className="flex-1 pt-0 lg:pt-4 min-w-0 w-full">
            <p className="font-mono text-[10px] mb-6 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
              {hoveredId ? `// ${t.skills.currentNode}` : `// ${t.skills.hint}`}
            </p>

            <motion.div
              key={detailNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-8 crop-frame"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <span className="crop-tr" />
              <span className="crop-bl" />
              <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                {label(detailNode)}
              </h3>
              <p className="font-mono text-[10px] mb-6 tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
                {detailNode.en}
              </p>
              <ul className="space-y-2.5">
                {desc(detailNode).map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'var(--accent)' }} className="font-mono">·</span>
                    <span className="font-sans text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
