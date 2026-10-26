import { announcements } from '../data';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { useStore } from '../store/ConferenceContext';

export function Notifications() {
  const { s } = useStore();
  return (
    <div className="section inner narrow">
      <div className="pagehead">
        <div>
          <Eyebrow>CONFERENCE UPDATES</Eyebrow>
          <h1>
            Stay in the <em>loop.</em>
          </h1>
          <p>Important announcements and reminders from the organising team.</p>
        </div>
      </div>
      {s.announcements.map((n) => (
        <Card key={n.id} className="noticecard">
          <Pill>{n.type}</Pill>
          <small>{n.date}</small>
          <h3>{n.title}</h3>
          <p>{n.message}</p>
        </Card>
      ))}
    </div>
  );
}
