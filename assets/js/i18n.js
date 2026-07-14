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
      lead: "I am a Computer Science student at Syiah Kuala University, driven to develop tools that serve a clear purpose. I thrive on building functional, efficient solutions to tackle real-world challenges. Every expert was once a beginner, and I'm dedicated to continuously learning and engineering technology that creates meaningful impact.",
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
    },
    roles: { coLead: "Co-Lead Tech Developer", sole: "Sole Tech Developer" },
    tags: {
      android: "Android", healthcare: "Healthcare", onDeviceAI: "On-device AI",
      browserExtension: "Browser Extension", mentalHealth: "Mental Health", privacyFirst: "Privacy-first",
      iot: "IoT", hardware: "Hardware", arduino: "Arduino",
      game: "Game", education: "Education", mobile: "Mobile"
    },
    pages: {
      glucoscan: {
        awardFull: "2nd Place — LKTIN by IYSA",
        tagline: "An Android app that helps diabetes patients monitor their daily sugar intake by scanning a food label.",
        gallerySub: "A closer look at GlucoScan's mobile UI/UX design.",
        overview1: "GlucoScan is an Android app that helps diabetes patients monitor their daily sugar intake simply by scanning food packaging labels using their smartphone camera. It automatically extracts the sugar content and compares it to the user's personal limit, providing a real-time dietary guide.",
        overview2: "Understanding nutrition labels is a constant, quiet burden for people managing diabetes. GlucoScan removes that friction, point the camera at a label, and the app does the reading, the math, and the flagging.",
        overview3: "I acted as the sole developer and UI/UX designer within a multidisciplinary team, building the app entirely in Kotlin and Jetpack Compose while integrating Google ML Kit OCR with a custom Regex pipeline to reliably extract sugar values from real-world, inconsistently formatted packaging.",
        role: "Co-Lead Tech Developer (Group Project), sole app developer & UI/UX designer, while teammates led the nutrition and medical research.",
        recognition: "🥈 2nd Place at the National Scientific Paper Competition (LKTIN) by IYSA, for a multidisciplinary innovation bridging Computer Science and Healthcare.",
        g1: "Real-Time Scan Results", g2: "Cumulative Sugar Intake History", g3: "Personal Sugar Limit",
        g4: "User Clinical Profile Setup", g5: "Live Camera Label Detection", g6: "Step-by-Step User Guide",
        g7: "Language Settings Toggle", g8: "Dashboard Navigation", g9: "Health & Care Tips", g10: "Scanned Label Image Log"
      },
      mindguard: {
        awardFull: "Finalist — UGM Public Health Hackathon",
        tagline: "A privacy-centric browser extension that filters distressing content in real time for a safer browsing experience.",
        gallerySub: "How MindGuard transforms your digital experience.",
        overview1: "MindGuard is a privacy-centric browser extension designed to provide real-time content filtering for student mental health support. It proactively masks distressing online content to create a safer digital environment.",
        overview2: "The idea grew out of the 2026 UGM Public Health Hackathon, which focused on youth psychological distress. Research pointed to a clear pattern: heavy exposure to negative social media content correlates with rising depression risk among students. Rather than asking students to simply log off, MindGuard intercepts that content before it ever reaches them and offers a calmer alternative in its place.",
        overview3: "I acted as the sole tech developer and UI/UX designer within a multidisciplinary team, engineering a local Regex engine and dynamic DOM manipulation that filters content instantly. It's built entirely in Vanilla JS on Manifest V3, so every scan happens on-device, no data ever leaves the browser.",
        role: "Sole Tech Developer & UI/UX Designer (Group Project), built the entire extension while teammates led the psychological research and content strategy.",
        recognition: "🥉 Finalist at the 2026 UGM Public Health Hackathon, for an innovative solution bridging Computer Science and digital well-being.",
        g1: "MindGuard Workflow"
      },
      windsense: {
        awardFull: "Gold Medal — Indonesia Inventors Day",
        tagline: "An IoT-based smart early warning system that reads wind speed and direction in real time, gets the alert to your phone before the weather does.",
        gallerySub: "The engineering behind WindSense's early warning system.",
        overview1: "WindSense is an IoT-based smart early warning system designed to monitor wind speed and direction in real time. It continuously tracks environmental conditions and delivers instant mobile alerts to help keep people safe during extreme weather.",
        overview2: "This was the project that first pulled me into programming. In high school, a group of friends invited me to help build it. I had zero programming experience at the time, and joining something at this scale was well outside my comfort zone. It became my first real step into computer science: not just learning to code, but learning to collaborate and ship something physical that actually worked.",
        overview3: "As Co-Lead Tech Developer, I worked on the software-hardware integration in C/C++ on Arduino, processing real-time sensor data and getting it communicating reliably for instant mobile alerts.",
        role: "Co-Lead Tech Developer (Group Project), handled the software-hardware integration and sensor data pipeline alongside a co-lead.",
        recognition: "🥇 Gold Medal at the International Indonesia Inventors Day 2024, for technical innovation and functional design.",
        g1: "Final Product", g2: "Hardware & Software Integration Process"
      },
      escapedisaster: {
        awardFull: "Competition Entry — DEMC U-DARE 3.0",
        tagline: "An interactive mobile educational game that simulates disasters scenarios to teach critical self-rescue procedures.",
        gallerySub: "Highlights from the EscapeDisaster gameplay.",
        overview1: "Escape Disaster is a mobile-based educational game designed to teach critical self-rescue procedures for emergencies like earthquakes and tsunamis. It immerses players in simulated disaster scenarios, using time-limited quizzes to train quick decision-making.",
        overview2: "For the U-DARE disaster-mitigation competition, the problem was clear: students learn emergency theory, but schools rarely run physical drills. A teammate then suggested turning that theory into an interactive game instead which is a safe way to practice real-time decisions from a screen. I'd never built a game before, and ended up learning the basics of game logic from a teammate's younger brother which was a humbling experience but exactly the push I needed.",
        overview3: "I acted as the sole developer within a multidisciplinary team, using the TurboWarp engine to turn visual, block-based logic into smooth, interactive gameplay, and fully integrating custom UI/UX assets.",
        role: "Sole Tech Developer (Group Project), built the interactive gameplay while teammates contributed disaster-response content and scenario design.",
        recognition: "🥉 Developed as a competitive submission for the Disaster Education Media Competition (DEMC) U-DARE 3.0, organized by TDMRC USK.",
        g1: "Start Screen", g2: "Gameplay — Scene 1", g3: "Gameplay — Scene 2", g4: "Game Over"
      }
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
    },
    roles: { coLead: "Co-Lead Pengembang Teknologi", sole: "Pengembang Teknologi Tunggal" },
    tags: {
      android: "Android", healthcare: "Kesehatan", onDeviceAI: "AI di Perangkat",
      browserExtension: "Ekstensi Browser", mentalHealth: "Kesehatan Mental", privacyFirst: "Mengutamakan Privasi",
      iot: "IoT", hardware: "Perangkat Keras", arduino: "Arduino",
      game: "Game", education: "Edukasi", mobile: "Mobile"
    },
    pages: {
      glucoscan: {
        awardFull: "Juara 2 — LKTIN oleh IYSA",
        tagline: "Aplikasi Android yang membantu penderita diabetes memantau asupan gula harian dengan memindai label makanan.",
        gallerySub: "Tampilan lebih dekat pada desain UI/UX mobile GlucoScan.",
        overview1: "GlucoScan adalah aplikasi Android yang membantu penderita diabetes memantau asupan gula harian mereka cukup dengan memindai label kemasan makanan menggunakan kamera smartphone. Aplikasi ini secara otomatis mengekstrak kandungan gula dan membandingkannya dengan batas pribadi pengguna, memberikan panduan diet secara real-time.",
        overview2: "Memahami label nutrisi adalah beban yang terus-menerus dirasakan oleh penderita diabetes. GlucoScan menghilangkan hambatan itu, cukup arahkan kamera ke label, dan aplikasi akan membaca, menghitung, dan memberi peringatan secara otomatis.",
        overview3: "Saya berperan sebagai satu-satunya developer sekaligus UI/UX designer dalam tim multidisiplin ini, membangun aplikasi sepenuhnya dengan Kotlin dan Jetpack Compose sambil mengintegrasikan Google ML Kit OCR dengan pipeline Regex khusus untuk mengekstrak nilai gula secara akurat dari kemasan dunia nyata yang formatnya tidak selalu konsisten.",
        role: "Co-Lead Pengembang Teknologi (Proyek Kelompok) — satu-satunya developer aplikasi & UI/UX designer, sementara rekan tim memimpin riset gizi dan medis.",
        recognition: "🥈 Juara 2 pada Lomba Karya Tulis Ilmiah Nasional (LKTIN) oleh IYSA, atas inovasi multidisiplin yang menjembatani Ilmu Komputer dan Kesehatan.",
        g1: "Hasil Pindai Real-Time", g2: "Riwayat Asupan Gula Kumulatif", g3: "Batas Gula Personal",
        g4: "Pengaturan Profil Klinis Pengguna", g5: "Deteksi Label via Kamera Langsung", g6: "Panduan Pengguna Langkah demi Langkah",
        g7: "Pengaturan Bahasa", g8: "Navigasi Dashboard", g9: "Tips Kesehatan & Perawatan", g10: "Log Gambar Label yang Dipindai"
      },
      mindguard: {
        awardFull: "Finalis — UGM Public Health Hackathon",
        tagline: "Ekstensi browser yang mengutamakan privasi, menyaring konten yang meresahkan secara real-time demi pengalaman berselancar yang lebih aman.",
        gallerySub: "Bagaimana MindGuard mengubah pengalaman digital Anda.",
        overview1: "MindGuard adalah ekstensi browser yang mengutamakan privasi, dirancang untuk menyaring konten secara real-time demi mendukung kesehatan mental pelajar. Ekstensi ini secara proaktif menyamarkan konten daring yang meresahkan untuk menciptakan lingkungan digital yang lebih aman.",
        overview2: "Ide ini lahir dari UGM Public Health Hackathon 2026 yang berfokus pada tekanan psikologis remaja. Riset menunjukkan pola yang jelas: paparan berat terhadap konten media sosial negatif berkorelasi dengan meningkatnya risiko depresi pada pelajar. Alih-alih meminta pelajar untuk sekadar berhenti membuka media sosial, MindGuard mencegat konten tersebut sebelum sempat terlihat dan menawarkan alternatif yang lebih menenangkan.",
        overview3: "Saya berperan sebagai satu-satunya tech developer sekaligus UI/UX designer dalam tim multidisiplin ini, merancang mesin Regex lokal dan manipulasi DOM dinamis yang menyaring konten secara instan. Dibangun sepenuhnya dengan Vanilla JS di atas Manifest V3, sehingga setiap pemindaian terjadi langsung di perangkat, tanpa data yang keluar dari browser.",
        role: "Satu-satunya Tech Developer & UI/UX Designer (Proyek Kelompok) — membangun seluruh ekstensi, sementara rekan tim memimpin riset psikologis dan strategi konten.",
        recognition: "🥉 Finalis pada UGM Public Health Hackathon 2026, atas solusi inovatif yang menjembatani Ilmu Komputer dan kesejahteraan digital.",
        g1: "Alur Kerja MindGuard"
      },
      windsense: {
        awardFull: "Medali Emas — Indonesia Inventors Day",
        tagline: "Sistem peringatan dini pintar berbasis IoT yang membaca kecepatan dan arah angin secara real-time, mengirim notifikasi ke ponsel Anda sebelum cuaca buruk datang.",
        gallerySub: "Rekayasa di balik sistem peringatan dini WindSense.",
        overview1: "WindSense adalah sistem peringatan dini pintar berbasis IoT yang dirancang untuk memantau kecepatan dan arah angin secara real-time. Sistem ini terus memantau kondisi lingkungan dan mengirimkan notifikasi instan ke ponsel untuk membantu menjaga keselamatan orang saat cuaca ekstrem.",
        overview2: "Proyek inilah yang pertama kali menarik saya ke dunia pemrograman. Saat SMA, sekelompok teman mengajak saya membantu membangunnya. Saat itu saya belum punya pengalaman pemrograman sama sekali, dan terlibat dalam proyek seskala ini jauh di luar zona nyaman saya. Proyek ini menjadi langkah nyata pertama saya masuk ke dunia ilmu komputer, bukan sekadar belajar coding, tapi juga belajar berkolaborasi dan menghasilkan sesuatu yang nyata dan benar-benar berfungsi.",
        overview3: "Sebagai Co-Lead Tech Developer, saya mengerjakan integrasi software-hardware menggunakan C/C++ pada Arduino, memproses data sensor secara real-time dan memastikan komunikasinya berjalan andal untuk notifikasi instan ke ponsel.",
        role: "Co-Lead Pengembang Teknologi (Proyek Kelompok) — menangani integrasi software-hardware dan alur data sensor bersama rekan co-lead.",
        recognition: "🥇 Medali Emas pada International Indonesia Inventors Day 2024, atas inovasi teknis dan desain fungsional.",
        g1: "Produk Akhir", g2: "Proses Integrasi Hardware & Software"
      },
      escapedisaster: {
        awardFull: "Peserta Kompetisi — DEMC U-DARE 3.0",
        tagline: "Game edukasi mobile interaktif yang mensimulasikan skenario bencana untuk mengajarkan prosedur penyelamatan diri yang krusial.",
        gallerySub: "Sorotan dari gameplay EscapeDisaster.",
        overview1: "Escape Disaster adalah game edukasi berbasis mobile yang dirancang untuk mengajarkan prosedur penyelamatan diri penting saat keadaan darurat seperti gempa bumi dan tsunami. Game ini membawa pemain ke dalam skenario bencana yang disimulasikan, menggunakan kuis berbatas waktu untuk melatih pengambilan keputusan secara cepat.",
        overview2: "Untuk kompetisi mitigasi bencana U-DARE, masalahnya jelas: pelajar mempelajari teori tanggap darurat, tapi sekolah jarang mengadakan simulasi fisik. Salah satu rekan tim kemudian mengusulkan untuk mengubah teori itu menjadi game interaktif, cara yang aman untuk melatih pengambilan keputusan real-time lewat layar. Saya belum pernah membuat game sebelumnya, dan akhirnya belajar dasar-dasar logika game dari adik seorang rekan tim, sebuah pengalaman yang cukup menohok tapi justru menjadi dorongan yang saya butuhkan.",
        overview3: "Saya berperan sebagai satu-satunya developer dalam tim multidisiplin ini, menggunakan engine TurboWarp untuk mengubah logika visual berbasis blok menjadi gameplay interaktif yang mulus, sekaligus mengintegrasikan penuh aset UI/UX kustom.",
        role: "Satu-satunya Tech Developer (Proyek Kelompok) — membangun gameplay interaktif, sementara rekan tim berkontribusi pada konten tanggap bencana dan desain skenario.",
        recognition: "🥉 Dikembangkan sebagai karya kompetisi untuk Disaster Education Media Competition (DEMC) U-DARE 3.0, yang diselenggarakan oleh TDMRC USK.",
        g1: "Layar Awal", g2: "Gameplay — Adegan 1", g3: "Gameplay — Adegan 2", g4: "Game Over"
      }
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
      lead: "我是锡亚库拉大学的计算机科学专业学生，致力于开发目标明确的实用工具。我热衷于构建功能完善、高效的解决方案来应对现实挑战。每个专家都曾是初学者，我也将持续学习，打造真正产生影响力的技术。",
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
    },
    roles: { coLead: "联合技术负责人", sole: "独立技术开发者" },
    tags: {
      android: "Android", healthcare: "医疗健康", onDeviceAI: "设备端 AI",
      browserExtension: "浏览器扩展", mentalHealth: "心理健康", privacyFirst: "隐私优先",
      iot: "物联网", hardware: "硬件", arduino: "Arduino",
      game: "游戏", education: "教育", mobile: "移动端"
    },
    pages: {
      glucoscan: {
        awardFull: "第二名 — IYSA 主办 LKTIN",
        tagline: "一款安卓应用，通过扫描食品标签帮助糖尿病患者监测每日糖分摄入量。",
        gallerySub: "近距离了解 GlucoScan 的移动端 UI/UX 设计。",
        overview1: "GlucoScan 是一款安卓应用，用户只需用手机摄像头扫描食品包装标签，即可帮助糖尿病患者监测每日糖分摄入量。应用会自动提取糖分含量，并与用户的个人限值进行比对，提供实时的饮食指导。",
        overview2: "看懂营养标签，对糖尿病患者来说是一种持续存在的负担。GlucoScan 消除了这一障碍——只需将摄像头对准标签，剩下的读取、计算与提醒都交给应用来完成。",
        overview3: "在这个跨学科团队中，我是唯一的开发者兼 UI/UX 设计师，完全使用 Kotlin 与 Jetpack Compose 构建应用，并整合 Google ML Kit OCR 与自定义 Regex 处理流程，从格式并不统一的真实包装中稳定提取糖分数值。",
        role: "联合技术负责人（团队项目）——唯一的应用开发者兼 UI/UX 设计师，队友负责营养与医学研究部分。",
        recognition: "🥈 荣获 IYSA 主办的全国科学论文竞赛（LKTIN）第二名，表彰这一融合计算机科学与医疗健康的跨学科创新。",
        g1: "实时扫描结果", g2: "累计糖分摄入记录", g3: "个人糖分上限",
        g4: "用户临床档案设置", g5: "实时摄像头标签识别", g6: "分步用户指南",
        g7: "语言设置切换", g8: "仪表盘导航", g9: "健康与护理小贴士", g10: "已扫描标签图像记录"
      },
      mindguard: {
        awardFull: "入围决赛 — UGM 公共卫生黑客松",
        tagline: "一款注重隐私的浏览器扩展，实时过滤令人不安的内容，带来更安全的浏览体验。",
        gallerySub: "MindGuard 如何改变你的数字体验。",
        overview1: "MindGuard 是一款注重隐私的浏览器扩展，旨在实时过滤内容，为学生的心理健康提供支持。它会主动屏蔽令人不安的网络内容，营造更安全的数字环境。",
        overview2: "这个想法源自 2026 年 UGM 公共卫生黑客松，该活动聚焦青少年心理困扰问题。研究显示出明显的规律：大量接触负面社交媒体内容与学生抑郁风险上升密切相关。MindGuard 并不是简单地要求学生「下线」，而是在这些内容触达之前就将其拦截，并提供更平静的替代内容。",
        overview3: "在这个跨学科团队中，我是唯一的技术开发者兼 UI/UX 设计师，构建了本地 Regex 引擎与动态 DOM 操作机制，实现即时内容过滤。整个扩展完全基于 Vanilla JS 与 Manifest V3 构建，所有扫描均在设备本地完成，数据不会离开浏览器。",
        role: "唯一的技术开发者兼 UI/UX 设计师（团队项目）——独立构建整个扩展程序，队友负责心理学研究与内容策略。",
        recognition: "🥉 入围 2026 年 UGM 公共卫生黑客松决赛，表彰这一融合计算机科学与数字健康福祉的创新方案。",
        g1: "MindGuard 工作流程"
      },
      windsense: {
        awardFull: "金牌 — 印尼发明家日",
        tagline: "一款基于物联网的智能预警系统，实时读取风速与风向，在天气突变之前就把警报送达你的手机。",
        gallerySub: "WindSense 预警系统背后的工程设计。",
        overview1: "WindSense 是一款基于物联网的智能预警系统，专为实时监测风速与风向而设计。它持续追踪环境状况，并即时向手机发送警报，帮助人们在极端天气中保持安全。",
        overview2: "这是第一个真正把我带入编程世界的项目。高中时，一群朋友邀请我一起参与开发。当时我完全没有编程经验，参与这样规模的项目完全超出了我的舒适区。这成为我踏入计算机科学领域的第一步——不仅是学习写代码，更是学习协作，并最终做出一个真正能运作的实体作品。",
        overview3: "作为联合技术负责人，我负责在 Arduino 上用 C/C++ 完成软硬件整合工作，处理实时传感器数据，并确保通信稳定可靠，实现即时手机警报。",
        role: "联合技术负责人（团队项目）——与另一位联合负责人共同处理软硬件整合与传感器数据流程。",
        recognition: "🥇 荣获 2024 年印尼国际发明家日金牌，表彰其技术创新与功能性设计。",
        g1: "最终成品", g2: "软硬件整合过程"
      },
      escapedisaster: {
        awardFull: "竞赛参赛作品 — DEMC U-DARE 3.0",
        tagline: "一款互动式移动教育游戏，通过模拟灾难情景教授关键的自救逃生技能。",
        gallerySub: "EscapeDisaster 游戏画面精选。",
        overview1: "Escape Disaster 是一款移动教育类游戏，旨在教授地震、海啸等紧急情况下至关重要的自救逃生步骤。游戏让玩家沉浸在模拟灾难情景中，通过限时问答训练快速决策能力。",
        overview2: "在 U-DARE 防灾减灾竞赛中，问题很明确：学生学习了应急理论，但学校很少组织实地演练。一位队友提议将理论转化为互动游戏——这是一种在屏幕前安全练习实时决策的方式。我此前从未做过游戏，最终是从队友的弟弟那里学到了游戏逻辑的基础知识，这是一次让人谦逊的经历，却也正是我所需要的推动力。",
        overview3: "在这个跨学科团队中，我是唯一的开发者，使用 TurboWarp 引擎将可视化的积木式逻辑转化为流畅的互动玩法，并完整整合了自定义 UI/UX 素材。",
        role: "唯一的技术开发者（团队项目）——独立构建互动玩法，队友负责灾害应对内容与情景设计。",
        recognition: "🥉 作为参赛作品，为 TDMRC USK 主办的防灾教育媒体竞赛（DEMC）U-DARE 3.0 而开发。",
        g1: "开始界面", g2: "游戏画面 — 场景一", g3: "游戏画面 — 场景二", g4: "游戏结束"
      }
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
