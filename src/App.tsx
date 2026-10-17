import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  MapPin,
  GraduationCap,
  Workflow,
  BrainCircuit,
  ShieldCheck,
  Bot,
  Search,
  Layers,
  Database,
  Network,
  Table,
  Globe,
  Webhook,
  Boxes,
  CircleCheck,
} from 'lucide-react';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLE_ICONS = 'https://cdn.simpleicons.org';

type Skill = { name: string; logo?: string; icon?: LucideIcon };

const skillGroups: { title: string; icon: LucideIcon; skills: Skill[] }[] = [
  {
    title: 'Data Engineering & Cloud',
    icon: Workflow,
    skills: [
      { name: 'Snowflake', logo: `${SIMPLE_ICONS}/snowflake` },
      { name: 'AWS (S3)', logo: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: 'Apache Kafka', logo: `${DEVICON}/apachekafka/apachekafka-original.svg` },
      { name: 'Apache Airflow', logo: `${DEVICON}/apacheairflow/apacheairflow-original.svg` },
      { name: 'dbt', icon: Workflow },
      { name: 'JIRA', logo: `${DEVICON}/jira/jira-original.svg` },
      { name: 'Hybrid Search', icon: Search },
      { name: 'RAG', icon: BrainCircuit },
      { name: 'Claude', logo: `${SIMPLE_ICONS}/claude` },
    ],
  },
  {
    title: 'Databases & Storage',
    icon: Database,
    skills: [
      { name: 'MongoDB', logo: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: 'MySQL', logo: `${DEVICON}/mysql/mysql-original.svg` },
      { name: 'PostgreSQL', logo: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: 'Delta Lake / Iceberg', icon: Layers },
      { name: 'Pinecone', icon: Boxes },
      { name: 'Vector Databases', icon: Network },
    ],
  },
  {
    title: 'Languages & Tools',
    icon: Bot,
    skills: [
      { name: 'Python', logo: `${DEVICON}/python/python-original.svg` },
      { name: 'TypeScript', logo: `${DEVICON}/typescript/typescript-original.svg` },
      { name: 'Java', logo: `${DEVICON}/java/java-original.svg` },
      { name: 'SQL', icon: Table },
      { name: 'C', logo: `${DEVICON}/c/c-original.svg` },
      { name: 'PySpark', logo: `${DEVICON}/apachespark/apachespark-original.svg` },
      { name: 'Pydantic', logo: `${SIMPLE_ICONS}/pydantic` },
      { name: 'Docker', logo: `${DEVICON}/docker/docker-original.svg` },
      { name: 'Git', logo: `${DEVICON}/git/git-original.svg` },
      { name: 'Bash/Shell', logo: `${DEVICON}/bash/bash-original.svg` },
      { name: 'REST APIs', icon: Globe },
      { name: 'Webhooks', icon: Webhook },
    ],
  },
];

const experience = [
  {
    company: 'SecondaryLink',
    role: 'Data Engineer (Data Systems)',
    period: 'Mar 2026 – Present',
    location: 'Toronto, ON',
    current: true,
    points: [
      'Architected an event-driven ingestion pipeline using webhooks to capture newly filed Annual accounts from the Luxembourg Business Registry in real time, landing raw files in S3 for instant downstream processing.',
      'Built a multimodal AI-powered pipeline with Pydantic schema validation to parse unstructured PDF reports into standard schemas, expanding fund coverage and driving a 20% subscriber increase.',
      'Optimized a Python bronze-layer pipeline scraping SEC EDGAR filings for 400+ evergreen funds ($1T+ AUM) into MongoDB, hardened with retry logic and schema validation.',
      'Engineered a TypeScript ETL pipeline transforming raw MongoDB filings into normalized MySQL silver schemas and a MongoDB gold layer, extracting returns, NAV per share and other metrics for 2,000+ active subscribers.',
      'Designed an automated data quality and observability layer with quarter-over-quarter anomaly detection and outlier flagging, blocking corrupted metrics from reaching production.',
    ],
    tags: ['Python', 'TypeScript', 'AWS S3', 'Webhooks', 'MongoDB', 'MySQL', 'Pydantic', 'Multimodal AI'],
  },
  {
    company: 'Taxi Media Solutions',
    role: 'Data Engineer',
    period: 'Nov 2025 – Feb 2026',
    location: 'Vaughan, ON',
    points: [
      'Architected an automated batch ETL pipeline orchestrated via cron on a self-hosted server, ingesting 1,000+ monthly Bambora (First Data) payment gateway subscription transactions.',
      'Developed a TypeScript transformation layer to parse raw payment payloads and load normalized, structured billing records into MySQL.',
    ],
    tags: ['TypeScript', 'MySQL', 'Cron', 'Batch ETL'],
  },
  {
    company: 'Royal LePage Signature Realty',
    role: 'Software Engineer Intern',
    period: 'Sep 2024 – Oct 2025',
    location: 'Toronto, ON',
    points: [
      'Engineered a Python/Selenium ETL pipeline to scrape 10,000+ real estate listings, using rotating proxies to get past bot detection and keep extraction highly available.',
      'Built a custom Streamlit dashboard to visualize listing data and fully automate Facebook Marketplace postings.',
      'Generated over $50,000 in direct revenue and facilitated 5+ property sales by accelerating listing velocity and market exposure.',
    ],
    tags: ['Python', 'Selenium', 'Streamlit', 'Web Scraping'],
  },
  {
    company: 'Exceed Robotics',
    role: 'Programming and AI Instructor',
    period: 'Dec 2021 – Feb 2026',
    location: 'Richmond Hill, ON',
    points: [
      'Developed a custom Python/OpenCV library and unit-test suite to standardize the Computer Vision curriculum, reducing setup time by 60%.',
      'Led the technical design of 3 new Computer Vision courses, contributing to a 15% increase in student enrollment.',
      'Mentored students on capstone IoT projects integrating Google Cloud APIs and Raspberry Pi hardware, such as voice-activated assistants.',
    ],
    tags: ['Python', 'OpenCV', 'Google Cloud', 'Raspberry Pi'],
  },
];

const focusAreas = [
  { icon: Workflow, title: 'Data Pipelines', text: 'Great pipelines are boring: idempotent, observable and easy to replay.' },
  { icon: BrainCircuit, title: 'AI & LLM Systems', text: "An LLM is only as useful as it is grounded, validated and measured." },
  { icon: ShieldCheck, title: 'Data Quality', text: 'Bad data is worse than no data. Catch it early, before it reaches production.' },
  { icon: Bot, title: 'Automation', text: "If I've done it twice by hand, it's time to automate it." },
];

const stats = [
  { value: '2,000+', label: 'active subscribers served' },
  { value: '$1T+', label: 'AUM across 400+ funds' },
  { value: '$50K+', label: 'revenue from automation' },
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SMOOTH SCROLL FUNCTION ---
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "https://medium.com/@martin.kamburov", external: true },
  ];

  return (
    <div className="min-h-screen text-slate-800 selection:bg-primary selection:text-white">
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || menuOpen ? 'bg-dark/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent border-b border-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="text-xl font-bold tracking-tight text-white cursor-pointer"
          >
            Martin<span className="text-primary">.</span>Kamburov
          </a>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => !link.external && handleSmoothScroll(e, link.href)}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              Contact
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden p-2 -mr-2 text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="md:hidden max-w-6xl mx-auto px-6 pt-4 pb-2 space-y-1">
            {[...navLinks, { name: "Contact", href: "#contact" }].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => !('external' in link && link.external) && handleSmoothScroll(e, link.href)}
                  {...('external' in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block py-2 text-slate-200 hover:text-white font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-dark">

        {/* --- Ambient Blue Background Effects --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid"></div>
          <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[110px]"></div>
          <div className="absolute top-[30%] left-[35%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px]"></div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-12 items-center">

          {/* Left: Intro */}
          <div className="text-center lg:text-left">
            <p className="reveal text-blue-300 font-medium" style={{ animationDelay: '80ms' }}>
              Hi, I'm Martin Kamburov
            </p>
            <h1 className="reveal mt-3 text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight" style={{ animationDelay: '160ms' }}>
              Data / AI{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-primary">
                Engineer
              </span>
            </h1>
            <p className="reveal mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ animationDelay: '240ms' }}>
              I build event-driven pipelines, ETL systems and AI-powered extraction that turn messy, unstructured data into clean, validated datasets that power real products.
            </p>

            <div className="reveal mt-9 flex flex-wrap justify-center lg:justify-start items-center gap-4" style={{ animationDelay: '320ms' }}>
              <a
                href="#experience"
                onClick={(e) => handleSmoothScroll(e, '#experience')}
                className="group inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                View Experience
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="px-7 py-3 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all border border-white/15 cursor-pointer"
              >
                Get in Touch
              </a>
              <div className="flex gap-2 sm:ml-2">
                <SocialLink dark href="https://github.com/MartinKamburov" icon={<Github size={18} />} label="GitHub" />
                <SocialLink dark href="https://www.linkedin.com/in/martin-kamburov-a906b325b/" icon={<Linkedin size={18} />} label="LinkedIn" />
              </div>
            </div>

            <dl className="reveal mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 pt-8 border-t border-white/10" style={{ animationDelay: '400ms' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</dd>
                  <dd className="mt-1 text-xs md:text-sm text-slate-400 leading-snug">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Photo + pipeline card */}
          <div className="reveal relative flex flex-col items-center lg:items-end" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-sky-400 via-primary to-indigo-600 opacity-60 blur-md"></div>
              <img
                src="/MartinKamburovPic.JPEG"
                alt="Martin Kamburov"
                className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[2rem] object-cover border border-white/10"
              />
              <div className="absolute -top-4 -right-4 sm:-right-8 px-3 py-1.5 rounded-xl bg-dark/80 backdrop-blur-md border border-white/10 text-xs font-medium text-sky-300 shadow-xl animate-float">
                <span className="inline-flex items-center gap-1.5"><BrainCircuit size={14} /> LLMs · RAG</span>
              </div>
            </div>

            <PipelineCard />
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-24 md:py-32 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div>
              <SectionLabel>About</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Turning raw data into reliable, <span className="text-primary whitespace-nowrap">production-grade</span> systems.
              </h2>
              <div className="mt-6 space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  I'm a Data &amp; AI Engineer based in Toronto with a degree in Computer Science from <strong className="text-slate-800">Toronto Metropolitan University</strong>.
                </p>
                <p>
                  I'm really excited about learning new things, and right now what interests me most is where data engineering and AI engineering meet. Every AI system is only as good as the data behind it, and I love working on both sides of that.
                </p>
                <p>
                  If there's one thing I believe above everything else, it's that correct data is the most important thing. A fast pipeline or a clever model doesn't mean much if the numbers are wrong, so I'd rather take the extra time to make sure people can trust what I deliver.
                </p>
                <p>
                  When I'm not building pipelines, you can find me playing basketball, lifting weights, or creating the most random applications.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">B.Sc. (Honours) Computer Science</p>
                  <p className="text-sm text-slate-500">Toronto Metropolitan University · 2021 – 2025</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {focusAreas.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-xl bg-primary text-white shadow-lg shadow-blue-600/30">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="experience" className="py-24 md:py-32 bg-slate-50 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-14 text-center">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Where I've worked</h2>
          </div>

          <ol className="relative border-l border-slate-200 ml-3 space-y-10">
            {experience.map((job) => (
              <li key={job.company} className="pl-8 relative">
                <span className={`absolute -left-[9px] top-7 h-4 w-4 rounded-full border-4 border-slate-50 ${job.current ? 'bg-primary ring-4 ring-primary/20' : 'bg-slate-300'}`}></span>
                <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                      <p className="text-primary font-semibold">{job.company}</p>
                    </div>
                    <div className="sm:text-right text-sm text-slate-500 shrink-0">
                      <p className="font-medium text-slate-700">{job.period}</p>
                      <p className="inline-flex items-center gap-1"><MapPin size={13} /> {job.location}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-slate-600 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section id="skills" className="py-24 md:py-32 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <SectionLabel>Skills</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Technical <span className="text-primary">Toolbox</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map(({ title, icon: Icon, skills }) => (
              <div key={title} className="p-6 md:p-7 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <SkillChip key={skill.name} {...skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-24 bg-slate-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
           <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Portfolio Work</h2>
            <p className="text-slate-600 max-w-xl mx-auto">A selection of my recent work, ranging from web applications and backend services to freelance work that I have done.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="ApplyO"
              description="Applyo is a browser extension/dashboard that helps you stay organized during your job hunt."
              tags={['React', 'Next.js', 'PostgreSQL', 'Tailwind', 'TypeScript']}
              imageUrl="/ApplyoPic.jpg"
              projectUrl="https://www.applyo.tech"
            />
            <ProjectCard
              title="NBA Stat Finder"
              description="A website to view the stats of all NBA players in the 2024-2025 season."
              tags={['Spring Boot', 'React', 'PostgreSQL', 'Tailwind']}
              imageUrl="/PictureOfNbaStatFinderProject.png"
              projectUrl="https://github.com/MartinKamburov/NBA-Stat-Finder"
            />
            <ProjectCard
              title="Real-Estate Listing Automation"
              description="This project scrapes house listings and auto posts them to Facebook Marketplace."
              tags={['Python', 'Selenium']}
              imageUrl="/RealEstateListingsScraper.png"
              projectUrl="https://drive.google.com/file/d/1VF8CzEENIybL2tO_NoWT8nTHMQlKwUWr/view?usp=sharing"
            />
            <ProjectCard
              title="JWT-Auth-Project"
              description="A concise full‑stack starter pack protected by stateless JWT authentication."
              tags={['Spring Boot', 'React', 'PostgreSQL', 'TypeScript']}
              imageUrl="/JwtAuthenticationProject.png"
              projectUrl="https://github.com/MartinKamburov/JWT-Auth-Project"
            />
            <ProjectCard
              title="Privy Tune"
              description="An offline WebGPU powered AI Chatbot, download an LLM completely in the browser."
              tags={['React', 'Typescript', 'Tailwind']}
              imageUrl="/PrivyTunePic.png"
              projectUrl="https://privytune.vercel.app/"
            />
            <ProjectCard
              title="Stock Predictor"
              description="This project predicts any stock that you choose using an LSTM RNN"
              tags={['Python', 'Tensorflow', 'Pandas', 'Numpy']}
              imageUrl="/StockMarketPic.jpg"
              projectUrl="https://github.com/MartinKamburov/StockPredictor"
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="relative py-24 md:py-32 bg-dark text-white overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <SectionLabel dark>Contact</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Let's build something with data.</h2>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed">
            Whether it's a data platform, an AI pipeline, or just a question, my inbox is always open.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <a href="mailto:martinivkamburov@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-600/30">
              <Mail size={20} /> Say Hello
            </a>
            <SocialLink dark href="https://github.com/MartinKamburov" icon={<Github size={20} />} label="GitHub" />
            <SocialLink dark href="https://www.linkedin.com/in/martin-kamburov-a906b325b/" icon={<Linkedin size={20} />} label="LinkedIn" />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 bg-dark border-t border-white/10 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Martin Kamburov. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  )
}

// --- Subcomponents ---

function SectionLabel({ children, dark = false }: { children: React.ReactNode, dark?: boolean }) {
  return (
    <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-sky-400' : 'text-primary'}`}>
      {children}
    </p>
  );
}

function PipelineCard() {
  const stages = [
    { layer: 'Source', detail: 'Webhooks · EDGAR · PDFs', color: 'bg-sky-400/15 text-sky-300' },
    { layer: 'Bronze', detail: 'raw filings → S3 / MongoDB', color: 'bg-amber-700/25 text-amber-400' },
    { layer: 'Silver', detail: 'normalized → MySQL', color: 'bg-slate-300/15 text-slate-200' },
    { layer: 'Gold', detail: 'performance metrics', color: 'bg-yellow-400/15 text-yellow-300' },
  ];

  return (
    <div className="relative mt-8 lg:mt-0 lg:absolute lg:-bottom-14 lg:-left-6 w-full max-w-xs rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
        </div>
        <span className="text-slate-400">fund_pipeline.py</span>
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span> live
        </span>
      </div>
      <ol className="p-4 space-y-2">
        {stages.map((stage, i) => (
          <li key={stage.layer} className="flex items-center gap-3">
            <span className="w-4 text-right text-slate-600">{i + 1}</span>
            <span className={`w-14 shrink-0 text-center py-0.5 rounded-md font-semibold ${stage.color}`}>{stage.layer}</span>
            <span className="text-slate-400 truncate">{stage.detail}</span>
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 text-emerald-400">
        <CircleCheck size={14} /> quality checks passed
      </div>
    </div>
  );
}

function SkillChip({ name, logo, icon: Icon = Boxes }: Skill) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <span className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 shadow-sm hover:border-primary/40 hover:text-slate-900 hover:-translate-y-0.5 transition-all cursor-default">
      {logo && !logoFailed ? (
        <img src={logo} alt="" className="w-5 h-5 object-contain" onError={() => setLogoFailed(true)} />
      ) : (
        <Icon size={18} className="text-primary" />
      )}
      {name}
    </span>
  );
}

function SocialLink({ href, icon, label, dark = false }: { href: string, icon: React.ReactNode, label: string, dark?: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-full transition-all ${dark ? 'bg-white/5 text-slate-300 border border-white/10 hover:bg-primary hover:text-white hover:border-primary' : 'bg-slate-100 text-slate-600 hover:bg-primary hover:text-white'}`}
    >
      {icon}
    </a>
  )
}

function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  projectUrl
}: {
  title: string,
  description: string,
  tags: string[],
  imageUrl: string,
  projectUrl: string
}) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all z-10"></div>
        <img src={imageUrl} alt={title} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-700"
        >
          View Project <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}

export default App;
