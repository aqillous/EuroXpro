import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';

export function About() {
  return (
    <div className="section inner narrow">
      <Eyebrow>PLATFORM OVERVIEW</Eyebrow>
      <h1>
        Built for clarity, designed for <em>connection.</em>
      </h1>
      <Card>
        <h2>A connected conference experience.</h2>
        <p>
          EUROXPRO’27 brings conference information, delegate tools and regional
          performance into one consistent experience.
        </p>
        {[
          [
            "01",
            "React + Vite",
            "A fast, component-based frontend with route-level pages.",
          ],
          [
            "02",
            "Responsive design",
            "Reusable design tokens and accessible controls.",
          ],
          [
            "03",
            "Role-aware access",
            "Demo role switching is stored in this browser and is not real authentication.",
          ],
          [
            "04",
            "Ready for integration",
            "A future service layer can connect Python FastAPI, PostgreSQL and EXPA API workflows.",
          ],
        ].map((x) => (
          <div className="aboutrow" key={x[0]}>
            <b>{x[0]}</b>
            <div>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
