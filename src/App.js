import React, { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";

/* ---------------------------------------------
   Static data
--------------------------------------------- */

const LOGOS = [
  { icon: "⬡", name: "Node Scalability Enterprise" },
  { icon: "⚛", name: "Advanced React Core" },
  { icon: "🛡", name: "CyberSec Enterprise" },
  { icon: "aws", name: "Amazon Web Services" },
  { icon: "🐍", name: "AI Engine Architecture" },
  { icon: "◆", name: "Cognitive Compute" },
];

const SERVICES = [
  {
    icon: "🖥️",
    title: "Website Development",
    desc: "Custom interactive high-fidelity portals, premium enterprise landing pages, complex headless e-commerce structures, and modern WebGL platforms optimized for speed.",
    tags: ["NEXT.JS", "REACT"],
  },
  {
    icon: "🧩",
    title: "SaaS Product Engineering",
    desc: "Architecting multi-tenant cloud subscription software, advanced analytics consoles, secure database infrastructure, and robust API scaling structures.",
    tags: ["NODE", "AWS", "SERVERLESS"],
  },
  {
    icon: "🤖",
    title: "AI Tools & Agents",
    desc: "Custom LLM pipelines, autonomous multi-agent decision systems, advanced RAG data lookup integrations, cognitive text processing engines, and analytics.",
    tags: ["GEMINI", "LLM", "RAG"],
  },
  {
    icon: "🔀",
    title: "AI Workflows & CRM",
    desc: "Streamline lead distribution pipelines, dynamic custom ERP syncing mechanisms, automate scheduling systems, and eliminate manual redundant data entries.",
    tags: ["AUTOMATION", "CRM"],
  },
  {
    icon: "💬",
    title: "WhatsApp Automations",
    desc: "Implement automated conversational WhatsApp support funnels, transactional notification bots, lead acquisition pathways, and instant response agents.",
    tags: ["API INTEGRATION"],
  },
  {
    icon: "🎯",
    title: "Branding & Growth",
    desc: "Next-level UI/UX brand guidelines, comprehensive conversion rate optimizations, automated high-converting ad engines, and performance scaling models.",
    tags: ["GROWTH", "UI/UX"],
  },
];

const WHY_US = [
  {
    icon: "🧠",
    title: "AI-First Core Architecture",
    desc: "We do not simply patch standard templates with basic chatbots. We architect native, advanced cognitive structures directly into your application framework using top-tier LLM workflows, automated vector stores, and custom semantic data layers.",
    footer: { label: "Live Token Flow", meta: "latency: 32ms" },
  },
  {
    icon: "🔓",
    title: "Fortress Security",
    desc: "Every system is engineered with elite-level security audits, robust OAuth2 standards, end-to-end data encryption layers, and routine penetration checks.",
    footer: { label: "ISO/IEC 27001 Compliant Architectures", meta: null },
  },
];

const ARCHITECTURES = [
  { id: "web", title: "Web / E-Commerce Dev", sub: "Premium UX & Scale", base: [5000, 9000], timeline: "3 - 5 Weeks" },
  { id: "saas", title: "Custom SaaS Platform", sub: "Multi-Tenant Dashboard", base: [15000, 25000], timeline: "8 - 12 Weeks" },
  { id: "ai", title: "AI Agents & Workflow Automation", sub: "Complex Automated Pipelines", base: [8000, 15000], timeline: "4 - 6 Weeks" },
  { id: "mobile", title: "Mobile Application", sub: "iOS & Android Frameworks", base: [15000, 28000], timeline: "6 - 10 Weeks" },
];

const ADDONS = [
  { id: "chatbot", title: "Autonomous LLM Chatbot Integration", desc: "Smart RAG customer assistant answering custom knowledge documents", price: 2500 },
  { id: "whatsapp", title: "WhatsApp API Bot Flow", desc: "Complete automated client acquisition and notifications via WhatsApp API", price: 3500 },
  { id: "crm", title: "Advanced CRM/ERP Dynamic Syncing", desc: "Automate lead data pushing and financial records synchronization", price: 2000 },
];

const SCALE_LEVELS = [
  { label: "Startup / MVP", mult: 1 },
  { label: "Mid-Market Expansion", mult: 1.25 },
  { label: "Enterprise High-Load", mult: 1.6 },
];

const AUTOMATION_FLOWS = {
  whatsapp: {
    tabLabel: "WHATSAPP FLOW",
    steps: [
      { icon: "⇥", color: "text-emerald-600 bg-emerald-100", title: "WhatsApp Lead Inbound", sub: "User queries pricing info" },
      { icon: "🤖", color: "text-cyan-600 bg-cyan-100", title: "AI Processing Hub", sub: "Classifies intent & extracts details" },
      { icon: "💬", color: "text-blue-600 bg-blue-100", title: "Automated Answer", sub: "Dispatches customized catalog" },
      { icon: "🗄️", color: "text-fuchsia-600 bg-fuchsia-100", title: "CRM System Updated", sub: "Auto logs lead & schedules follow-up" },
    ],
  },
  crm: {
    tabLabel: "CRM FUNNEL",
    steps: [
      { icon: "📥", color: "text-emerald-600 bg-emerald-100", title: "Lead Captured", sub: "Form or ad submission synced instantly" },
      { icon: "🧠", color: "text-cyan-600 bg-cyan-100", title: "AI Qualification", sub: "Scores and segments lead automatically" },
      { icon: "🗂️", color: "text-blue-600 bg-blue-100", title: "CRM Record Created", sub: "Pushes contact & deal stage to CRM" },
      { icon: "📅", color: "text-fuchsia-600 bg-fuchsia-100", title: "Follow-Up Scheduled", sub: "Auto-assigns rep & sets reminder" },
    ],
  },
};

const TIMELINE_STEPS = [
  { num: "01", title: "Architectural Discovery & Audit", desc: "We deep dive into your business metrics, existing tools infrastructure, and workflow bottlenecks to frame a blueprint." },
  { num: "02", title: "High-Fidelity Prototyping", desc: "Our elite designers construct absolute wireframes and fully realized design mockups aligning with high-tech startup aesthetics." },
  { num: "03", title: "Development & Custom AI Layering", desc: "We construct the logic using optimized React/Next platforms and integrate serverless cloud modules, LLMs, and API channels." },
  { num: "04", title: "Quality Assurance & Dynamic Scaling", desc: "Rigorous speed optimization checks, mobile viewport compliance tests, penetration tests, and secure launch scaling cycles." },
];

const PROJECTS = [
  {
    status: "deployed_production",
    tags: ["FINTECH", "SAAS"],
    year: "Launched 2025",
    name: "FinTech Core AI Platform",
    sub: "Multi-Tenant Automated Financial Advisor Console",
    title: "AlphaAdvisor SaaS",
    desc: "Architected custom RAG models syncing massive economic financial data streams. Cut advisory manual report cycles from 4 hours to just 90 seconds.",
  },
  {
    status: "active_integration",
    tags: ["AUTOMATION", "CRM"],
    year: "Launched 2026",
    name: "Omnichannel WhatsApp Agent",
    sub: "AI-Powered Real Estate Automations Engine",
    title: "ApexRent CRM Automations",
    desc: "Automated lead generation, matching, and WhatsApp booking procedures. Generated over 14,000 automated scheduled visits without a single customer support staff hire.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SyntaxLion completely changed how we handle inbound client queries. The WhatsApp AI agent integration they developed qualifies 24/7, routing warm leads directly to our representatives. Our conversions increased by 42% in just two months!",
    initials: "DK",
    name: "Daniel K.",
    title: "VP of Growth, ApexRent Ltd",
    ring: "bg-emerald-100 text-emerald-700",
  },
  {
    quote:
      "The multi-tenant SaaS architecture build was absolute perfection. SyntaxLion's clean Next.js patterns and reliable cloud deployment enabled us to pass rigorous security validation checks with enterprise clients on our first attempt.",
    initials: "SM",
    name: "Sophia M.",
    title: "Chief Technical Officer, AlphaAdvisor",
    ring: "bg-blue-100 text-blue-700",
  },
  {
    quote:
      "Our CRM integration used to require massive spreadsheet migrations. Their automated node pipelines now route invoices, trigger slack updates, and push database records seamlessly. Incredible precision code.",
    initials: "HJ",
    name: "Harvey J.",
    title: "Founder, NexaChain Systems",
    ring: "bg-violet-100 text-violet-700",
  },
];

const FAQS = [
  {
    q: "What exactly is an \u201cAI-First\u201d architecture?",
    a: "Conventional platforms patch basic template sites with third-party iframe chatbots. SyntaxLion architectures are natively engineered from the ground up for cognitive workloads. This means custom vector storage layers, dynamic Retrieval-Augmented Generation (RAG) loops, intelligent LLM agent routing, and asynchronous webhook pipelines built into clean Next.js server actions.",
  },
  {
    q: "How do you guarantee scalability during traffic spikes?",
    a: "We design around serverless functions on AWS and decoupled multi-tenant databases. Together with smart Redis caching algorithms and edge state hydration, your platforms can instantly handle millions of concurrent operations without lag.",
  },
  {
    q: "Can you integrate with our existing legacy CRM/ERP systems?",
    a: "Yes. We build custom secure API middleware orchestration layers that map, convert, and stream data smoothly between modern LLM endpoints and closed systems such as Salesforce, HubSpot, SAP, or legacy SQL databases. All data flows securely with end-to-end encryption.",
  },
  {
    q: "How does the Project Configurator pricing work?",
    a: "Our interactive calculator compiles a transparent scope baseline. By choosing the core project type, layering specific automations, and configuring scalability metrics, you get an accurate cost range. This helps prevent scope creep and accelerates contract deployment.",
  },
  {
    q: "What post-launch maintenance guarantees do you provide?",
    a: "Every engagement ships with a 30-day maintenance guarantee covering bug fixes, security patches, and minor adjustments, with extended retainer plans available for ongoing support.",
  },
];

/* ---------------------------------------------
   Small shared components
--------------------------------------------- */

function GradientButton({ children, className = "", ...props }) {
  return (
    <a
      href="#pricing-configurator" className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-400 hover:opacity-90 transition shadow-lg shadow-violet-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

function SectionEyebrow({ children }) {
  return (
    <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3 text-center">
      {children}
    </p>
  );
}

/* ---------------------------------------------
   Navbar
--------------------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Services", "Why Choose Us", "Pricing Configurator", "AI Workflows", "Projects", "Testimonials", "FAQ"];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-extrabold text-lg text-slate-900">
          Syntax<span className="text-violet-600">Lion</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-slate-600 hover:text-violet-600 transition"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#pricing-configurator" className="text-sm font-semibold border border-slate-300 rounded-lg px-4 py-2.5 hover:border-violet-400 transition">
            ESTIMATE PROJECT
          </a>
          <GradientButton className="text-sm px-5 py-2.5">
            GET STARTED →
          </GradientButton>
        </div>

        <button className="lg:hidden flex flex-col gap-1.5" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="w-6 h-0.5 bg-slate-900" />
          <span className="w-6 h-0.5 bg-slate-900" />
          <span className="w-6 h-0.5 bg-slate-900" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 px-6 py-4 flex flex-col gap-4 bg-white">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <GradientButton className="text-sm w-full">GET STARTED →</GradientButton>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------
   Hero
--------------------------------------------- */

function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            NEXT-GEN AI TRANSFORMATION
          </span>

          <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] text-slate-900 mb-6">
            Engineering The{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Future With AI
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mb-8">
            We build elite, custom-tailored AI-powered websites, custom
            enterprise software, multi-tenant SaaS architectures, complex
            workflow automations, and intelligent chatbot systems.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 bg-white shadow-sm">
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-semibold text-sm text-slate-900">AI-Powered Solutions</p>
                <p className="text-xs text-slate-500">Fully Automated</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 bg-white shadow-sm">
              <span className="text-xl">💎</span>
              <div>
                <p className="font-semibold text-sm text-slate-900">Premium Codebase</p>
                <p className="text-xs text-slate-500">Apple-Grade Optimization</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <GradientButton>LAUNCH PROJECT CONFIGURATOR 📄</GradientButton>
            <a href="#services" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold border border-slate-300 hover:border-violet-400 transition">
              EXPLORE SERVICES
            </a>
          </div>
        </div>

        <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <span className="absolute -top-3 right-6 text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-400 text-white rounded-full px-3 py-1">
            LION CORE V3.0
          </span>
          <div className="flex items-center justify-center h-48 text-7xl"> </div>
          <div className="border-t border-slate-200 pt-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-sm text-slate-900">System Diagnostics</p>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ONLINE
              </span>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-emerald-400 space-y-1">
              <p>&gt; initializing quantum neural s_lion_core</p>
              <p>&gt; active logo gradient nodes: 42</p>
              <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-violet-500 to-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-10 overflow-hidden">
        <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
          Powering Digital Ecosystems Globally
        </p>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="flex items-center gap-2 mx-8 text-slate-500 font-semibold text-sm shrink-0">
              <span>{l.icon}</span> {l.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Services
--------------------------------------------- */

function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionEyebrow>Enterprise Architecture</SectionEyebrow>
        <h2 className="text-4xl font-black text-center text-slate-900 mb-4">Elite Service Suite</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-14">
          Explore our meticulously calibrated suite of digital transformation
          services designed for visionary brands seeking hyper-scale growth.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="border border-slate-200 rounded-2xl p-7 bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-xl mb-5">
                {s.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-xs font-bold text-cyan-600 space-x-1">
                  {s.tags.join(" / ")}
                </span>
                <span className="text-sm font-semibold text-slate-900">Configure ›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Why Choose Us
--------------------------------------------- */

function WhyUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionEyebrow>Why SyntaxLion</SectionEyebrow>
        <h2 className="text-4xl font-black text-center text-slate-900 mb-4">Engineered For Domination</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-14">
          Discover the architectural differences that elevate SyntaxLion from
          conventional IT shops to a world-class AI digital titan.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {WHY_US.map((w) => (
            <div key={w.title} className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-xl mb-5">
                {w.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">{w.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{w.desc}</p>

              {w.footer.meta ? (
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-emerald-400">
                  <div className="flex justify-between text-slate-400 mb-2">
                    <span>{w.footer.label}</span>
                    <span>{w.footer.meta}</span>
                  </div>
                  <p>&gt; Prompt matching success: 99.8%</p>
                  <p>&gt; user_token_usage: 1.4M / 2.0M absolute daily limits</p>
                </div>
              ) : (
                <p className="text-xs font-bold text-cyan-600">🛡 {w.footer.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Pricing Configurator (interactive)
--------------------------------------------- */

function PricingConfigurator() {
  const [archId, setArchId] = useState("mobile");
  const [addons, setAddons] = useState({ chatbot: true, whatsapp: true, crm: true });
  const [scaleIdx, setScaleIdx] = useState(0);

  const arch = ARCHITECTURES.find((a) => a.id === archId);

  const { low, high } = useMemo(() => {
    const addonSum = ADDONS.reduce((sum, a) => (addons[a.id] ? sum + a.price : sum), 0);
    const mult = SCALE_LEVELS[scaleIdx].mult;
    return {
      low: Math.round((arch.base[0] + addonSum) * mult),
      high: Math.round((arch.base[1] + addonSum) * mult),
    };
  }, [arch, addons, scaleIdx]);

  const fmt = (n) => `$${n.toLocaleString()}`;

  return (
    <section id="pricing-configurator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionEyebrow>Interactive Calculator</SectionEyebrow>
        <h2 className="text-4xl font-black text-center text-slate-900 mb-4">Configure Your Architecture</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-14">
          Design your ideal scope, toggle modular service layers, and generate
          a transparent technical execution estimate.
        </p>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 border border-slate-200 rounded-2xl p-8 bg-slate-50">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-4">1. Select Core Architectural Focus</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {ARCHITECTURES.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setArchId(a.id)}
                  className={`text-left rounded-xl border p-4 transition ${archId === a.id
                    ? "border-cyan-400 bg-cyan-50 ring-1 ring-cyan-300"
                    : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${archId === a.id ? "border-cyan-500 bg-cyan-500" : "border-slate-300"
                        }`}
                    />
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{a.title}</p>
                      <p className="text-xs text-slate-500">{a.sub}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="font-bold text-lg text-slate-900 mb-4">2. Layer Custom AI Integrations</h3>
            <div className="space-y-3 mb-8">
              {ADDONS.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 cursor-pointer hover:border-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addons[a.id]}
                      onChange={() => setAddons((p) => ({ ...p, [a.id]: !p[a.id] }))}
                      className="w-4 h-4 accent-cyan-500"
                    />
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{a.title}</p>
                      <p className="text-xs text-slate-500">{a.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-cyan-600 whitespace-nowrap">+${a.price.toLocaleString()}</span>
                </label>
              ))}
            </div>

            <h3 className="font-bold text-lg text-slate-900 mb-2">3. Platform Complexity / Scale</h3>
            <p className="text-sm text-slate-500 mb-5">
              Higher scalability demands complex load-balancing, cache structures, and database distribution models.
            </p>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={scaleIdx}
              onChange={(e) => setScaleIdx(Number(e.target.value))}
              className="w-full accent-cyan-500 mb-3"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              {SCALE_LEVELS.map((s, i) => (
                <span key={s.label} className={i === scaleIdx ? "text-cyan-600" : ""}>
                  {s.label.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-8 h-fit sticky top-24">
            <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-4">Live Proposal Estimate</p>
            <p className="text-xs text-slate-400 mb-1">Estimated Price Range</p>
            <p className="text-4xl font-black mb-1">
              {fmt(low)} <span className="text-slate-500 font-normal">–</span>
            </p>
            <p className="text-4xl font-black mb-4">{fmt(high)}</p>
            <p className="text-xs text-slate-400 mb-6">Pricing dynamically tailored based on configurations</p>

            <div className="space-y-3 text-sm border-t border-slate-700 pt-5 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Core Architectural Framework</span>
                <span className="font-semibold">{arch.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Approximate Launch Timeline</span>
                <span className="font-semibold text-cyan-400">{arch.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Maintenance Guarantee Included</span>
                <span className="font-semibold">30 Days</span>
              </div>
            </div>

            <GradientButton className="w-full">LOCK IN THIS ESTIMATE 📄</GradientButton>
            <p className="text-[11px] text-slate-500 text-center mt-3">
              Estimates are transparent projections and include detailed architectural layouts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Visualized Automations (interactive flow simulator)
--------------------------------------------- */

function VisualizedAutomations() {
  const [tab, setTab] = useState("whatsapp");
  const [activeStep, setActiveStep] = useState(-1);
  const [simulating, setSimulating] = useState(false);

  const steps = AUTOMATION_FLOWS[tab].steps;

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setActiveStep(0);
    steps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), i * 650);
    });
    setTimeout(() => {
      setActiveStep(-1);
      setSimulating(false);
    }, steps.length * 650 + 500);
  };

  return (
    <section id="live-simulation-sandbox" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3 text-center">
          Live Flow Visualizer
        </p>
        <h2 className="text-4xl font-black text-center mb-4">Visualized Automations</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-14">
          Watch how our intelligent AI Agent flows capture, filter, trigger,
          and synchronize business data in real time without human friction.
        </p>

        <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50 shadow-sm">
          {/* header row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-slate-600 uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Active Simulation Sandbox
            </span>
            <div className="flex gap-3">
              {Object.entries(AUTOMATION_FLOWS).map(([key, flow]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTab(key);
                    setActiveStep(-1);
                  }}
                  className={`text-xs font-bold tracking-wide rounded-lg px-4 py-2 border transition ${tab === key
                    ? "border-cyan-400 text-cyan-700 bg-cyan-50"
                    : "border-slate-300 text-slate-500 bg-white hover:border-slate-400"
                    }`}
                >
                  {flow.tabLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 mb-8" />

          {/* steps — always a single left-to-right row, scrolls on narrow screens */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-stretch gap-0 min-w-[760px] lg:min-w-0">
              {steps.map((s, i) => (
                <React.Fragment key={s.title}>
                  <div
                    className={`flex-1 rounded-xl border p-6 text-center bg-white transition-all duration-300 ${activeStep === i
                      ? "border-cyan-400 bg-cyan-50 shadow-lg shadow-cyan-200 scale-[1.03]"
                      : "border-slate-200"
                      }`}
                  >
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-4 ${s.color}`}>
                      {s.icon}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-500">{s.sub}</p>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="flex items-center justify-center px-2 flex-shrink-0">
                      <span className={`text-xl transition-colors ${activeStep === i ? "text-cyan-500" : "text-slate-300"}`}>
                        →
                      </span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* trigger bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 mt-8 pt-6">
            <p className="font-mono text-xs text-slate-500">
              Click trigger simulation to dispatch glowing flow signal package:
            </p>
            <GradientButton onClick={handleSimulate} disabled={simulating} className={simulating ? "opacity-70 cursor-wait" : ""}>
              {simulating ? "DISPATCHING…" : "SIMULATE SIGNAL DISPATCHED ▶"}
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Workflow Timeline
--------------------------------------------- */

function WorkflowTimeline() {
  return (
    <section id="ai-workflows" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">Workflow Blueprint</p>
          <h2 className="text-4xl font-black text-slate-900 mb-10">Mechanical Execution Timeline</h2>

          <div className="space-y-8">
            {TIMELINE_STEPS.map((s, i) => (
              <div key={s.num} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-full bg-white border-2 border-cyan-400 text-cyan-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {s.num}
                  </span>
                  {i < TIMELINE_STEPS.length - 1 && <span className="w-px flex-1 bg-slate-300 my-1" />}
                </div>
                <div className="pb-2">
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-10 text-center sticky top-24">
          <h3 className="font-bold text-xl mb-2">Our Technology Ecosystem</h3>
          <p className="text-sm text-slate-400 mb-10 max-w-xs mx-auto">
            We leverage top-tier framework technology patterns to build scalable enterprise apps.
          </p>

          {/* Orbit visual */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* dashed orbit ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-700" />

            {/* rotating layer holding the 4 icons */}
            <div className="absolute inset-0 animate-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="animate-orbit-reverse w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 text-lg">
                  ⚙️
                </div>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                <div className="animate-orbit-reverse w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 text-lg">
                  ⬡
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="animate-orbit-reverse w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-fuchsia-400 text-lg">
                  ✦
                </div>
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
                <div className="animate-orbit-reverse w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-300 text-lg">
                  ✳
                </div>
              </div>
            </div>

            {/* center icon, stays fixed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">
                {"</>"}
              </div>
            </div>
          </div>

          {/* tech tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["NEXT.JS 15", "DOCKER", "OPENAI / GEMINI", "TAILWIND CSS"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-semibold tracking-wide text-slate-300 border border-slate-700 rounded-md px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Featured Projects
--------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionEyebrow>Selected Works</SectionEyebrow>
        <h2 className="text-4xl font-black text-center text-slate-900 mb-4">Featured Architectures</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-14">
          Explore premium digital deployments that yielded high user
          retention rates, operational savings, and digital transformations.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p) => (
            <div key={p.title} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <div className="bg-slate-900 text-white p-8">
                <p className="font-mono text-xs text-emerald-400 mb-6">&gt; status: {p.status}</p>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-slate-400">{p.sub}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-bold mb-3">
                  <span className="text-cyan-600">{p.tags.join(" / ")}</span>
                  <span className="text-slate-400">↺ {p.year}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Testimonials
--------------------------------------------- */

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3 text-center">
          Global Partner Validation
        </p>
        <h2 className="text-4xl font-black text-center mb-14">Trust In Action</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="border border-slate-200 rounded-2xl p-7 bg-slate-50 flex flex-col justify-between shadow-sm"
            >
              <p className="italic text-slate-600 leading-relaxed mb-8">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${t.ring}`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   FAQ (accordion)
--------------------------------------------- */

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionEyebrow>Client Intelligence Hub</SectionEyebrow>
        <h2 className="text-4xl font-black text-center text-slate-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-slate-600 mb-14">
          Clear parameters, technical transparency, and operational protocols decoded.
        </p>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <span className={`text-xl flex-shrink-0 transition-colors ${isOpen ? "text-fuchsia-500" : "text-cyan-500"}`}>
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Contact / Consultation form
--------------------------------------------- */

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        setStatus("sent");
        e.target.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="border border-slate-200 rounded-2xl p-8 sm:p-10 bg-slate-50">
          <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">
            Start Your Consultation
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold tracking-wide text-slate-500 uppercase mb-2">
                Company / Project Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Acme Tech Labs"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wide text-slate-500 uppercase mb-2">
                Corporate Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. daniel@acmetech.io"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wide text-slate-500 uppercase mb-2">
                Brief Architecture Overview
              </label>
              <textarea
                rows="4"
                name="message"
                placeholder="Hello, I'd like to book a consultation..."
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <GradientButton type="submit" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? "SENDING…" : "INITIATE CONSULTATION REQUEST →"}
            </GradientButton>

            {status === "sent" && (
              <p className="text-sm text-emerald-600 text-center font-semibold">
                ✓ Thanks! Your consultation request has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 text-center font-semibold">
                Something went wrong — please try again or email us directly.
              </p>
            )}

            <p className="text-xs text-slate-400 text-center">
              Leo, our virtual architect, processes all submissions dynamically.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Footer
--------------------------------------------- */

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg text-white mb-4">
            <span className="text-2xl"></span>SyntaxLion
          </div>
          <p className="text-sm text-slate-400 mb-5">
            SyntaxLion designs and architects elite multi-tenant enterprise
            software, automation systems, and high-tech digital transformations.
          </p>
          <div className="flex gap-4 text-lg">
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-4">Architectures</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            {["Website Development", "Custom Enterprise SaaS", "AI Custom Agents & RAG", "WhatsApp Automations", "CRM/ERP Implementations"].map(
              (item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-cyan-400 transition">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-4">Ecosystem</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <a href="#why-choose-us" className="hover:text-cyan-400 transition">Why Choose Us</a>
            </li>
            <li>
              <a href="#pricing-configurator" className="hover:text-cyan-400 transition">Pricing Configurator</a>
            </li>
            <li>
              <a href="#live-simulation-sandbox" className="hover:text-cyan-400 transition">Live Simulation Sandbox</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-cyan-400 transition">Case Studies</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-4">Weekly Intelligence Brief</h4>
          <p className="text-sm text-slate-400 mb-4">
            Subscribe to receive tech architecture blueprints and AI execution recipes.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button className="rounded-lg bg-gradient-to-r from-violet-600 to-cyan-400 px-4 py-2 text-sm font-semibold text-white">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SyntaxLion - Daksh Global Innovations Pvt Ltd.. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Privacy Charter</span>
          <span>Terms of Service</span>
          <span>SLA Agreement</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------
   App
--------------------------------------------- */

function App() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <PricingConfigurator />
      <VisualizedAutomations />
      <WorkflowTimeline />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;