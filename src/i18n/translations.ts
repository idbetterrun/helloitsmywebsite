export type Lang = 'zh' | 'en'

export const translations = {
  zh: {
    // Navbar
    nav: {
      home: '首页',
      about: '关于',
      skills: '技能',
      projects: '项目',
      experience: '经历',
      contact: '联系',
    },

    // Hero
    hero: {
      eyebrow: '01 / 简介',
      headlinePrefix: '我用（',
      rotatingWords: ['语言', '设计', 'AI工具'] as const,
      headlineSuffix: '），把好产品送到世界各地。',
      ctaPrimary: '联系我',
      ctaSecondary: '查看项目',
    },

    // About
    about: {
      eyebrow: '02 / 关于我',
      heading: '一个相信内容能够撬动增长的人。',
      meta: '长沙 · 21 岁 · 商务英语 · 外贸销售方向',
      metaLabel1: 'BASED IN CHANGSHA, CN',
      metaLabel2: 'FOREIGN TRADE / SALES',
      metaLabel3: 'EST. 2004',
      bio: '商务英语专业，擅长用 AI 工具驱动内容增长。从零搭建运营体系，用数据说话；独立开发过桌面应用，动手能力不只停留在 PPT 上。',
      stat1Label: '小红书单篇最高曝光',
      stat2Label: '微信公众号粉丝增长',
      stat3Label: '小红书内容点击率',
      toolsTitle1: 'AI 工具',
      toolsTitle2: '设计 & 内容',
      toolsTitle3: '开发 & 效率',
    },

    // Skills
    skills: {
      eyebrow: '03 / 技能图谱',
      heading: '技能图谱',
      hint: '将鼠标移到节点上',
      currentNode: '当前节点',
    },

    // Projects
    projects: {
      eyebrow: '04 / 项目',
      heading: '精选项目',
      project1: {
        period: '2026.03 — 2026.04 · 个人独立开发',
        title: 'TomaNotes',
        desc: '基于 Electron + React 的本地笔记应用，支持 Markdown 与富文本双编辑器，实现应用级加密与多文档并行。独立完成从架构设计到发布的完整闭环，定位并解决多窗口导致的 >10GB 内存泄漏。',
        statsTitle: '小红书冷启动成果',
        s1: '曝光',
        s2: '阅读',
        s3: '点击率',
        s4: '平台推荐',
      },
      project2: {
        period: '2023 — 2025 · 校青年志愿者协会',
        title: '微信公众号运营',
        desc: '从零搭建运营体系，主导品牌 VI 升级，强化品牌辨识度。',
        s1: '粉丝增长',
        s2: '平均阅读量',
        s3: '最高单篇阅读',
        s4: '互动率提升',
      },
      project3: {
        period: '2023.04 — 2023.10',
        title: '挑战杯',
        award: '湖南省三等奖',
        desc: '主导项目品牌视觉体系构建，完成从 Logo、色彩系统到全套路演物料的创意设计。视觉评分位列参赛团队前 10%。',
        badge: '省级奖项',
      },
    },

    // Experience
    experience: {
      eyebrow: '05 / 经历',
      heading: '经历与教育',
      educationLabel: '教育',
      certsLabel: '证书',
      items: [
        { date: '2026.03', title: 'TomaNotes 独立开发', desc: '桌面笔记应用，Electron + React，从 0 到 1 完整闭环。', tags: ['独立开发'] },
        { date: '2025.09', title: '世界精神卫生日系列活动', desc: '班级心理委员，策划「正念心作」系列主题活动，独立负责方案设计与现场组织。', tags: ['组织策划'] },
        { date: '2023.10\n—\n2025.03', title: '校青年志愿者协会', subtitle: '宣传部副部长', desc: '主导 VI 体系建设，从 0 运营公众号至 500+ 粉丝，最高单篇阅读 1500+，互动率提升 60%。', tags: ['内容运营', '品牌设计'] },
        { date: '2023.04\n—\n2023.10', title: '第十五届"挑战杯"', subtitle: '内容运营 · 视觉设计', desc: '主导视觉体系，负责 Logo、色彩系统与路演物料，荣获湖南省三等奖。', tags: ['视觉设计', '省级奖项'] },
      ],
      education: [
        { year: '2025', school: '湘南学院', degree: '本科 · 商务英语', note: '在读' },
        { year: '2022', school: '湖南工业职业技术学院', degree: '大专 · 商务英语', note: 'CET-4 / CET-6' },
      ],
    },

    // Contact
    contact: {
      eyebrow: '06 / 联系',
      headingPrefix: '正在寻找（',
      rotatingWords: ['外贸销售', '海外运营', '跨境电商'] as const,
      headingSuffix: '）方向的机会，',
      headingTwo: '欢迎随时联系。',
      sub: '目前重点寻找实习机会，也开放远程合作与项目协作。',
      copy: '点击复制',
      copied: '已复制',
      sendEmail: '点击发送',
      ctaButton: '发邮件给我',
      tipPhone: '电话',
      tipEmail: '邮箱',
      tipWechat: '微信',
    },

    // AI assistant
    ai: {
      title: 'TQ 助手',
      subtitle: '了解谭清华',
      bubble: '问问我',
      placeholder: '问点什么...',
      welcome: '你好！我是谭清华的 AI 助手，你可以问我关于他的经历、技能、项目等任何问题。',
      networkError: '网络错误，请稍后再试。',
      defaultReply: '抱歉，我暂时无法回答这个问题。',
    },

    // Footer
    footer: {
      links: '快速导航',
      socials: '在这里找到我',
      cta: '一起做点有意思的事？',
      year: '2026 Tan Qinghua',
      lang: '中 / EN',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Career',
      contact: 'Contact',
    },

    hero: {
      eyebrow: '01 / Intro',
      headlinePrefix: 'Across borders, with ',
      rotatingWords: ['words', 'design', 'AI'] as const,
      headlineSuffix: ' — moving good products to the world.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'See projects',
    },

    about: {
      eyebrow: '02 / About',
      heading: 'A believer in content as a growth engine.',
      meta: 'Changsha · 21 · Business English · Foreign Trade',
      metaLabel1: 'BASED IN CHANGSHA, CN',
      metaLabel2: 'FOREIGN TRADE / SALES',
      metaLabel3: 'EST. 2004',
      bio: 'Business English major, fluent with AI tools for content-driven growth. I build ops systems from scratch, ship desktop apps end-to-end, and let data do the talking — not just slides.',
      stat1Label: 'Top single-post reach on RED',
      stat2Label: 'WeChat followers grown from zero',
      stat3Label: 'Click-through rate on RED',
      toolsTitle1: 'AI Tools',
      toolsTitle2: 'Design & Content',
      toolsTitle3: 'Dev & Productivity',
    },

    skills: {
      eyebrow: '03 / Skill Map',
      heading: 'Skill Map',
      hint: 'Hover over a node',
      currentNode: 'Current Node',
    },

    projects: {
      eyebrow: '04 / Selected Work',
      heading: 'Selected Projects',
      project1: {
        period: '2026.03 — 2026.04 · Solo Build',
        title: 'TomaNotes',
        desc: 'A local-first notes app built on Electron + React — dual Markdown / rich-text editors, app-level encryption, parallel windows. Shipped end-to-end alone, including hunting down a >10GB memory leak across multi-window state.',
        statsTitle: 'Cold-start results on RED (Xiaohongshu)',
        s1: 'Impressions',
        s2: 'Reads',
        s3: 'CTR',
        s4: 'From recommendations',
      },
      project2: {
        period: '2023 — 2025 · Volunteer Association',
        title: 'WeChat Channel Ops',
        desc: 'Built the ops playbook from zero, led a full VI rebrand, and lifted brand recall across the campus.',
        s1: 'Followers grown',
        s2: 'Avg. reads',
        s3: 'Top single-post reads',
        s4: 'Engagement lift',
      },
      project3: {
        period: '2023.04 — 2023.10',
        title: 'Challenge Cup',
        award: 'Provincial Bronze, Hunan',
        desc: 'Led the project\'s visual identity end-to-end — logo, color system, full pitch kit. Visual scoring placed top 10% across all teams.',
        badge: 'Provincial Award',
      },
    },

    experience: {
      eyebrow: '05 / Career',
      heading: 'Experience & Education',
      educationLabel: 'Education',
      certsLabel: 'Certificates',
      items: [
        { date: '2026.03', title: 'TomaNotes — Solo Build', desc: 'Desktop notes app, Electron + React, end-to-end ownership.', tags: ['Solo'] },
        { date: '2025.09', title: 'World Mental Health Day Series', desc: 'Class mental-health rep — designed and ran "Mindful Moments" campus sessions, including content, logistics & recap.', tags: ['Programming'] },
        { date: '2023.10\n—\n2025.03', title: 'University Volunteer Association', subtitle: 'Deputy Head, PR Dept.', desc: 'Built the VI system from scratch, ran the WeChat channel from 0 to 500+ followers, top single-post read 1500+, engagement up 60%.', tags: ['Content Ops', 'Brand'] },
        { date: '2023.04\n—\n2023.10', title: '15th Challenge Cup', subtitle: 'Content & Visual Design', desc: 'Owned the visual system — logo, color, pitch deck. Won provincial bronze in Hunan.', tags: ['Visual', 'Award'] },
      ],
      education: [
        { year: '2025', school: 'Xiangnan University', degree: 'Bachelor · Business English', note: 'In progress' },
        { year: '2022', school: 'Hunan Industry Polytechnic', degree: 'Diploma · Business English', note: 'CET-4 / CET-6' },
      ],
    },

    contact: {
      eyebrow: '06 / Contact',
      headingPrefix: 'Open to roles in ',
      rotatingWords: ['foreign trade', 'overseas ops', 'e-commerce'] as const,
      headingSuffix: ' —',
      headingTwo: 'and conversations beyond.',
      sub: 'Primarily looking for internship roles — open to remote and project collabs too.',
      copy: 'Click to copy',
      copied: 'Copied',
      sendEmail: 'Send email',
      ctaButton: 'Email me',
      tipPhone: 'Phone',
      tipEmail: 'Email',
      tipWechat: 'WeChat',
    },

    ai: {
      title: 'TQ Assistant',
      subtitle: 'Get to know Tan Qinghua',
      bubble: 'Ask me',
      placeholder: 'Ask something...',
      welcome: 'Hi! I\'m Tan Qinghua\'s AI assistant — ask me anything about his work, skills, or projects.',
      networkError: 'Network error, please try again.',
      defaultReply: 'Sorry, I cannot answer that right now.',
    },

    footer: {
      links: 'Quick Links',
      socials: 'Find me at',
      cta: 'Want to build something interesting?',
      year: '2026 Tan Qinghua',
      lang: '中 / EN',
    },
  },
} as const

export type TranslationDict = typeof translations.zh
