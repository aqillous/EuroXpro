import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Compass } from "lucide-react";
import { MapPin } from "lucide-react";
import { Waves } from "lucide-react";
import { config } from "../config";
import { lcs, announcements } from "../data";
import { Card } from "../components/ui";
import { Eyebrow } from "../components/ui";
import { Pill } from "../components/ui";
import { ProgressBar } from "../components/ui";
import Art from "../components/Art";
import { pct } from "../utils/format";
import { useStore } from "../store/ConferenceContext";

export function Home() {
  const { s } = useStore();
  const total = s.lcs.reduce(
    (a, l) => ({
      approved: a.approved + (s.goals[l.id]?.approved ?? l.approved),
      goal: a.goal + (s.goals[l.id]?.goal ?? l.goal),
    }),
    { approved: 0, goal: 0 },
  );
  const days = Math.max(
    0,
    Math.ceil((new Date("2027-03-31") - Date.now()) / 86400000),
  );
  return (
    <>
      <section className="hero">
        <div>
          <Eyebrow>AIESEC IN EUROPE · REGIONAL CONFERENCE</Eyebrow>
          <h1>Five days in Antalya. One region moving forward.</h1>
          <p>
            A gathering for AIESEC members to share what works, tackle common
            challenges and plan what comes next.
          </p>
          <div className="metas">
            <span>
              <CalendarDays />
              {s.settings?.dates || config.dates}
            </span>
            <span>
              <MapPin />
              {s.settings?.city || config.city}
            </span>
          </div>
          <div className="actions">
            <Link className="btn big" to="/registration">
              Register for EUROXPRO <ArrowUpRight size={17} />
            </Link>
            <Link className="btn outline big" to="/approvals">
              Explore Approvals Hub <ArrowRight size={17} />
            </Link>
          </div>
          <div className="subproof">
            <b>{s.lcs.length} Local Committees</b>
            <span>
              {" "}
              across {new Set(s.lcs.map((l) => l.mc)).size} Member Committees
              {" · "}
              {days} days to go
            </span>
          </div>
        </div>
        <div className="hero-art">
          <Art />
          <div className="art-bottom">
            <span>
              <Waves size={15} /> Antalya coast
            </span>
            <span>Türkiye</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <Eyebrow>REGIONAL PERFORMANCE</Eyebrow>
            <h2>
              Approvals across Europe.
            </h2>
            <p>One shared view of exchange impact across our region.</p>
          </div>
          <Link className="textlink" to="/approvals">
            Open Approvals Hub <ArrowRight size={15} />
          </Link>
        </div>
        <Card className="region">
          <div>
            <span className="muted">EUROPE · TOTAL APPROVALS</span>
            <h2>
              {total.approved.toLocaleString()}{" "}
              <small>/ {total.goal.toLocaleString()}</small>
            </h2>
            <Pill tone="green">{pct(total.approved, total.goal)}% of goal</Pill>
            <ProgressBar v={pct(total.approved, total.goal)} />
            <div className="split">
              <span>Approved exchanges</span>
              <span>
                Remaining {(total.goal - total.approved).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="region-side">
            <div>
              <small>LOCAL COMMITTEES</small>
              <b>{s.lcs.length}</b>
              <span>Across the region</span>
            </div>
            <div>
              <small>DAYS TO CONFERENCE</small>
              <b>{days}</b>
              <span>{s.settings?.dates || config.dates}</span>
            </div>
          </div>
        </Card>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <Eyebrow>THE GATHERING</Eyebrow>
            <h2>
              Five days with purpose.
            </h2>
            <p>
              Strategy, learning, connection and the energy of the
              Mediterranean.
            </p>
          </div>
          <Link className="textlink" to="/programme">
            Explore programme <ArrowRight size={15} />
          </Link>
        </div>
        <div className="daygrid">
          {[
            [
              "31 MAR",
              "Arrive & align",
              "Welcome, shared context and opening night",
            ],
            [
              "01 APR",
              "Build capability",
              "Workshops, exchange quality and Global Village",
            ],
            [
              "02 APR",
              "Raise the bar",
              "Leadership labs and Turkish cultural evening",
            ],
            [
              "03 APR",
              "Turn plans into action",
              "LC planning and collaboration",
            ],
            [
              "04 APR",
              "Carry it forward",
              "Commitments, closing and departures",
            ],
          ].map((d, i) => (
            <Card key={d[0]}>
              <b className={"dayno d" + i}>0{i + 1}</b>
              <small>{d[0]}</small>
              <h3>{d[1]}</h3>
              <p>{d[2]}</p>
              <Link to="/programme">
                <ArrowUpRight size={16} />
              </Link>
            </Card>
          ))}
        </div>
      </section>
      <section className="section feature">
        <div>
          <Eyebrow>Make it yours</Eyebrow>
          <h2>Make the conference your own.</h2>
          <p>
            Build your agenda, keep your ticket close, and discover more across
            the conference.
          </p>
          <Link to="/programme">
            Plan my agenda <ArrowRight size={15} />
          </Link>
          <Link to="/quest">
            Explorer Quest <ArrowRight size={15} />
          </Link>
          <Link to="/store">
            Conference store <ArrowRight size={15} />
          </Link>
        </div>
        <div className="featuregraphic">
          <Compass size={70} />
          <b>GO EXPLORE</b>
        </div>
      </section>
      <section className="section news">
        <div>
          <Eyebrow>Notes from the team</Eyebrow>
          <h2>Conference updates.</h2>
          <p>
            Stay close to the details as we prepare to bring the region
            together.
          </p>
          <Link className="textlink" to="/notifications">
            Read announcements <ArrowRight size={15} />
          </Link>
        </div>
        <div>
          {s.announcements.slice(0, 3).map((n) => (
            <Card key={n.id}>
              <small>
                {n.type} · {n.date}
              </small>
              <h3>{n.title}</h3>
              <p>{n.message}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="cta">
        <div>
          <Eyebrow>ANTALYA IS CALLING</Eyebrow>
          <h2>
            Ready to join us?
          </h2>
          <p>Come with a plan. Leave with momentum.</p>
        </div>
        <Link className="btn white big" to="/registration">
          Start registration <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
