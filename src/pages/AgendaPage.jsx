import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { Download } from 'lucide-react';
import { sessions } from '../data';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { useStore } from '../store/ConferenceContext';

export function Agenda() {
  const { s, u } = useStore();
  const list = s.sessions
    .filter((x) => s.agenda.includes(x.id))
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  return (
    <div className="section inner narrow">
      <div className="pagehead">
        <div>
          <Eyebrow>YOUR PERSONAL PLAN</Eyebrow>
          <h1>
            My <em>agenda.</em>
          </h1>
          <p>Keep the sessions you care about in one place.</p>
        </div>
        <Btn
          onClick={() => {
            const text = [
              "BEGIN:VCALENDAR",
              "VERSION:2.0",
              ...list.map(
                (x) =>
                  `BEGIN:VEVENT\\nSUMMARY:${x.title}\\nDTSTART:202703${String(30 + x.day).padStart(2, "0")}T${x.time.replace(":", "")}00\\nLOCATION:${x.room}\\nEND:VEVENT`,
              ),
              "END:VCALENDAR",
            ].join("\\n");
            const blob = new Blob([text], { type: "text/calendar" }),
              url = URL.createObjectURL(blob),
              a = document.createElement("a");
            a.href = url;
            a.download = "euroxpro27-agenda.ics";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download /> Download .ics
        </Btn>
      </div>
      {list.length ? (
        list.map((x) => (
          <Card className="session" key={x.id}>
            <b>
              DAY {x.day}
              <br />
              {x.time}
            </b>
            <div>
              <h3>{x.title}</h3>
              <p>
                {x.room} · {x.track}
              </p>
            </div>
            <button
              onClick={() =>
                u((p) => ({
                  ...p,
                  agenda: p.agenda.filter((id) => id !== x.id),
                }))
              }
            >
              ×
            </button>
          </Card>
        ))
      ) : (
        <Card className="center">
          <CalendarDays />
          <h2>Your agenda is waiting.</h2>
          <p>
            Add sessions from the programme to build your personal schedule.
          </p>
          <Link className="btn" to="/programme">
            Explore programme
          </Link>
        </Card>
      )}
    </div>
  );
}
