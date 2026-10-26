import { useMemo, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  CircleHelp,
  Globe2,
  Megaphone,
  Package,
  RotateCcw,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Users,
} from "lucide-react";
import { Card, Eyebrow, Field, Pill, Stat } from "../components/ui";
import { createDefaultState, useStore } from "../store/ConferenceContext";

const sections = [
  ["overview", "Overview", ChartNoAxesCombined],
  ["people", "People & registrations", Users],
  ["committees", "Local committees", Globe2],
  ["programme", "Programme", CalendarDays],
  ["store", "Store & orders", ShoppingBag],
  ["quest", "Explorer Quest", CircleHelp],
  ["announcements", "Announcements", Megaphone],
  ["settings", "Conference settings", Settings],
];

export function NeedUser() {
  const { s } = useStore();
  return s.user ? <Outlet /> : <Navigate to="/login" />;
}

export function NeedOrganiser() {
  const { s } = useStore();
  return s.user?.role === "Organiser" ? (
    <Outlet />
  ) : (
    <Navigate to="/access-denied" />
  );
}

export function AccessDenied() {
  return (
    <div className="section inner narrow">
      <Card className="center">
        <ShieldCheck size={36} />
        <Eyebrow>ACCESS RESTRICTED</Eyebrow>
        <h1>Organiser access required.</h1>
        <p>This area is available to conference organisers in this demo.</p>
        <div className="actions">
          <Link className="btn" to="/">
            Back to home <ArrowRight size={16} />
          </Link>
          <Link className="btn outline" to="/login">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}

function AdminTable({ children, headers }) {
  return (
    <div className="admin-table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function AdminSection({ title, description, children }) {
  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function Admin() {
  const { s, u } = useStore();
  const [active, setActive] = useState("overview");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", email: "", lcId: "" });
  const [newSession, setNewSession] = useState({ title: "", day: "1", time: "09:00", room: "Main Hall", track: "Workshop" });
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "20", category: "Accessories" });
  const [newStation, setNewStation] = useState({ name: "", points: "50" });
  const [newReward, setNewReward] = useState({ name: "", points: "100" });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", body: "" });
  const currentSection = sections.find(([id]) => id === active)?.[1] || "Overview";
  const pendingCount = (s.delegates || []).filter((person) => person.status === "Pending").length;
  const people = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (s.delegates || []).filter((person) =>
      !query || `${person.name} ${person.email} ${person.id}`.toLowerCase().includes(query),
    );
  }, [s.delegates, search]);
  const updateRecord = (collection, id, key, value) => {
    u((state) => ({
      ...state,
      [collection]: state[collection].map((record) =>
        record.id === id ? { ...record, [key]: value } : record,
      ),
    }));
  };
  const removeRecord = (collection, id) => {
    u((state) => ({
      ...state,
      [collection]: state[collection].filter((record) => record.id !== id),
    }));
  };
  const report = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const renderPeople = () => (
    <>
      <AdminSection title="Add a demo user" description="Create a sample delegate record; this does not create a real account.">
        <form className="admin-form" onSubmit={(event) => {
          event.preventDefault();
          const person = { ...newPerson, id: `DEL-${Date.now()}`, role: "Delegate", status: "Pending", registeredAt: new Date().toISOString().slice(0, 10) };
          u((state) => ({ ...state, delegates: [person, ...state.delegates] }));
          setNewPerson({ name: "", email: "", lcId: "" });
          report("Demo user added.");
        }}>
          <Field label="Full name"><input required value={newPerson.name} onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })} /></Field>
          <Field label="Email"><input required type="email" value={newPerson.email} onChange={(event) => setNewPerson({ ...newPerson, email: event.target.value })} /></Field>
          <Field label="Local committee"><select required value={newPerson.lcId} onChange={(event) => setNewPerson({ ...newPerson, lcId: event.target.value })}><option value="">Choose LC</option>{s.lcs.map((lc) => <option key={lc.id} value={lc.id}>{lc.name}</option>)}</select></Field>
          <button className="btn" type="submit">Add user</button>
        </form>
      </AdminSection>
      <AdminSection title={`Users and registrations (${people.length})`} description="Review demo records and update registration status or demo role.">
        <label className="admin-search">Search users<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email or ID" /></label>
        <AdminTable headers={["User", "LC", "Role", "Registration", ""]}>
          {people.map((person) => (
            <tr key={person.id}>
              <td><b>{person.name}</b><small>{person.email} · {person.id}</small></td>
              <td>{s.lcs.find((lc) => lc.id === person.lcId)?.name || "Unassigned"}</td>
              <td><select aria-label={`Role for ${person.name}`} value={person.role || "Delegate"} onChange={(event) => updateRecord("delegates", person.id, "role", event.target.value)}><option>Delegate</option><option>Organiser</option></select></td>
              <td><select aria-label={`Registration status for ${person.name}`} value={person.status} onChange={(event) => updateRecord("delegates", person.id, "status", event.target.value)}><option>Pending</option><option>Registered</option><option>Cancelled</option></select></td>
              <td><button aria-label={`Remove ${person.name}`} className="iconbutton red" onClick={() => removeRecord("delegates", person.id)} type="button"><Trash2 size={15} /></button></td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </>
  );

  const renderCommittees = () => (
    <AdminSection title="Local committee performance" description="Adjust the target and approved count used by the Approvals Hub.">
      <AdminTable headers={["Committee", "Member committee", "Goal", "Approved", "Progress"]}>
        {s.lcs.map((lc) => {
          const goal = s.goals?.[lc.id] || { goal: lc.goal, approved: lc.approved };
          return <tr key={lc.id}>
            <td><b>{lc.name}</b><small>{lc.id}</small></td><td>{lc.mc}</td>
            <td><input aria-label={`Goal for ${lc.name}`} min="0" type="number" value={goal.goal} onChange={(event) => u((state) => ({ ...state, goals: { ...state.goals, [lc.id]: { ...goal, goal: Number(event.target.value) } } }))} /></td>
            <td><input aria-label={`Approved count for ${lc.name}`} min="0" type="number" value={goal.approved} onChange={(event) => u((state) => ({ ...state, goals: { ...state.goals, [lc.id]: { ...goal, approved: Number(event.target.value) } } }))} /></td>
            <td>{goal.goal ? `${Math.round((goal.approved / goal.goal) * 100)}%` : "—"}</td>
          </tr>;
        })}
      </AdminTable>
    </AdminSection>
  );

  const renderProgramme = () => (
    <>
      <AdminSection title="Add a programme session" description="New sessions are saved in this browser and appear on the programme page.">
        <form className="admin-form" onSubmit={(event) => {
          event.preventDefault();
          u((state) => ({ ...state, sessions: [...state.sessions, { ...newSession, id: `s-${Date.now()}`, day: Number(newSession.day), facilitator: "Conference Committee" }] }));
          setNewSession({ title: "", day: "1", time: "09:00", room: "Main Hall", track: "Workshop" });
          report("Programme session added.");
        }}>
          <Field label="Session title"><input required value={newSession.title} onChange={(event) => setNewSession({ ...newSession, title: event.target.value })} /></Field>
          <Field label="Day"><select value={newSession.day} onChange={(event) => setNewSession({ ...newSession, day: event.target.value })}>{[1, 2, 3, 4, 5].map((day) => <option key={day}>{day}</option>)}</select></Field>
          <Field label="Time"><input required type="time" value={newSession.time} onChange={(event) => setNewSession({ ...newSession, time: event.target.value })} /></Field>
          <Field label="Room"><input required value={newSession.room} onChange={(event) => setNewSession({ ...newSession, room: event.target.value })} /></Field>
          <Field label="Track"><input required value={newSession.track} onChange={(event) => setNewSession({ ...newSession, track: event.target.value })} /></Field>
          <button className="btn" type="submit">Add session</button>
        </form>
      </AdminSection>
      <AdminSection title={`Programme sessions (${s.sessions.length})`}>
        <AdminTable headers={["Session", "Day", "Time", "Room", "Track", ""]}>
          {s.sessions.map((session) => <tr key={session.id}><td><b>{session.title}</b><small>{session.facilitator}</small></td><td>{session.day}</td><td>{session.time}</td><td>{session.room}</td><td>{session.track}</td><td><button aria-label={`Remove ${session.title}`} className="iconbutton red" onClick={() => removeRecord("sessions", session.id)} type="button"><Trash2 size={15} /></button></td></tr>)}
        </AdminTable>
      </AdminSection>
    </>
  );

  const renderStore = () => (
    <>
      <AdminSection title="Add a product" description="Manage the catalogue and sample inventory shown in the public store.">
        <form className="admin-form" onSubmit={(event) => {
          event.preventDefault();
          u((state) => ({ ...state, products: [...state.products, { ...newProduct, id: `p-${Date.now()}`, price: Number(newProduct.price), stock: Number(newProduct.stock), color: "#2F5BEA" }] }));
          setNewProduct({ name: "", price: "", stock: "20", category: "Accessories" });
          report("Store product added.");
        }}>
          <Field label="Product name"><input required value={newProduct.name} onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })} /></Field>
          <Field label="Price (€)"><input required min="0" step="0.01" type="number" value={newProduct.price} onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })} /></Field>
          <Field label="Stock"><input required min="0" type="number" value={newProduct.stock} onChange={(event) => setNewProduct({ ...newProduct, stock: event.target.value })} /></Field>
          <Field label="Category"><select value={newProduct.category} onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}><option>Accessories</option><option>Apparel</option><option>Food &amp; drink</option></select></Field>
          <button className="btn" type="submit">Add product</button>
        </form>
      </AdminSection>
      <AdminSection title="Products">
        <AdminTable headers={["Product", "Category", "Price (€)", "Stock", ""]}>
          {s.products.map((product) => <tr key={product.id}><td><b>{product.name}</b><small>{product.id}</small></td><td>{product.category}</td><td><input aria-label={`Price for ${product.name}`} min="0" step="0.01" type="number" value={product.price} onChange={(event) => updateRecord("products", product.id, "price", Number(event.target.value))} /></td><td><input aria-label={`Stock for ${product.name}`} min="0" type="number" value={product.stock} onChange={(event) => updateRecord("products", product.id, "stock", Number(event.target.value))} /></td><td><button aria-label={`Remove ${product.name}`} className="iconbutton red" onClick={() => removeRecord("products", product.id)} type="button"><Trash2 size={15} /></button></td></tr>)}
        </AdminTable>
      </AdminSection>
      <AdminSection title="Reservations" description="Update pickup progress for delegate orders.">
        <AdminTable headers={["Order", "Delegate", "Product", "Total", "Status"]}>
          {s.orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{order.delegate}</td><td>{order.product} × {order.quantity}</td><td>€{Number(order.total).toFixed(2)}</td><td><select aria-label={`Status for ${order.id}`} value={order.status} onChange={(event) => updateRecord("orders", order.id, "status", event.target.value)}><option>Pending</option><option>Ready</option><option>Collected</option><option>Cancelled</option></select></td></tr>)}
        </AdminTable>
      </AdminSection>
    </>
  );

  const renderQuest = () => (
    <>
      <AdminSection title="Add an Explorer Quest station">
        <form className="admin-form" onSubmit={(event) => {
          event.preventDefault();
          const id = `STN-${String(Date.now()).slice(-6)}`;
          u((state) => ({ ...state, stations: [...state.stations, { id, ...newStation, points: Number(newStation.points) }] }));
          setNewStation({ name: "", points: "50" });
          report(`Station added with code ${id}.`);
        }}>
          <Field label="Station name"><input required value={newStation.name} onChange={(event) => setNewStation({ ...newStation, name: event.target.value })} /></Field>
          <Field label="Points"><input required min="1" type="number" value={newStation.points} onChange={(event) => setNewStation({ ...newStation, points: event.target.value })} /></Field>
          <button className="btn" type="submit">Add station</button>
        </form>
        <AdminTable headers={["Station", "Code", "Points", ""]}>
          {s.stations.map((station) => <tr key={station.id}><td>{station.name}</td><td>{station.id}</td><td><input aria-label={`Points for ${station.name}`} min="1" type="number" value={station.points} onChange={(event) => updateRecord("stations", station.id, "points", Number(event.target.value))} /></td><td><button aria-label={`Remove ${station.name}`} className="iconbutton red" onClick={() => removeRecord("stations", station.id)} type="button"><Trash2 size={15} /></button></td></tr>)}
        </AdminTable>
      </AdminSection>
      <AdminSection title="Rewards catalogue">
        <form className="admin-form" onSubmit={(event) => {
          event.preventDefault();
          u((state) => ({ ...state, rewards: [...state.rewards, { id: `r-${Date.now()}`, ...newReward, points: Number(newReward.points) }] }));
          setNewReward({ name: "", points: "100" });
          report("Quest reward added.");
        }}>
          <Field label="Reward name"><input required value={newReward.name} onChange={(event) => setNewReward({ ...newReward, name: event.target.value })} /></Field>
          <Field label="Points required"><input required min="1" type="number" value={newReward.points} onChange={(event) => setNewReward({ ...newReward, points: event.target.value })} /></Field>
          <button className="btn" type="submit">Add reward</button>
        </form>
        <AdminTable headers={["Reward", "Points", ""]}>
          {s.rewards.map((reward) => <tr key={reward.id}><td>{reward.name}</td><td><input aria-label={`Points for ${reward.name}`} min="1" type="number" value={reward.points} onChange={(event) => updateRecord("rewards", reward.id, "points", Number(event.target.value))} /></td><td><button aria-label={`Remove ${reward.name}`} className="iconbutton red" onClick={() => removeRecord("rewards", reward.id)} type="button"><Trash2 size={15} /></button></td></tr>)}
        </AdminTable>
      </AdminSection>
      <AdminSection title="Reward claims">
        <AdminTable headers={["Delegate ID", "Reward ID", "Status"]}>
          {s.claims.map((claim, index) => <tr key={`${claim.uid}-${claim.rewardId}-${index}`}><td>{claim.uid}</td><td>{claim.rewardId}</td><td><select aria-label={`Claim status for ${claim.uid}`} value={claim.status} onChange={(event) => u((state) => ({ ...state, claims: state.claims.map((item, itemIndex) => itemIndex === index ? { ...item, status: event.target.value } : item) }))}><option>Requested</option><option>Approved</option><option>Collected</option><option>Declined</option></select></td></tr>)}
          {!s.claims.length && <tr><td colSpan="3">No demo reward claims yet.</td></tr>}
        </AdminTable>
      </AdminSection>
    </>
  );

  const renderAnnouncements = () => (
    <>
      <AdminSection title="Publish an announcement" description="Announcements are stored in browser demo data and displayed on the public home page.">
        <form className="admin-form" onSubmit={(event) => {
          event.preventDefault();
          u((state) => ({ ...state, announcements: [{ id: `ann-${Date.now()}`, title: newAnnouncement.title, message: newAnnouncement.body, type: "General", date: new Date().toISOString().slice(0, 10) }, ...state.announcements] }));
          setNewAnnouncement({ title: "", body: "" });
          report("Announcement published.");
        }}>
          <Field label="Title"><input required value={newAnnouncement.title} onChange={(event) => setNewAnnouncement({ ...newAnnouncement, title: event.target.value })} /></Field>
          <Field label="Message"><textarea required rows="3" value={newAnnouncement.body} onChange={(event) => setNewAnnouncement({ ...newAnnouncement, body: event.target.value })} /></Field>
          <button className="btn" type="submit">Publish</button>
        </form>
      </AdminSection>
      <AdminSection title="Current announcements">
        {!s.announcements.length && <p>No announcements published yet.</p>}
        {s.announcements.map((announcement) => <article className="admin-announcement" key={announcement.id}><div><small>{announcement.date}</small><h3>{announcement.title}</h3><p>{announcement.message || announcement.body || announcement.text}</p></div><button aria-label={`Remove ${announcement.title}`} className="iconbutton red" onClick={() => removeRecord("announcements", announcement.id)} type="button"><Trash2 size={15} /></button></article>)}
      </AdminSection>
    </>
  );

  const renderSettings = () => (
    <AdminSection title="Conference details" description="These sample settings are used across demo pages.">
      <div className="admin-form settings-form">
        {Object.entries(s.settings || {}).map(([key, value]) => <Field key={key} label={key}><input value={value} onChange={(event) => u((state) => ({ ...state, settings: { ...state.settings, [key]: event.target.value } }))} /></Field>)}
      </div>
      <p className="admin-settings-note">Settings are saved automatically in this browser.</p>
      <div className="admin-reset">
        <div><b>Restore the original demo data</b><p>Replaces local changes in this browser with the illustrative sample data.</p></div>
        <button className="btn outline" onClick={() => {
          if (window.confirm("Restore all sample data? Your local demo edits will be lost.")) {
            u(() => ({ ...createDefaultState(), user: s.user }));
            report("Sample data restored.");
          }
        }} type="button"><RotateCcw size={15} /> Restore demo</button>
      </div>
    </AdminSection>
  );

  const renderContent = () => {
    if (active === "people") return renderPeople();
    if (active === "committees") return renderCommittees();
    if (active === "programme") return renderProgramme();
    if (active === "store") return renderStore();
    if (active === "quest") return renderQuest();
    if (active === "announcements") return renderAnnouncements();
    if (active === "settings") return renderSettings();
    return (
      <>
        <div className="statsgrid">
          <Stat label="Registered delegates" value={(s.delegates || []).filter((person) => person.status === "Registered").length} icon={Users} />
          <Stat label="Pending registrations" value={pendingCount} icon={Activity} />
          <Stat label="Local committees" value={(s.lcs || []).length} icon={Globe2} />
          <Stat label="Programme sessions" value={(s.sessions || []).length} icon={CalendarDays} />
        </div>
        <div className="admin-shortcuts">
          {sections.slice(1).map(([id, label, Icon]) => <button className="admin-shortcut" key={id} onClick={() => setActive(id)} type="button"><Icon size={18} /><span>{label}</span><ArrowRight size={15} /></button>)}
        </div>
        <AdminSection title="Needs attention" description="Open these sections to review sample records.">
          <div className="admin-attention">
            <button onClick={() => setActive("people")} type="button"><b>{pendingCount}</b><span>pending registrations</span><ArrowRight size={14} /></button>
            <button onClick={() => setActive("store")} type="button"><b>{(s.orders || []).filter((order) => order.status === "Pending").length}</b><span>store reservations to process</span><ArrowRight size={14} /></button>
            <button onClick={() => setActive("quest")} type="button"><b>{(s.claims || []).filter((claim) => claim.status === "Requested").length}</b><span>quest reward claims</span><ArrowRight size={14} /></button>
          </div>
        </AdminSection>
      </>
    );
  };

  return (
    <div className="admin-console">
      <aside className="admin-sidebar">
        <Link className="admin-console-brand" to="/"><span className="mark">E</span><span><b>EUROXPRO&apos;27</b><small>CONFERENCE CONTROL</small></span></Link>
        <p>ADMINISTRATION</p>
        <nav aria-label="Admin sections">
          {sections.map(([id, label, Icon]) => <button aria-current={active === id ? "page" : undefined} className={active === id ? "active" : ""} key={id} onClick={() => { setActive(id); setSearch(""); }} type="button"><Icon size={16} /><span>{label}</span>{id === "people" && pendingCount > 0 && <small>{pendingCount}</small>}</button>)}
        </nav>
        <div className="admin-sidebar-bottom"><span>{s.user?.name}</span><small>Organiser · demo mode</small><Link to="/">← View conference site</Link></div>
      </aside>
      <div className="admin-console-main">
        <header className="admin-console-top"><div><Eyebrow>CONFERENCE OPERATIONS</Eyebrow><b>{currentSection}</b></div><Pill tone="green">Demo data · saved in this browser</Pill></header>
        <div className="admin-console-content">
          <div className="admin-console-heading"><div><Eyebrow>EUROXPRO&apos;27 · ANTALYA</Eyebrow><h1>{active === "overview" ? "Control centre." : currentSection + "."}</h1><p>Manage conference demo data across the delegate experience.</p></div></div>
          {notice && <div className="admin-toast" role="status">{notice}</div>}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
