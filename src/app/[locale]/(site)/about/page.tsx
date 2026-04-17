import { use } from "react";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generatePersonSchema, generateBreadcrumbSchema, getCanonicalUrl, getLocaleCode } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const url = getCanonicalUrl("/about", locale);
  const isZh = locale === 'zh-TW';

  return {
    title: t("title"),
    description: t("description"),
    keywords: isZh ? ['Charmy', 'charmying', '曾韋翰', 'Charmy Tseng', '前端工程師', '前端開發者', '台灣前端工程師', '前端開發', '關於我', 'Charmy 部落格'] : ['Charmy', 'charmying', 'Charmy Tseng', '曾韋翰', 'frontend developer', 'frontend engineer', 'Taiwan frontend developer', 'front-end developer', 'about'],
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': getCanonicalUrl("/about", "zh-TW"),
        'en': getCanonicalUrl("/about", "en"),
        'x-default': getCanonicalUrl("/about", "zh-TW"),
      },
    },
    openGraph: {
      type: 'profile',
      locale: getLocaleCode(locale),
      firstName: 'Charmy',
      lastName: 'Tseng',
      username: 'charmying',
    },
  };
}

type skillsType = {
  name: string;
  icon: string;
};

const skills: skillsType[] = [
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'SCSS/Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Cordova', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
];

type HighlightItem = string | { title?: string; items?: string[] };

type TimelineItem = {
  startDate: string;
  endDate: string | null;
  titleZh: string;
  titleEn: string;
  orgZh: string;
  orgEn: string;
  locationZh: string;
  locationEn: string;
  skills?: string[];
  summaryZh?: string;
  summaryEn?: string;
  highlightsZh?: HighlightItem[];
  highlightsEn?: HighlightItem[];
};

const timeline: TimelineItem[] = [
  {
    startDate: '2024.05',
    endDate: '2026.03',
    titleZh: 'Angular 前端工程師',
    titleEn: 'Angular Front-end Engineer',
    orgZh: '金融科技公司',
    orgEn: 'FinTech Company',
    locationZh: '臺中市',
    locationEn: 'Taichung City, Taiwan',
    skills: ['HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Angular', 'Cordova', 'App', 'Git'],
    summaryZh: "銀行企網銀系統 Web 與 App 開發",
    summaryEn: "Web and App development for corporate online banking systems",
    highlightsZh: [
      {
        title: '負責企網銀 App / Web 前端功能開發與維運',
      },
      {
        title: '負責企網銀 App 對客戶教育訓練',
        items: [
          'Cordova、Angular 等技術分享',
          'App 與 API 互動模式與加解密介紹',
          '交易放行流程介紹',
          '系統設計架構、軟體設計架構技術分享',
          '營運環境維護、日常檢核維護、異常處理程序等技術分享與實戰範例分享',
        ]
      },
      {
        title: '使用 Angular 8、Angular 11、Angular 18、TypeScript 進行 SPA 架構開發',
      },
      {
        title: '參與企網銀 Web 2.0 專案，將既有 XML 架構重構為 Angular 前端',
      },
      {
        title: '負責 App 與後端 API 串接、Issue 處理與功能修正',
      },
      {
        title: 'Cordova Plugin 修改、介接、測試與 App 功能整合',
      },
      {
        title: '協助新進同仁電腦環境建置、進行 Git Flow 與 Angular 教學加速專案上手',
      },
      {
        title: '撰寫 JavaScript / Python 腳本協助 i18n 與資料整理以及加速開發',
      },
    ],
    highlightsEn: [
      {
        title: 'Responsible for frontend development and maintenance of corporate online banking App / Web',
      },
      {
        title: 'Responsible for customer education training of corporate online banking App',
        items: [
          'Technical sharing of Cordova, Angular and other technologies',
          'Introduction to App and API interaction patterns and encryption/decryption',
          'Introduction to transaction release processes',
          'Technical sharing of system design architecture and software design architecture',
          'Technical sharing and practical examples of operational environment maintenance, daily inspection maintenance, and abnormal handling procedures',
        ]
      },
      {
        title: 'Using Angular 8, Angular 11, Angular 18, and TypeScript to develop SPA architecture',
      },
      {
        title: 'Participated in the corporate online banking Web 2.0 project, refactoring existing XML architecture to Angular frontend',
      },
      {
        title: 'Responsible for App and backend API integration, issue handling, and feature modifications',
      },
      {
        title: 'Cordova Plugin modification, integration, testing, and App function integration',
      },
      {
        title: 'Assisted new hires in setting up computer environments, conducted Git Flow and Angular training to accelerate project onboarding',
      },
      {
        title: 'Wrote JavaScript / Python scripts to assist with i18n and data organization, as well as to accelerate development',
      },
    ],
  },
  {
    startDate: '2023.09',
    endDate: '2023.10',
    titleZh: 'Vue 前端工程師',
    titleEn: 'Vue Front-end Engineer',
    orgZh: '企業軟體公司',
    orgEn: 'Enterprise Software Company',
    locationZh: '新竹市',
    locationEn: 'Hsinchu City, Taiwan',
    skills: ['HTML5', 'CSS3', 'Ant Design', 'JavaScript', 'Vue 3'],
    summaryZh: "驗證 Vue 3 Composition 所學知識並應用於工作中。",
    summaryEn: "Validated knowledge of Vue 3 Composition and applied it to work.",
    highlightsZh: [
      {
        title: '修正與優化新人入職測驗前端題目',
      },
      {
        title: '指導新人理解 Vue 前端架構與常見開發問題',
      },
      {
        title: '進行簡易 Code Review 與程式問題排查',
      },
    ],
    highlightsEn: [
      {
        title: 'Refined and optimized frontend test questions for new hires',
      },
      {
        title: 'Guided new hires in understanding Vue frontend architecture and common development issues',
      },
      {
        title: 'Conducted simple code reviews and troubleshooting of programming issues',
      },
    ],
  },
  {
    startDate: '2023.02',
    endDate: '2023.08',
    titleZh: '前端工程師',
    titleEn: 'Front-end Engineer ',
    orgZh: '數位整合公司',
    orgEn: 'Digital Integration Company',
    locationZh: '臺中市',
    locationEn: 'Taichung City, Taiwan',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Git'],
    summaryZh: "與客戶、設計師、工程師溝通需求後撰寫網頁，並進行專案排程以及與客戶溝通協調問題與成果。",
    summaryEn: "Communicated with clients, designers, and engineers to understand requirements, then developed web pages, managed project schedules, and coordinated issues and deliverables with clients.",
    highlightsZh: [
      {
        title: "部分專案：",
        items: [
          '製造業企業網站 (越南市場)',
          '衛浴品牌（經銷商招募）',
          '大型電子支付公司 (永續與投資人專區)',
          '多家上市櫃企業網站專案'
        ],
      },
    ],
    highlightsEn: [
      {
        title: "Selected Projects:",
        items: [
          'Manufacturing company website (Vietnam market)',
          'Large-scale e-payment platform (Sustainability & IR sections)',
          'Sanitary brand (dealer recruitment)',
          'Web projects for listed companies'
        ],
      },
    ],
  },
  {
    startDate: "2022.09",
    endDate: "2023.01",
    titleZh: "前端工程師就業養成班",
    titleEn: "Front-end Engineer Job Training Program",
    orgZh: "緯育 TibaMe",
    orgEn: "TibaMe",
    locationZh: "桃園市中壢區",
    locationEn: "Zhongli District, Taoyuan City, Taiwan",
    skills: ["UI/UX", "Figma", "HTML5", "CSS3", "JavaScript", "Vue 2", "Git"],
    summaryZh: "系統學習 UI/UX 設計、HTML/CSS/JavaScript、Vue.js 等前端技術。",
    summaryEn: "Systematic learning of UI/UX design, HTML/CSS/JavaScript, Vue.js and other frontend technologies.",
    highlightsZh: [
      {
        title: "課程重點",
        items: [
          "UI/UX 設計原理與實作：視覺設計、PhotoShop、Figma",
          "前端技術：HTML5、CSS3、JavaScript、jQuery、Vue 2 Option API",
          "後端與資料庫技術：IIS PHP、MySQL",
          "團隊開發：Git、GitHub、敏捷開發",
          "專案實作與作品集建立",
        ],
      },
    ],
    highlightsEn: [
      {
        title: "Course highlights",
        items: [
          "UI/UX design principles and practice: visual design, PhotoShop, Figma",
          "Frontend: HTML5, CSS3, JavaScript, jQuery, Vue 2 Option API",
          "Backend & database: IIS PHP, MySQL",
          "Team development: Git, GitHub, Agile",
          "Project practice and portfolio building",
        ],
      },
    ],
  },
];

type JourneyItem = {
  year: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
};

const journey: JourneyItem[] = [
  {
    year: '2026',
    titleZh: '初學 React',
    titleEn: 'Learning React',
    descZh: '因 React 為目前最熱門前端框架而自學',
    descEn: 'Because React is currently the most popular frontend framework, I started learning it.',
  },
  {
    year: '2026',
    titleZh: '初探 NestJS',
    titleEn: 'Exploring NestJS',
    descZh: '因想做 Side Project，需要使用到資料庫，開始接觸 NestJS 後端技術',
    descEn: 'Because I wanted to do a Side Project and needed a database, I started learning NestJS backend technology.',
  },

  {
    year: '2025',
    titleZh: '初學 Cordova',
    titleEn: 'Learning Cordova',
    descZh: '因工作上需要使用 Cordova 而開始接觸',
    descEn: 'Started learning Cordova because it was needed for work',
  },
  {
    year: '2025',
    titleZh: '初探 MongoDB',
    titleEn: 'Exploring MongoDB',
    descZh: '因想做 Side Project，需要使用到資料庫，MongoDB 能符合免費的需求而開始學習',
    descEn: 'Because I wanted to do a Side Project and needed a database, I started learning MongoDB since it meets the free requirements.',
  },
  {
    year: '2025',
    titleZh: '初探 Express.js',
    titleEn: 'Exploring Express.js',
    descZh: '因想做 Side Project，需要使用到資料庫，開始接觸 Node.js 後端技術',
    descEn: 'Because I wanted to do a Side Project and needed a database, I started learning Node.js backend technology.',
  },
  {
    year: '2024',
    titleZh: '學習 Angular',
    titleEn: 'Learning Angular',
    descZh: '因工作使用的是 Angular 而開始學習',
    descEn: 'Started learning Angular because it is used in my work'
  },
  {
    year: '2024',
    titleZh: '學習 TypeScript',
    titleEn: 'Learning TypeScript',
    descZh: '工作使用的是 Angular，因 Angular 2 使用 TypeScript 而先學習',
    descEn: 'Working with Angular, and since Angular 2 uses TypeScript, I started learning TypeScript first.'
  },
  {
    year: '2023',
    titleZh: '學習 Vue 3 Composition API',
    titleEn: 'Learning Vue 3 Composition API',
    descZh: '在緯育 TibaMe 中學習的是 Vue 2 Option API，結訓後自主學習 Vue 3 Composition API',
    descEn: 'Learned Vue 2 Option API at TibaMe, then self-studied Vue 3 Composition API after graduation.'
  },
  {
    year: "2022",
    titleZh: "開始前端之旅",
    titleEn: "Began the frontend journey",
    descZh: "從零開始自學 HTML、CSS、JavaScript，然後參加前端工程師就業養成班",
    descEn: "Self-taught HTML, CSS, JavaScript from scratch, then joined a Front-end engineer job training program",
  },
  {
    year: "2022",
    titleZh: "第一次接觸程式",
    titleEn: "First exposure to programming",
    descZh: "在 YouTube 上看到 Python 教學影片後產生興趣，開始自學程式",
    descEn: "Got interested after watching Python tutorials on YouTube, started self-learning programming",
  },
];

const contacts = [
  { href: "mailto:charmytseng0118@gmail.com", label: "Email", icon: "✉️" },
  { href: "https://github.com/Charmying", label: "GitHub", icon: "🐈" },
];

export default function AboutPage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("AboutPage");
  const isZh = locale === "zh-TW";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isZh ? '首頁' : 'Home', url: getCanonicalUrl('/', locale) },
    { name: t("title"), url: getCanonicalUrl('/about', locale) },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="px-4 pt-16 xs:pt-20 sm:pt-24 pb-12 xs:pb-16 sm:pb-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.025em] leading-[0.9] mb-6 xs:mb-8 sm:mb-10 animate-fadeIn">
            {t("heroTitle")}
          </h1>
          <p className="text-xl xs:text-2xl sm:text-3xl leading-[1.2] opacity-70 font-light animate-fadeIn">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>
      {/* Introduction Card */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-8">
            {/* Profile header */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 bg-[var(--button-bg)]">
                <Image src="/Charmy.png" alt={t("name")} width={128} height={128} className="w-full h-full object-cover" priority />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                  {t("name")}
                </h2>
                <p className="text-lg text-[var(--secondary)] mb-3">
                  {t("role")}
                </p>
                <p className="text-sm text-[var(--secondary)]">
                  {t("location")}
                </p>
              </div>
            </div>
            {/* Structured bio */}
            <div className="mt-6 pt-6 border-t border-[var(--border)]">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">{t("greeting")}</h3>
                <p className="leading-relaxed">{t("bio")}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t("aboutMeTitle")}
                  </h3>
                  <ul className="space-y-1.5">
                    {(["aboutMe1", "aboutMe2", "aboutMe3"] as const).map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="mt-1 flex-shrink-0 opacity-50">
                          •
                        </span>
                        <span className="leading-relaxed">{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t("devFocusTitle")}
                  </h3>
                  <ul className="space-y-1.5">
                    {(["devFocus1", "devFocus2", "devFocus3"] as const).map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="mt-1 flex-shrink-0 opacity-50">
                          •
                        </span>
                        <span className="leading-relaxed">{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t("currentFocusTitle")}
                  </h3>
                  <ul className="space-y-1.5">
                    {(
                      [
                        "currentFocus1",
                        "currentFocus2",
                        "currentFocus3",
                      ] as const
                    ).map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="mt-1 flex-shrink-0 opacity-50">
                          •
                        </span>
                        <span className="leading-relaxed">{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="leading-relaxed text-[var(--secondary)]">
                    {t("personalMission")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Skills */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              {t("skillsTitle")}
            </h2>
            <p className="text-base xs:text-lg opacity-70">
              {t("skillsSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 text-center transition-all duration-300 hover:scale-[1.05] group">
                <div className="flex justify-center mb-2">
                  <Image src={skill.icon} alt={skill.name} width={32} height={32} loading="lazy" className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-[13px] font-semibold tracking-tight">
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Timeline */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              {t("timelineTitle")}
            </h2>
            <p className="text-base xs:text-lg opacity-70">
              {t("timelineSubtitle")}
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-16 top-0 bottom-0 w-0.5 bg-[var(--foreground)] opacity-20" />
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {timeline.map((item, index) => {
                const title = isZh ? item.titleZh : item.titleEn;
                const org = isZh ? item.orgZh : item.orgEn;
                const location = isZh ? item.locationZh : item.locationEn;
                const endDate = item.endDate ?? t("present");
                const summary = isZh ? item.summaryZh : item.summaryEn;
                const highlights = isZh ? item.highlightsZh : item.highlightsEn;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute left-6 md:left-14 w-4 h-4 rounded-full border-2 z-10 group-hover:scale-125 transition-all duration-300" style={{ backgroundColor: "var(--background)", borderColor: "var(--foreground)", opacity: 0.8 }}/>
                    <div className="ml-20 md:ml-32">
                      <div className="group-hover:translate-x-1 transition-all duration-300">
                        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-[var(--border)] bg-[var(--background)] mb-4 sm:mb-6">
                          <span>{item.startDate}</span>
                          <span className="mx-3 opacity-50">—</span>
                          <span>{endDate}</span>
                        </div>
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-8 md:p-10 group-hover:shadow-lg transition-all duration-300">
                          <div className="grid grid-cols-1 xl:grid-cols-5 xl:gap-6">
                            <div className="xl:col-span-2">
                              <div className={item.skills && item.skills.length > 0 ? "mb-4 sm:mb-6" : "mb-2 sm:mb-4"}>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                                  {title}
                                </h3>
                                <p className="text-base sm:text-lg font-semibold mb-1">
                                  {org} | {location}
                                </p>
                              </div>
                              {item.skills && item.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4 xl:mb-0">
                                  {item.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 text-sm rounded-full font-medium border border-[var(--border)] bg-[var(--background)] hover:scale-105 transition-transform duration-200">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="xl:col-span-3 space-y-2">
                              <p className="text-sm sm:text-[15px] leading-relaxed mb-4">
                                {summary}
                              </p>
                              {highlights && highlights.length > 0 && (
                                <ul className="space-y-1 sm:space-y-1.5 text-sm sm:text-[15px]">
                                  {highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      {typeof h === "string" ? (
                                        <>
                                          <span className="mt-1 flex-shrink-0 opacity-50">
                                            •
                                          </span>
                                          <span className="leading-relaxed">
                                            {h}
                                          </span>
                                        </>
                                      ) : (
                                        <div className="w-full">
                                          <div className="flex items-start gap-2 mb-1">
                                            <span className="mt-1 flex-shrink-0 opacity-50">
                                              •
                                            </span>
                                            <span className="font-medium leading-relaxed">
                                              {h.title}
                                            </span>
                                          </div>
                                          {h.items && h.items.length > 0 && (
                                            <ul className="ml-4 space-y-0.5 sm:space-y-1">
                                              {h.items.map((sub, si) => (
                                                <li key={si} className="flex items-start gap-2">
                                                  <span className="mt-1 flex-shrink-0 opacity-40">
                                                    ◦
                                                  </span>
                                                  <span className="leading-relaxed">
                                                    {sub}
                                                  </span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Journey Timeline */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              {t("journeyTitle")}
            </h2>
            <p className="text-base xs:text-lg opacity-70">
              {t("journeySubtitle")}
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--foreground)] opacity-20" />
            <div className="space-y-8 sm:space-y-12">
              {journey.map((item, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-base sm:text-lg relative z-10" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
                    {item.year}
                  </div>
                  <div className="flex-1 pt-2 sm:pt-3">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-1">
                      {isZh ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-sm sm:text-[15px] opacity-70 leading-relaxed">
                      {isZh ? item.descZh : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <section className="px-4 py-12 xs:py-14 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 text-center transition-all duration-300 hover:scale-[1.01]">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-6">
              {t("contactTitle")}
            </h2>
            <p className="text-base xs:text-lg opacity-70 mb-8 mx-auto max-w-xl">
              {t("contactSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {contacts.map((contact) => (
                <a key={contact.href} href={contact.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium no-underline transition-all duration-300 hover:opacity-80 hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
                  <span className="text-xl">{contact.icon}</span>
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
