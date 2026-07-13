/**
 * I18N — language dictionaries + small helpers.
 * -------------------------------------------------------------------------
 * How this works (see assets/js/main.js for the engine):
 *   - Any element with data-i18n="a.b.c" gets its textContent replaced by
 *     I18N[lang].a.b.c when the language changes.
 *   - Add data-i18n-html instead of data-i18n when the string contains real
 *     HTML (e.g. a <span> or <strong> inside it) — innerHTML is used instead.
 *   - If a key is missing for the selected language, English is used
 *     instead — so pages that are only partially translated never show
 *     blank text.
 *
 * TO ADD A NEW LANGUAGE:
 *   1. Copy the "en" object below, translate every value.
 *   2. Add a <button class="lang-option" data-lang="xx">...</button> to the
 *      language dropdown in every HTML page (search for id="langDropdown").
 *   3. Done — no other code changes needed.
 * -------------------------------------------------------------------------
 */
const I18N = {
  en: {
    nav: { about: "About", experience: "Experience", projects: "Projects", contact: "Contact", resume: "Resume", language: "Language" },
    hero: {
      title_html: 'Hello, I am <span class="highlight">Kaka</span>',
      quote_html: '<strong>“Every expert was once a beginner.”</strong> This is my journey as a tech developer striving to craft meaningful and impactful digital solutions.',
      btnWork: "See My Work",
      btnContact: "Get in Touch",
      statProjects: "Projects Built",
      statAwards: "Awards Won",
      statBuilding: "Building Since",
      badge: "🎓\u00A0 CS Student · Universitas Syiah Kuala"
    },
    about: {
      title: "About Kaka",
      lead: "I am a Computer Science student at Universitas Syiah Kuala, driven to develop tools that serve a clear purpose. I thrive on building functional, efficient solutions to tackle real-world challenges. Every expert was once a beginner, and I'm dedicated to continuously learning and engineering technology that creates meaningful impact.",
      factEducation: "🎓 Education",
      factEducationValue: "Computer Science, Universitas Syiah Kuala",
      factBased: "📍 Based in",
      factBasedValue: "Banda Aceh, Indonesia",
      factFocus: "💡 Focus areas",
      factFocusValue: "Mobile Apps · IoT · Human-centered Tech",
      factGpa: "📊 GPA"
    },
    experience: {
      title: "Career and Organizations",
      subtitle: "My roles and involvement so far — on campus and beyond.",
      bemRole: "Student Executive Board MIPA",
      bemDiv: "— Social affair Division",
      himaRole: "Informatics Student Association",
      himaDiv: "— Member",
      note: "More roles will show up here as they come."
    },
    projects: {
      title: "Projects",
      subtitle: "A selection of my recent work, spanning across mobile apps, web tools, and hardware engineering.",
      viewLink: "View",
      moreTitle: "More on the way",
      moreText: "New builds get added here as they ship. This spot is reserved for what's next."
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Open to collaborations, internships, and conversations about tech.",
      emailLabel: "Email",
      send: "Send",
      copy: "Copy",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      whatsappLabel: "WhatsApp",
      cvTitle: "Want the full picture?",
      cvText: "Download my CV for education, skills, and a complete project history.",
      downloadCv: "Download CV"
    },
    footer: { builtWith: "Built with care." },
    projectNav: { all: "All Projects", browse: "Browse", prev: "Previous", next: "Next" },
    projectPage: {
      overview: "Overview",
      highlights: "Highlights",
      myRole: "My Role",
      techStack: "Tech Stack",
      recognition: "Recognition",
      links: "Links",
      contactMe: "Contact Me",
      viewGithub: "View on GitHub",
      downloadPaper: "Download Paper",
      allProjects: "All Projects"
    }
  },

  id: {
    nav: { about: "Tentang", experience: "Pengalaman", projects: "Proyek", contact: "Kontak", resume: "CV", language: "Bahasa" },
    hero: {
      title_html: 'Halo, saya <span class="highlight">Kaka</span>',
      quote_html: '<strong>“Setiap ahli pernah menjadi pemula.”</strong> Ini adalah perjalanan saya sebagai pengembang teknologi yang berusaha menciptakan solusi digital yang bermakna dan berdampak.',
      btnWork: "Lihat Karya Saya",
      btnContact: "Hubungi Saya",
      statProjects: "Proyek Dibuat",
      statAwards: "Penghargaan Diraih",
      statBuilding: "Mulai Berkarya Sejak",
      badge: "🎓\u00A0 Mahasiswa Ilmu Komputer · Universitas Syiah Kuala"
    },
    about: {
      title: "Tentang Kaka",
      lead: "Saya adalah mahasiswa Ilmu Komputer di Universitas Syiah Kuala yang terdorong untuk mengembangkan alat dengan tujuan yang jelas. Saya senang membangun solusi yang fungsional dan efisien untuk menjawab tantangan nyata. Setiap ahli pernah menjadi pemula, dan saya berkomitmen untuk terus belajar serta merancang teknologi yang memberi dampak bermakna.",
      factEducation: "🎓 Pendidikan",
      factEducationValue: "Ilmu Komputer, Universitas Syiah Kuala",
      factBased: "📍 Berdomisili di",
      factBasedValue: "Banda Aceh, Indonesia",
      factFocus: "💡 Bidang fokus",
      factFocusValue: "Aplikasi Mobile · IoT · Teknologi Berpusat Manusia",
      factGpa: "📊 IPK"
    },
    experience: {
      title: "Karier dan Organisasi",
      subtitle: "Peran dan keterlibatan saya sejauh ini — di kampus dan sekitarnya.",
      bemRole: "Badan Eksekutif Mahasiswa MIPA",
      bemDiv: "— Divisi Sosial Kemasyarakatan",
      himaRole: "Himpunan Mahasiswa Informatika",
      himaDiv: "— Anggota",
      note: "Peran lainnya akan muncul di sini seiring waktu."
    },
    projects: {
      title: "Proyek",
      subtitle: "Pilihan karya terbaru saya, mencakup aplikasi mobile, web tools, hingga rekayasa perangkat keras.",
      viewLink: "Lihat",
      moreTitle: "Segera hadir",
      moreText: "Karya baru akan ditambahkan di sini seiring rilis. Tempat ini disiapkan untuk proyek berikutnya."
    },
    contact: {
      title: "Hubungi Saya",
      subtitle: "Terbuka untuk kolaborasi, magang, dan diskusi seputar teknologi.",
      emailLabel: "Email",
      send: "Kirim",
      copy: "Salin",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      whatsappLabel: "WhatsApp",
      cvTitle: "Ingin tahu lebih lengkap?",
      cvText: "Unduh CV saya untuk melihat pendidikan, keterampilan, dan riwayat proyek lengkap.",
      downloadCv: "Unduh CV"
    },
    footer: { builtWith: "Dibuat dengan sepenuh hati." },
    projectNav: { all: "Semua Proyek", browse: "Jelajahi", prev: "Sebelumnya", next: "Berikutnya" },
    projectPage: {
      overview: "Ikhtisar",
      highlights: "Sorotan",
      myRole: "Peran Saya",
      techStack: "Teknologi yang Digunakan",
      recognition: "Penghargaan",
      links: "Tautan",
      contactMe: "Hubungi Saya",
      viewGithub: "Lihat di GitHub",
      downloadPaper: "Unduh Makalah",
      allProjects: "Semua Proyek"
    }
  },

  zh: {
    nav: { about: "关于", experience: "经历", projects: "项目", contact: "联系", resume: "简历", language: "语言" },
    hero: {
      title_html: '你好，我是 <span class="highlight">Kaka</span>',
      quote_html: '<strong>“每个专家都曾是初学者。”</strong>这是我作为技术开发者的旅程，致力于打造有意义且有影响力的数字解决方案。',
      btnWork: "查看我的作品",
      btnContact: "联系我",
      statProjects: "完成项目",
      statAwards: "获得奖项",
      statBuilding: "开发起始年",
      badge: "🎓\u00A0 计算机科学学生 · Universitas Syiah Kuala"
    },
    about: {
      title: "关于 Kaka",
      lead: "我是 Universitas Syiah Kuala 的计算机科学专业学生，致力于开发目标明确的实用工具。我热衷于构建功能完善、高效的解决方案来应对现实挑战。每个专家都曾是初学者，我也将持续学习，打造真正产生影响力的技术。",
      factEducation: "🎓 教育背景",
      factEducationValue: "计算机科学，Universitas Syiah Kuala",
      factBased: "📍 常驻地",
      factBasedValue: "印度尼西亚，班达亚齐",
      factFocus: "💡 专注领域",
      factFocusValue: "移动应用 · 物联网 · 以人为本的技术",
      factGpa: "📊 平均绩点"
    },
    experience: {
      title: "职业与组织经历",
      subtitle: "迄今为止我在校内外担任的角色与参与的活动。",
      bemRole: "MIPA 学生行政委员会",
      bemDiv: "— 社会事务部",
      himaRole: "信息学学生协会",
      himaDiv: "— 成员",
      note: "更多经历将在未来陆续更新。"
    },
    projects: {
      title: "项目",
      subtitle: "精选近期作品，涵盖移动应用、网页工具与硬件工程。",
      viewLink: "查看",
      moreTitle: "敬请期待",
      moreText: "新作品发布后将添加至此，这里为下一个项目预留位置。"
    },
    contact: {
      title: "联系我",
      subtitle: "欢迎合作、实习邀约，以及关于技术的交流。",
      emailLabel: "邮箱",
      send: "发送",
      copy: "复制",
      linkedinLabel: "领英",
      githubLabel: "GitHub",
      whatsappLabel: "WhatsApp",
      cvTitle: "想了解更多？",
      cvText: "下载我的简历，查看教育背景、技能与完整项目经历。",
      downloadCv: "下载简历"
    },
    footer: { builtWith: "用心制作。" },
    projectNav: { all: "所有项目", browse: "浏览", prev: "上一个", next: "下一个" },
    projectPage: {
      overview: "概览",
      highlights: "亮点",
      myRole: "我的角色",
      techStack: "技术栈",
      recognition: "所获荣誉",
      links: "相关链接",
      contactMe: "联系我",
      viewGithub: "在 GitHub 上查看",
      downloadPaper: "下载论文",
      allProjects: "所有项目"
    }
  }
};

/* Category filter button labels shown on the homepage project grid.
   The underlying category VALUE used for filtering (PROJECTS[].category)
   stays in English — only the visible label is translated. */
const CATEGORY_LABELS = {
  en: { All: "All", Mobile: "Mobile", Web: "Web", IoT: "IoT", Game: "Game" },
  id: { All: "Semua", Mobile: "Mobile", Web: "Web", IoT: "IoT", Game: "Game" },
  zh: { All: "全部", Mobile: "移动端", Web: "网页", IoT: "物联网", Game: "游戏" }
};

/* Award tier labels shown on project cards, keyed by the exact English
   label already in PROJECTS[].award.label. */
const AWARD_LABEL_TRANSLATIONS = {
  "2nd Place": { id: "Juara 2", zh: "第二名" },
  "Finalist": { id: "Finalis", zh: "入围决赛" },
  "Gold Medal": { id: "Medali Emas", zh: "金牌" },
  "Competition Entry": { id: "Peserta Kompetisi", zh: "竞赛参赛作品" }
};

/* Project card tagline + summary, keyed by project id. Falls back to the
   English value already in PROJECTS[] if a language/key is missing. */
const PROJECT_TRANSLATIONS = {
  glucoscan: {
    id: {
      tagline: "Pindai label makanan, langsung tahu batas gula Anda.",
      summary: "Aplikasi Android yang membantu penderita diabetes memantau asupan gula harian dengan memindai label kemasan makanan lewat kamera."
    },
    zh: {
      tagline: "扫描食品标签，立即知晓您的血糖摄入上限。",
      summary: "一款安卓应用，通过摄像头扫描食品包装标签，帮助糖尿病患者监测每日糖分摄入量。"
    }
  },
  mindguard: {
    id: {
      tagline: "Lapisan pelindung tenang antara pelajar dan konten media sosial yang toksik.",
      summary: "Ekstensi browser yang mengutamakan privasi, menyaring konten yang meresahkan secara real-time untuk mendukung kesehatan mental pelajar."
    },
    zh: {
      tagline: "在学生与负能量信息流之间，筑起一道安静的保护屏障。",
      summary: "一款注重隐私的浏览器扩展程序，可实时过滤令人不安的内容，助力守护学生心理健康。"
    }
  },
  windsense: {
    id: {
      tagline: "Sistem peringatan dini yang membaca arah angin sebelum badai datang.",
      summary: "Sistem peringatan dini berbasis IoT yang memantau kecepatan dan arah angin serta mengirim notifikasi instan ke ponsel."
    },
    zh: {
      tagline: "在风暴来袭之前，提前读懂风向的预警系统。",
      summary: "一款基于物联网的智能预警系统，实时追踪风速与风向，并即时向手机发送警报。"
    }
  },
  escapedisaster: {
    id: {
      tagline: "Melatih detik-detik krusial, sebelum benar-benar terjadi.",
      summary: "Game edukasi mobile yang mengajarkan prosedur penyelamatan diri saat gempa dan tsunami melalui simulasi skenario bencana."
    },
    zh: {
      tagline: "在关键时刻真正来临之前，先练习那至关重要的几秒钟。",
      summary: "一款移动教育类游戏，通过模拟情景教授地震与海啸中的自救逃生技巧。"
    }
  }
};
