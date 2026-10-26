import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Ticket } from 'lucide-react';
import { Mail } from 'lucide-react';
import { delegates } from '../data';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>HELP & SUPPORT</Eyebrow>
          <h1>
            Questions? <em>Start here.</em>
          </h1>
          <p>Helpful details for your EUROXPRO’27 journey.</p>
        </div>
      </div>
      <div className="twocol">
        <Card>
          <h2>Frequently asked questions</h2>
          {[
            [
              "Who can attend?",
              "EUROXPRO’27 is designed for AIESEC leaders and delegates from across the European region.",
            ],
            [
              "When and where?",
              "Provisional dates are 31 March – 4 April 2027 in Antalya, Türkiye.",
            ],
            [
              "How does registration work?",
              "Complete the delegate form. Registration is confirmed in the platform and no online payments are collected.",
            ],
            [
              "Where is my ticket?",
              "Open My Ticket from your account menu after registration.",
            ],
            [
              "Can I reserve merchandise?",
              "Yes, merchandise is reservation-only and collected at the venue.",
            ],
            [
              "Who do I contact?",
              "Email conference@euroxpro27.org with your LC and topic.",
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
          <Mail />
          <Eyebrow>WE'RE HERE TO HELP</Eyebrow>
          <h2>Talk to the team.</h2>
          <p>Need help with registration, travel or accessibility?</p>
          <a className="btn" href="mailto:conference@euroxpro27.org">
            Email the conference team <ArrowUpRight />
          </a>
          <p>conference@euroxpro27.org</p>
        </Card>
      </div>
    </div>
  );
}
