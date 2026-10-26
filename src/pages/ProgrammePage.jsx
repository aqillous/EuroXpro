import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Check } from "lucide-react";
import { MapPin } from "lucide-react";
import { Plus } from "lucide-react";
import { sessions } from "../data";
import { Btn } from "../components/ui";
import { Card } from "../components/ui";
import { Eyebrow } from "../components/ui";
import { Pill } from "../components/ui";
import { Field } from "../components/ui";
import { useStore } from "../store/ConferenceContext";

export function Programme() {
  const { s, u } = useStore();
  const [day, setDay] = useState(1);
  const [track, setTrack] = useState("All");
  const list = s.sessions
    .filter((x) => x.day === day && (track === "All" || x.track === track))
    .sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>THE EXPERIENCE</Eyebrow>
          <h1>
            A programme built for <em>momentum.</em>
          </h1>
          <p>
            Five days of learning, alignment, cultural discovery and action.
          </p>
        </div>
        <Link className="btn" to="/agenda">
          My agenda <ArrowRight />
        </Link>
      </div>
      <div className="daytabs">
        {[1, 2, 3, 4, 5].map((d) => (
          <button
            className={day === d ? "active" : ""}
            onClick={() => setDay(d)}
            key={d}
          >
            DAY {d}
            <b>{["31 MAR", "01 APR", "02 APR", "03 APR", "04 APR"][d - 1]}</b>
          </button>
        ))}
      </div>
      <div className="filters">
        <Field label="TRACK">
          <select value={track} onChange={(e) => setTrack(e.target.value)}>
            <option>All</option>
            {[...new Set(s.sessions.map((x) => x.track))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
      </div>
      <Card className="daybanner">
        <Eyebrow>DAY {day} OF 5</Eyebrow>
        <h2>
          {
            [
              "Arrive & align",
              "Build capability",
              "Raise the bar",
              "Turn plans into action",
              "Carry it forward",
            ][day - 1]
          }
        </h2>
        <span>
          {
            [
              "Wednesday, 31 March",
              "Thursday, 1 April",
              "Friday, 2 April",
              "Saturday, 3 April",
              "Sunday, 4 April",
            ][day - 1]
          }
          , 2027
        </span>
      </Card>
      {list.map((x) => (
        <Card className="session" key={x.id}>
          <div>
            <small>{x.time}</small>
            <Pill>{x.track}</Pill>
          </div>
          <div>
            <h3>{x.title}</h3>
            <p>
              <MapPin size={13} /> {x.room} · {x.facilitator}
            </p>
          </div>
          <Btn
            kind={s.agenda.includes(x.id) ? "secondary" : ""}
            onClick={() =>
              u((st) => ({
                ...st,
                agenda: st.agenda.includes(x.id)
                  ? st.agenda.filter((a) => a !== x.id)
                  : [...st.agenda, x.id],
              }))
            }
          >
            {s.agenda.includes(x.id) ? (
              <>
                <Check /> Added
              </>
            ) : (
              <>
                <Plus /> Add to agenda
              </>
            )}
          </Btn>
        </Card>
      ))}
    </div>
  );
}
