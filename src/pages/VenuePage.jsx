import { CalendarDays } from 'lucide-react';
import { Compass } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Mountain } from 'lucide-react';
import { Waves } from 'lucide-react';
import { Utensils } from 'lucide-react';
import { config } from '../config';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import Art from '../components/Art';
import { useStore } from '../store/ConferenceContext';

export function InfoPage({ type }) {
  const { s } = useStore();
  const venue = s.settings?.venue || config.venue;
  const city = s.settings?.city || config.city;
  const dates = s.settings?.dates || config.dates;
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>YOUR ANTALYA GUIDE</Eyebrow>
          <h1>
            Meet us by the <em>Mediterranean.</em>
          </h1>
          <p>
            A coastal city where ancient streets, mountain horizons and
            turquoise water meet.
          </p>
        </div>
      </div>
      <div className="venue-art">
        <Art />
        <div>
          <MapPin />
          <b>{venue}</b>
          <span>{city}</span>
        </div>
      </div>
      <div className="twocol">
        <Card>
          <Eyebrow>VENUE DETAILS</Eyebrow>
          <h2>Everything in one place.</h2>
          <p>
            The conference venue will be confirmed by the organising team.
            Session rooms, check-in and delegate support will be signposted on
            arrival.
          </p>
          <p>
            <MapPin /> {city}
          </p>
          <p>
            <CalendarDays /> {dates}
          </p>
        </Card>
        <Card>
          <Eyebrow>LOCAL KNOW-HOW</Eyebrow>
          <h2>Make the most of Antalya.</h2>
          <p>
            <Waves /> Take a coastal reset by the Mediterranean.
          </p>
          <p>
            <Mountain /> Explore the Taurus Mountain horizon.
          </p>
          <p>
            <Compass /> Wander the historic lanes of Kaleiçi.
          </p>
          <p>
            <Utensils /> Try seasonal produce, pide, meze and Turkish tea.
          </p>
        </Card>
      </div>
    </div>
  );
}
