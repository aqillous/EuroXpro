import { useState } from 'react';
import { House } from 'lucide-react';
import { Info } from 'lucide-react';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import Art from '../components/Art';
import { money } from '../utils/format';

export function Stay() {
  const [reserved, setReserved] = useState([]);
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>STAY IN ANTALYA</Eyebrow>
          <h1>
            Find your home base <em>by the sea.</em>
          </h1>
          <p>
            Accommodation options to help you plan a comfortable conference
            stay.
          </p>
        </div>
      </div>
      <p className="notice">
        <Info /> Rates are planning estimates per room, per night. Final booking
        details will be confirmed with the conference team.
      </p>
      <div className="daygrid hotels">
        {[
          ["The Mediterranean House", "4-star", "0.8 km", 95],
          ["Antalya Coast Hotel", "4-star", "1.4 km", 82],
          ["Old Town Boutique Stay", "Boutique", "2.1 km", 68],
        ].map((h) => (
          <Card key={h[0]}>
            <div className="hotel-art">
              <Art />
            </div>
            <Pill>{h[1]}</Pill>
            <h2>{h[0]}</h2>
            <p>
              {h[2]} to venue · A relaxed base close to the city highlights.
            </p>
            <div className="split">
              <b>
                {money(h[3])} <small>/ night</small>
              </b>
              <Btn
                kind="secondary"
                onClick={() =>
                  setReserved((a) =>
                    a.includes(h[0])
                      ? a.filter((x) => x !== h[0])
                      : [...a, h[0]],
                  )
                }
              >
                {reserved.includes(h[0])
                  ? "Interest saved"
                  : "Reserve interest"}
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
