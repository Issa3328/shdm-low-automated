"use client";
import { useState, useEffect, useRef } from "react";

// ─── INLINE SVG ICONS (lucide paths, no lucide-react dependency) ─────────────
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
// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SUPABASE_URL      = "https://iljzwxwopxuzpgkjivmn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KEoCJtCLyGTJjqB1phGy2Q_v3PftUYH";
const FLOW              = "low_automated";
const SURVEY_RETURN_URL = "https://www.surveymonkey.ca/r/5C7MWMD";

const MODE_LABEL = "Info: Low · Control: Automated";
const VISIBILITY = "low";   // low | medium | high
const AUTOMATION = "automated";   // manual | assisted | automated

// ─── OFFERS DATA ──────────────────────────────────────────────────────────────
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

// ─── CONSENT CATEGORIES (LOW VISIBILITY) ─────────────────────────────────────
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
// Automated: system enables everything — user reviews (can customize)
const DEFAULT_ACQ  = { sensors:true, behavior:true, purchases:true };
const DEFAULT_PROC = { food:true,    home:true,     wellness:true };

// ─── TASKS ────────────────────────────────────────────────────────────────────
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

// ═══ STUDY TRACKING ═══ identical in all 9 conditions (only VISIBILITY / AUTOMATION differ) ═══
// Tables (create once with study_supabase_setup.sql):
//   study_events          → one row per interaction
//   study_task_summaries  → exactly one row per task (1–4) per visit
// IDs:
//   participant_id → the SurveyMonkey ID from the URL (?session=…); use it to match survey + website data
//   session_id     → random ID of this visit (new tab = new visit)
// Counting rules (same everywhere):
//   clicks    → every click on a control (buttons, tabs, toggles, expand arrows, back links)
//   overrides → a click that contradicts a system choice (never in Manual):
//               • setting a privacy category to the opposite of the system's pre-selection
//               • choosing an offer that is not the system's highlighted/selected offer of its tab
//   errors    → backward navigation (Back / Return to Home) and clicks on disabled controls
// Every click belongs to the current (lowest unfinished) task. Task n+1 starts when task n finishes.
const EVENTS_TABLE = "study_events";
const TASKS_TABLE  = "study_task_summaries";

function sbInsert(table, row) {
  try {
    fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      keepalive: true, // still delivered when the page redirects to SurveyMonkey
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    })
      .then(r => { if (!r.ok) console.warn(`[study] insert into ${table} failed (${r.status})`); })
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

// SurveyMonkey ID from ?session=… (also accepts ?pid=…); kept for this tab so a reload cannot lose it
function resolveParticipant() {
  const KEY = "shdm_participant_id";
  const clean = v => (v || "").trim().replace(/^\[|\]$/g, "");
  let id = "", source = "url";
  try { const p = new URLSearchParams(window.location.search); id = clean(p.get("session") || p.get("pid")); } catch {}
  if (!id) { source = "storage"; try { id = clean(sessionStorage.getItem(KEY)); } catch {} }
  if (!id) { source = "missing"; id = "unknown"; }
  else { try { sessionStorage.setItem(KEY, id); } catch {} }
  return { id, source };
}

function resolveVisit() {
  const KEY = `shdm_visit_${FLOW}`;
  try {
    let v = sessionStorage.getItem(KEY);
    if (!v) { v = makeId(12); sessionStorage.setItem(KEY, v); }
    return v;
  } catch { return makeId(12); }
}

function createStudyTracker() {
  const participant = resolveParticipant();
  const sessionId   = resolveVisit();
  const tasks = {};
  [1, 2, 3, 4].forEach(n => { tasks[n] = { start: null, clicks: 0, overrides: 0, errors: 0, done: false }; });
  let current = 1;
  tasks[1].start = Date.now();

  const base = () => ({
    participant_id: participant.id, session_id: sessionId, flow: FLOW,
    visibility: VISIBILITY, automation: AUTOMATION, client_timestamp: new Date().toISOString(),
  });

  const t = {
    participantId: participant.id,
    participantSource: participant.source,
    sessionId,
    get current() { return current; },          // 1–4, or 5 when all tasks are done
    isDone: n => !!tasks[n] && tasks[n].done,

    // log without counting (page views, system events)
    event(event, f = {}) {
      sbInsert(EVENTS_TABLE, {
        ...base(), task: current <= 4 ? current : null, event,
        page: f.page ?? null, target: f.target ?? null, value: f.value ?? null,
        is_override: !!f.override, is_error: !!f.error, details: f.details ?? null,
      });
    },

    // every user click on a control goes through here → counted for the current task + logged
    action(event, f = {}) {
      if (current <= 4) {
        const k = tasks[current];
        k.clicks++;
        if (f.override) k.overrides++;
        if (f.error) k.errors++;
      }
      t.event(event, f);
    },

    // finish task n (and any earlier unfinished task); returns finished task indices (0-based, for the sidebar)
    complete(n, via, extra = {}) {
      const finished = [];
      while (current <= n && current <= 4) {
        const k = tasks[current];
        sbInsert(TASKS_TABLE, {
          ...base(), task: current,
          completed_via: current === n ? via : "auto_" + via,
          time_ms: Date.now() - k.start,
          clicks: k.clicks, overrides: k.overrides, errors: k.errors,
          offer_selected: current === n ? (extra.offer ?? null) : null,
          order_placed: current === n ? !!extra.orderPlaced : false,
        });
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

// override rules (shared)
// consent: override = changing a category to the opposite of the system's pre-selection (Assisted/Automated only)
function isConsentOverride(group, id, newValue, currentValue) {
  if (AUTOMATION === "manual" || newValue === currentValue) return false;
  const systemDefault = !!(group === "acquisition" ? DEFAULT_ACQ : DEFAULT_PROC)[id];
  return newValue !== systemDefault;
}
// offer: override = choosing an offer that is not the system's highlighted/selected offer of its tab (Assisted/Automated only)
function isOfferOverride(offer, offersOfTab) {
  if (AUTOMATION === "manual") return false;
  return offer.matchScore < Math.max(...offersOfTab.map(o => o.matchScore));
}
// ═══ END STUDY TRACKING ═══

// ─── TAILWIND (v4 + theme identical to the Figma prototype; module-level → runs before React mounts) ─
if (typeof document !== "undefined" && !document.getElementById("tailwind-cdn")) {
  // Figma theme: radius 0.625rem + base typography (identical to Figma's globals.css)
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
/* Base typography — not applied to elements which have an ancestor with a Tailwind text class */
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

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
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
  const [customizing,     setCustomizing]     = useState(false); // consent: review-only until "Customize"
  const [showAlternatives,setShowAlternatives]= useState(false); // offers: alternatives list

  // sidebar/task bar follow the tracker (single source of truth)
  const syncTasks = (finished) => {
    if (!finished.length) return;
    setDoneTasks(prev => Array.from(new Set([...prev, ...finished])));
    setCurrentTask(tracker.current - 1);
  };

  // visit start (once)
  useEffect(() => {
    tracker.event("session_start", { details: {
      participant_source: tracker.participantSource,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      user_agent: navigator.userAgent,
    } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // task sidebar appears after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => { setSidebarVisible(true); tracker.event("tasks_shown"); }, 5000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // every screen change
  useEffect(() => { tracker.event("page_view", { page: stage }); }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers (every click → tracker.action) ─────────────────────────────────
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

  // leaving the privacy settings completes Task 1 + 2 (if not done yet)
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
    if (tracker.isDone(4)) return; // ignore double clicks
    const num = `SH-${Math.floor(Math.random() * 90000) + 10000}`;
    tracker.action("order_place", { page:"order", target:selectedOffer?.name, details:{ order_num:num } });
    syncTasks(tracker.complete(4, "order_place", { offer:selectedOffer?.name, orderPlaced:true }));
    setStage("complete");
    setTimeout(() => {
      const url = `${SURVEY_RETURN_URL}?session=${encodeURIComponent(tracker.participantId)}`;
      tracker.event("survey_redirect", { page:"complete", details:{ url } });
      window.location.href = url;
    }, 2500);
  };

  const handleReturnHome = () => {
    tracker.action("nav", { page:"complete", target:"return_home", error:true });
    setStage("home");
  };

  // ── Mode badge ──────────────────────────────────────────────────────────────
  const ModeBadge = () => (
    <div className="fixed top-3 right-3 z-50">
      <span className="text-xs px-2.5 py-1 rounded-full border font-medium shadow-sm bg-gray-100 text-gray-600 border-gray-300">
        {MODE_LABEL}
      </span>
    </div>
  );

  // ── Task sidebar ────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div style={{ width:220, flexShrink:0, background:"#fff", borderRight:"1px solid #e5e7eb",
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

  // ── Task description bar ────────────────────────────────────────────────────
  const TaskBar = () => {
    if (!sidebarVisible || currentTask >= TASKS.length) return null;
    const t = TASKS[currentTask];
    const progress = ((currentTask + 1) / TASKS.length) * 100;
    return (
      <div style={{ background:"#1e1b4b", borderBottom:"1px solid rgba(99,102,241,0.25)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 20px" }}>
          {/* Numbered circle */}
          <div style={{
            width:32, height:32, borderRadius:"50%", flexShrink:0,
            background:"rgba(99,102,241,0.25)", border:"1.5px solid rgba(99,102,241,0.6)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, fontWeight:700, color:"#a5b4fc",
          }}>
            {currentTask + 1}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".09em", color:"#818cf8", marginBottom:4 }}>
              {t.label} &nbsp;·&nbsp; {currentTask + 1} of {TASKS.length}
            </div>
            <div style={{ fontSize:13, color:"#c7d2fe", lineHeight:1.55 }}>
              {t.desc}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height:3, background:"rgba(255,255,255,0.07)" }}>
          <div style={{
            height:"100%", width:`${progress}%`,
            background:"linear-gradient(90deg,#6366f1,#818cf8)",
            transition:"width 0.4s ease",
          }} />
        </div>
      </div>
    );
  };

  // ── COMPLETE ────────────────────────────────────────────────────────────────
  if (stage === "complete") {
    return (
      <div style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
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
              <p className="text-xs text-gray-400 mb-6">Redirecting to survey…</p>
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

  // ── ANALYZING ───────────────────────────────────────────────────────────────
  if (stage === "analyzing") {
    return (
      <div style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
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

  // ── ORDER ────────────────────────────────────────────────────────────────────
  if (stage === "order" && selectedOffer) {
    return (
      <div style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
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
                {/* High automation hint */}
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

  // ── OFFERS ───────────────────────────────────────────────────────────────────
  if (stage === "offers") {
    const filtered    = ALL_OFFERS.filter(o => o.category === activeCategory);
    // System's selection = highest match score in the active category
    const preSelected = filtered.reduce((best, o) => o.matchScore > best.matchScore ? o : best, filtered[0]);

    return (
      <div style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          <div className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-2xl mx-auto pt-8">
              <button onClick={goBackHome} className="mb-5 text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                ← Back to Home
              </button>

              {/* System selection banner */}
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
                {/* Category tabs */}
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
                  {/* Pre-selected offer */}
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

                  {/* See alternatives toggle */}
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

  // ── CONSENT ──────────────────────────────────────────────────────────────────
  if (stage === "consent") {
    const isAcqTab = consentTab === "acquisition";
    const cats     = isAcqTab ? ACQ_CATS : PROC_CATS;
    const consents = isAcqTab ? acqConsents : procConsents;
    const saved    = isAcqTab ? acqSaved : procSaved;
    const onChange = isAcqTab ? handleAcqChange : handleProcChange;
    const onApply  = isAcqTab ? applyAcq : applyProc;
    const readOnly = !customizing;

    return (
      <div style={{ display:"flex", minHeight:"100vh" }}>
        {sidebarVisible && <Sidebar />}
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
          <TaskBar />
          <ModeBadge />
          {/* ConsentUnified — LOW vis + HIGH auto */}
          <div className="min-h-screen bg-gray-50 p-4 pt-8">
            <div className="max-w-3xl mx-auto">

              {/* Header — high automation, low visibility */}
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

              {/* Card */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Tab bar */}
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

                {/* List — low visibility */}
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
                          {/* Toggle — low vis, high auto: status pill until "Customize" */}
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

                  {/* Save button (hidden while reviewing) */}
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

              {/* Continue button */}
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

  // ── HOME ─────────────────────────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {sidebarVisible && <Sidebar />}
      <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
        <TaskBar />
        <ModeBadge />
        <div className="min-h-screen p-4 bg-gray-50">
          <div className="max-w-2xl mx-auto pt-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <HomeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl text-gray-900 mb-2">Welcome Home</h1>
              <p className="text-gray-600 text-sm">Wednesday, 7:15 PM</p>
              {/* isMed subtitle — not shown for isLow */}
            </div>

            {/* Low visibility minimal sensors */}
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

            {/* Main action card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5">

              {/* High automation banner */}
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

              {/* Action button — low vis style */}
              <button
                onClick={goToConsent}
                className="w-full flex items-center justify-between px-5 py-3 rounded-lg transition-all bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900">
                <div className="flex items-center gap-2">
                  <span>Review Offers →</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* isHigh extra info — not shown for low vis */}
          </div>
        </div>
      </div>
    </div>
  );
}
