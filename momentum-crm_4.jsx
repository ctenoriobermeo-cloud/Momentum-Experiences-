import { useState, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const initialClients = [
  {
    id:1, name:"Sofia Ramírez", age:34, date:"2025-05-02", activity:"Cenote Snorkeling",
    saleAmount:1800, salesperson:"Ana López", status:"Confirmed",
    phone:"+52 998 123 0001", email:"sofia@email.com", nationality:"Mexican", groupSize:2,
    notes:"Loves photography. Requested underwater camera rental.",
    quotes:[{id:1,text:"Best experience of my life in Cancún!",date:"2025-05-03"}],
    discounts:[{id:1,reason:"Loyalty return client",percent:10,amount:200}],
    itinerary:[
      {id:1,time:"08:00",activity:"Hotel pickup — Zona Hotelera",done:true},
      {id:2,time:"09:30",activity:"Arrive Cenote Dos Ojos",done:true},
      {id:3,time:"10:00",activity:"Snorkeling session (1.5hrs)",done:true},
      {id:4,time:"12:00",activity:"Lunch at local cenote restaurant",done:false},
      {id:5,time:"14:00",activity:"Hotel drop-off",done:false},
    ],
    providersUsed:["AquaVentures MX"], photos:[],
  },
  {
    id:2, name:"James Whitfield", age:28, date:"2025-05-05", activity:"Jungle Zipline",
    saleAmount:2400, salesperson:"Carlos Vega", status:"Pending",
    phone:"+1 305 555 0192", email:"james.w@gmail.com", nationality:"American", groupSize:4,
    notes:"Group of 4 friends. Awaiting deposit confirmation.",
    quotes:[], discounts:[],
    itinerary:[
      {id:1,time:"07:00",activity:"Hotel pickup",done:false},
      {id:2,time:"09:00",activity:"Zipline adventure park",done:false},
    ],
    providersUsed:["Selva Tours"], photos:[],
  },
  {
    id:3, name:"Mei Lin", age:45, date:"2025-05-08", activity:"Private Yacht Tour",
    saleAmount:8500, salesperson:"Ana López", status:"Confirmed",
    phone:"+86 138 0000 0000", email:"meilin@corp.cn", nationality:"Chinese", groupSize:6,
    notes:"Corporate group. Requires vegetarian menu and bilingual guide (EN/ZH).",
    quotes:[{id:1,text:"Absolutely stunning sunset cruise.",date:"2025-05-09"}],
    discounts:[{id:1,reason:"Corporate group rate",percent:15,amount:1500}],
    itinerary:[
      {id:1,time:"16:00",activity:"Marina check-in & welcome drinks",done:true},
      {id:2,time:"16:30",activity:"Departure — Isla Mujeres route",done:true},
      {id:3,time:"18:00",activity:"Sunset photography stop",done:false},
      {id:4,time:"19:30",activity:"Return to Marina & dinner",done:false},
    ],
    providersUsed:["Riviera Yachts"], photos:[],
  },
  {
    id:4, name:"Diego Hernández", age:31, date:"2025-05-12", activity:"Mayan Ruins Expedition",
    saleAmount:3200, salesperson:"Luis Mora", status:"Confirmed",
    phone:"+52 55 1234 5678", email:"diego.h@outlook.com", nationality:"Mexican", groupSize:3,
    notes:"History enthusiast. Requested certified archaeologist guide.",
    quotes:[], discounts:[],
    itinerary:[
      {id:1,time:"05:30",activity:"Early morning hotel pickup",done:false},
      {id:2,time:"08:30",activity:"Arrive Chichén Itzá — guided tour",done:false},
      {id:3,time:"12:00",activity:"Cenote Ik Kil swim",done:false},
      {id:4,time:"14:00",activity:"Valladolid city tour & lunch",done:false},
      {id:5,time:"18:00",activity:"Return to Cancún",done:false},
    ],
    providersUsed:["Herencia Maya"], photos:[],
  },
  {
    id:5, name:"Priya Sharma", age:39, date:"2025-05-15", activity:"Whale Shark Swim",
    saleAmount:4100, salesperson:"Carlos Vega", status:"Pending",
    phone:"+91 98765 43210", email:"priya.s@mail.in", nationality:"Indian", groupSize:2,
    notes:"Honeymoon couple. Requested photographer add-on.",
    quotes:[], discounts:[{id:1,reason:"Honeymoon package",percent:5,amount:205}],
    itinerary:[
      {id:1,time:"06:00",activity:"Hotel pickup & breakfast box",done:false},
      {id:2,time:"08:30",activity:"Boat departure — Holbox area",done:false},
      {id:3,time:"10:00",activity:"Whale shark snorkeling (2hrs)",done:false},
      {id:4,time:"13:00",activity:"Return & photo delivery",done:false},
    ],
    providersUsed:["AquaVentures MX"], photos:[],
  },
];

const initialProviders = [
  {id:1,name:"AquaVentures MX",category:"Water Activities",contact:"info@aquaventures.mx",phone:"+52 998 123 4567",rating:5},
  {id:2,name:"Selva Tours",category:"Jungle & Adventure",contact:"hola@selvatours.com",phone:"+52 984 765 4321",rating:4},
  {id:3,name:"Riviera Yachts",category:"Luxury Charters",contact:"ops@rivierayachts.mx",phone:"+52 998 888 9900",rating:5},
  {id:4,name:"Herencia Maya",category:"Cultural & Historical",contact:"tours@herenciamaya.com",phone:"+52 985 222 3344",rating:4},
];

const initialTasks = [
  {id:1,text:"Follow up with James Whitfield about pending payment",done:false,type:"ai",priority:"high"},
  {id:2,text:"Request updated pricing from Riviera Yachts for June",done:false,type:"ai",priority:"medium"},
  {id:3,text:"Send satisfaction survey to this month's confirmed clients",done:false,type:"ai",priority:"medium"},
  {id:4,text:"Renew insurance certificate for water activities",done:true,type:"manual",priority:"low"},
  {id:5,text:"Post whale shark season promo on social media",done:false,type:"manual",priority:"high"},
];

const INIT_ACTIVITIES=["Cenote Snorkeling","Jungle Zipline","Private Yacht Tour","Mayan Ruins Expedition","Whale Shark Swim","Coba Bike Tour","Tulum Beach Day","Night Fishing","ATV Adventure"];
const INIT_SALESPERSONS=["Ana López","Carlos Vega","Luis Mora","Mariana Díaz"];
const STATUSES=["Confirmed","Pending","Cancelled"];

// ─── ICON ─────────────────────────────────────────────────────────────────────
const PATHS = {
  clients:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  sales:"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  providers:"M2 7h20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  tasks:"M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  plus:"M12 5v14M5 12h14",
  trash:"M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6",
  edit:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  x:"M18 6L6 18M6 6l12 12",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  quote:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
  discount:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  map:"M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16",
  image:"M21 21H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2zM8.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 15l-5-5L5 21",
  note:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H9H8",
  check:"M20 6L9 17l-5-5",
  upload:"M16 16l-4-4-4 4M12 12v9M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3",
  phone:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.4 5.4l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  globe:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  loading:"M21 12a9 9 0 1 1-6.219-8.56",
  users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};

function Icon({ name, size=18, style={} }) {
  const isLoading = name==="loading";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{width:size,height:size,flexShrink:0,display:"inline-block",animation:isLoading?"spin 1s linear infinite":undefined,...style}}>
      {(PATHS[name]||"").split("M").filter(Boolean).map((d,i)=><path key={i} d={"M"+d}/>)}
    </svg>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("clients");
  const [clients, setClients] = useState(initialClients);
  const [providers, setProviders] = useState(initialProviders);
  const [tasks, setTasks] = useState(initialTasks);
  const [activities, setActivities] = useState(INIT_ACTIVITIES);
  const [salespersons, setSalespersons] = useState(INIT_SALESPERSONS);

  return (
    <>
      <style>{`:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#0a0f1e;--surface:#111827;--surface2:#1a2235;--surface3:#212d42;
          --border:#1f2d45;--border2:#253553;
          --accent:#00c9a7;--accent2:#f97316;--accent3:#818cf8;
          --text:#e2e8f0;--text2:#94a3b8;--muted:#64748b;
          --danger:#ef4444;--gold:#fbbf24;--green:#22c55e;
          --r:14px;--rs:8px;
        }
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
        .app{display:flex;flex-direction:column;min-height:100vh}
        .header{background:linear-gradient(135deg,#0d1b3e,#0a1628 60%,#041020);border-bottom:1px solid var(--border);padding:20px 32px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden}
        .header::before{content:'';position:absolute;top:-40px;right:-40px;width:220px;height:220px;background:radial-gradient(circle,rgba(0,201,167,.15),transparent 70%);border-radius:50%;pointer-events:none}
        .logo{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;letter-spacing:-.5px}
        .logo span{color:var(--accent)}
        .logo small{display:block;font-size:11px;font-weight:400;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:2px}
        .hdate{font-size:13px;color:var(--muted)}
        .tabs{background:var(--surface);border-bottom:1px solid var(--border);display:flex;padding:0 32px;gap:4px;overflow-x:auto}
        .tbtn{display:flex;align-items:center;gap:8px;padding:16px 20px;background:none;border:none;color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;border-bottom:2px solid transparent;transition:all .2s;position:relative;bottom:-1px;white-space:nowrap}
        .tbtn:hover{color:var(--text)}.tbtn.active{color:var(--accent);border-bottom-color:var(--accent)}
        .content{flex:1;padding:32px;max-width:1400px;width:100%;margin:0 auto}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin-bottom:20px}
        .sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px;margin-bottom:28px}
        .sc{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:20px 24px;position:relative;overflow:hidden}
        .sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:var(--r) var(--r) 0 0}
        .sc.t::before{background:var(--accent)}.sc.o::before{background:var(--accent2)}.sc.p::before{background:var(--accent3)}.sc.g::before{background:var(--gold)}
        .slbl{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
        .sval{font-family:'Syne',sans-serif;font-size:26px;font-weight:800}
        .sc.t .sval{color:var(--accent)}.sc.o .sval{color:var(--accent2)}.sc.p .sval{color:var(--accent3)}.sc.g .sval{color:var(--gold)}
        .ssub{font-size:12px;color:var(--muted);margin-top:4px}
        .btn{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:var(--rs);border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all .2s}
        .btn:disabled{opacity:.5;cursor:not-allowed}
        .bp{background:var(--accent);color:#0a0f1e}.bp:hover{background:#00b899}
        .bs{background:var(--surface2);color:var(--text);border:1px solid var(--border)}.bs:hover{border-color:var(--accent);color:var(--accent)}
        .bd{background:rgba(239,68,68,.1);color:var(--danger);border:1px solid rgba(239,68,68,.2)}.bd:hover{background:rgba(239,68,68,.2)}
        .bsm{padding:6px 12px;font-size:13px}.bxs{padding:4px 8px;font-size:12px}
        .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:500}
        .bc{background:rgba(0,201,167,.15);color:var(--accent)}
        .bpen{background:rgba(251,191,36,.15);color:var(--gold)}
        .bcan{background:rgba(239,68,68,.15);color:var(--danger)}
        .bhi{background:rgba(239,68,68,.15);color:var(--danger)}
        .bme{background:rgba(251,191,36,.15);color:var(--gold)}
        .blo{background:rgba(100,116,139,.2);color:var(--muted)}
        .bai{background:rgba(129,140,248,.15);color:var(--accent3)}
        .bma{background:rgba(0,201,167,.1);color:var(--accent)}
        .fg{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .fgr{display:flex;flex-direction:column;gap:6px}
        .fgr.full{grid-column:1/-1}
        label{font-size:12px;color:var(--muted);font-weight:500;text-transform:uppercase;letter-spacing:.5px}
        input,select,textarea{background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:10px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;width:100%}
        input:focus,select:focus,textarea:focus{border-color:var(--accent)}
        select option{background:var(--surface2)}
        textarea{resize:vertical}
        .mo{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(4px);animation:fadeIn .2s}
        .md{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:32px;width:560px;max-width:95vw;max-height:90vh;overflow-y:auto}
        .mt{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center}
        .mc{background:none;border:none;cursor:pointer;color:var(--muted);display:flex;padding:4px;border-radius:4px}.mc:hover{color:var(--text)}
        .fa{display:flex;gap:10px;justify-content:flex-end;margin-top:24px}
        .sb{position:relative;margin-bottom:20px}
        .sb input{padding-left:40px}
        .si{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);width:16px;height:16px;pointer-events:none}
        table{width:100%;border-collapse:collapse}
        .tw{overflow-x:auto}
        th{text-align:left;font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:1px;padding:10px 14px;border-bottom:1px solid var(--border);white-space:nowrap}
        td{padding:13px 14px;border-bottom:1px solid rgba(31,45,69,.5);font-size:14px;vertical-align:middle}
        tr:last-child td{border-bottom:none}
        tr:hover td{background:rgba(255,255,255,.02)}
        .sech{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
        .sect{font-family:'Syne',sans-serif;font-size:22px;font-weight:700}
        .secs{color:var(--muted);font-size:14px;margin-top:2px}
        /* DRAWER */
        .dov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200;backdrop-filter:blur(6px);animation:fadeIn .2s}
        .drw{position:fixed;top:0;right:0;bottom:0;width:780px;max-width:96vw;background:var(--surface);border-left:1px solid var(--border);overflow-y:auto;z-index:201;animation:slideIn .3s cubic-bezier(.22,.61,.36,1);display:flex;flex-direction:column}
        .dhead{padding:24px 28px;border-bottom:1px solid var(--border);background:linear-gradient(135deg,#0d1b3e,#0f1e38);flex-shrink:0}
        .dname{font-family:'Syne',sans-serif;font-size:24px;font-weight:800}
        .dmeta{display:flex;gap:16px;margin-top:8px;flex-wrap:wrap}
        .dmi{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text2)}
        .dtabs{display:flex;border-bottom:1px solid var(--border);background:var(--surface2);overflow-x:auto;flex-shrink:0}
        .dt{padding:13px 18px;background:none;border:none;color:var(--muted);cursor:pointer;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;transition:all .2s;display:flex;align-items:center;gap:7px;white-space:nowrap}
        .dt.active{color:var(--accent);border-bottom-color:var(--accent);background:rgba(0,201,167,.04)}
        .dt:hover:not(.active){color:var(--text)}
        .cnt{display:inline-block;background:var(--surface3);padding:1px 7px;border-radius:10px;font-size:11px;margin-left:2px}
        .dsec{padding:24px 28px}
        /* ITINERARY */
        .irow{display:flex;gap:14px;align-items:flex-start;padding:10px 0;position:relative}
        .irow:not(:last-child)::after{content:'';position:absolute;left:33px;top:38px;bottom:0;width:1px;background:var(--border)}
        .idot{width:28px;height:28px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:var(--surface2);cursor:pointer;transition:all .2s}
        .idot.done{background:var(--accent);border-color:var(--accent)}
        .itime{font-size:12px;font-weight:600;color:var(--muted);min-width:44px;padding-top:6px}
        .itxt{flex:1;font-size:14px;padding-top:5px;line-height:1.4}
        .itxt.done{text-decoration:line-through;color:var(--muted)}
        /* PHOTOS */
        .pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}
        .pthumb{aspect-ratio:1;border-radius:var(--rs);overflow:hidden;background:var(--surface2);border:1px solid var(--border);position:relative}
        .pthumb img{width:100%;height:100%;object-fit:cover;display:block}
        .pthumb:hover .pdel{opacity:1}
        .pdel{position:absolute;top:4px;right:4px;background:rgba(0,0,0,.75);border:none;cursor:pointer;border-radius:4px;padding:3px;display:flex;opacity:0;transition:opacity .2s;color:#fff}
        .pupl{aspect-ratio:1;border-radius:var(--rs);border:2px dashed var(--border2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:all .2s;color:var(--muted);font-size:12px}
        .pupl:hover{border-color:var(--accent);color:var(--accent);background:rgba(0,201,167,.05)}
        /* QUOTES */
        .qi{background:var(--surface2);border-left:3px solid var(--accent3);border-radius:0 var(--rs) var(--rs) 0;padding:14px 16px;margin-bottom:10px}
        .qtxt{font-size:14px;font-style:italic;line-height:1.6;margin-bottom:6px}
        .qd{font-size:12px;color:var(--muted)}
        /* DISCOUNTS */
        .di{background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:16px}
        .dpct{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--accent2);min-width:50px}
        /* PROVIDERS */
        .ptag{display:inline-flex;align-items:center;gap:8px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:8px 16px;font-size:13px;margin:4px}
        /* BAR */
        .spr{display:flex;align-items:center;padding:12px 0;border-bottom:1px solid rgba(31,45,69,.5)}
        .spr:last-child{border-bottom:none}
        .spbw{flex:1;margin:0 20px;height:6px;background:var(--border);border-radius:3px;overflow:hidden}
        .spb{height:100%;background:var(--accent);border-radius:3px}
        .bch{display:flex;gap:12px;align-items:flex-end;height:140px;padding:0 4px}
        .bc2{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1}
        .bar{width:100%;border-radius:6px 6px 0 0;min-height:4px}
        .ai-panel{background:linear-gradient(135deg,rgba(129,140,248,.08),rgba(0,201,167,.05));border:1px solid rgba(129,140,248,.2);border-radius:var(--r);padding:20px;margin-bottom:24px}
        .aih{display:flex;align-items:center;gap:10px;margin-bottom:16px}
        .ail{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--accent3)}
        .air{display:flex;gap:10px}
        .air input{flex:1}
        .ti{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid rgba(31,45,69,.5)}
        .ti:last-child{border-bottom:none}
        .tck{width:20px;height:20px;border-radius:6px;border:2px solid var(--border);background:none;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:2px;transition:all .2s}
        .tck.done{background:var(--accent);border-color:var(--accent)}
        .tck.done::after{content:'✓';color:#0a0f1e;font-size:12px;font-weight:700}
        .prov-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
        .prov-card{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:20px}
        .empty{text-align:center;padding:40px;color:var(--muted);font-size:14px}
        .row{display:flex;gap:12px;margin-bottom:12px}
        .grow{flex:1}
        @media(max-width:700px){.content{padding:16px}.fg{grid-template-columns:1fr}.header{padding:16px}.tabs{padding:0 8px}.sg{grid-template-columns:1fr 1fr}.drw{width:100%}}
      `}</style>
      <div className="app">
        <header className="header">
          <div className="logo">Business<span>Momentum</span><small>Experience CRM</small></div>
          <div className="hdate">{new Date().toLocaleDateString("en-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
        </header>
        <nav className="tabs">
          {[{id:"clients",label:"Clients",icon:"clients"},{id:"sales",label:"Sales Summary",icon:"sales"},{id:"providers",label:"Providers",icon:"providers"},{id:"tasks",label:"Tasks & AI",icon:"tasks"},{id:"settings",label:"Settings",icon:"settings"}].map(t=>(
            <button key={t.id} className={`tbtn${tab===t.id?" active":""}`} onClick={()=>setTab(t.id)}>
              <Icon name={t.icon} size={16}/> {t.label}
            </button>
          ))}
        </nav>
        <main className="content">
          {tab==="clients"   && <ClientsTab clients={clients} setClients={setClients} providers={providers} activities={activities} salespersons={salespersons}/>}
          {tab==="sales"     && <SalesTab clients={clients}/>}
          {tab==="providers" && <ProvidersTab providers={providers} setProviders={setProviders}/>}
          {tab==="tasks"     && <TasksTab tasks={tasks} setTasks={setTasks} clients={clients}/>}
          {tab==="settings"  && <SettingsTab activities={activities} setActivities={setActivities} salespersons={salespersons} setSalespersons={setSalespersons}/>}
        </main>
      </div>
    </>
  );
}

// ─── CLIENTS TAB ─────────────────────────────────────────────────────────────
function ClientsTab({ clients, setClients, providers, activities, salespersons }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);
  const blank = {name:"",age:"",date:new Date().toISOString().split("T")[0],activity:"",saleAmount:"",salesperson:"",status:"Pending",phone:"",email:"",nationality:"",groupSize:1,notes:"",quotes:[],discounts:[],itinerary:[],providersUsed:[],photos:[]};
  const [form, setForm] = useState(blank);

  const filtered = clients.filter(c=>
    c.name.toLowerCase().includes(search.toLowerCase())||
    c.activity.toLowerCase().includes(search.toLowerCase())||
    (c.salesperson||"").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd  = () => { setEditing(null); setForm(blank); setShowModal(true); };
  const openEdit = c => { setEditing(c.id); setForm({...c}); setShowModal(true); };
  const save = () => {
    if (!form.name||!form.activity) return;
    if (editing) setClients(prev=>prev.map(c=>c.id===editing?{...form,id:editing,saleAmount:Number(form.saleAmount),age:Number(form.age),groupSize:Number(form.groupSize)}:c));
    else setClients(prev=>[...prev,{...form,id:Date.now(),saleAmount:Number(form.saleAmount),age:Number(form.age),groupSize:Number(form.groupSize)}]);
    setShowModal(false);
  };
  const del = id => { setClients(prev=>prev.filter(c=>c.id!==id)); if(selected?.id===id) setSelected(null); };
  const updateClient = updated => { setClients(prev=>prev.map(c=>c.id===updated.id?updated:c)); setSelected(updated); };

  return (
    <>
      <div className="sech">
        <div><div className="sect">Clients</div><div className="secs">{clients.length} total leads registered</div></div>
        <button className="btn bp" onClick={openAdd}><Icon name="plus" size={16}/> New Client</button>
      </div>
      <div className="card">
        <div className="sb">
          <svg className="si" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search by name, activity or salesperson…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div className="tw">
          <table>
            <thead><tr><th>Client</th><th>Date</th><th>Activity</th><th>Pax</th><th>Sale</th><th>Salesperson</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0&&<tr><td colSpan={8}><div className="empty">No clients found.</div></td></tr>}
              {filtered.map(c=>(
                <tr key={c.id}>
                  <td><div style={{fontWeight:600}}>{c.name}</div><div style={{fontSize:12,color:"var(--muted)"}}>{c.age} yrs · {c.nationality||"—"}</div></td>
                  <td style={{fontSize:13}}>{c.date}</td>
                  <td>{c.activity}</td>
                  <td style={{textAlign:"center"}}>{c.groupSize||1}</td>
                  <td style={{color:"var(--accent)",fontWeight:600}}>${Number(c.saleAmount).toLocaleString()}</td>
                  <td style={{fontSize:13}}>{c.salesperson}</td>
                  <td><span className={`badge ${c.status==="Confirmed"?"bc":c.status==="Pending"?"bpen":"bcan"}`}>{c.status}</span></td>
                  <td>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn bp bsm" onClick={()=>setSelected(c)}><Icon name="eye" size={13}/> Open</button>
                      <button className="btn bs bsm" onClick={()=>openEdit(c)}><Icon name="edit" size={13}/></button>
                      <button className="btn bd bsm" onClick={()=>del(c.id)}><Icon name="trash" size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <LeadDrawer client={selected} onClose={()=>setSelected(null)} onUpdate={updateClient} allProviders={providers.map(p=>p.name)}/>}

      {showModal && (
        <div className="mo" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="md">
            <div className="mt">{editing?"Edit Client":"New Client"}<button className="mc" onClick={()=>setShowModal(false)}><Icon name="x" size={20}/></button></div>
            <div className="fg">
              <div className="fgr full"><label>Full Name</label><input placeholder="e.g. Sofia Ramírez" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="fgr"><label>Age</label><input type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
              <div className="fgr"><label>Nationality</label><input placeholder="Mexican" value={form.nationality} onChange={e=>setForm({...form,nationality:e.target.value})}/></div>
              <div className="fgr"><label>Phone</label><input placeholder="+52 998…" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="fgr"><label>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div className="fgr"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
              <div className="fgr"><label>Group Size</label><input type="number" min={1} value={form.groupSize} onChange={e=>setForm({...form,groupSize:e.target.value})}/></div>
              <div className="fgr full"><label>Activity</label>
                <select value={form.activity} onChange={e=>setForm({...form,activity:e.target.value})}>
                  <option value="">Select activity…</option>
                  {activities.map(a=><option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="fgr"><label>Sale Amount (MXN $)</label><input type="number" value={form.saleAmount} onChange={e=>setForm({...form,saleAmount:e.target.value})}/></div>
              <div className="fgr"><label>Salesperson</label>
                <select value={form.salesperson} onChange={e=>setForm({...form,salesperson:e.target.value})}>
                  <option value="">Select…</option>
                  {salespersons.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="fgr"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                  {STATUSES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="fa">
              <button className="btn bs" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn bp" onClick={save}>Save Client</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── LEAD DRAWER ─────────────────────────────────────────────────────────────
function LeadDrawer({ client, onClose, onUpdate, allProviders }) {
  const [dtab, setDtab] = useState("overview");
  const fileRef = useRef();
  const c = client;
  const patch = (key, val) => onUpdate({...c, [key]: val});

  // QUOTES
  const [newQ, setNewQ] = useState("");
  const addQ = () => { if(!newQ.trim())return; patch("quotes",[...(c.quotes||[]),{id:Date.now(),text:newQ,date:new Date().toISOString().split("T")[0]}]); setNewQ(""); };

  // DISCOUNTS
  const [df, setDf] = useState({reason:"",percent:"",amount:""});
  const addD = () => { if(!df.reason)return; patch("discounts",[...(c.discounts||[]),{id:Date.now(),...df,percent:Number(df.percent),amount:Number(df.amount)}]); setDf({reason:"",percent:"",amount:""}); };

  // ITINERARY
  const [itf, setItf] = useState({time:"",activity:""});
  const addIt = () => { if(!itf.activity)return; const items=[...(c.itinerary||[]),{id:Date.now(),...itf,done:false}].sort((a,b)=>a.time.localeCompare(b.time)); patch("itinerary",items); setItf({time:"",activity:""}); };
  const togIt = id => patch("itinerary",c.itinerary.map(i=>i.id===id?{...i,done:!i.done}:i));
  const delIt = id => patch("itinerary",c.itinerary.filter(i=>i.id!==id));

  // PROVIDERS
  const [ps, setPs] = useState("");
  const addP = () => { if(!ps||(c.providersUsed||[]).includes(ps))return; patch("providersUsed",[...(c.providersUsed||[]),ps]); setPs(""); };

  // PHOTOS
  const addPh = e => {
    Array.from(e.target.files).forEach(file=>{
      const r=new FileReader(); r.onload=ev=>patch("photos",[...(c.photos||[]),{id:Date.now()+Math.random(),src:ev.target.result,name:file.name}]); r.readAsDataURL(file);
    }); e.target.value="";
  };

  // NOTES
  const [notes, setNotes] = useState(c.notes||"");

  const totalDisc = (c.discounts||[]).reduce((s,d)=>s+Number(d.amount),0);
  const netSale   = Number(c.saleAmount)-totalDisc;
  const itDone    = (c.itinerary||[]).filter(i=>i.done).length;

  const tabs = [
    {id:"overview", label:"Overview",  icon:"clients"},
    {id:"itinerary",label:"Itinerary", icon:"map",    cnt:(c.itinerary||[]).length, cntLabel:`${itDone}/${(c.itinerary||[]).length}`},
    {id:"quotes",   label:"Quotes",    icon:"quote",  cnt:(c.quotes||[]).length},
    {id:"discounts",label:"Discounts", icon:"discount",cnt:(c.discounts||[]).length},
    {id:"providers",label:"Providers", icon:"providers",cnt:(c.providersUsed||[]).length},
    {id:"photos",   label:"Photos",    icon:"image",  cnt:(c.photos||[]).length},
    {id:"notes",    label:"Notes",     icon:"note"},
  ];

  const box = (children, style={}) => (
    <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 18px",...style}}>{children}</div>
  );

  return (
    <>
      <div className="dov" onClick={onClose}/>
      <div className="drw">
        {/* HEADER */}
        <div className="dhead">
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                <div className="dname">{c.name}</div>
                <span className={`badge ${c.status==="Confirmed"?"bc":c.status==="Pending"?"bpen":"bcan"}`}>{c.status}</span>
              </div>
              <div className="dmeta">
                <span className="dmi"><Icon name="users" size={13}/> {c.groupSize||1} pax · Age {c.age}</span>
                {c.phone&&<span className="dmi"><Icon name="phone" size={13}/> {c.phone}</span>}
                {c.email&&<span className="dmi"><Icon name="mail" size={13}/> {c.email}</span>}
                {c.nationality&&<span className="dmi"><Icon name="globe" size={13}/> {c.nationality}</span>}
              </div>
              <div style={{marginTop:14,display:"flex",gap:24,flexWrap:"wrap"}}>
                {[
                  {label:"Activity",   val:c.activity,                  color:"var(--accent)"},
                  {label:"Sale",       val:`$${Number(c.saleAmount).toLocaleString()}`, color:"var(--text)"},
                  {label:"Discounts",  val:`-$${totalDisc.toLocaleString()}`,           color:"var(--accent2)"},
                  {label:"Net",        val:`$${netSale.toLocaleString()}`,              color:"var(--green)", bold:true},
                  {label:"Date",       val:c.date,                      color:"var(--text2)"},
                  {label:"Salesperson",val:c.salesperson,               color:"var(--text2)"},
                ].map(item=>(
                  <div key={item.label}>
                    <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{item.label}</div>
                    <div style={{fontSize:14,fontWeight:item.bold?700:500,color:item.color}}>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="mc" onClick={onClose} style={{marginLeft:16}}><Icon name="x" size={22}/></button>
          </div>
        </div>

        {/* SUB-TABS */}
        <div className="dtabs">
          {tabs.map(t=>(
            <button key={t.id} className={`dt${dtab===t.id?" active":""}`} onClick={()=>setDtab(t.id)}>
              <Icon name={t.icon} size={13}/>
              {t.label}
              {t.cnt>0&&<span className="cnt">{t.cntLabel||t.cnt}</span>}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {dtab==="overview"&&(
          <div className="dsec">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
              {[
                {l:"Quotes",    v:(c.quotes||[]).length,        col:"var(--accent3)"},
                {l:"Discounts", v:`-$${totalDisc.toLocaleString()}`,col:"var(--accent2)"},
                {l:"Itinerary", v:`${itDone}/${(c.itinerary||[]).length} done`,col:"var(--accent)"},
                {l:"Photos",    v:(c.photos||[]).length,        col:"var(--gold)"},
              ].map(item=>(
                <div key={item.l} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 18px"}}>
                  <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{item.l}</div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:20,fontWeight:800,color:item.col}}>{item.v}</div>
                </div>
              ))}
            </div>
            {box(<>
              <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Providers Used</div>
              {(c.providersUsed||[]).length===0?<div style={{color:"var(--muted)",fontSize:13}}>No providers linked yet.</div>:
                <div>{(c.providersUsed||[]).map(p=><span key={p} className="ptag"><Icon name="providers" size={13}/>{p}</span>)}</div>}
            </>)}
            {c.notes&&<div style={{marginTop:14}}>{box(<>
              <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Notes</div>
              <div style={{fontSize:14,lineHeight:1.7,color:"var(--text2)"}}>{c.notes}</div>
            </>)}</div>}
            {(c.quotes||[]).length>0&&<div style={{marginTop:14}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:10,color:"var(--accent3)"}}>Latest Quote</div>
              <div className="qi"><div className="qtxt">"{c.quotes[c.quotes.length-1].text}"</div><div className="qd">{c.quotes[c.quotes.length-1].date}</div></div>
            </div>}
          </div>
        )}

        {/* ── ITINERARY ── */}
        {dtab==="itinerary"&&(
          <div className="dsec">
            {box(<>
              <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Add Stop</div>
              <div style={{display:"grid",gridTemplateColumns:"110px 1fr auto",gap:10,alignItems:"flex-end"}}>
                <div className="fgr" style={{marginBottom:0}}><label>Time</label><input type="time" value={itf.time} onChange={e=>setItf({...itf,time:e.target.value})}/></div>
                <div className="fgr" style={{marginBottom:0}}><label>Activity / Description</label><input placeholder="e.g. Cenote snorkeling session" value={itf.activity} onChange={e=>setItf({...itf,activity:e.target.value})} onKeyDown={e=>e.key==="Enter"&&addIt()}/></div>
                <button className="btn bp" onClick={addIt}><Icon name="plus" size={14}/></button>
              </div>
            </>,{marginBottom:20})}
            {(c.itinerary||[]).length===0&&<div className="empty">No itinerary stops yet. Add the first one above.</div>}
            {(c.itinerary||[]).map(item=>(
              <div key={item.id} className="irow">
                <div className="itime">{item.time||"—"}</div>
                <button className={`idot${item.done?" done":""}`} onClick={()=>togIt(item.id)}>
                  {item.done&&<Icon name="check" size={13} style={{color:"#0a0f1e"}}/>}
                </button>
                <div className={`itxt${item.done?" done":""}`}>{item.activity}</div>
                <button className="btn bd bxs" style={{marginLeft:8}} onClick={()=>delIt(item.id)}><Icon name="trash" size={12}/></button>
              </div>
            ))}
            {(c.itinerary||[]).length>0&&(
              <div style={{marginTop:16,display:"flex",gap:10,padding:"12px 16px",background:"var(--surface2)",borderRadius:10,border:"1px solid var(--border)"}}>
                <div style={{flex:1}}><div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1}}>Progress</div>
                  <div style={{marginTop:6,height:6,background:"var(--border)",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",background:"var(--accent)",borderRadius:3,width:`${(itDone/(c.itinerary||[1]).length)*100}%`,transition:"width .3s"}}/>
                  </div>
                </div>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,color:"var(--accent)"}}>{itDone}/{(c.itinerary||[]).length}</div>
              </div>
            )}
          </div>
        )}

        {/* ── QUOTES ── */}
        {dtab==="quotes"&&(
          <div className="dsec">
            {box(<>
              <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Add Client Quote</div>
              <textarea rows={3} placeholder='"This tour was absolutely incredible…"' value={newQ} onChange={e=>setNewQ(e.target.value)}/>
              <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
                <button className="btn bp bsm" onClick={addQ}><Icon name="quote" size={14}/> Save Quote</button>
              </div>
            </>,{marginBottom:20})}
            {(c.quotes||[]).length===0&&<div className="empty">No quotes yet. Add something memorable the client said!</div>}
            {(c.quotes||[]).map(q=>(
              <div key={q.id} className="qi">
                <div className="qtxt">"{q.text}"</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div className="qd">{q.date}</div>
                  <button className="btn bd bxs" onClick={()=>patch("quotes",c.quotes.filter(x=>x.id!==q.id))}><Icon name="trash" size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── DISCOUNTS ── */}
        {dtab==="discounts"&&(
          <div className="dsec">
            {(c.discounts||[]).length>0&&(
              <div style={{background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.2)",borderRadius:10,padding:14,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:14,color:"var(--text2)"}}>Total discounts applied</span>
                <span style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"var(--accent2)"}}>−${totalDisc.toLocaleString()} MXN</span>
              </div>
            )}
            {box(<>
              <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Add Discount</div>
              <div className="fg">
                <div className="fgr full"><label>Reason</label><input placeholder="e.g. Loyalty return client" value={df.reason} onChange={e=>setDf({...df,reason:e.target.value})}/></div>
                <div className="fgr"><label>Discount %</label><input type="number" min={0} max={100} placeholder="10" value={df.percent} onChange={e=>setDf({...df,percent:e.target.value})}/></div>
                <div className="fgr"><label>Amount (MXN $)</label><input type="number" placeholder="500" value={df.amount} onChange={e=>setDf({...df,amount:e.target.value})}/></div>
              </div>
              <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}>
                <button className="btn bp bsm" onClick={addD}><Icon name="discount" size={14}/> Add Discount</button>
              </div>
            </>,{marginBottom:20})}
            {(c.discounts||[]).length===0&&<div className="empty">No discounts applied yet.</div>}
            {(c.discounts||[]).map(d=>(
              <div key={d.id} className="di">
                <div className="dpct">{d.percent}%</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500,fontSize:14}}>{d.reason}</div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:2}}>−${Number(d.amount).toLocaleString()} MXN off</div>
                </div>
                <button className="btn bd bxs" onClick={()=>patch("discounts",c.discounts.filter(x=>x.id!==d.id))}><Icon name="trash" size={12}/></button>
              </div>
            ))}
          </div>
        )}

        {/* ── PROVIDERS ── */}
        {dtab==="providers"&&(
          <div className="dsec">
            {box(<>
              <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Link a Provider</div>
              <div style={{display:"flex",gap:10}}>
                <select value={ps} onChange={e=>setPs(e.target.value)} style={{flex:1}}>
                  <option value="">Select provider…</option>
                  {allProviders.map(p=><option key={p}>{p}</option>)}
                </select>
                <button className="btn bp" onClick={addP}><Icon name="plus" size={14}/> Link</button>
              </div>
            </>,{marginBottom:20})}
            {(c.providersUsed||[]).length===0&&<div className="empty">No providers linked to this lead yet.</div>}
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {(c.providersUsed||[]).map(p=>(
                <div key={p} className="ptag" style={{padding:"10px 16px"}}>
                  <Icon name="providers" size={14}/>
                  <span style={{fontWeight:500}}>{p}</span>
                  <button onClick={()=>patch("providersUsed",c.providersUsed.filter(x=>x!==p))} style={{background:"none",border:"none",cursor:"pointer",color:"var(--muted)",display:"flex",marginLeft:4,padding:0}}>
                    <Icon name="x" size={14}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PHOTOS ── */}
        {dtab==="photos"&&(
          <div className="dsec">
            <div style={{marginBottom:16,fontSize:13,color:"var(--muted)"}}>Upload photos of tours, clients, venues, or any visual reference for this lead.</div>
            <div className="pgrid">
              {(c.photos||[]).map(p=>(
                <div key={p.id} className="pthumb">
                  <img src={p.src} alt={p.name}/>
                  <button className="pdel" onClick={()=>patch("photos",c.photos.filter(x=>x.id!==p.id))}><Icon name="x" size={14}/></button>
                </div>
              ))}
              <div className="pupl" onClick={()=>fileRef.current?.click()}>
                <Icon name="upload" size={24}/><span>Upload Photo</span>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={addPh}/>
          </div>
        )}

        {/* ── NOTES ── */}
        {dtab==="notes"&&(
          <div className="dsec">
            <div style={{fontSize:13,color:"var(--muted)",marginBottom:12}}>General notes, special requirements, internal comments, preferences — anything relevant for this lead.</div>
            <textarea rows={12} placeholder="Add any general information about this client — preferences, special requests, follow-up notes, internal comments…" value={notes} onChange={e=>setNotes(e.target.value)} style={{width:"100%",marginBottom:12}}/>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <button className="btn bp" onClick={()=>patch("notes",notes)}><Icon name="check" size={14}/> Save Notes</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── SALES TAB ───────────────────────────────────────────────────────────────
function SalesTab({ clients }) {
  const confirmed   = clients.filter(c=>c.status==="Confirmed");
  const totalSales  = confirmed.reduce((s,c)=>s+Number(c.saleAmount),0);
  const totalAll    = clients.reduce((s,c)=>s+Number(c.saleAmount),0);
  const salesComm   = totalSales*.05;
  const netIncome   = totalSales*.20-salesComm;

  const spMap={};
  confirmed.forEach(c=>{ if(!spMap[c.salesperson])spMap[c.salesperson]={sales:0,count:0}; spMap[c.salesperson].sales+=Number(c.saleAmount); spMap[c.salesperson].count+=1; });
  const spList=Object.entries(spMap).sort((a,b)=>b[1].sales-a[1].sales);
  const maxSP=spList[0]?.[1]?.sales||1;

  const actMap={};
  confirmed.forEach(c=>{ if(!actMap[c.activity])actMap[c.activity]=0; actMap[c.activity]+=Number(c.saleAmount); });
  const actList=Object.entries(actMap).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxAct=actList[0]?.[1]||1;
  const barColors=["var(--accent)","var(--accent3)","var(--accent2)","var(--gold)","#ec4899","#06b6d4"];

  return (
    <>
      <div className="sech"><div><div className="sect">Sales Summary</div><div className="secs">Current month — confirmed sales only</div></div></div>
      <div className="sg">
        <div className="sc t"><div className="slbl">Total Revenue</div><div className="sval">${totalSales.toLocaleString()}</div><div className="ssub">{confirmed.length} confirmed sales</div></div>
        <div className="sc o"><div className="slbl">5% Sales Commission</div><div className="sval">${salesComm.toLocaleString()}</div><div className="ssub">Paid to salespeople</div></div>
        <div className="sc p"><div className="slbl">Net Company Income</div><div className="sval">${netIncome.toLocaleString()}</div><div className="ssub">20% gross − 5% commission</div></div>
        <div className="sc g"><div className="slbl">Pending Revenue</div><div className="sval">${(totalAll-totalSales).toLocaleString()}</div><div className="ssub">{clients.filter(c=>c.status==="Pending").length} pending</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
        <div className="card">
          <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,marginBottom:16}}>Revenue by Salesperson</div>
          {spList.length===0&&<div className="empty">No confirmed sales yet.</div>}
          {spList.map(([name,data])=>(
            <div key={name} className="spr">
              <div style={{fontWeight:500,fontSize:14,minWidth:100}}>{name}</div>
              <div className="spbw"><div className="spb" style={{width:`${(data.sales/maxSP)*100}%`}}/></div>
              <div style={{fontSize:13,color:"var(--muted)",minWidth:90,textAlign:"right"}}>${data.sales.toLocaleString()}<br/><span style={{fontSize:11,color:"var(--accent)"}}>${(data.sales*.05).toLocaleString()} comm.</span></div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,marginBottom:16}}>Revenue by Activity</div>
          {actList.length===0&&<div className="empty">No data.</div>}
          <div className="bch">
            {actList.map(([act,val],i)=>(
              <div key={act} className="bc2">
                <div style={{fontSize:11,fontWeight:600}}>${(val/1000).toFixed(1)}k</div>
                <div className="bar" style={{height:`${(val/maxAct)*100}px`,background:barColors[i%barColors.length]}}/>
                <div style={{fontSize:10,color:"var(--muted)",textAlign:"center"}}>{act.split(" ")[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,marginBottom:16}}>Income Breakdown</div>
        <div className="tw">
          <table>
            <thead><tr><th>Client</th><th>Activity</th><th>Sale</th><th>Discounts</th><th>Net Sale</th><th>5% Comm.</th><th>20% Gross</th><th>Net to Company</th></tr></thead>
            <tbody>
              {confirmed.map(c=>{
                const disc=(c.discounts||[]).reduce((s,d)=>s+Number(d.amount),0);
                const net=Number(c.saleAmount)-disc;
                const gross=net*.20; const comm=net*.05;
                return (
                  <tr key={c.id}>
                    <td style={{fontWeight:600}}>{c.name}</td>
                    <td style={{fontSize:13}}>{c.activity}</td>
                    <td>${Number(c.saleAmount).toLocaleString()}</td>
                    <td style={{color:"var(--accent2)"}}>{disc>0?`-$${disc.toLocaleString()}`:"—"}</td>
                    <td style={{fontWeight:600}}>${net.toLocaleString()}</td>
                    <td style={{color:"var(--accent2)"}}>${comm.toLocaleString()}</td>
                    <td style={{color:"var(--accent3)"}}>${gross.toLocaleString()}</td>
                    <td style={{color:"var(--accent)",fontWeight:700}}>${(gross-comm).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── PROVIDERS TAB ────────────────────────────────────────────────────────────
function ProvidersTab({ providers, setProviders }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({name:"",category:"",contact:"",phone:"",rating:5,notes:""});
  const openAdd  = () => { setEditing(null); setForm({name:"",category:"",contact:"",phone:"",rating:5,notes:""}); setShowModal(true); };
  const openEdit = p => { setEditing(p.id); setForm({...p}); setShowModal(true); };
  const save = () => {
    if(!form.name)return;
    if(editing) setProviders(prev=>prev.map(p=>p.id===editing?{...form,id:editing,rating:Number(form.rating)}:p));
    else setProviders(prev=>[...prev,{...form,id:Date.now(),rating:Number(form.rating)}]);
    setShowModal(false);
  };
  return (
    <>
      <div className="sech">
        <div><div className="sect">Providers</div><div className="secs">{providers.length} registered providers</div></div>
        <button className="btn bp" onClick={openAdd}><Icon name="plus" size={16}/> Add Provider</button>
      </div>
      <div className="prov-grid">
        {providers.map(p=>(
          <div key={p.id} className="prov-card">
            <div style={{fontFamily:"Syne,sans-serif",fontSize:16,fontWeight:700,marginBottom:4}}>{p.name}</div>
            <div style={{fontSize:12,color:"var(--accent)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{p.category}</div>
            <div style={{display:"flex",gap:2,marginBottom:12}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=p.rating?"var(--gold)":"var(--border)",fontSize:14}}>★</span>)}</div>
            <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.9}}>📧 {p.contact}<br/>📞 {p.phone}{p.notes&&<><br/>📝 {p.notes}</>}</div>
            <div style={{display:"flex",gap:8,marginTop:14}}>
              <button className="btn bs bsm" onClick={()=>openEdit(p)}><Icon name="edit" size={13}/> Edit</button>
              <button className="btn bd bsm" onClick={()=>setProviders(prev=>prev.filter(x=>x.id!==p.id))}><Icon name="trash" size={13}/></button>
            </div>
          </div>
        ))}
      </div>
      {showModal&&(
        <div className="mo" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="md">
            <div className="mt">{editing?"Edit Provider":"New Provider"}<button className="mc" onClick={()=>setShowModal(false)}><Icon name="x" size={20}/></button></div>
            <div className="fg">
              <div className="fgr full"><label>Company Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="fgr"><label>Category</label><input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></div>
              <div className="fgr"><label>Rating (1–5)</label><select value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})}>{[5,4,3,2,1].map(r=><option key={r} value={r}>{r} ★</option>)}</select></div>
              <div className="fgr"><label>Email</label><input type="email" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/></div>
              <div className="fgr"><label>Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="fgr full"><label>Notes</label><textarea rows={3} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
            </div>
            <div className="fa"><button className="btn bs" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn bp" onClick={save}>Save Provider</button></div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── TASKS TAB ───────────────────────────────────────────────────────────────
function TasksTab({ tasks, setTasks, clients }) {
  const [newTask, setNewTask] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const addManual = () => { if(!newTask.trim())return; setTasks(prev=>[...prev,{id:Date.now(),text:newTask,done:false,type:"manual",priority:"medium"}]); setNewTask(""); };
  const toggle = id => setTasks(prev=>prev.map(t=>t.id===id?{...t,done:!t.done}:t));
  const del    = id => setTasks(prev=>prev.filter(t=>t.id!==id));

  const getAI = async () => {
    setAiLoading(true);
    const pending   = clients.filter(c=>c.status==="Pending").map(c=>c.name);
    const confirmed = clients.filter(c=>c.status==="Confirmed").map(c=>c.name);
    const total     = clients.reduce((s,c)=>s+Number(c.saleAmount),0);
    const context = `You are a business assistant for a tour & experiences company in Cancún, Mexico.\nCurrent data:\n- Pending: ${pending.join(", ")||"none"}\n- Confirmed: ${confirmed.join(", ")||"none"}\n- Pipeline: $${total.toLocaleString()} MXN\n- Request: ${aiPrompt||"General suggestions"}\nReturn ONLY a JSON array of 3-4 actionable task strings, no extra text or backticks.`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:context}]})});
      const data = await res.json();
      const text = data.content?.map(i=>i.text||"").join("").trim();
      const sugs = JSON.parse(text.replace(/```json|```/g,"").trim());
      setTasks(prev=>[...prev,...sugs.map(s=>({id:Date.now()+Math.random(),text:s,done:false,type:"ai",priority:"medium"}))]);
      setAiPrompt("");
    } catch(e) { setTasks(prev=>[...prev,{id:Date.now(),text:"⚠️ Could not fetch AI suggestions.",done:false,type:"ai",priority:"low"}]); }
    setAiLoading(false);
  };

  const filtered = tasks.filter(t=>{
    if(filter==="ai")      return t.type==="ai";
    if(filter==="manual")  return t.type==="manual";
    if(filter==="pending") return !t.done;
    if(filter==="done")    return t.done;
    return true;
  });
  const done = tasks.filter(t=>t.done).length;

  return (
    <>
      <div className="sech"><div><div className="sect">Tasks & AI Suggestions</div><div className="secs">{done}/{tasks.length} completed</div></div></div>
      <div className="ai-panel">
        <div className="aih"><Icon name="spark" size={18}/><span className="ail">AI Task Generator</span><span className="badge bai">Powered by Claude</span></div>
        <div className="air">
          <input placeholder="e.g. 'focus on upselling whale shark tours'…" value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!aiLoading&&getAI()}/>
          <button className="btn bp" onClick={getAI} disabled={aiLoading}>{aiLoading?<><Icon name="loading" size={16}/> Thinking…</>:<><Icon name="spark" size={16}/> Generate</>}</button>
        </div>
      </div>
      <div className="card">
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {["all","pending","done","ai","manual"].map(f=>(
            <button key={f} className={`btn bsm ${filter===f?"bp":"bs"}`} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
          ))}
        </div>
        <div className="row">
          <input className="grow" placeholder="Add your own task…" value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addManual()}/>
          <button className="btn bp" onClick={addManual}><Icon name="plus" size={16}/> Add</button>
        </div>
        {filtered.length===0&&<div className="empty">No tasks here yet.</div>}
        {filtered.map(t=>(
          <div key={t.id} className="ti">
            <button className={`tck${t.done?" done":""}`} onClick={()=>toggle(t.id)}/>
            <div style={{flex:1}}>
              <div style={{fontSize:14,textDecoration:t.done?"line-through":"none",color:t.done?"var(--muted)":"var(--text)"}}>{t.text}</div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginTop:4}}>
                <span className={`badge ${t.priority==="high"?"bhi":t.priority==="medium"?"bme":"blo"}`}>{t.priority}</span>
                <span className={`badge ${t.type==="ai"?"bai":"bma"}`}>{t.type==="ai"?"✦ AI":"✎ Manual"}</span>
              </div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              {["high","medium","low"].map(p=>(
                <button key={p} className="btn bs bxs" style={{color:t.priority===p?"var(--accent)":undefined}} onClick={()=>setTasks(prev=>prev.map(x=>x.id===t.id?{...x,priority:p}:x))}>{p[0].toUpperCase()}</button>
              ))}
              <button className="btn bd bxs" onClick={()=>del(t.id)}><Icon name="trash" size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
function SettingsTab({ activities, setActivities, salespersons, setSalespersons }) {
  const [newActivity, setNewActivity] = useState("");
  const [newSP, setNewSP]             = useState("");
  const [editingAct, setEditingAct]   = useState(null);
  const [editActVal, setEditActVal]   = useState("");
  const [editingSP, setEditingSP]     = useState(null);
  const [editSPVal, setEditSPVal]     = useState("");

  const addActivity = () => { const v=newActivity.trim(); if(!v||activities.includes(v))return; setActivities(p=>[...p,v]); setNewActivity(""); };
  const delActivity = i => setActivities(p=>p.filter((_,idx)=>idx!==i));
  const saveActivity = i => { const v=editActVal.trim(); if(!v)return; setActivities(p=>p.map((a,idx)=>idx===i?v:a)); setEditingAct(null); };

  const addSP = () => { const v=newSP.trim(); if(!v||salespersons.includes(v))return; setSalespersons(p=>[...p,v]); setNewSP(""); };
  const delSP = i => setSalespersons(p=>p.filter((_,idx)=>idx!==i));
  const saveSP = i => { const v=editSPVal.trim(); if(!v)return; setSalespersons(p=>p.map((s,idx)=>idx===i?v:s)); setEditingSP(null); };

  const Section = ({ title, subtitle, accent, items, newVal, setNewVal, onAdd, onDel, editIdx, setEdit, editVal, setEditVal, onSave }) => (
    <div className="card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:700,marginBottom:3}}>{title}</div>
          <div style={{fontSize:13,color:"var(--muted)"}}>{subtitle}</div>
        </div>
        <span style={{background:`rgba(${accent},0.12)`,color:`rgb(${accent})`,padding:"4px 12px",borderRadius:20,fontSize:13,fontWeight:600,whiteSpace:"nowrap"}}>{items.length} item{items.length!==1?"s":""}</span>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <input placeholder={`New ${title.toLowerCase().replace(" types","")}…`} value={newVal} onChange={e=>setNewVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onAdd()} style={{flex:1}}/>
        <button className="btn bp" onClick={onAdd}><Icon name="plus" size={15}/> Add</button>
      </div>
      {items.length===0&&<div className="empty" style={{padding:"16px 0"}}>No items yet.</div>}
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {items.map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"var(--surface2)",borderRadius:8,border:"1px solid var(--border)"}}>
            {editIdx===i?(
              <>
                <input value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")onSave(i);if(e.key==="Escape")setEdit(null);}} style={{flex:1,padding:"6px 10px",fontSize:13}} autoFocus/>
                <button className="btn bp bxs" onClick={()=>onSave(i)}>Save</button>
                <button className="btn bs bxs" onClick={()=>setEdit(null)}>Cancel</button>
              </>
            ):(
              <>
                <div style={{flex:1,fontSize:14,fontWeight:500}}>{item}</div>
                <button className="btn bs bxs" onClick={()=>{setEdit(i);setEditVal(item);}}><Icon name="edit" size={13}/></button>
                <button className="btn bd bxs" onClick={()=>onDel(i)}><Icon name="trash" size={13}/></button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="sech">
        <div><div className="sect">Settings</div><div className="secs">Manage activity types and salespeople used across the CRM</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,alignItems:"start",marginBottom:24}}>
        <Section
          title="Activity Types" subtitle="These appear in the Activity dropdown when adding or editing a client."
          accent="0,201,167"
          items={activities} newVal={newActivity} setNewVal={setNewActivity} onAdd={addActivity} onDel={delActivity}
          editIdx={editingAct} setEdit={setEditingAct} editVal={editActVal} setEditVal={setEditActVal} onSave={saveActivity}
        />
        <Section
          title="Salespeople" subtitle="These appear in the Salesperson dropdown when adding or editing a client."
          accent="129,140,248"
          items={salespersons} newVal={newSP} setNewVal={setNewSP} onAdd={addSP} onDel={delSP}
          editIdx={editingSP} setEdit={setEditingSP} editVal={editSPVal} setEditVal={setEditSPVal} onSave={saveSP}
        />
      </div>
      <div style={{background:"rgba(129,140,248,.06)",border:"1px solid rgba(129,140,248,.18)",borderRadius:14,padding:"18px 22px",display:"flex",gap:14,alignItems:"flex-start"}}>
        <Icon name="settings" size={20} style={{color:"var(--accent3)",marginTop:2,flexShrink:0}}/>
        <div>
          <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>How changes apply</div>
          <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.75}}>
            Edits here take effect immediately in the <strong style={{color:"var(--text)"}}>New Client</strong> and <strong style={{color:"var(--text)"}}>Edit Client</strong> forms. Existing client records are not affected — their saved activity and salesperson values are preserved even if you rename or remove an option from these lists.
          </div>
        </div>
      </div>
    </>
  );
}
