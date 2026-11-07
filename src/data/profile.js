/**
 * ─────────────────────────────────────────────────────────────
 *  ملف البيانات المركزي — كل معلوماتك وروابطك هنا فقط.
 *  Central data file — every fact and link on the site lives here.
 *
 *  القاعدة: لا روابط ولا أرقام مخترعة. الحقل الفارغ "" يخفي العنصر.
 *  Rule: no invented links or numbers. An empty "" hides the item.
 * ─────────────────────────────────────────────────────────────
 */

export const person = {
  name: { en: 'Mahmoud Dohair', ar: 'محمود ضهير' },
  role: { en: 'Junior Full Stack Developer', ar: 'مطوّر Full Stack مبتدئ (Junior)' },
  roleTag: { en: '& Workflow Automation', ar: 'وأتمتة سير العمل' },
  location: { en: 'Khan Yunis, Palestine', ar: 'خانيونس، فلسطين' },
  intro: {
    en: 'I build complete web apps, from the database to the interface, and automate the repetitive work with n8n. Junior, IUG software development graduate, learning something new every week.',
    ar: 'أبني تطبيقات ويب كاملة من قاعدة البيانات حتى الواجهة، وأأتمت الشغل المتكرر بـ n8n. خريج تطوير برمجيات من الجامعة الإسلامية، وما زلت في بداية الطريق، وأتعلم شيئاً جديداً كل أسبوع.',
  },
  typed: {
    en: ['I build web apps.', 'I design REST APIs.', 'I automate workflows.', 'I model databases.'],
    ar: ['أبني تطبيقات ويب.', 'أصمّم واجهات API.', 'أأتمت الشغل المتكرر.', 'أصمّم قواعد البيانات.'],
  },
  // ضع صورتك الحقيقية في public/images/ واكتب اسمها هنا
  // Put your real photo in public/images/ and set its name here
  photo: '/images/mahmoud.webp',
  photoAlt: { en: 'Portrait of Mahmoud Dohair', ar: 'صورة محمود ضهير' },
  cv: '/files/Mahmoud-Dohair-CV.pdf',
}

/* ───────────── Contact — بيانات التواصل ───────────── */
export const contact = {
  email: 'mdohair22@gmail.com',
  // رقم واتساب بالصيغة الدولية بدون + أو مسافات — from your CV
  whatsapp: '972592271826',
  // أضف اسم المستخدم فقط عند توفره — username only, leave "" until you have it
  instagram: 'mhmwdzyd2089',
  telegram: 'mzmdn2',
  linkedin: '',
  // نموذج التواصل: ضع رابط Formspree أو أي خدمة مشابهة، وإلا يفتح النموذج بريدك
  // Contact form endpoint (e.g. https://formspree.io/f/xxxx). Empty = falls back to email.
  formEndpoint: '',
}

/* ───────────── Socials — Find me across the internet ─────────────
 *  أضف منصة جديدة بإضافة عنصر جديد. id يجب أن يطابق أيقونة في src/lib/icons.jsx
 *  Add a platform by adding an entry. `id` must match a brand icon in src/lib/icons.jsx
 */
export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'mamdsm-scfd',
    url: 'https://github.com/mamdsm-scfd',
    about: { en: 'Source code for my projects and training work.', ar: 'كود مشاريعي وشغل التدريبات.' },
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@nabni28',
    url: 'https://www.youtube.com/@nabni28',
    about: {
      en: 'Nabni: Arabic lessons on programming, the web, AI tools and automation.',
      ar: 'قناة نبني: دروس عربية في البرمجة والويب وأدوات الذكاء الاصطناعي والأتمتة.',
    },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@mhmwdzyd2089',
    url: 'https://www.instagram.com/mhmwdzyd2089/',
    about: { en: 'My personal account.', ar: 'حسابي الشخصي.' },
  },
  {
    key: 'rabtana',
    id: 'instagram',
    label: { en: 'Rabtana · Instagram', ar: 'ربطنة · إنستغرام' },
    handle: '@rabtana22',
    url: 'https://www.instagram.com/rabtana22/',
    about: { en: 'Rabtana: automation with n8n.', ar: 'ربطنة: أتمتة مع n8n.' },
  },
  { id: 'linkedin', label: 'LinkedIn', handle: '', url: '', about: { en: 'Career updates and experience.', ar: 'المسار المهني والخبرات.' } },
  { id: 'telegram', label: 'Telegram', handle: '', url: '', about: { en: 'Direct messages and resources.', ar: 'تواصل مباشر وموارد.' } },
  { id: 'facebook', label: 'Facebook', handle: '', url: '', about: { en: 'Posts and community.', ar: 'منشورات ومجتمع.' } },
  { id: 'tiktok', label: 'TikTok', handle: '', url: '', about: { en: 'Quick coding clips.', ar: 'مقاطع برمجة سريعة.' } },
  { id: 'x', label: 'X', handle: '', url: '', about: { en: 'Thoughts on dev and automation.', ar: 'أفكار عن التطوير والأتمتة.' } },
]

/* ───────────── Stats — أرقام حقيقية فقط ───────────── */
// Matches the certificates shown in the Journey section: 90 + 60 + 50 + 40 hours;
// Areisto, Front-End, UX/UI, Anoon, Build with AI
export const stats = [
  { value: 240, suffix: '', label: { en: 'training hours', ar: 'ساعة تدريب' } },
  { value: 5, suffix: '', label: { en: 'certificates', ar: 'شهادات' } },
  { value: 12, suffix: '', label: { en: 'public repos', ar: 'مستودع على GitHub' } },
]

/* ───────────── About ───────────── */
export const about = {
  story: {
    en: 'I studied Information Technology (Software Development) at the Islamic University of Gaza and kept going after graduation: full-stack training with Node.js and React, frontend and UI/UX courses, Java and Python, then AI and automation. I like work that ends with something that runs.',
    ar: 'درست تكنولوجيا المعلومات (تطوير البرمجيات) في الجامعة الإسلامية بغزة، وكمّلت بعد التخرج: تدريب Full Stack بـ Node.js وReact، ودورات Frontend وUI/UX، وJava وPython، ثم الذكاء الاصطناعي والأتمتة. بحب الشغل اللي بينتهي بشي شغّال.',
  },
  thinking: {
    en: 'I start from the problem, not the tool. Understand the data, sketch the flow, build the smallest version that works, then improve it.',
    ar: 'أبدأ من المشكلة، مش من الأداة. أفهم البيانات، أرسم المسار، أبني أصغر نسخة شغّالة، وبعدين أحسّنها.',
  },
  interests: [
    { en: 'Backend & APIs', ar: 'الباك إند وواجهات API' },
    { en: 'Workflow automation', ar: 'أتمتة سير العمل' },
    { en: 'AI in real products', ar: 'الذكاء الاصطناعي في منتجات حقيقية' },
    { en: 'Arabic-first interfaces', ar: 'واجهات عربية أولاً' },
    { en: 'Teaching on YouTube', ar: 'التعليم على يوتيوب' },
  ],
  education: {
    school: { en: 'The Islamic University of Gaza (IUG)', ar: 'الجامعة الإسلامية بغزة' },
    degree: { en: 'B.Sc. Information Technology · Software Development', ar: 'بكالوريوس تكنولوجيا المعلومات · تطوير البرمجيات' },
    years: '2020 – 2025',
  },
}

/* ───────────── Skills ─────────────
 * icon: slug of a brand icon in src/lib/icons.jsx (optional)
 */
export const skills = [
  {
    id: 'frontend',
    icon: 'web',
    title: { en: 'Frontend', ar: 'الواجهات' },
    items: [
      { name: 'React', icon: 'react' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'UI/UX (Figma)', icon: 'figma' },
    ],
  },
  {
    id: 'backend',
    icon: 'api',
    title: { en: 'Backend', ar: 'الباك إند' },
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'REST APIs', icon: '' },
      { name: 'JWT Auth', icon: 'jsonwebtokens' },
      { name: 'Laravel', icon: 'laravel' },
    ],
  },
  {
    id: 'databases',
    icon: 'database',
    title: { en: 'Databases', ar: 'قواعد البيانات' },
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
    ],
  },
  {
    id: 'languages',
    icon: 'code',
    title: { en: 'Languages', ar: 'لغات البرمجة' },
    items: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java', icon: '' },
      { name: 'Python', icon: 'python' },
    ],
  },
  {
    id: 'tools',
    icon: 'terminal',
    title: { en: 'Tools & Platforms', ar: 'الأدوات والمنصات' },
    items: [
      { name: 'Git & GitHub', icon: 'github' },
      { name: 'Google Cloud', icon: 'googlecloud' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Jira', icon: 'jira' },
      { name: 'Claude Code', icon: 'claude' },
    ],
  },
  {
    id: 'automation',
    icon: 'automation',
    title: { en: 'Automation & Data', ar: 'الأتمتة والبيانات' },
    items: [
      { name: 'n8n', icon: 'n8n' },
      { name: 'AI agents', icon: '' },
      { name: 'KPI dashboards', icon: '' },
      { name: 'Excel exports', icon: '' },
    ],
  },
]

/* ───────────── Projects ─────────────
 * category: fullstack | frontend | backend | automation
 * links: leave "" when not available — never invent one.
 */
export const projects = [
  {
    id: 'nabd',
    featured: true,
    category: 'fullstack',
    icon: 'shield',
    name: { en: 'NABD — Medical Points Management', ar: 'نبض — نظام إدارة النقاط الطبية' },
    kicker: { en: 'Graduation project · IUG · 2025', ar: 'مشروع التخرج · الجامعة الإسلامية · 2025' },
    summary: {
      en: 'An Arabic-first, role-based system that moves the Palestinian Red Crescent medical points from paper to one secure dashboard.',
      ar: 'نظام عربي أولاً بصلاحيات حسب الدور، ينقل النقاط الطبية للهلال الأحمر الفلسطيني من الورق إلى لوحة تحكم واحدة آمنة.',
    },
    problem: {
      en: 'Medical points in Gaza ran on paper: fragmented patient records, vaccination gaps, slow reporting and weak control over sensitive data.',
      ar: 'النقاط الطبية في غزة كانت تعمل على الورق: سجلات مرضى مبعثرة، فجوات في التطعيمات، تقارير بطيئة، وضعف في حماية البيانات الحساسة.',
    },
    role: {
      en: 'Team member in a five-person team (Agile/Scrum, 2–3 week sprints).',
      ar: 'عضو في فريق من خمسة أشخاص (Agile/Scrum بسبرنتات من 2 إلى 3 أسابيع).',
    },
    highlights: {
      en: ['Patients, visits, vaccinations, shifts and medical points modules', 'Roles: Admin, Editor, Doctor, Nurse', 'Full Arabic RTL interface + Excel export'],
      ar: ['وحدات المرضى والزيارات والتطعيمات والمناوبات والنقاط الطبية', 'أدوار: مدير، محرر، طبيب، ممرض', 'واجهة عربية RTL كاملة وتصدير Excel'],
    },
    stack: ['Laravel 10', 'Filament v3', 'MySQL 8', 'Spatie Permission', 'Figma'],
    github: '',
    live: '',
  },
  {
    id: 'medical-app',
    category: 'fullstack',
    icon: 'folder',
    name: { en: 'Cloud Medical App', ar: 'تطبيق طبي سحابي' },
    kicker: { en: 'Full stack · 2025', ar: 'Full Stack · 2025' },
    summary: {
      en: 'A cloud-based app for managing patients, appointments and medical files.',
      ar: 'تطبيق سحابي لإدارة المرضى والمواعيد والملفات الطبية.',
    },
    problem: {
      en: 'Clinics need patients, appointments and files in one place, reachable securely from anywhere.',
      ar: 'العيادات تحتاج المرضى والمواعيد والملفات في مكان واحد، يمكن الوصول إليه بأمان من أي مكان.',
    },
    role: { en: 'Developer: REST API, auth and frontend.', ar: 'مطوّر: واجهة API والمصادقة والواجهة الأمامية.' },
    highlights: {
      en: ['JWT authentication', 'File uploads', 'REST API with secure CORS'],
      ar: ['مصادقة JWT', 'رفع الملفات', 'واجهة REST مع CORS آمن'],
    },
    stack: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'JavaScript'],
    github: 'https://github.com/mamdsm-scfd/medical-app2',
    // https://medical-app2.vercel.app returned 404 on 2026-11-06 — re-add once the deploy is back up
    live: '',
  },
  {
    id: 'mercury',
    category: 'fullstack',
    icon: 'play',
    name: { en: 'Mercury Movies', ar: 'Mercury Movies' },
    kicker: { en: 'Team of two · 2026', ar: 'فريق من شخصين · 2026' },
    summary: {
      en: 'A full-stack movies app with CRUD, search and a collaborative GitHub workflow.',
      ar: 'تطبيق أفلام Full Stack فيه إضافة وتعديل وحذف وبحث، بسير عمل جماعي على GitHub.',
    },
    problem: {
      en: 'Practice building a real React + Express product as a team, with issues and pull requests.',
      ar: 'التدرّب على بناء منتج حقيقي بـ React وExpress كفريق، عبر Issues وPull Requests.',
    },
    role: { en: 'Frontend developer.', ar: 'مطوّر الواجهة الأمامية.' },
    highlights: {
      en: ['Movie list, details and hero carousel', 'Add / edit / delete forms', 'Loading and error states'],
      ar: ['قائمة الأفلام والتفاصيل والكاروسيل', 'نماذج الإضافة والتعديل والحذف', 'حالات التحميل والخطأ'],
    },
    stack: ['React', 'Express.js', 'Node.js', 'Vite'],
    github: 'https://github.com/mamdsm-scfd/Mercury_movies_app_with_react_and_express',
    live: '',
  },
  {
    id: 'careerboost',
    category: 'backend',
    icon: 'profile',
    name: { en: 'CareerBoost CV Kit', ar: 'CareerBoost CV Kit' },
    kicker: { en: 'In progress · 2026', ar: 'قيد التطوير · 2026' },
    summary: {
      en: 'A template-driven resume builder: add a new template without touching application code.',
      ar: 'منصة لبناء السير الذاتية بالقوالب: تضيف قالباً جديداً بدون لمس كود التطبيق.',
    },
    problem: {
      en: 'Resume tools hard-code their templates. This one discovers templates from a folder and exports PDF.',
      ar: 'أدوات السيرة الذاتية تكتب قوالبها داخل الكود. هذه الأداة تكتشف القوالب من مجلد وتصدّر PDF.',
    },
    role: { en: 'Solo developer. Phase 1 done: scaffold, config, health route.', ar: 'مطوّر وحيد. اكتملت المرحلة الأولى: الهيكل والإعدادات ومسار الفحص.' },
    highlights: {
      en: ['Express + TypeScript', 'Handlebars templates', 'Live editing & PDF export (planned)'],
      ar: ['Express وTypeScript', 'قوالب Handlebars', 'تعديل مباشر وتصدير PDF (مخطط)'],
    },
    stack: ['TypeScript', 'Node.js', 'Express.js', 'Handlebars'],
    github: 'https://github.com/mamdsm-scfd/CareerBoost-CV-Kit',
    live: '',
  },
  {
    id: 'ai-accountant',
    category: 'automation',
    icon: 'ai',
    name: { en: 'AI-Powered Automated Accountant', ar: 'محاسب آلي بالذكاء الاصطناعي' },
    kicker: { en: 'n8n automation', ar: 'أتمتة n8n' },
    summary: {
      en: 'An n8n workflow project focused on AI-assisted accounting.',
      ar: 'مشروع سير عمل على n8n للمحاسبة بمساعدة الذكاء الاصطناعي.',
    },
    problem: { en: 'Cut the manual bookkeeping steps with an AI-assisted workflow.', ar: 'تقليل خطوات المحاسبة اليدوية بسير عمل يساعده الذكاء الاصطناعي.' },
    role: { en: 'Built the workflows.', ar: 'بنيت سير العمل.' },
    highlights: { en: ['n8n workflows', 'AI integration'], ar: ['سير عمل n8n', 'دمج الذكاء الاصطناعي'] },
    stack: ['n8n', 'AI'],
    github: '',
    live: '',
    files: 'https://drive.google.com/drive/folders/1A-rmQc3zJcKtHR7wLSDwSEOGzkt1pxi0',
  },
  {
    id: 'price-compare',
    category: 'automation',
    icon: 'chart',
    name: { en: 'Supplier Price Comparison', ar: 'مقارنة أسعار الموردين' },
    kicker: { en: 'n8n automation', ar: 'أتمتة n8n' },
    summary: {
      en: 'An n8n workflow that compares medicine prices from different suppliers.',
      ar: 'سير عمل على n8n يقارن أسعار الأدوية من موردين مختلفين.',
    },
    problem: { en: 'Comparing supplier price lists by hand is slow and error-prone.', ar: 'مقارنة قوائم أسعار الموردين يدوياً بطيئة وتكثر فيها الأخطاء.' },
    role: { en: 'Built the workflow.', ar: 'بنيت سير العمل.' },
    highlights: { en: ['n8n workflow', 'Price comparison'], ar: ['سير عمل n8n', 'مقارنة الأسعار'] },
    stack: ['n8n'],
    github: '',
    live: '',
    files: 'https://drive.google.com/drive/folders/14S-lzRps2VcETJe6Sg_v0_ETj9WGBFT2',
  },
  {
    id: 'kpi',
    category: 'automation',
    icon: 'target',
    name: { en: 'KPI Tracking & Evaluation', ar: 'تتبع وتقييم مؤشرات الأداء' },
    kicker: { en: 'n8n automation', ar: 'أتمتة n8n' },
    summary: {
      en: 'KPI workflows with employee and manager reports, evaluation and interactive dashboards.',
      ar: 'سير عمل لمؤشرات الأداء مع تقارير للموظف والمدير وتقييم ولوحات تفاعلية.',
    },
    problem: { en: 'Turn scattered performance data into regular reports for employees and managers.', ar: 'تحويل بيانات الأداء المبعثرة إلى تقارير دورية للموظفين والمدراء.' },
    role: { en: 'Built the workflows.', ar: 'بنيت سير العمل.' },
    highlights: { en: ['Employee & manager reports', 'Interactive dashboards'], ar: ['تقارير للموظف والمدير', 'لوحات تفاعلية'] },
    stack: ['n8n'],
    github: '',
    live: '',
    files: 'https://drive.google.com/drive/folders/1LyqUc8VO2n5rDbsWMMTFwuW8up1jIxG1',
  },
  {
    id: 'cloud-analytics',
    category: 'frontend',
    icon: 'chart',
    name: { en: 'Cloud Data Analytics', ar: 'تحليل البيانات السحابي' },
    kicker: { en: 'Course project · Cloud & Distributed Systems', ar: 'مشروع مساق الأنظمة السحابية والموزعة' },
    summary: {
      en: 'Final project for the Cloud and Distributed Systems course.',
      ar: 'المشروع النهائي لمساق الأنظمة السحابية والموزعة.',
    },
    problem: { en: 'Apply cloud and distributed-systems concepts to a data analytics task.', ar: 'تطبيق مفاهيم الأنظمة السحابية والموزعة على مهمة لتحليل البيانات.' },
    role: { en: 'Course project.', ar: 'مشروع مساق.' },
    highlights: { en: ['HTML / JavaScript'], ar: ['HTML وJavaScript'] },
    stack: ['HTML', 'JavaScript'],
    github: 'https://github.com/mamdsm-scfd/cloud-data-analytics',
    live: '',
  },
  {
    id: 'movie-api',
    category: 'backend',
    icon: 'terminal',
    name: { en: 'Movie API without a framework', ar: 'واجهة أفلام بدون إطار عمل' },
    kicker: { en: 'Node.js · 2026', ar: 'Node.js · 2026' },
    summary: {
      en: 'A movie API written on plain Node.js, no Express, with file storage and OMDb posters.',
      ar: 'واجهة API للأفلام بـ Node.js فقط بدون Express، بتخزين في ملف وصور من OMDb.',
    },
    problem: { en: 'Understand routing and HTTP without a framework doing it for me.', ar: 'فهم التوجيه وبروتوكول HTTP بدون إطار عمل يعمل ذلك بدلاً مني.' },
    role: { en: 'Solo developer.', ar: 'مطوّر وحيد.' },
    highlights: { en: ['Hand-written routing', 'JSON file storage', 'External API'], ar: ['توجيه مكتوب يدوياً', 'تخزين في ملف JSON', 'API خارجي'] },
    stack: ['Node.js', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/mamdsm-scfd/movie-repo',
    live: '',
  },
]

/* ───────────── Journey (timeline) ───────────── */
export const journey = [
  {
    date: { en: 'Now', ar: 'الآن' },
    kind: 'program',
    title: { en: 'Forward Program — McKinsey & Company', ar: 'برنامج Forward — ماكنزي' },
    body: { en: 'Currently enrolled: structured problem solving, adaptability and communication.', ar: 'ملتحق حالياً: حل المشكلات بشكل منظم، والتكيّف، والتواصل.' },
  },
  {
    date: { en: 'Sep 2026', ar: 'سبتمبر 2026' },
    kind: 'cert',
    title: { en: 'AI & Automation — Anoon Academy', ar: 'الذكاء الاصطناعي والأتمتة — أكاديمية النون' },
    body: { en: '40 hours.', ar: '40 ساعة.' },
  },
  {
    date: { en: 'May 2026', ar: 'مايو 2026' },
    kind: 'training',
    title: { en: 'Trainee Full-Stack Developer — Areisto Software', ar: 'متدرب Full Stack — شركة أريستو للبرمجيات' },
    body: {
      en: '90 hours over two and a half months: full-stack apps with Node.js and React.',
      ar: '90 ساعة خلال شهرين ونصف: تطبيقات Full Stack بـ Node.js وReact.',
    },
  },
  {
    date: { en: 'Mar 2026', ar: 'مارس 2026' },
    kind: 'cert',
    title: { en: 'Front-End Development — Learn More Institute', ar: 'تطوير الواجهات — معهد Learn More' },
    body: { en: '60 hours.', ar: '60 ساعة.' },
  },
  {
    date: { en: 'Jan 2026', ar: 'يناير 2026' },
    kind: 'cert',
    title: { en: 'UX/UI Design — Learn More Institute', ar: 'تصميم UX/UI — معهد Learn More' },
    body: { en: '50 hours.', ar: '50 ساعة.' },
  },
  {
    date: { en: 'Program', ar: 'برنامج' },
    kind: 'program',
    title: { en: 'Build with AI: MASR Edition — Google for Developers', ar: 'Build with AI: MASR Edition — Google for Developers' },
    body: {
      en: 'Cloud-native apps on Google Cloud and AI integration. Certificate of attendance.',
      ar: 'تطبيقات سحابية على Google Cloud ودمج الذكاء الاصطناعي. شهادة حضور.',
    },
  },
  {
    date: { en: '2020 – 2025', ar: '2020 – 2025' },
    kind: 'education',
    title: { en: 'B.Sc. IT, Software Development — IUG', ar: 'بكالوريوس تكنولوجيا المعلومات، تطوير البرمجيات — الجامعة الإسلامية' },
    body: {
      en: 'Graduation project: NABD, built by a five-person team with Agile/Scrum.',
      ar: 'مشروع التخرج: نظام نبض، بناه فريق من خمسة أشخاص بمنهجية Agile/Scrum.',
    },
  },
]

/* ───────────── Services ───────────── */
export const services = [
  {
    icon: 'web',
    title: { en: 'Full Stack Web Apps', ar: 'تطبيقات ويب Full Stack' },
    body: { en: 'From database to interface: a working app with auth, CRUD and an admin side.', ar: 'من قاعدة البيانات حتى الواجهة: تطبيق شغّال فيه تسجيل دخول وإدارة بيانات ولوحة تحكم.' },
  },
  {
    icon: 'code',
    title: { en: 'Frontend Development', ar: 'تطوير الواجهات' },
    body: { en: 'Responsive React interfaces, Arabic RTL and English.', ar: 'واجهات React متجاوبة، بالعربي RTL والإنجليزي.' },
  },
  {
    icon: 'api',
    title: { en: 'Backend & REST APIs', ar: 'الباك إند وواجهات REST' },
    body: { en: 'Node.js and Express APIs with JWT auth and file uploads.', ar: 'واجهات API بـ Node.js وExpress مع مصادقة JWT ورفع ملفات.' },
  },
  {
    icon: 'database',
    title: { en: 'Database Design', ar: 'تصميم قواعد البيانات' },
    body: { en: 'Clear schemas in PostgreSQL, MySQL or MongoDB.', ar: 'مخططات واضحة في PostgreSQL أو MySQL أو MongoDB.' },
  },
  {
    icon: 'automation',
    title: { en: 'Workflow Automation', ar: 'أتمتة سير العمل' },
    body: { en: 'n8n workflows that take repetitive work off your team.', ar: 'سير عمل على n8n يشيل الشغل المتكرر عن فريقك.' },
  },
  {
    icon: 'pen',
    title: { en: 'Websites & Landing Pages', ar: 'مواقع وصفحات هبوط' },
    body: { en: 'Fast, clean pages for a product, a service or a person.', ar: 'صفحات سريعة ونظيفة لمنتج أو خدمة أو شخص.' },
  },
]
