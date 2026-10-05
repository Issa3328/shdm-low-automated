import { useState, useEffect, useRef } from "react";

const Svg = ({ className, style, children, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style} {...p}>{children}</svg>
);
const HomeIcon     = (p) => <Svg {...p}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Svg>;
const ChevronRight = (p) => <Svg {...p}><path d="m9 18 6-6-6-6"/></Svg>;
const Loader2      = (p) => <Svg {...p}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></Svg>;
const Zap          = (p) => <Svg {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></Svg>;
const CheckCircle  = (p) => <Svg {...p}><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></Svg>;
const Eye          = (p) => <Svg {...p}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></Svg>;
const Settings     = (p) => <Svg {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></Svg>;
const Database     = (p) => <Svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></Svg>;
const Cpu          = (p) => <Svg {...p}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></Svg>;

const SUPABASE_URL      = "https://iljzwxwopxuzpgkjivmn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KEoCJtCLyGTJjqB1phGy2Q_v3PftUYH";
const FLOW              = "low_automated";

const MODE_LABEL = "Info: Low · Control: Automated";
const VISIBILITY = "low";
const AUTOMATION = "automated";

const ALL_OFFERS = [
  { id:"1", name:"Pizza Meal",       description:"2 Large Pizzas (Margherita & Pepperoni), 2 Pops, Large Fries",       price:"$24.99", originalPrice:"$32.99", icon:"🍕", matchScore:95, reasons:["Perfect for 2 people","Popular at dinner time","Matches past orders"],    nutritionInfo:"~1800 cal", category:"Food"    },
  { id:"2", name:"Burger Combo",     description:"2 Gourmet Burgers, 2 Seasoned Fries, 2 Soft Drinks",                price:"$18.99", originalPrice:"$24.99", icon:"🍔", matchScore:92, reasons:["Quick delivery","Budget-friendly","High ratings"],                         nutritionInfo:"~1400 cal", category:"Food"    },
  { id:"3", name:"Chinese Dinner",   description:"Fried Rice (Large), Chow Mein, 6 Spring Rolls, 2 Entrees",          price:"$32.99", originalPrice:"$38.99", icon:"🥡", matchScore:88, reasons:["Variety for sharing","Matches dietary preferences","Free fortune cookies"],nutritionInfo:"~2000 cal", category:"Food"    },
  { id:"4", name:"Pasta Bowl",       description:"Large Pasta Bowl (Alfredo or Marinara), Garlic Bread, Caesar Salad",price:"$16.99", originalPrice:"$21.99", icon:"🍝", matchScore:85, reasons:["Comfort food","Vegetarian option","Quick prep time"],                      nutritionInfo:"~1200 cal", category:"Food"    },
  { id:"5", name:"Climate Control",  description:"Smart temperature optimization service",                              price:"$12.99", originalPrice:"$19.99", icon:"🏡", matchScore:90, reasons:["Saves energy","Perfect comfort","Auto-scheduling"],                       category:"Home"    },
  { id:"6", name:"Smart Lighting",   description:"Automated lighting based on presence",                               price:"$9.99",  originalPrice:"$15.99", icon:"💡", matchScore:85, reasons:["Energy efficient","Mood lighting","Schedule-based"],                      category:"Home"    },
  { id:"7", name:"Fitness Class",    description:"Virtual personal training session",                                  price:"$15.99", originalPrice:"$24.99", icon:"💪", matchScore:88, reasons:["Personalized workout","Flexible timing","Expert guidance"],                category:"Wellness"},
  { id:"8", name:"Yoga Session",     description:"Guided meditation and stretching",                                   price:"$19.99", originalPrice:"$29.99", icon:"🧘", matchScore:94, reasons:["Stress relief","Evening relaxation","Beginner-friendly"],                  category:"Wellness"},
  { id:"9", name:"Smart Treadmill",  description:"Smart treadmill with performance tracking",                          price:"$899.99",originalPrice:"$1199.99",icon:"🏃", matchScore:91, reasons:["Home fitness","Space-saving design","Built-in programs"],                  category:"Wellness"},
  { id:"10",name:"Yoga Mat Set",     description:"Premium mat with blocks and strap",                                  price:"$49.99", originalPrice:"$79.99", icon:"🧘", matchScore:86, reasons:["Complete starter kit","Non-slip surface","Eco-friendly"],                  category:"Wellness"},
  { id:"11",name:"Resistance Bands", description:"Set of 5 resistance levels with door anchor",                        price:"$29.99", originalPrice:"$44.99", icon:"💪", matchScore:95, reasons:["Versatile workouts","Compact storage","Full-body training"],               category:"Wellness"},
];

const ACQ_CATS = [
  { id:"sensors",   label:"Home Sensors"     },
  { id:"behavior",  label:"Behavior Patterns"},
  { id:"purchases", label:"Purchase History" },
];
const PROC_CATS = [
  { id:"food",     label:"Food Services"    },
  { id:"home",     label:"Home Services"    },
  { id:"wellness", label:"Wellness Services"},
];
const DEFAULT_ACQ  = { sensors:true, behavior:true, purchases:true };
const DEFAULT_PROC = { food:true,    home:true,     wellness:true };

const TASKS = [
  { id:1, label:"Task 1", short:"Configure Data Collection",
    desc:"Go to Privacy Settings, Data Collection tab. Review and customize the types of data this system is allowed to collect about you. Adjust the settings to match your preferences and click to apply your changes." },
  { id:2, label:"Task 2", short:"Configure Data Use",
    desc:"Go to Data Usage tab. Review and configure how your data may be used. Adjust the settings to match your preferences and click to apply your changes." },
  { id:3, label:"Task 3", short:"Select an Offer",
    desc:"Browse the available offers across three categories: Food, Home, and Wellness. Select the one offer that best matches your preferences." },
  { id:4, label:"Task 4", short:"Place Your Order",
    desc:"Review the order summary based on the offer you selected. When you are ready, confirm your order to place it." },
];

/* ---- SHDM study UI: task prompt, mobile layout, completion message ---- */
if (typeof document !== "undefined" && !document.getElementById("shdm-ux")) {
  const st = document.createElement("style");
  st.id = "shdm-ux";
  st.textContent = `
.shdm-taskbar { background:#1e1b4b; color:#e0e7ff; }
.shdm-tb-inner { display:flex; align-items:flex-start; gap:16px; padding:18px 260px 18px 24px; }
.shdm-tb-num { width:40px; height:40px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center;
  background:rgba(99,102,241,0.25); border:1.5px solid rgba(99,102,241,0.6); font-size:17px; font-weight:700; color:#c7d2fe; }
.shdm-tb-body { flex:1; min-width:0; max-width:820px; }
.shdm-tb-head { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#a5b4fc; margin:0 0 4px; }
.shdm-tb-title { font-size:20px; font-weight:600; line-height:1.3; color:#ffffff; margin:0 0 8px; }
.shdm-tb-lines { margin:0; padding:0 0 0 20px; list-style:disc; font-size:16px; line-height:1.55; color:#e0e7ff; }
.shdm-tb-lines li { margin:0 0 4px; }
.shdm-tb-progress { height:4px; background:rgba(255,255,255,0.08); }
.shdm-tb-progress > div { height:100%; background:linear-gradient(90deg,#6366f1,#818cf8); transition:width .4s ease; }
.shdm-badge { position:fixed; top:12px; right:12px; z-index:50; }
.shdm-main { min-width:0; }
.shdm-done { position:fixed; inset:0; z-index:1000; display:flex; align-items:center; justify-content:center; padding:24px;
  background:rgba(17,24,39,0.72); }
.shdm-done-card { width:100%; max-width:600px; background:#fff; border-radius:16px; padding:44px 40px; text-align:center;
  box-shadow:0 25px 50px -12px rgba(0,0,0,0.45); }
.shdm-done-check { width:84px; height:84px; border-radius:50%; background:#16a34a; color:#fff; display:flex; align-items:center;
  justify-content:center; margin:0 auto 24px; }
.shdm-done-title { font-size:32px; line-height:1.2; font-weight:700; color:#111827; margin:0 0 16px; }
.shdm-done-text { font-size:21px; line-height:1.5; color:#1f2937; margin:0 0 12px; }
.shdm-done-hint { font-size:16px; line-height:1.5; color:#6b7280; margin:0; }
@media (max-width: 767px) {
  .shdm-root { flex-direction:column !important; }
  .shdm-sidebar { display:none !important; }
  .shdm-badge { position:static; order:-1; display:flex; justify-content:flex-end; padding:8px 12px; background:#fff; border-bottom:1px solid #e5e7eb; }
  .shdm-tb-inner { gap:12px; padding:14px 16px; }
  .shdm-tb-num { width:32px; height:32px; font-size:15px; }
  .shdm-tb-head { font-size:12px; }
  .shdm-tb-title { font-size:18px; margin-bottom:6px; }
  .shdm-tb-lines { font-size:15px; line-height:1.5; padding-left:18px; }
  .shdm-cat-head { flex-wrap:wrap; row-gap:10px; }
  .shdm-cat-head > :first-child { flex-basis:100%; min-width:0; }
  .shdm-cat-actions { margin-left:auto !important; flex-direction:row !important; align-items:center !important; gap:8px !important; }
  .shdm-cat-name { flex-wrap:wrap; }
  .shdm-done-card { padding:32px 22px; }
  .shdm-done-check { width:68px; height:68px; margin-bottom:18px; }
  .shdm-done-title { font-size:26px; }
  .shdm-done-text { font-size:19px; }
}
`;
  document.head.appendChild(st);
}

function StudyTaskBar({ sidebarVisible, currentTask }) {
  if (!sidebarVisible || currentTask >= TASKS.length) return null;
  const t = TASKS[currentTask];
  const lines = (t.desc.match(/[^.]+\.?/g) || [t.desc]).map(s => s.trim()).filter(Boolean);
  return (
    <div className="shdm-taskbar" role="region" aria-label="Current task">
      <div className="shdm-tb-inner">
        <div className="shdm-tb-num">{currentTask + 1}</div>
        <div className="shdm-tb-body">
          <p className="shdm-tb-head">{t.label} of {TASKS.length}</p>
          <p className="shdm-tb-title">{t.short}</p>
          <ul className="shdm-tb-lines">
            {lines.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </div>
      </div>
      <div className="shdm-tb-progress"><div style={{ width: `${((currentTask + 1) / TASKS.length) * 100}%` }} /></div>
    </div>
  );
}

function StudyDoneOverlay() {
  return (
    <div className="shdm-done" role="dialog" aria-modal="true" aria-labelledby="shdm-done-title">
      <div className="shdm-done-card">
        <div className="shdm-done-check">
          <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 id="shdm-done-title" className="shdm-done-title">All tasks completed. Thank you!</h1>
        <p className="shdm-done-text">Please go back to the survey to answer the remaining questions.</p>
        <p className="shdm-done-hint">You can close this page now.</p>
      </div>
    </div>
  );
}


function studyLog(payload) {
  try {
    fetch(`${SUPABASE_URL}/rest/v1/rpc/study_log`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ p: payload }),
    })
      .then(r => { if (!r.ok) console.warn(`[study] saving failed (${r.status})`); })
      .catch(() => {});
  } catch {}
}

function makeId(len = 10) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  try {
    const bytes = crypto.getRandomValues(new Uint8Array(len));
    return Array.from(bytes, b => chars[b % chars.length]).join("");
  } catch {
    return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }
}

function resolveParticipant() {
  const KEY = "shdm_participant_id";
  const clean = v => (v || "").trim().replace(/^\[|\]$/g, "");
  let id = "", source = "url";
  try { const p = new URLSearchParams(window.location.search); id = clean(p.get("session") || p.get("pid")); } catch {}
  if (!id) { source = "storage"; try { id = clean(sessionStorage.getItem(KEY)); } catch {} }
  if (!id) { source = "missing"; id = "unknown-" + makeId(8); }
  try { sessionStorage.setItem(KEY, id); } catch {}
  return { id, source };
}

function createStudyTracker() {
  const participant = resolveParticipant();
  const tasks = {};
  [1, 2, 3, 4].forEach(n => { tasks[n] = { start: null, clicks: 0, overrides: 0, errors: 0, done: false }; });
  let current = 1;
  tasks[1].start = Date.now();

  const send = (ev, summary) => studyLog({
    session: participant.id, flow: FLOW, visibility: VISIBILITY, automation: AUTOMATION,
    event: { time: new Date().toISOString(), ...ev }, ...(summary ? { summary } : {}),
  });

  const t = {
    participantId: participant.id,
    participantSource: participant.source,
    get current() { return current; },
    isDone: n => !!tasks[n] && tasks[n].done,

    event(event, f = {}) {
      send({
        task: current <= 4 ? current : null, event,
        page: f.page ?? null, target: f.target ?? null, value: f.value ?? null,
        override: !!f.override, error: !!f.error, ...(f.details ? { details: f.details } : {}),
      });
    },

    action(event, f = {}) {
      if (current <= 4) {
        const k = tasks[current];
        k.clicks++;
        if (f.override) k.overrides++;
        if (f.error) k.errors++;
      }
      t.event(event, f);
    },

    complete(n, via, extra = {}) {
      const finished = [];
      while (current <= n && current <= 4) {
        const k = tasks[current];
        const summary = {
          task: current,
          completed_via: current === n ? via : "auto_" + via,
          time_ms: Date.now() - k.start,
          clicks: k.clicks, overrides: k.overrides, errors: k.errors,
          offer: current === n ? (extra.offer ?? null) : null,
          order_placed: current === n ? !!extra.orderPlaced : false,
        };
        send({ task: current, event: "task_complete", value: summary.completed_via }, summary);
        k.done = true;
        finished.push(current - 1);
        current++;
        if (current <= 4) tasks[current].start = Date.now();
      }
      return finished;
    },
  };
  return t;
}

function isConsentOverride(group, id, newValue, currentValue) {
  if (AUTOMATION === "manual" || newValue === currentValue) return false;
  const systemDefault = !!(group === "acquisition" ? DEFAULT_ACQ : DEFAULT_PROC)[id];
  return newValue !== systemDefault;
}
function isOfferOverride(offer, offersOfTab) {
  if (AUTOMATION === "manual") return false;
  return offer.matchScore < Math.max(...offersOfTab.map(o => o.matchScore));
}

if (typeof document !== "undefined" && !document.getElementById("tailwind-cdn")) {
  const tw = document.createElement("style");
  tw.id = "tailwind-theme";
  tw.setAttribute("type", "text/tailwindcss");
  tw.textContent = `
@theme {
  --radius-sm: calc(0.625rem - 4px);
  --radius-md: calc(0.625rem - 2px);
  --radius-lg: 0.625rem;
  --radius-xl: calc(0.625rem + 4px);
}
@layer base {
  * { border-color: rgba(0, 0, 0, 0.1); outline-color: color-mix(in oklab, oklch(0.708 0 0) 50%, transparent); }
  body { background: #ffffff; color: oklch(0.145 0 0); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
}
@layer base {
  :where(:not(:has([class*=' text-']), :not(:has([class^='text-'])))) {
    h1 { font-size: var(--text-2xl); font-weight: 500; line-height: 1.5; }
    h2 { font-size: var(--text-xl); font-weight: 500; line-height: 1.5; }
    h3 { font-size: var(--text-lg); font-weight: 500; line-height: 1.5; }
    h4 { font-size: var(--text-base); font-weight: 500; line-height: 1.5; }
    label { font-size: var(--text-base); font-weight: 500; line-height: 1.5; }
    button { font-size: var(--text-base); font-weight: 500; line-height: 1.5; }
    input { font-size: var(--text-base); font-weight: 400; line-height: 1.5; }
  }
}
html { font-size: 16px; }
`;
  document.head.appendChild(tw);
  const s = document.createElement("script");
  s.id = "tailwind-cdn"; s.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.12";
  document.head.appendChild(s);
}

/* If the prototype is opened without a participant ID (e.g. a direct link from the survey),
   go once through the landing page. It knows the ID from the start of the survey and sends
   the participant straight back here with ?session=<ID>. */
const LANDING_URL = "https://shdm-landing.vercel.app";
function needsLandingHop() {
  try {
    const p = new URLSearchParams(window.location.search);
    if ((p.get("session") || p.get("pid") || "").trim()) return false;
    if ((sessionStorage.getItem("shdm_participant_id") || "").trim()) return false;
    return true;
  } catch { return false; }
}
const HOP_TO_LANDING = typeof window !== "undefined" && needsLandingHop();
if (HOP_TO_LANDING) window.location.replace(`${LANDING_URL}/p/${FLOW}`);

export default function App() {
  return HOP_TO_LANDING ? null : <StudyApp />;
}

function StudyApp() {
  const trackerRef = useRef(null);
  if (!trackerRef.current) trackerRef.current = createStudyTracker();
  const tracker = trackerRef.current;

  const [stage,           setStage]           = useState("home");
  const [selectedOffer,   setSelectedOffer]   = useState(null);
  const [activeCategory,  setActiveCategory]  = useState("Food");
  const [consentTab,      setConsentTab]      = useState("acquisition");
  const [acqConsents,     setAcqConsents]     = useState({...DEFAULT_ACQ});
  const [procConsents,    setProcConsents]    = useState({...DEFAULT_PROC});
  const [acqSaved,        setAcqSaved]        = useState(false);
  const [procSaved,       setProcSaved]       = useState(false);
  const [sidebarVisible,  setSidebarVisible]  = useState(false);
  const [currentTask,     setCurrentTask]     = useState(0);
  const [doneTasks,       setDoneTasks]       = useState([]);
  const [customizing,     setCustomizing]     = useState(false);
  const [showAlternatives,setShowAlternatives]= useState(false);

  const syncTasks = (finished) => {
    if (!finished.length) return;
    setDoneTasks(prev => Array.from(new Set([...prev, ...finished])));
    setCurrentTask(tracker.current - 1);
  };

  useEffect(() => {
    tracker.event("session_start", { details: {
      participant_source: tracker.participantSource,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      user_agent: navigator.userAgent,
    } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(() => { setSidebarVisible(true); tracker.event("tasks_shown"); }, 5000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { tracker.event("page_view", { page: stage }); }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToConsent = () => {
    tracker.action("nav", { page:"home", target:"privacy_settings" });
    setCustomizing(false);
    setConsentTab("acquisition");
    setStage("consent");
  };

  const handleConsentTabChange = (tab) => {
    tracker.action("tab_switch", { page:"consent", target:tab });
    if (tab === "processing" && !tracker.isDone(1)) syncTasks(tracker.complete(1, "tab_switch"));
    setConsentTab(tab); setAcqSaved(false); setProcSaved(false);
  };

  const handleAcqChange = (id, val) => {
    tracker.action("consent_change", { page:"consent", target:id, value: val ? "allow" : "deny",
      override: isConsentOverride("acquisition", id, val, !!acqConsents[id]), details:{ tab:"acquisition" } });
    setAcqConsents(p => ({ ...p, [id]:val })); setAcqSaved(false);
  };

  const handleProcChange = (id, val) => {
    tracker.action("consent_change", { page:"consent", target:id, value: val ? "allow" : "deny",
      override: isConsentOverride("processing", id, val, !!procConsents[id]), details:{ tab:"processing" } });
    setProcConsents(p => ({ ...p, [id]:val })); setProcSaved(false);
  };

  const applyAcq = () => {
    tracker.action("consent_apply", { page:"consent", target:"acquisition" });
    setAcqSaved(true);
    if (!tracker.isDone(1)) syncTasks(tracker.complete(1, "apply"));
  };

  const applyProc = () => {
    tracker.action("consent_apply", { page:"consent", target:"processing" });
    setProcSaved(true);
    if (!tracker.isDone(2)) syncTasks(tracker.complete(2, "apply"));
  };

  const handleCustomize = () => {
    tracker.action("customize_toggle", { page:"consent", value: customizing ? "off" : "on" });
    setCustomizing(c => !c);
  };

  const handleBackFromConsent = () => {
    tracker.action("consent_done", { page:"consent", details:{ acquisition:acqConsents, processing:procConsents } });
    if (!tracker.isDone(2)) syncTasks(tracker.complete(2, "continue"));
    setStage("analyzing");
    setTimeout(() => setStage("offers"), 1500);
  };

  const handleOfferTab = (cat) => {
    tracker.action("tab_switch", { page:"offers", target:cat });
    setActiveCategory(cat);
  };

  const handleToggleAlternatives = () => {
    tracker.action("alternatives_toggle", { page:"offers", value: showAlternatives ? "hide" : "show", details:{ tab:activeCategory } });
    setShowAlternatives(v => !v);
  };

  const handleSelectOffer = (offer) => {
    const tabOffers = ALL_OFFERS.filter(o => o.category === offer.category);
    tracker.action("offer_select", { page:"offers", target:offer.name, value:offer.category,
      override: isOfferOverride(offer, tabOffers) });
    if (!tracker.isDone(3)) syncTasks(tracker.complete(3, "offer_select", { offer:offer.name }));
    setSelectedOffer(offer);
    setStage("order");
  };

  const goBackHome = () => {
    tracker.action("nav", { page:"offers", target:"back_home", error:true });
    setStage("home");
  };

  const goBackToOffers = () => {
    tracker.action("nav", { page:"order", target:"back_offers", error:true });
    setStage("offers");
  };

  const handlePlaceOrder = () => {
    if (tracker.isDone(4)) return;
    const num = `SH-${Math.floor(Math.random() * 90000) + 10000}`;
    tracker.action("order_place", { page:"order", target:selectedOffer?.name, details:{ order_num:num } });
    syncTasks(tracker.complete(4, "order_place", { offer:selectedOffer?.name, orderPlaced:true }));
    setStage("complete");
    tracker.event("study_finished", { page:"complete" });
  };

  const handleReturnHome = () => {
    tracker.action("nav", { page:"complete", target:"return_home", error:true });
    setStage("home");
  };

  const ModeBadge = () => (
    <div className="shdm-badge">
      <span className="text-xs px-2.5 py-1 rounded-full border font-medium shadow-sm bg-gray-100 text-gray-600 border-gray-300">
        {MODE_LABEL}
      </span>
    </div>
  );

  const Sidebar = () => (
    <div className="shdm-sidebar" style={{ width:220, flexShrink:0, background:"#fff", borderRight:"1px solid #e5e7eb",
      padding:"20px 0", position:"sticky", top:0, height:"100vh", overflowY:"auto" }}>
      <p style={{ fontSize:11, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase",
        color:"#6b7280", padding:"0 16px 12px" }}>Your Tasks</p>
      {TASKS.map((t, i) => {
        const isDone   = doneTasks.includes(i);
        const isActive = i === currentTask && sidebarVisible;
        const isLocked = !isDone && !isActive;
        return (
          <div key={t.id} style={{
            display:"flex", alignItems:"flex-start", gap:10, padding:"10px 16px",
            borderLeft:`3px solid ${isActive ? "#4263eb" : "transparent"}`,
            background: isActive ? "#eef1ff" : "transparent",
            opacity: isLocked ? 0.35 : isDone ? 0.5 : 1,
          }}>
            <div style={{
              width:18, height:18, borderRadius:"50%", flexShrink:0, marginTop:2,
              border:`2px solid ${isDone ? "#16a34a" : isActive ? "#4263eb" : "#d1d5db"}`,
              background: isDone ? "#16a34a" : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:10, color:"#fff",
            }}>
              {isDone ? "✓" : ""}
            </div>
            <div>
              <p style={{ fontSize:12, fontWeight:600, color:"#111827" }}>{t.label}</p>
              <p style={{ fontSize:11, color:"#6b7280", marginTop:2, lineHeight:1.4 }}>{t.short}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const TaskBar = () => <StudyTaskBar sidebarVisible={sidebarVisible} currentTask={currentTask} />;

  if (stage === "complete") {
    return (
      <div className="shdm-root" style={{ display:"flex", minHeight:"100vh" }}>
        <StudyDoneOverlay />
        {sidebarVisible && <Sidebar />}
        <div className="shdm-main" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl text-gray-900 mb-2">Order Confirmed Automatically!</h2>
              <p className="text-gray-600 text-sm mb-2">{selectedOffer?.name} has been confirmed</p>
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                <p className="flex items-center gap-1.5 justify-center font-medium mb-1"><Zap className="w-3.5 h-3.5" /> Smart Home System Actions</p>
                <p>Privacy configured · Preferences analyzed · Best offer selected · Order placed</p>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-6">All tasks completed. Please close this tab and return to the survey to answer the remaining questions.</p>
              <button
                onClick={handleReturnHome}
                className="w-full py-3 rounded-lg font-medium transition-all bg-blue-600 text-white hover:bg-blue-700"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "analyzing") {
    return (
      <div className="shdm-root" style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div className="shdm-main" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-lg p-8">
              <div className="relative mb-5">
                <Loader2 className="w-12 h-12 text-blue-600 mx-auto" style={{ animation:"spin 1s linear infinite" }} />
              </div>
              <h2 className="text-lg text-gray-900 mb-2">Finalizing Your Personalized Selection</h2>
              <p className="text-gray-600 text-sm mb-5">The Smart Home System is preparing your curated selection based on all gathered data...</p>
            </div>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (stage === "order" && selectedOffer) {
    return (
      <div className="shdm-root" style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div className="shdm-main" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto pt-8">
              <button onClick={goBackToOffers} className="mb-6 text-sm text-gray-600 hover:text-blue-600">
                ← Back
              </button>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="py-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600 block mb-1">Item</span>
                    <span className="text-sm font-medium">{selectedOffer.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Delivery</span>
                    <span className="text-sm">Standard (recommended)</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">{selectedOffer.price}</span>
                  </div>
                </div>
                <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>System has pre-configured all order details for you.</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ⚡ Confirm Auto-Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "offers") {
    const filtered    = ALL_OFFERS.filter(o => o.category === activeCategory);
    const preSelected = filtered.reduce((best, o) => o.matchScore > best.matchScore ? o : best, filtered[0]);

    return (
      <div className="shdm-root" style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div className="shdm-main" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          <div className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-2xl mx-auto pt-8">
              <button onClick={goBackHome} className="mb-5 text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                ← Back to Home
              </button>

              <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">⚡ System Selected: {preSelected.name}</p>
                    <p className="text-sm text-gray-600">Auto-selected based on your preferences.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 flex">
                  {["Food","Home","Wellness"].map(cat => (
                    <button key={cat}
                      onClick={() => handleOfferTab(cat)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeCategory === cat
                          ? "bg-white border-b-2 border-blue-600 text-blue-600"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}>
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-200 text-green-800">
                        ⚡ System's Selection
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{preSelected.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-blue-600">{preSelected.price}</span>
                      </div>
                    </div>
                    <button onClick={() => handleSelectOffer(preSelected)}
                      className="w-full mt-3 py-2.5 font-medium rounded-lg transition-all bg-green-600 text-white hover:bg-green-700">
                      ✓ Confirm This Selection
                    </button>
                  </div>

                  <button onClick={handleToggleAlternatives}
                    className="w-full text-sm text-gray-500 hover:text-blue-600 py-2 transition-colors flex items-center justify-center gap-1">
                    {showAlternatives ? "▲ Hide" : "▼ See"} all {activeCategory} alternatives
                  </button>

                  {showAlternatives && (
                    <div className="mt-3 space-y-3">
                      {filtered.filter(o => o.id !== preSelected.id).map(offer => (
                        <button key={offer.id}
                          onClick={() => handleSelectOffer(offer)}
                          className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                          <span className="text-sm font-medium">{offer.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-600">{offer.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "consent") {
    const isAcqTab = consentTab === "acquisition";
    const cats     = isAcqTab ? ACQ_CATS : PROC_CATS;
    const consents = isAcqTab ? acqConsents : procConsents;
    const saved    = isAcqTab ? acqSaved : procSaved;
    const onChange = isAcqTab ? handleAcqChange : handleProcChange;
    const onApply  = isAcqTab ? applyAcq : applyProc;
    const readOnly = !customizing;

    return (
      <div className="shdm-root" style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div className="shdm-main" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          <div className="min-h-screen bg-gray-50 p-4 pt-8">
            <div className="max-w-3xl mx-auto">

              <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-lg font-medium text-gray-900">Privacy Settings</h1>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">Auto-Configured</span>
                      </div>
                      <p className="text-sm text-gray-600">System automatically set up your privacy preferences.</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCustomize}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                      customizing ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                    }`}>
                    <Settings className="w-3.5 h-3.5" />
                    {customizing ? "Done" : "Customize"}
                  </button>
                </div>
                {!customizing && (
                  <div className="mt-3 text-xs text-green-700 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reviewing only — click "Customize" to modify settings</span>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 flex">
                  {[
                    { id:"acquisition", label:"Data Collection", Icon:Database },
                    { id:"processing",  label:"Data Usage",      Icon:Cpu      },
                  ].map(({ id, label, Icon:TabIcon }) => (
                    <button key={id}
                      onClick={() => handleConsentTabChange(id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        consentTab === id
                          ? "bg-white border-b-2 border-blue-600 text-blue-600"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}>
                      <div className="flex items-center justify-center gap-2">
                        <TabIcon className="w-4 h-4" />
                        <span>{label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-5 max-h-[600px] overflow-y-auto">
                  <div className="space-y-3 mb-4">
                    {cats.map(cat => {
                      const enabled = !!consents[cat.id];
                      return (
                        <div key={cat.id}
                          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div>
                            <span className="text-sm">{cat.label}</span>
                            {enabled && (
                              <p className="text-xs text-emerald-600 mt-0.5">✓ Auto-enabled by system</p>
                            )}
                          </div>
                          {readOnly ? (
                            <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                              enabled ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                            }`}>
                              {enabled
                                ? <CheckCircle className="w-3.5 h-3.5" />
                                : <span className="w-3.5 h-3.5 inline-flex items-center justify-center">○</span>}
                              {enabled ? "Auto-enabled" : "Disabled"}
                            </div>
                          ) : (
                          <div className="flex flex-col gap-1 items-end">
                            <div className="flex gap-1">
                              <button
                                onClick={() => onChange(cat.id, false)}
                                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                                  !enabled
                                    ? "bg-gray-400 text-white"
                                    : "bg-gray-100 text-gray-600 border border-gray-300"
                                }`}>
                                Deny
                              </button>
                              <button
                                onClick={() => onChange(cat.id, true)}
                                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                                  enabled
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-600 border border-gray-300"
                                }`}>
                                Allow
                              </button>
                            </div>
                          </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!readOnly && (
                  <button
                    onClick={onApply}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                      saved ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}>
                    {saved
                      ? "✓ Saved!"
                      : isAcqTab
                        ? "Apply Data Collection Settings"
                        : "Apply Data Usage Settings"}
                  </button>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleBackFromConsent}
                  className="w-full py-3 rounded-lg font-medium transition-all bg-blue-600 text-white hover:bg-blue-700">
                  {customizing ? "Apply Settings & View Offers →" : "Continue to Offers →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shdm-root" style={{ display:"flex", minHeight:"100vh" }}>
      {sidebarVisible && <Sidebar />}
      <div className="shdm-main" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        <TaskBar />
        <ModeBadge />
        <div className="min-h-screen p-4 bg-gray-50">
          <div className="max-w-2xl mx-auto pt-10">

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <HomeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl text-gray-900 mb-2">Welcome Home</h1>
              <p className="text-gray-600 text-sm">Wednesday, 7:15 PM</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Temperature</p>
                <p className="text-xl">22°C</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">People Home</p>
                <p className="text-xl">2</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5">

              <div className="mb-5 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">✅ Your Offers Are Ready</p>
                    <p className="text-sm text-gray-600">System has prepared offers for you.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={goToConsent}
                className="w-full flex items-center justify-between px-5 py-3 rounded-lg transition-all bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900">
                <div className="flex items-center gap-2">
                  <span>Review Offers →</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
