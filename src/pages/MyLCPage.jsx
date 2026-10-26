import { lcs } from '../data';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { ProgressBar } from '../components/ui';
import { pct } from '../utils/format';
import { useStore } from '../store/ConferenceContext';

export function MyLC() {
  const { s } = useStore();
  const l = s.lcs.find((x) => x.id === s.user?.lcId) || s.lcs[0];
  const rank =
    s.lcs
      .slice()
      .sort((a, b) => b.approved - a.approved)
      .findIndex((x) => x.id === l.id) + 1;
  return (
    <div className="section inner narrow">
      <div className="pagehead">
        <div>
          <Eyebrow>YOUR LOCAL COMMITTEE</Eyebrow>
          <h1>
            My <em>LC.</em>
          </h1>
          <p>Your committee’s progress in the regional picture.</p>
        </div>
      </div>
      <Card>
        <small>{l.mc.toUpperCase()} · LOCAL COMMITTEE</small>
        <h2>{l.name}</h2>
        <div className="twocol">
          <div>
            <small>Approved</small>
            <h2>{l.approved}</h2>
          </div>
          <div>
            <small>Goal</small>
            <h2>{l.goal}</h2>
          </div>
          <div>
            <small>Regional rank</small>
            <h2>#{rank}</h2>
          </div>
        </div>
        <ProgressBar v={pct(l.approved, l.goal)} />
        <Pill tone="green">{pct(l.approved, l.goal)}% of goal</Pill>
      </Card>
      <Card>
        <h3>Approvals by programme</h3>
        {Object.entries(l.programmes).map(([k, v]) => (
          <div className="funnel" key={k}>
            <b>{k}</b>
            <span>{v}</span>
            <ProgressBar v={pct(v, l.approved)} />
          </div>
        ))}
      </Card>
    </div>
  );
}
