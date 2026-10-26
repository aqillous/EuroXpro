import { useState } from "react";
import { Search } from "lucide-react";
import { lcs } from "../data";
import { Card } from "../components/ui";
import { Eyebrow } from "../components/ui";
import { Pill } from "../components/ui";
import { ProgressBar } from "../components/ui";
import { Field } from "../components/ui";
import Chart from "../components/Chart";
import { pct } from "../utils/format";
import { useStore } from "../store/ConferenceContext";
import Modal from "../components/Modal";

export function Approvals() {
  const { s } = useStore();
  const [mc, setMc] = useState("All");
  const [prog, setProg] = useState("All");
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("LCs");
  const [sort, setSort] = useState("approved");
  const [compare, setCompare] = useState([]);
  const [detail, setDetail] = useState(null);
  const mcs = [...new Set(s.lcs.map((l) => l.mc))];
  let rows = s.lcs
    .filter(
      (l) =>
        (mc === "All" || l.mc === mc) &&
        l.name.toLowerCase().includes(q.toLowerCase()),
    )
    .map((l) => ({
      ...l,
      ...s.goals[l.id],
      shown:
        prog === "GV"
          ? l.programmes.GV
          : prog === "GT"
            ? l.programmes.GT
            : prog === "GTe"
              ? l.programmes.GTe
              : (s.goals[l.id]?.approved ?? l.approved),
    }))
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "progress"
          ? pct(b.approved, b.goal) - pct(a.approved, a.goal)
          : b[sort] - a[sort],
    );
  const approved = rows.reduce((a, l) => a + l.shown, 0),
    goal = rows.reduce((a, l) => a + l.goal, 0);
  const mcRows = mcs
    .map((name) => {
      let ls = s.lcs.filter((l) => l.mc === name);
      return {
        name,
        approved: ls.reduce(
          (a, l) => a + (s.goals[l.id]?.approved ?? l.approved),
          0,
        ),
        goal: ls.reduce((a, l) => a + (s.goals[l.id]?.goal ?? l.goal), 0),
        count: ls.length,
      };
    })
    .sort((a, b) => b.approved - a.approved);
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>REGIONAL PERFORMANCE HUB</Eyebrow>
          <h1>
            Approvals, <em>in focus.</em>
          </h1>
          <p>
            A clear view of progress, momentum and the goals we’re working
            towards.
          </p>
        </div>
        <Pill tone="green">● Live overview</Pill>
      </div>
      <Card className="overview">
        <div>
          <small className="muted">EUROPE · TOTAL APPROVALS</small>
          <h2>
            {approved.toLocaleString()} <small>/ {goal.toLocaleString()}</small>
          </h2>
          <ProgressBar v={pct(approved, goal)} />
          <div className="split">
            <span>{pct(approved, goal)}% to goal</span>
            <span>Remaining {(goal - approved).toLocaleString()}</span>
          </div>
        </div>
        <div className="overview-stats">
          <span>
            LCs reporting<b>{s.lcs.length}</b>
          </span>
          <span>
            Member committees<b>{mcs.length}</b>
          </span>
          <span>
            Days to conference
            <b>
              {Math.max(
                0,
                Math.ceil((new Date("2027-03-31") - Date.now()) / 86400000),
              )}
            </b>
          </span>
        </div>
      </Card>
      <div className="filters">
        <Field label="MEMBER COMMITTEE">
          <select value={mc} onChange={(e) => setMc(e.target.value)}>
            <option>All</option>
            {mcs.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <Field label="PROGRAMME">
          <select value={prog} onChange={(e) => setProg(e.target.value)}>
            {["All", "GV", "GT", "GTe"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <Field label="PERIOD">
          <select>
            <option>Cumulative</option>
            <option>This term</option>
            <option>This month</option>
          </select>
        </Field>
        <input
          placeholder="Search local committee..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="tabs">
        {["LCs", "MCs", "Compare"].map((t) => (
          <button
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
            key={t}
          >
            {t === "LCs"
              ? "LC League Table"
              : t === "MCs"
                ? "MC Overview"
                : `Compare LCs (${compare.length})`}
          </button>
        ))}
      </div>
      {tab === "LCs" && (
        <Card className="tablecard">
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>LOCAL COMMITTEE</th>
                  <th>MC</th>
                  <th>
                    <button onClick={() => setSort("approved")}>
                      APPROVED ↕
                    </button>
                  </th>
                  <th>
                    <button onClick={() => setSort("goal")}>GOAL ↕</button>
                  </th>
                  <th>
                    <button onClick={() => setSort("progress")}>
                      PROGRESS ↕
                    </button>
                  </th>
                  <th>WEEKLY CHANGE</th>
                  <th>STATUS</th>
                  <th>COMPARE</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((l, i) => {
                  let p = pct(l.approved, l.goal);
                  return (
                    <tr
                      key={l.id}
                      className={s.user?.lcId === l.id ? "own" : ""}
                    >
                      <td>{i + 1}</td>
                      <td>
                        <button className="plain" onClick={() => setDetail(l)}>
                          <b>{l.name}</b>
                          <small>{l.city}</small>
                        </button>
                      </td>
                      <td>{l.mc}</td>
                      <td>
                        <b>{l.shown}</b>
                      </td>
                      <td>{l.goal}</td>
                      <td>
                        <div className="minibar">
                          {p}% <ProgressBar v={p} />
                        </div>
                      </td>
                      <td className={l.weeklyChange >= 0 ? "green" : "red"}>
                        {l.weeklyChange >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(l.weeklyChange)}
                      </td>
                      <td>
                        <Pill
                          tone={p >= 100 ? "green" : p >= 70 ? "yellow" : "red"}
                        >
                          {p >= 100
                            ? "Goal reached"
                            : p >= 70
                              ? "On track"
                              : "Behind"}
                        </Pill>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={compare.includes(l.id)}
                          disabled={
                            !compare.includes(l.id) && compare.length >= 3
                          }
                          onChange={(e) =>
                            setCompare((a) =>
                              e.target.checked
                                ? [...a, l.id]
                                : a.filter((x) => x !== l.id),
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {tab === "MCs" && (
        <div className="twocol">
          <Card>
            <h3>Member committee ranking</h3>
            <div className="scroll">
              <table>
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>MC</th>
                    <th>APPROVED</th>
                    <th>GOAL</th>
                    <th>PROGRESS</th>
                  </tr>
                </thead>
                <tbody>
                  {mcRows.map((m, i) => (
                    <tr key={m.name}>
                      <td>{i + 1}</td>
                      <td>
                        <b>{m.name}</b>
                        <small>{m.count} LCs</small>
                      </td>
                      <td>{m.approved}</td>
                      <td>{m.goal}</td>
                      <td>{pct(m.approved, m.goal)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h3>Approvals by MC</h3>
            <Chart
              data={mcRows.slice(0, 8).map((m) => ({
                name: m.name.split(" ")[0],
                approved: m.approved,
              }))}
            />
          </Card>
        </div>
      )}
      {tab === "Compare" && (
        <Card>
          <h3>Compare up to three LCs</h3>
          {compare.length ? (
            <div className="compare">
              {compare.map((id) => {
                let l = s.lcs.find((x) => x.id === id);
                return (
                  <div key={id}>
                    <button
                      onClick={() =>
                        setCompare((a) => a.filter((x) => x !== id))
                      }
                    >
                      ×
                    </button>
                    <small>{l.mc}</small>
                    <b>{l.name}</b>
                    <h2>
                      {l.approved} / {l.goal}
                    </h2>
                    <ProgressBar v={pct(l.approved, l.goal)} />
                    <span>{pct(l.approved, l.goal)}% of goal</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>
              Select committees using the compare column in the league table.
            </p>
          )}
        </Card>
      )}
      <div className="milestones">
        <b>Milestones</b>
        {[25, 50, 75, 100].map((x) => (
          <Pill key={x} tone={pct(approved, goal) >= x ? "green" : ""}>
            {pct(approved, goal) >= x ? "✓ " : ""}
            {x}% of goal
          </Pill>
        ))}
      </div>
      {detail && (
        <Modal title={detail.name} onClose={() => setDetail(null)}>
            <Eyebrow>LOCAL COMMITTEE PROFILE</Eyebrow>
            <h2>{detail.name}</h2>
            <p>
              {detail.mc} · {detail.city}
            </p>
            <div className="twocol">
              {[
                ["Approved", detail.approved],
                ["Goal", detail.goal],
                [
                  "Regional rank",
                  s.lcs
                    .slice()
                    .sort((a, b) => b.approved - a.approved)
                    .findIndex((x) => x.id === detail.id) + 1,
                ],
              ].map((x) => (
                <Card key={x[0]}>
                  <small>{x[0]}</small>
                  <h2>{x[1]}</h2>
                </Card>
              ))}
            </div>
            <h3>Exchange funnel</h3>
            {Object.entries(detail.funnel).map(([k, v]) => (
              <div className="funnel" key={k}>
                <span>{k}</span>
                <b>{v}</b>
                <ProgressBar v={pct(v, detail.funnel.Applied)} />
              </div>
            ))}
            <h3>Programme split</h3>
            {Object.entries(detail.programmes).map(([k, v]) => (
              <div className="split" key={k}>
                <b>{k}</b>
                <span>
                  {v} · {pct(v, detail.approved)}%
                </span>
              </div>
            ))}
            <h3>Weekly approvals</h3>
            <Chart
              data={
                detail.trend?.map((v, i) => ({
                  name: "W" + (i + 1),
                  approved: v,
                })) ||
                Array.from({ length: 8 }, (_, i) => ({
                  name: "W" + i,
                  approved: (detail.approved * (i + 1)) / 8,
                }))
              }
            />
        </Modal>
      )}
    </div>
  );
}
