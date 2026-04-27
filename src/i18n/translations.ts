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

    // Generic UI
    ui: {
      flipHint: '点击翻面 →',
      flipBack: '← 点击返回',
    },

    // Hero
    hero: {
      eyebrow: '01 / 简介',
      headlinePrefix: '我用',
      rotatingWords: ['语言', '设计', 'AI工具'] as const,
      headlineSuffix: '，',
      headlineLine2: '把好产品送到世界各地。',
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
      bioSecondary: '我关注的是把表达、审美与执行力连在一起：既能面向海外市场讲清楚产品，也能把内容、视觉和协作流程落到结果上。',
      resumeButton: '下载简历',
      courseTitle: '学过的课程',
      courseList: ['跨文化交际', '商务谈判', '高级商务英语', '商务英语视听说', '国际贸易实务', '大学德语'],
      stat1Label: '小红书单篇最高曝光',
      stat2Label: '微信公众号粉丝增长',
      stat3Label: '小红书内容点击率',
      toolsTitle1: 'AI 工具',
      toolsTitle2: '设计 & 内容',
      toolsTitle3: '开发 & 效率',
      strengthsTitle: '个人优势',
      strengths: [
        '熟练使用 Microsoft Office（Word/Excel/PPT），具备文档处理与基础数据分析能力',
        '熟练运用 AIGC 工具（ChatGPT、Claude、Gemini、MidJourney 等），用于内容生成与流程提效',
        '掌握基础 AI 开发与工具应用（Codex、Claude Code、OpenClaw），可完成简单自动化与项目搭建',
        '熟练使用设计工具（Canva、Affinity、剪映），具备海报设计与内容视觉包装能力',
        '熟悉海外社交平台（Instagram、Facebook、X、Discord），具备跨文化沟通与内容理解能力',
        '学习能力强，能快速上手新工具并适应不同任务需求',
      ],
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
      detailLabels: {
        stack: '技术栈',
        work: '主要工作',
        highlights: '项目亮点',
      },
      project1: {
        period: '2026.03 — 2026.04 · 个人独立开发',
        title: 'TomaNotes',
        desc: '基于 Electron + React 的本地笔记应用，支持 Markdown 与富文本双编辑器，实现应用级加密与多文档并行。独立完成从架构设计到发布的完整闭环，定位并解决多窗口导致的 >10GB 内存泄漏。',
        statsTitle: '小红书冷启动成果',
        s1: '曝光',
        s2: '阅读',
        s3: '点击率',
        s4: '平台推荐',
        detail: {
          stack: 'Electron / React / Vite / Tiptap / CodeMirror / Node.js',
          work: [
            '搭建 Electron + Vite 架构，实现多窗口应用结构与统一加载逻辑',
            '设计双编辑器体系（Markdown + 富文本），支持语法高亮与无缝切换',
            '实现本地数据存储与应用级加密机制（密码 / 生物识别）',
            '开发独立笔记窗口功能，支持多文档并行编辑',
            '定位并解决多窗口导致的内存泄漏问题（峰值 >10GB），显著降低占用并提升稳定性',
            '重构搜索逻辑，实现标题与内容统一检索，优化性能与体验',
          ],
          highlights: [
            '独立完成 0 → 1 桌面应用开发与架构设计',
            '具备 Electron 性能优化与内存问题排查经验',
            '兼顾产品体验与工程实现，具备完整项目闭环能力',
          ],
        },
      },
      project2: {
        period: '2023 — 2025 · 校青年志愿者协会',
        title: '微信公众号运营',
        desc: '从零搭建运营体系，主导品牌 VI 升级，强化品牌辨识度。',
        s1: '粉丝增长',
        s2: '平均阅读量',
        s3: '最高单篇阅读',
        s4: '互动率提升',
        detail: {
          stack: '微信公众号 / Canva / Affinity / Photoshop',
          work: [
            '主导协会品牌升级，搭建并落地统一视觉识别体系（VI）',
            '从 0 搭建并运营公众号，建立内容策划-发布完整流程',
            '负责"湖南百公里"等活动宣传，优化推送时间与内容形式',
            '提出"宇宙电波"招新创意概念，主导视觉与传播物料输出',
          ],
          highlights: [
            '粉丝 0 → 500+ 增长，平均阅读量 800+',
            '单篇最高阅读 1500+，互动率提升 60%',
            '从 0 到 1 搭建完整品牌视觉体系',
          ],
        },
      },
      project3: {
        period: '2023.04 — 2023.10',
        title: '挑战杯',
        award: '湖南省三等奖',
        desc: '主导项目品牌视觉体系构建，完成从 Logo、色彩系统到全套路演物料的创意设计。视觉评分位列参赛团队前 10%。',
        badge: '省级奖项',
        detail: {
          stack: 'AIGC 工具 / Affinity / Canva / Figma',
          work: [
            '主导项目品牌视觉体系构建，运用 AIGC 与专业设计软件',
            '完成 Logo、色彩系统到全套路演物料的创意设计',
            '负责社交媒体内容创意策划：信息图、短视频封面、活动海报',
            '基于用户互动数据持续优化视觉内容策略',
          ],
          highlights: [
            '视觉评分位列参赛团队前 10%',
            '荣获湖南省创新创业大赛三等奖',
            '具备完整品牌视觉体系输出能力',
          ],
        },
      },
    },

    // Experience
    experience: {
      eyebrow: '05 / 经历',
      heading: '经历与教育',
      educationLabel: '教育',
      certsLabel: '证书',
      detailLabels: {
        responsibilities: '工作内容',
        achievements: '主要业绩',
      },
      items: [
        {
          date: '2026.03',
          title: 'TomaNotes 独立开发',
          subtitle: '',
          desc: '桌面笔记应用，Electron + React，从 0 到 1 完整闭环。',
          tags: ['独立开发'],
          detail: {
            responsibilities: [
              '独立完成桌面应用从 0 到 1 的架构设计、开发与发布',
              '实现 Markdown + 富文本双编辑器、本地加密与多窗口并行',
              '排查并解决多窗口导致的 >10GB 内存泄漏问题',
            ],
            achievements: [
              '小红书冷启动单篇曝光 4.2 万+，阅读近 9000',
              '点击率 21.2%，95% 流量来自平台推荐',
              '验证内容增长模型与分发逻辑',
            ],
          },
        },
        {
          date: '2025.09\n—\n2026.04',
          title: '世界精神卫生日系列活动',
          subtitle: '心理委员',
          desc: '班级心理委员，策划「正念心作」系列主题活动，独立负责方案设计与现场组织。',
          tags: ['组织策划'],
          detail: {
            responsibilities: [
              '围绕"正念心作，愈在当下"主题独立策划班级心理健康体验活动',
              '负责活动方案设计、现场组织及总结材料整理',
              '通过心理知识分享与互动交流提升同学认知度',
            ],
            achievements: [
              '促进班级积极健康氛围建设',
              '按要求完成图文活动总结提交学院',
              '展现独立策划与执行的完整闭环能力',
            ],
          },
        },
        {
          date: '2025.01\n—\n2025.06',
          title: '长沙中标易信息科技',
          subtitle: '行政专员/助理 · 实习',
          desc: '建立规范化文档管理流程，承担基础翻译与办公支持工作。',
          tags: ['文档管理', '办公软件', 'AIGC 辅助'],
          detail: {
            responsibilities: [
              '负责日常行政文件整理与归档，建立规范化文档管理流程',
              '协助完成各类办公文档编辑与排版（Word/Excel/PPT）',
              '根据业务需求进行资料搜集与整理，支持部门决策',
              '承担基础文书翻译工作（中英互译），确保表达专业',
              '协助处理部门日常行政事务，提升整体办公效率',
            ],
            achievements: [
              '优化归档方式，资料查找效率提升约 30%',
              '累计完成文档编辑与整理 100+ 份，准确率高',
              '独立完成多份基础翻译任务，内容表达清晰',
            ],
          },
        },
        {
          date: '2023.10\n—\n2025.03',
          title: '校青年志愿者协会',
          subtitle: '宣传部副部长',
          desc: '主导 VI 体系建设，从 0 运营公众号至 500+ 粉丝，最高单篇阅读 1500+，互动率提升 60%。',
          tags: ['内容运营', '品牌设计'],
          detail: {
            responsibilities: [
              '主导协会品牌升级，搭建并落地统一视觉识别体系（VI）',
              '从 0 搭建并运营微信公众号，建立内容策划-发布流程',
              '负责"湖南百公里"等活动宣传，优化内容与推送策略',
              '提出"宇宙电波"招新创意概念，主导视觉与物料输出',
            ],
            achievements: [
              '粉丝 0 → 500+，平均阅读量 800+',
              '单篇最高阅读 1500+，互动率提升 60%',
              '强化协会品牌表达，提升活动关注度',
            ],
          },
        },
        {
          date: '2023.04\n—\n2023.10',
          title: '第十五届"挑战杯"',
          subtitle: '内容运营 · 视觉设计',
          desc: '主导视觉体系，负责 Logo、色彩系统与路演物料，荣获湖南省三等奖。',
          tags: ['视觉设计', '省级奖项'],
          detail: {
            responsibilities: [
              '主导项目品牌视觉体系构建，运用 AIGC 工具与专业设计软件',
              '完成 Logo、色彩系统到全套路演物料的创意设计',
              '负责社交媒体内容创意策划：信息图、短视频封面、海报',
              '基于用户互动数据分析持续优化视觉内容策略',
            ],
            achievements: [
              '视觉评分位列参赛团队前 10%',
              '荣获湖南省创新创业大赛三等奖',
              '完整输出从概念到落地的视觉体系',
            ],
          },
        },
      ],
      education: [
        { year: '2025—2027', school: '湘南学院', degree: '本科 · 商务英语', note: '专业排名前 10%' },
        { year: '2022—2025', school: '湖南工业职业技术学院', degree: '大专 · 商务英语', note: '专业排名前 5% · CET-4/6' },
      ],
    },

    // Contact
    contact: {
      eyebrow: '06 / 联系',
      headingPrefix: '正在寻找',
      rotatingWords: ['外贸销售', '海外运营', '跨境电商'] as const,
      headingSuffix: '方向的机会，',
      headingTwo: '欢迎随时联系。',
      sub: '目前重点寻找实习机会，也开放远程合作与项目协作。',
      positionsTitle: '期望职位',
      positionsHint: '6 — 8K · 全职 / 实习均可',
      positions: [
        { role: '新媒体运营', cities: '长沙 / 深圳 / 杭州' },
        { role: '跨境电商运营', cities: '长沙 / 深圳 / 广州' },
        { role: '外贸销售', cities: '长沙 / 广州 / 杭州 / 深圳 / 重庆' },
      ],
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

    ui: {
      flipHint: 'Click to flip →',
      flipBack: '← Click to flip back',
    },

    hero: {
      eyebrow: '01 / Intro',
      headlinePrefix: 'Across borders, with ',
      rotatingWords: ['words', 'design', 'AI'] as const,
      headlineSuffix: '',
      headlineLine2: 'moving good products to the world.',
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
      bioSecondary: 'What I care about is turning language, taste, and execution into one workflow: explaining products clearly for overseas markets while carrying content, visuals, and delivery through to outcomes.',
      resumeButton: 'Download Resume',
      courseTitle: 'Coursework',
      courseList: ['Cross-Cultural Communication', 'Business Negotiation', 'Advanced Business English', 'Business English Audio-Visual & Speaking', 'International Trade Practice', 'College German'],
      stat1Label: 'Top single-post reach on RED',
      stat2Label: 'WeChat followers grown from zero',
      stat3Label: 'Click-through rate on RED',
      toolsTitle1: 'AI Tools',
      toolsTitle2: 'Design & Content',
      toolsTitle3: 'Dev & Productivity',
      strengthsTitle: 'Strengths',
      strengths: [
        'Microsoft Office (Word/Excel/PPT) — document handling and basic data analysis',
        'AIGC tools (ChatGPT, Claude, Gemini, MidJourney) for content generation and workflow',
        'Basic AI dev (Codex, Claude Code, OpenClaw) — simple automation and project setup',
        'Design tools (Canva, Affinity, CapCut) — posters and visual content packaging',
        'Overseas platforms (Instagram, Facebook, X, Discord) — cross-cultural fluency',
        'Fast learner — picks up new tools quickly and adapts to varied tasks',
      ],
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
      detailLabels: {
        stack: 'Tech Stack',
        work: 'Key Work',
        highlights: 'Highlights',
      },
      project1: {
        period: '2026.03 — 2026.04 · Solo Build',
        title: 'TomaNotes',
        desc: 'A local-first notes app built on Electron + React — dual Markdown / rich-text editors, app-level encryption, parallel windows. Shipped end-to-end alone, including hunting down a >10GB memory leak across multi-window state.',
        statsTitle: 'Cold-start results on RED (Xiaohongshu)',
        s1: 'Impressions',
        s2: 'Reads',
        s3: 'CTR',
        s4: 'From recommendations',
        detail: {
          stack: 'Electron / React / Vite / Tiptap / CodeMirror / Node.js',
          work: [
            'Set up Electron + Vite, multi-window structure with unified loading',
            'Designed dual editor (Markdown + rich text) with seamless switching',
            'Built local storage with app-level encryption (password / biometric)',
            'Standalone note windows for parallel multi-doc editing',
            'Diagnosed and fixed a >10 GB multi-window memory leak',
            'Refactored search to unify title + content lookup',
          ],
          highlights: [
            'Solo end-to-end ownership of a desktop product',
            'Real Electron perf-tuning and leak-hunting experience',
            'Closed loop from product to engineering',
          ],
        },
      },
      project2: {
        period: '2023 — 2025 · Volunteer Association',
        title: 'WeChat Channel Ops',
        desc: 'Built the ops playbook from zero, led a full VI rebrand, and lifted brand recall across the campus.',
        s1: 'Followers grown',
        s2: 'Avg. reads',
        s3: 'Top single-post reads',
        s4: 'Engagement lift',
        detail: {
          stack: 'WeChat OA / Canva / Affinity / Photoshop',
          work: [
            'Led brand upgrade — built and shipped the full VI system',
            'Ran the channel from 0 — created the planning-to-publish pipeline',
            'Promoted the "Hunan 100km" campaign with new content cadence',
            'Coined the "Cosmic Wave" recruitment concept and visual kit',
          ],
          highlights: [
            '0 → 500+ followers, avg. 800+ reads per post',
            'Top read 1,500+, engagement up 60%',
            'End-to-end brand visual system from scratch',
          ],
        },
      },
      project3: {
        period: '2023.04 — 2023.10',
        title: 'Challenge Cup',
        award: 'Provincial Bronze, Hunan',
        desc: 'Led the project\'s visual identity end-to-end — logo, color system, full pitch kit. Visual scoring placed top 10% across all teams.',
        badge: 'Provincial Award',
        detail: {
          stack: 'AIGC tools / Affinity / Canva / Figma',
          work: [
            'Owned project visual identity — used AIGC + pro design tools',
            'Logo, color system, full pitch kit creative',
            'Social-media content: infographics, video covers, posters',
            'Iterated visual strategy based on engagement data',
          ],
          highlights: [
            'Visual scoring top 10% among all teams',
            'Provincial bronze in Hunan',
            'Full visual system from concept to delivery',
          ],
        },
      },
    },

    experience: {
      eyebrow: '05 / Career',
      heading: 'Experience & Education',
      educationLabel: 'Education',
      certsLabel: 'Certificates',
      detailLabels: {
        responsibilities: 'Responsibilities',
        achievements: 'Achievements',
      },
      items: [
        {
          date: '2026.03',
          title: 'TomaNotes — Solo Build',
          subtitle: '',
          desc: 'Desktop notes app, Electron + React, end-to-end ownership.',
          tags: ['Solo'],
          detail: {
            responsibilities: [
              'Solo architecture, dev, and release of a desktop product',
              'Dual Markdown + rich-text editors, encryption, multi-window',
              'Diagnosed and fixed a >10 GB multi-window memory leak',
            ],
            achievements: [
              'RED cold-start: 42K+ impressions, ~9K reads on top post',
              'CTR 21.2%, 95% traffic from platform recommendations',
              'Validated content growth & distribution model',
            ],
          },
        },
        {
          date: '2025.09\n—\n2026.04',
          title: 'World Mental Health Day Series',
          subtitle: 'Class Mental-Health Rep',
          desc: 'Class mental-health rep — designed and ran "Mindful Moments" sessions, including content, logistics & recap.',
          tags: ['Programming'],
          detail: {
            responsibilities: [
              'Designed and ran "Mindful Moments" themed sessions',
              'Owned planning, on-site logistics, and write-up',
              'Shared mental-health knowledge through interactive talks',
            ],
            achievements: [
              'Lifted classroom mental-health awareness',
              'Delivered illustrated recaps to the school',
              'Closed loop from concept to execution solo',
            ],
          },
        },
        {
          date: '2025.01\n—\n2025.06',
          title: 'Changsha Zhongbiaoyi Info Tech',
          subtitle: 'Administrative Intern',
          desc: 'Built a standardized doc-management workflow; supported translation and admin operations.',
          tags: ['Documents', 'MS Office', 'AIGC'],
          detail: {
            responsibilities: [
              'Daily document filing — built a standardized workflow',
              'Edited and formatted Word / Excel / PPT for the team',
              'Researched and organized info to support decisions',
              'Basic CN ↔ EN translation work for office docs',
              'Handled department admin tasks to keep ops smooth',
            ],
            achievements: [
              'Optimized filing — info-lookup speed up ~30%',
              '100+ documents edited and organized accurately',
              'Multiple translation tasks delivered solo and clean',
            ],
          },
        },
        {
          date: '2023.10\n—\n2025.03',
          title: 'University Volunteer Association',
          subtitle: 'Deputy Head, PR Dept.',
          desc: 'Built the VI system from scratch, ran the WeChat channel from 0 to 500+ followers, top single-post read 1500+, engagement up 60%.',
          tags: ['Content Ops', 'Brand'],
          detail: {
            responsibilities: [
              'Led brand upgrade — full VI system, end-to-end',
              'Built and ran WeChat channel — content pipeline from 0',
              'Promoted "Hunan 100km" — optimized content cadence',
              'Pitched "Cosmic Wave" recruitment concept and visuals',
            ],
            achievements: [
              '0 → 500+ followers, avg. 800+ reads per post',
              'Top post 1,500+, engagement +60%',
              'Strengthened brand voice and event awareness',
            ],
          },
        },
        {
          date: '2023.04\n—\n2023.10',
          title: '15th Challenge Cup',
          subtitle: 'Content & Visual Design',
          desc: 'Owned the visual system — logo, color, pitch deck. Won provincial bronze in Hunan.',
          tags: ['Visual', 'Award'],
          detail: {
            responsibilities: [
              'Owned the project visual identity end-to-end',
              'Logo, color system, full pitch kit creative',
              'Social content: infographics, video covers, posters',
              'Iterated visual strategy on engagement data',
            ],
            achievements: [
              'Visual scoring top 10% among all teams',
              'Provincial bronze, Hunan',
              'Concept-to-delivery visual system shipped',
            ],
          },
        },
      ],
      education: [
        { year: '2025—2027', school: 'Xiangnan University', degree: 'Bachelor · Business English', note: 'Top 10% of major' },
        { year: '2022—2025', school: 'Hunan Industry Polytechnic', degree: 'Diploma · Business English', note: 'Top 5% · CET-4/6' },
      ],
    },

    contact: {
      eyebrow: '06 / Contact',
      headingPrefix: 'Open to roles in ',
      rotatingWords: ['foreign trade', 'overseas ops', 'e-commerce'] as const,
      headingSuffix: '',
      headingTwo: 'and conversations beyond.',
      sub: 'Primarily looking for internship roles — open to remote and project collabs too.',
      positionsTitle: 'Target Roles',
      positionsHint: '6 — 8K RMB · Full-time / internship',
      positions: [
        { role: 'New Media Ops', cities: 'Changsha / Shenzhen / Hangzhou' },
        { role: 'Cross-border E-com', cities: 'Changsha / Shenzhen / Guangzhou' },
        { role: 'Foreign Trade Sales', cities: 'Changsha / Guangzhou / Hangzhou / Shenzhen / Chongqing' },
      ],
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
