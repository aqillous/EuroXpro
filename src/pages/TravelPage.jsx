import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Check } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Plane } from 'lucide-react';
import { Users } from 'lucide-react';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { Field } from '../components/ui';

export function Travel() {
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>GETTING HERE</Eyebrow>
          <h1>
            Your route to <em>Antalya.</em>
          </h1>
          <p>
            Practical information to help you plan the journey with confidence.
          </p>
        </div>
      </div>
      <div className="twocol">
        <Card>
          <Plane />
          <Eyebrow>BY AIR</Eyebrow>
          <h2>Antalya Airport</h2>
          <h3>AYT · International Airport</h3>
          <p>
            To city centre <b>20–35 min</b>
          </p>
          <p>
            Taxi estimate <b>€20–35</b>
          </p>
          <p>
            Public transport <b>Bus & tram links</b>
          </p>
          <small>Travel times and costs vary by traffic and route.</small>
        </Card>
        <Card>
          <Users />
          <Eyebrow>GROUP TRANSFERS</Eyebrow>
          <h2>Arrive together.</h2>
          {[
            "Arrival window A · 31 March morning",
            "Arrival window B · 31 March afternoon",
            "Departure window · 4 April afternoon",
          ].map((x) => (
            <p className="transfer" key={x}>
              {x}
              <Pill>Details to follow</Pill>
            </p>
          ))}
        </Card>
      </div>
      <div className="twocol space">
        <Card>
          <Eyebrow>VISA FAQ</Eyebrow>
          <h2>Before you travel.</h2>
          {[
            [
              "Do I need a visa for Türkiye?",
              "Requirements depend on nationality. Check official e-Visa and consular guidance.",
            ],
            [
              "How do I get from the airport?",
              "Antalya Airport connects to the city by taxi, public transport and pre-arranged transfers.",
            ],
            [
              "Can I request an invitation letter?",
              "Submit the form and the conference team can follow up with details.",
            ],
            [
              "When should I arrive?",
              "Plan to arrive on 31 March with time for check-in and the opening programme.",
            ],
          ].map(([q, a], i) => (
            <div className="accordion" key={q}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                {q}
                <ChevronDown />
              </button>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </Card>
        <Card>
          <Eyebrow>INVITATION LETTER</Eyebrow>
          <h2>Request a letter.</h2>
          {sent ? (
            <p className="success">
              ✓ Your request has been recorded. The team will follow up.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="formstack"
            >
              <Field label="Full name">
                <input required />
              </Field>
              <Field label="Email address">
                <input required type="email" />
              </Field>
              <Field label="Passport country">
                <input required />
              </Field>
              <Field label="Passport name / details (optional)">
                <input />
              </Field>
              <Btn>
                Submit request <ArrowRight />
              </Btn>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
