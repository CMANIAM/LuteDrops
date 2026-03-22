import { useState, useRef, useEffect } from "react";

const GOLD = "#F0B429";
const BLACK = "#0d0d0d";
const CARD = "#161616";
const BORDER = "#252525";
const MUTED = "#555";
const TEXT = "#eeeeee";
const SOFT = "#999";

const CATEGORIES = ["Food 🍕","Events 🎉","Supplies 📦","Sports ⚽","Study 📚","Housing 🏠","Other 🎁"];

const now = new Date();
const fmt = (h,m) => { const d = new Date(now); d.setHours(h,m,0,0); return d; };

const SAMPLE_DROPS = [
  { id:1, host:"Marcus T.", avatar:"MT", rating:4.8, ratingCount:23, title:"Leftover Pizza — 6 Boxes", category:"Food 🍕", location:"AUC Room 133", date:"Today", time:"3:00 PM – 4:00 PM", expiresAt:fmt(16,0), description:"Student Gov had our end-of-year meeting. Six full boxes of Domino's going free. Come anytime in the window.", posted:"8 min ago", hot:true },
  { id:2, host:"Priya K.", avatar:"PK", rating:5.0, ratingCount:11, title:"PSYC 101 Textbooks (3 copies)", category:"Supplies 📦", location:"Mortvedt Library Entrance", date:"Today", time:"All day", expiresAt:fmt(23,59), description:"Just graduated! Leaving three copies of the Psych 101 textbook on the table by the entrance.", posted:"1 hr ago", hot:false },
  { id:3, host:"Jordan V.", avatar:"JV", rating:3.9, ratingCount:7, title:"Study Group Snacks", category:"Study 📚", location:"Mortvedt 2nd Floor, Table 4", date:"Today", time:"6:00 PM – 9:00 PM", expiresAt:fmt(21,0), description:"We massively over-bought snacks for our bio study session. Come join or just grab and go.", posted:"5 min ago", hot:true },
  { id:4, host:"Amelia R.", avatar:"AR", rating:4.5, ratingCount:34, title:"Jazz Ensemble Tickets x2", category:"Events 🎉", location:"Music Building Box Office", date:"Tonight", time:"7:30 PM", expiresAt:fmt(19,30), description:"Can't make it tonight. Two tickets at will-call under my name. First person to show up gets them.", posted:"30 min ago", hot:false },
  { id:5, host:"Dev S.", avatar:"DS", rating:4.2, ratingCount:16, title:"Soccer Cleats — Size 10", category:"Sports ⚽", location:"Olson Gym Front Desk", date:"Tomorrow", time:"8:00 AM – 5:00 PM", expiresAt:fmt(23,59), description:"Brand new Adidas cleats, never worn. Leaving them at the front desk. Ask for the free cleats drop.", posted:"2 hrs ago", hot:false },
];

function Stars({ rating, count, size=13 }) {
  const full = Math.floor(rating);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"4px" }}>
      <span style={{ display:"inline-flex", gap:"1px" }}>
        {[1,2,3,4,5].map(i=><span key={i} style={{ fontSize:size, color:i<=full?GOLD:"#333" }}>★</span>)}
      </span>
      <span style={{ fontSize:size-2, color:SOFT, fontFamily:"'DM Mono',monospace" }}>{rating.toFixed(1)}</span>
      <span style={{ fontSize:size-3, color:"#444", fontFamily:"'DM Sans',sans-serif" }}>({count})</span>
    </span>
  );
}

function Avatar({ initials, size=40, gold=false }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:gold?GOLD:"#222", border:`2px solid ${gold?GOLD:BORDER}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:size*0.35, color:gold?BLACK:SOFT, flexShrink:0 }}>
      {initials}
    </div>
  );
}

function TimeLeft({ expiresAt }) {
  const diff = expiresAt - new Date();
  if(diff<=0) return <span style={{ fontSize:"10px", color:"#e63946", fontFamily:"'DM Sans',sans-serif", fontWeight:700 }}>EXPIRED</span>;
  const hrs = Math.floor(diff/3600000);
  const mins = Math.floor((diff%3600000)/60000);
  const urgent = hrs<1;
  return <span style={{ fontSize:"10px", color:urgent?"#e63946":MUTED, fontFamily:"'DM Sans',sans-serif", fontWeight:700 }}>{hrs>0?`${hrs}h `:""}{mins}m left</span>;
}

function DropCard({ drop, notified, onRate, onSave, saved }) {
  const [expanded, setExpanded] = useState(false);
  const [rated, setRated] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);
  const expired = drop.expiresAt < new Date();
  return (
    <div style={{ background:CARD, border:`1.5px solid ${drop.hot&&!expired?GOLD:BORDER}`, borderRadius:"18px", marginBottom:"14px", overflow:"hidden", opacity:expired?0.5:1 }}>
      <div style={{ padding:"16px 18px", cursor:"pointer" }} onClick={()=>setExpanded(e=>!e)}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
          <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
            <Avatar initials={drop.avatar}/>
            <div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"13px", color:TEXT }}>{drop.host}</div>
              <Stars rating={drop.rating} count={drop.ratingCount}/>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"4px" }}>
            {drop.hot&&!expired && <span style={{ background:GOLD, color:BLACK, fontSize:"9px", fontWeight:900, fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", padding:"2px 8px", borderRadius:"20px" }}>🔥 HOT</span>}
            {expired && <span style={{ background:"#2a1a1a", color:"#e63946", fontSize:"9px", fontWeight:900, fontFamily:"'DM Sans',sans-serif", letterSpacing:"1px", padding:"2px 8px", borderRadius:"20px" }}>EXPIRED</span>}
            {notified&&!expired && <span style={{ background:"#1a2a1a", border:"1px solid #2d5a2d", color:"#6fcf97", fontSize:"9px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", padding:"2px 8px", borderRadius:"20px" }}>PINGED</span>}
            <TimeLeft expiresAt={drop.expiresAt}/>
          </div>
        </div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"17px", fontWeight:800, color:TEXT, marginBottom:"10px", lineHeight:1.2 }}>{drop.title}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
          {[`📍 ${drop.location}`,`📅 ${drop.date}`,`🕐 ${drop.time}`,drop.category].map(l=>(
            <span key={l} style={{ background:"#1a1a1a", border:`1px solid ${BORDER}`, color:SOFT, padding:"4px 10px", borderRadius:"8px", fontSize:"11px", fontFamily:"'DM Sans',sans-serif" }}>{l}</span>
          ))}
        </div>
      </div>
      {expanded && (
        <div style={{ padding:"0 18px 18px", borderTop:`1px solid ${BORDER}` }}>
          <p style={{ color:"#aaa", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, margin:"14px 0 16px" }}>{drop.description}</p>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            {!rated ? (
              <div>
                <div style={{ fontSize:"11px", fontWeight:700, color:MUTED, letterSpacing:"1px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"8px" }}>Rate this host</div>
                <div style={{ display:"flex", gap:"6px" }}>
                  {[1,2,3,4,5].map(s=>(
                    <span key={s} onMouseEnter={()=>setHoverStar(s)} onMouseLeave={()=>setHoverStar(0)}
                      onClick={e=>{e.stopPropagation();setRated(true);onRate(drop.id,s);}}
                      style={{ fontSize:"24px", cursor:"pointer", color:s<=(hoverStar||0)?GOLD:"#2a2a2a", transition:"color 0.1s" }}>★</span>
                  ))}
                </div>
              </div>
            ) : <div style={{ fontSize:"12px", color:"#6fcf97", fontFamily:"'DM Sans',sans-serif", fontWeight:700 }}>✓ Rated!</div>}
            {!expired && (
              <button onClick={e=>{e.stopPropagation();onSave(drop.id);}}
                style={{ background:saved?"#1a2a1a":CARD, border:`1.5px solid ${saved?"#2d5a2d":BORDER}`, borderRadius:"10px", padding:"8px 14px", color:saved?"#6fcf97":MUTED, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>
                {saved?"✓ Saved":"🔖 Save"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [verifyStep, setVerifyStep] = useState(false);

  const handleSubmit = () => {
    setError("");
    if(mode==="signup") {
      if(!email.endsWith("@plu.edu")) { setError("Must use a @plu.edu email address"); return; }
      if(!name) { setError("Please enter your name"); return; }
      if(password.length<6) { setError("Password must be at least 6 characters"); return; }
      setVerifyStep(true); return;
    }
    if(!email||!password) { setError("Please fill in all fields"); return; }
    onLogin({ name:email.split("@")[0], email, avatar:email.slice(0,2).toUpperCase() });
  };

  if(verifyStep) return (
    <div style={{ minHeight:"100vh", background:BLACK, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", maxWidth:"480px", margin:"0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
      <div style={{ fontSize:"48px", marginBottom:"20px" }}>📬</div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"24px", fontWeight:800, color:GOLD, marginBottom:"12px", textAlign:"center" }}>Check your inbox!</div>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color:MUTED, textAlign:"center", lineHeight:1.6, marginBottom:"28px" }}>
        We sent a verification link to<br/>
        <span style={{ color:TEXT, fontWeight:700 }}>{email}</span><br/>
        Click it to confirm you're a Lute 🎓
      </p>
      <button onClick={()=>onLogin({ name, email, avatar:name.slice(0,2).toUpperCase() })}
        style={{ background:GOLD, border:"none", borderRadius:"12px", padding:"13px 32px", color:BLACK, fontWeight:800, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer", width:"100%", marginBottom:"12px" }}>
        I verified my email →
      </button>
      <button onClick={()=>setVerifyStep(false)} style={{ background:"none", border:"none", color:MUTED, fontFamily:"'DM Sans',sans-serif", fontSize:"13px", cursor:"pointer" }}>Go back</button>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BLACK, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", maxWidth:"480px", margin:"0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
      <div style={{ marginBottom:"32px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"36px", fontWeight:800, color:GOLD, letterSpacing:"-1px" }}>LuteDrops 🎓</div>
        <div style={{ fontSize:"11px", color:"#3a3a3a", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginTop:"4px" }}>Pacific Lutheran University</div>
      </div>
      <div style={{ width:"100%", background:CARD, borderRadius:"20px", border:`1.5px solid ${BORDER}`, padding:"24px 20px" }}>
        <div style={{ display:"flex", gap:"8px", marginBottom:"24px" }}>
          {["login","signup"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setError("");}}
              style={{ flex:1, background:mode===m?GOLD:"transparent", border:mode===m?"none":`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px", color:mode===m?BLACK:MUTED, fontWeight:800, fontFamily:"'DM Sans',sans-serif", fontSize:"13px", cursor:"pointer" }}>
              {m==="login"?"Log In":"Sign Up"}
            </button>
          ))}
        </div>
        {mode==="signup" && (
          <div style={{ marginBottom:"14px" }}>
            <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>Your Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex Lute"
              style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", boxSizing:"border-box", outline:"none" }}/>
          </div>
        )}
        <div style={{ marginBottom:"14px" }}>
          <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>PLU Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="yourname@plu.edu" type="email"
            style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${error&&error.includes("plu")?"#e63946":BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", boxSizing:"border-box", outline:"none" }}/>
        </div>
        <div style={{ marginBottom:"20px" }}>
          <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password"
            style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", boxSizing:"border-box", outline:"none" }}/>
        </div>
        {error && <div style={{ color:"#e63946", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", marginBottom:"14px", fontWeight:600 }}>⚠ {error}</div>}
        <button onClick={handleSubmit}
          style={{ width:"100%", background:GOLD, border:"none", borderRadius:"12px", padding:"13px", color:BLACK, fontWeight:800, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer" }}>
          {mode==="login"?"Log In →":"Create Account →"}
        </button>
        {mode==="signup" && <div style={{ fontSize:"11px", color:"#444", fontFamily:"'DM Sans',sans-serif", textAlign:"center", marginTop:"12px" }}>Only @plu.edu emails can sign up</div>}
      </div>
    </div>
  );
}

function CalendarTab({ savedDrops }) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate()-today.getDay());
  const weekDays = Array.from({length:7},(_,i)=>{ const d=new Date(weekStart); d.setDate(weekStart.getDate()+i); return d; });
  const [selectedDay, setSelectedDay] = useState(today.getDay());
  const dropsForDay = savedDrops.filter(d=>{
    const dd = d.date==="Today"?today:d.date==="Tomorrow"?new Date(today.getTime()+86400000):null;
    return dd && dd.getDay()===selectedDay;
  });
  return (
    <div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"22px", fontWeight:800, color:GOLD, marginBottom:"16px" }}>My Calendar</div>
      <div style={{ display:"flex", gap:"6px", marginBottom:"20px" }}>
        {weekDays.map((d,i)=>{
          const isToday=d.toDateString()===today.toDateString();
          const hasDrops=savedDrops.some(dr=>{ const dd=dr.date==="Today"?today:dr.date==="Tomorrow"?new Date(today.getTime()+86400000):null; return dd&&dd.getDay()===i; });
          return (
            <div key={i} onClick={()=>setSelectedDay(i)} style={{ flex:1, background:selectedDay===i?GOLD:CARD, border:`1.5px solid ${selectedDay===i?GOLD:BORDER}`, borderRadius:"12px", padding:"8px 4px", textAlign:"center", cursor:"pointer" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", fontWeight:700, color:selectedDay===i?BLACK:MUTED, letterSpacing:"1px", textTransform:"uppercase" }}>{days[i]}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"16px", fontWeight:800, color:selectedDay===i?BLACK:isToday?GOLD:TEXT, marginTop:"2px" }}>{d.getDate()}</div>
              {hasDrops && <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:selectedDay===i?BLACK:GOLD, margin:"3px auto 0" }}/>}
            </div>
          );
        })}
      </div>
      {dropsForDay.length===0
        ? <div style={{ textAlign:"center", color:"#333", padding:"40px 0", fontFamily:"'DM Sans',sans-serif", fontSize:"14px" }}>No saved drops for this day.<br/><span style={{ fontSize:"12px" }}>Save drops from the feed to see them here!</span></div>
        : dropsForDay.map(d=>(
          <div key={d.id} style={{ background:CARD, border:`1.5px solid ${BORDER}`, borderRadius:"14px", padding:"14px 16px", marginBottom:"10px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"15px", fontWeight:800, color:TEXT, marginBottom:"6px" }}>{d.title}</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
              {[`📍 ${d.location}`,`🕐 ${d.time}`,d.category].map(l=>(
                <span key={l} style={{ background:"#1a1a1a", border:`1px solid ${BORDER}`, color:SOFT, padding:"3px 8px", borderRadius:"6px", fontSize:"10px", fontFamily:"'DM Sans',sans-serif" }}>{l}</span>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}

function PostModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title:"", category:CATEGORIES[0], location:"", date:"", time:"", description:"", expiresHrs:"4" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:300 }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:"#131313", borderRadius:"22px 22px 0 0", padding:"24px 20px 40px", width:"100%", maxWidth:"480px", borderTop:`3px solid ${GOLD}`, maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"22px", fontWeight:800, color:GOLD, marginBottom:"20px" }}>New Drop 📦</div>
        {[{key:"title",label:"What are you giving away?",ph:"e.g. Leftover pizza, free textbooks..."},{key:"location",label:"Where on campus?",ph:"e.g. AUC Room 133"},{key:"date",label:"Date",ph:"e.g. Today, Tomorrow"},{key:"time",label:"Available when?",ph:"e.g. 2:00 PM – 4:00 PM"}].map(f=>(
          <div key={f.key} style={{ marginBottom:"14px" }}>
            <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>{f.label}</label>
            <input value={form[f.key]} onChange={e=>set(f.key,e.target.value)} placeholder={f.ph}
              style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", boxSizing:"border-box", outline:"none" }}/>
          </div>
        ))}
        <div style={{ marginBottom:"14px" }}>
          <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>Auto-expire after</label>
          <select value={form.expiresHrs} onChange={e=>set("expiresHrs",e.target.value)} style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", outline:"none" }}>
            {[["1","1 hour"],["2","2 hours"],["4","4 hours"],["8","8 hours"],["24","24 hours"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:"14px" }}>
          <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>Category</label>
          <select value={form.category} onChange={e=>set("category",e.target.value)} style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", outline:"none" }}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:"20px" }}>
          <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>Description</label>
          <textarea value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Details — quantity, condition, how to get it..." rows={3}
            style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", resize:"none", boxSizing:"border-box", outline:"none" }}/>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onClose} style={{ flex:1, background:"#1c1c1c", border:"none", borderRadius:"12px", padding:"13px", color:MUTED, fontWeight:700, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer" }}>Cancel</button>
          <button onClick={()=>{ if(!form.title||!form.location||!form.date||!form.time||!form.description)return; const exp=new Date(new Date().getTime()+parseInt(form.expiresHrs)*3600000); onSubmit({...form,expiresAt:exp}); }}
            style={{ flex:2, background:GOLD, border:"none", borderRadius:"12px", padding:"13px", color:BLACK, fontWeight:800, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer" }}>Drop It 🤘</button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ user, onLogout, showToast }) {
  const [profile, setProfile] = useState({ major:"Computer Science", year:"Junior", bio:"PLU Lute 🎓 Always got extra stuff to share!", badges:["🍕 Food Hero","⭐ Trusted Host"] });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({...profile});
  return (
    <div style={{ paddingBottom:"20px" }}>
      <div style={{ background:"linear-gradient(180deg,#1a1500 0%,#0d0d0d 100%)", border:`1.5px solid ${BORDER}`, borderRadius:"20px", padding:"24px 20px", marginBottom:"14px", position:"relative" }}>
        <button onClick={()=>setEditing(true)} style={{ position:"absolute", top:"16px", right:"16px", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"6px 14px", color:MUTED, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>Edit</button>
        <div style={{ display:"flex", gap:"16px", alignItems:"center", marginBottom:"16px" }}>
          <Avatar initials={user.avatar} size={64} gold/>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"22px", fontWeight:800, color:TEXT, lineHeight:1.1 }}>{user.name}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:MUTED, marginTop:"3px" }}>{profile.major} · {profile.year}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#444", marginTop:"2px" }}>{user.email}</div>
          </div>
        </div>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#aaa", lineHeight:1.6, marginBottom:"16px" }}>{profile.bio}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"16px" }}>
          {profile.badges.map(b=><span key={b} style={{ background:"#1a1500", border:"1px solid #3a2f00", color:GOLD, padding:"4px 10px", borderRadius:"20px", fontSize:"11px", fontFamily:"'DM Sans',sans-serif", fontWeight:700 }}>{b}</span>)}
        </div>
        <button onClick={onLogout} style={{ background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"8px 16px", color:"#e63946", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>Log Out</button>
      </div>
      <div style={{ display:"flex", gap:"10px", marginBottom:"20px" }}>
        {[{label:"Drops",value:12},{label:"Rating",value:"4.7★"},{label:"Reviews",value:18}].map(s=>(
          <div key={s.label} style={{ background:"#111", border:`1.5px solid ${BORDER}`, borderRadius:"14px", padding:"14px 10px", textAlign:"center", flex:1 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"24px", fontWeight:800, color:GOLD, lineHeight:1, marginBottom:"4px" }}>{s.value}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1px", textTransform:"uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"16px", fontWeight:800, color:GOLD, marginBottom:"12px" }}>My Recent Drops</div>
      {SAMPLE_DROPS.slice(0,3).map(d=>(
        <div key={d.id} style={{ background:"#111", border:`1.5px solid ${BORDER}`, borderRadius:"14px", padding:"13px 15px", marginBottom:"10px" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"14px", fontWeight:800, color:TEXT, marginBottom:"6px" }}>{d.title}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
            {[`📍 ${d.location}`,d.category,d.posted].map(l=><span key={l} style={{ background:"#1a1a1a", border:`1px solid ${BORDER}`, color:SOFT, padding:"3px 8px", borderRadius:"6px", fontSize:"10px", fontFamily:"'DM Sans',sans-serif" }}>{l}</span>)}
          </div>
        </div>
      ))}
      {editing && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.9)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:300 }} onClick={e=>e.target===e.currentTarget&&setEditing(false)}>
          <div style={{ background:"#131313", borderRadius:"22px 22px 0 0", padding:"24px 20px 40px", width:"100%", maxWidth:"480px", borderTop:`3px solid ${GOLD}`, maxHeight:"85vh", overflowY:"auto" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"20px", fontWeight:800, color:GOLD, marginBottom:"20px" }}>Edit Profile ✏️</div>
            {[{key:"major",label:"Major"},{key:"year",label:"Year"}].map(f=>(
              <div key={f.key} style={{ marginBottom:"14px" }}>
                <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>{f.label}</label>
                <input value={editForm[f.key]} onChange={e=>setEditForm(ef=>({...ef,[f.key]:e.target.value}))}
                  style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", boxSizing:"border-box", outline:"none" }}/>
              </div>
            ))}
            <div style={{ marginBottom:"20px" }}>
              <label style={{ display:"block", fontSize:"10px", fontWeight:700, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" }}>Bio</label>
              <textarea value={editForm.bio} onChange={e=>setEditForm(ef=>({...ef,bio:e.target.value}))} rows={3}
                style={{ width:"100%", background:"#1c1c1c", border:`1.5px solid ${BORDER}`, borderRadius:"10px", padding:"10px 13px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", resize:"none", boxSizing:"border-box", outline:"none" }}/>
            </div>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={()=>setEditing(false)} style={{ flex:1, background:"#1c1c1c", border:"none", borderRadius:"12px", padding:"13px", color:MUTED, fontWeight:700, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer" }}>Cancel</button>
              <button onClick={()=>{setProfile({...editForm});setEditing(false);showToast("Profile updated!","info");}}
                style={{ flex:2, background:GOLD, border:"none", borderRadius:"12px", padding:"13px", color:BLACK, fontWeight:800, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer" }}>Save Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LuteDrops() {
  const [user, setUser] = useState(null);
  const [drops, setDrops] = useState(SAMPLE_DROPS);
  const [tab, setTab] = useState("feed");
  const [filterCat, setFilterCat] = useState("All");
  const [search, setSearch] = useState("");
  const [prefs, setPrefs] = useState(["Food 🍕","Study 📚"]);
  const [showPost, setShowPost] = useState(false);
  const [toast, setToast] = useState(null);
  const [pingCount, setPingCount] = useState(2);
  const [savedIds, setSavedIds] = useState([]);
  const toastTimer = useRef(null);

  useEffect(()=>{ const t=setInterval(()=>setDrops(d=>[...d]),60000); return ()=>clearInterval(t); },[]);

  const showToastMsg = (msg,type="success") => {
    setToast({msg,type});
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=>setToast(null),3000);
  };

  const handleSave = (id) => {
    const isAlready = savedIds.includes(id);
    setSavedIds(prev=>isAlready?prev.filter(i=>i!==id):[...prev,id]);
    showToastMsg(isAlready?"Removed from calendar":"Added to your calendar! 📅","info");
  };

  const handleSubmit = (form) => {
    setDrops(prev=>[{id:Date.now(),host:user.name,avatar:user.avatar,rating:0,ratingCount:0,...form,posted:"just now",hot:false},...prev]);
    if(prefs.includes(form.category)) setPingCount(c=>c+1);
    setShowPost(false);
    showToastMsg("Drop posted! 🎉");
  };

  const handleRate = (id,stars) => {
    setDrops(prev=>prev.map(d=>{ if(d.id!==id)return d; const nc=d.ratingCount+1; return {...d,rating:parseFloat(((d.rating*d.ratingCount+stars)/nc).toFixed(1)),ratingCount:nc}; }));
    showToastMsg("Rating saved!","info");
  };

  const filtered = drops.filter(d=>{
    const matchCat=filterCat==="All"||d.category===filterCat;
    const matchSearch=d.title.toLowerCase().includes(search.toLowerCase())||d.host.toLowerCase().includes(search.toLowerCase())||d.location.toLowerCase().includes(search.toLowerCase());
    return matchCat&&matchSearch;
  });
  const notifiedIds = drops.filter(d=>prefs.includes(d.category)&&d.expiresAt>new Date()).map(d=>d.id);
  const savedDrops = drops.filter(d=>savedIds.includes(d.id));

  if(!user) return <AuthScreen onLogin={setUser}/>;

  return (
    <div style={{ minHeight:"100vh", background:BLACK, maxWidth:"480px", margin:"0 auto", paddingBottom:"80px", position:"relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      {toast && <div style={{ position:"fixed", top:"76px", left:"50%", transform:"translateX(-50%)", background:toast.type==="error"?"#c0392b":toast.type==="info"?"#2980b9":"#27ae60", color:"#fff", borderRadius:"14px", padding:"10px 20px", fontSize:"13px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", zIndex:999, boxShadow:"0 4px 24px rgba(0,0,0,0.5)", whiteSpace:"nowrap" }}>{toast.msg}</div>}
      <div style={{ background:"#0d0d0d", padding:"16px 18px 14px", borderBottom:`2px solid ${GOLD}`, display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100 }}>
        <div>
          <div style={{ display:"flex", alignItems:"baseline", gap:"6px" }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"28px", fontWeight:800, color:GOLD, letterSpacing:"-1px" }}>LuteDrops</span>
            <span style={{ fontSize:"18px" }}>🎓</span>
          </div>
          <div style={{ fontSize:"9px", color:"#3a3a3a", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>Pacific Lutheran University</div>
        </div>
        <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
          <div onClick={()=>{setTab("notifications");setPingCount(0);}} style={{ cursor:"pointer", position:"relative" }}>
            <span style={{ fontSize:"20px" }}>🔔</span>
            {pingCount>0 && <div style={{ position:"absolute", top:-4, right:-4, background:"#e63946", color:"#fff", borderRadius:"50%", width:"16px", height:"16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontWeight:800, fontFamily:"'DM Sans',sans-serif" }}>{pingCount}</div>}
          </div>
          <button onClick={()=>setShowPost(true)} style={{ background:GOLD, color:BLACK, border:"none", borderRadius:"10px", padding:"8px 16px", fontWeight:800, fontSize:"13px", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>+ Drop</button>
        </div>
      </div>
      <div style={{ padding:"16px" }}>
        {tab==="feed" && <>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search drops, hosts, locations..."
            style={{ width:"100%", background:CARD, border:`1.5px solid ${BORDER}`, borderRadius:"12px", padding:"10px 14px", color:TEXT, fontFamily:"'DM Sans',sans-serif", fontSize:"14px", boxSizing:"border-box", outline:"none", marginBottom:"14px" }}/>
          <div style={{ display:"flex", gap:"7px", overflowX:"auto", marginBottom:"18px", paddingBottom:"4px" }}>
            {["All",...CATEGORIES].map(cat=>(
              <button key={cat} onClick={()=>setFilterCat(cat)} style={{ background:filterCat===cat?GOLD:"transparent", color:filterCat===cat?BLACK:MUTED, border:filterCat===cat?"none":`1.5px solid ${BORDER}`, borderRadius:"20px", padding:"5px 13px", fontSize:"11px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", whiteSpace:"nowrap" }}>{cat}</button>
            ))}
          </div>
          {filtered.length===0
            ? <div style={{ textAlign:"center", color:"#333", padding:"50px 0", fontFamily:"'DM Sans',sans-serif" }}>No active drops right now 😕</div>
            : filtered.map(d=><DropCard key={d.id} drop={d} notified={notifiedIds.includes(d.id)} onRate={handleRate} onSave={handleSave} saved={savedIds.includes(d.id)}/>)
          }
        </>}
        {tab==="prefs" && <>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"22px", fontWeight:800, color:GOLD, marginBottom:"6px" }}>Ping Me When...</div>
          <p style={{ color:MUTED, fontSize:"13px", marginBottom:"20px", fontFamily:"'DM Sans',sans-serif" }}>Get pinged when someone posts in these categories.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {CATEGORIES.map(cat=>{ const on=prefs.includes(cat); return (
              <div key={cat} onClick={()=>{setPrefs(prev=>prev.includes(cat)?prev.filter(c=>c!==cat):[...prev,cat]);showToastMsg("Prefs updated!","info");}}
                style={{ background:on?"#161a11":CARD, border:`1.5px solid ${on?GOLD:BORDER}`, borderRadius:"14px", padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"15px", color:on?TEXT:MUTED }}>{cat}</span>
                <div style={{ width:"44px", height:"24px", borderRadius:"12px", background:on?GOLD:"#222", position:"relative", transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", top:"3px", left:on?"23px":"3px", width:"18px", height:"18px", borderRadius:"50%", background:on?BLACK:"#444", transition:"left 0.2s" }}/>
                </div>
              </div>
            );})}
          </div>
        </>}
        {tab==="notifications" && <>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"22px", fontWeight:800, color:GOLD, marginBottom:"16px" }}>Your Pings</div>
          {[{id:1,text:'Marcus T. dropped: "Leftover Pizza — 6 Boxes"',cat:"Food 🍕",time:"8 min ago"},{id:2,text:'Jordan V. dropped: "Study Group Snacks"',cat:"Study 📚",time:"5 min ago"}].map(n=>(
            <div key={n.id} style={{ background:CARD, border:`1.5px solid ${BORDER}`, borderRadius:"14px", padding:"14px 16px", marginBottom:"10px", display:"flex", gap:"12px", alignItems:"flex-start" }}>
              <span style={{ fontSize:"20px" }}>🔔</span>
              <div>
                <div style={{ color:TEXT, fontSize:"13px", fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>{n.text}</div>
                <div style={{ display:"flex", gap:"8px", marginTop:"5px" }}>
                  <span style={{ background:"#1a1a1a", border:`1px solid ${BORDER}`, color:SOFT, padding:"2px 8px", borderRadius:"6px", fontSize:"10px", fontFamily:"'DM Sans',sans-serif" }}>{n.cat}</span>
                  <span style={{ color:"#444", fontSize:"10px", fontFamily:"'DM Sans',sans-serif" }}>{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </>}
        {tab==="calendar" && <CalendarTab savedDrops={savedDrops}/>}
        {tab==="profile" && <ProfilePage user={user} onLogout={()=>setUser(null)} showToast={showToastMsg}/>}
      </div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:"480px", background:"#0d0d0d", borderTop:`2px solid ${GOLD}`, display:"flex", justifyContent:"space-around", padding:"10px 0 16px", zIndex:100 }}>
        {[{id:"feed",icon:"🏠",label:"Drops"},{id:"calendar",icon:"📅",label:"Calendar"},{id:"prefs",icon:"⚙️",label:"Pings"},{id:"profile",icon:"👤",label:"Profile"}].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);if(t.id==="notifications")setPingCount(0);}} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
            <span style={{ fontSize:"20px" }}>{t.icon}</span>
            <span style={{ fontSize:"9px", fontWeight:700, letterSpacing:"1.5px", fontFamily:"'DM Sans',sans-serif", color:tab===t.id?GOLD:"#444", textTransform:"uppercase" }}>{t.label}</span>
          </button>
        ))}
      </div>
      {showPost && <PostModal onClose={()=>setShowPost(false)} onSubmit={handleSubmit}/>}
    </div>
  );
}
