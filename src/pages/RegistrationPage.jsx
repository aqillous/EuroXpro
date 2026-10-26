import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { lcs, delegates } from '../data';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { Field } from '../components/ui';
import { useStore } from '../store/ConferenceContext';

export function Registration() {
  const { s, u } = useStore();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({
    name: s.user?.name || "",
    email: s.user?.email || "",
    lcId: s.user?.lcId || s.lcs[0].id,
    role: "LC Vice President",
    diet: "No restrictions",
    access: "No requirements",
    shirt: "M",
  });
  const lc = s.lcs.find((x) => x.id === f.lcId);
  const change = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const finish = () => {
    u((p) => ({
      ...p,
      user: {
        ...(p.user || {}),
        id: p.user?.id || "DEL-" + Date.now(),
        name: f.name,
        email: f.email,
        role: "Delegate",
        lcId: f.lcId,
        lcName: lc.name,
        mc: lc.mc,
      },
      delegates: [
        {
          id: "DEL-" + Date.now(),
          ...f,
          lcId: f.lcId,
          status: "Registered",
          registeredAt: new Date().toISOString().slice(0, 10),
        },
        ...p.delegates.filter((d) => d.email !== f.email),
      ],
    }));
    setDone(true);
  };
  return (
    <div className="section inner narrow">
      <div className="pagehead">
        <div>
          <Eyebrow>DELEGATE REGISTRATION</Eyebrow>
          <h1>
            Your place in <em>the region.</em>
          </h1>
          <p>Share the essentials and review your details before confirming.</p>
        </div>
        <Pill tone="green">No online payment</Pill>
      </div>
      {done ? (
        <Card className="center">
          <h1>✓</h1>
          <Eyebrow>REGISTRATION CONFIRMED</Eyebrow>
          <h2>You’re on the list, {f.name.split(" ")[0]}.</h2>
          <p>Your registration is confirmed. Your ticket is ready.</p>
          <Link className="btn" to="/ticket">
            View my ticket <ArrowRight />
          </Link>
        </Card>
      ) : (
        <Card>
          <div className="stepper">
            {["Your details", "Your role", "Preferences", "Review"].map(
              (x, i) => (
                <span
                  className={i === step ? "active" : i < step ? "done" : ""}
                  key={x}
                >
                  {i + 1}. {x}
                </span>
              ),
            )}
          </div>
          <form
            className="formstack"
            onSubmit={(e) => {
              e.preventDefault();
              step < 3 ? setStep(step + 1) : finish();
            }}
          >
            {step === 0 && (
              <>
                <h2>First, the essentials.</h2>
                <Field label="Full name">
                  <input
                    required
                    value={f.name}
                    onChange={(e) => change("name", e.target.value)}
                  />
                </Field>
                <Field label="Email address">
                  <input
                    required
                    type="email"
                    value={f.email}
                    onChange={(e) => change("email", e.target.value)}
                  />
                </Field>
                <Field label="Local Committee">
                  <select
                    value={f.lcId}
                    onChange={(e) => change("lcId", e.target.value)}
                  >
                    {s.lcs.map((l) => (
                      <option value={l.id} key={l.id}>
                        {l.name} — {l.mc}
                      </option>
                    ))}
                  </select>
                </Field>
                <p className="notice">
                  Member Committee: <b>{lc.mc}</b>
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <h2>Tell us your role.</h2>
                <Field label="Current role">
                  <select
                    value={f.role}
                    onChange={(e) => change("role", e.target.value)}
                  >
                    {[
                      "LC President",
                      "LC Vice President",
                      "MC Vice President",
                      "MC President",
                      "Team Leader",
                      "Member",
                      "Other",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>
                <Card>
                  <b>{f.name || "Your name"}</b>
                  <p>
                    {f.role} · {lc.name} · {lc.mc}
                  </p>
                </Card>
              </>
            )}
            {step === 2 && (
              <>
                <h2>Make your stay comfortable.</h2>
                <Field label="Dietary requirements">
                  <select
                    value={f.diet}
                    onChange={(e) => change("diet", e.target.value)}
                  >
                    {[
                      "No restrictions",
                      "Vegetarian",
                      "Vegan",
                      "Halal",
                      "Gluten-free",
                      "Other",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Accessibility requirements">
                  <select
                    value={f.access}
                    onChange={(e) => change("access", e.target.value)}
                  >
                    {[
                      "No requirements",
                      "Step-free access",
                      "Hearing support",
                      "Visual support",
                      "Other / contact me",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>
                <Field label="T-shirt size">
                  <select
                    value={f.shirt}
                    onChange={(e) => change("shirt", e.target.value)}
                  >
                    {["XS", "S", "M", "L", "XL", "XXL"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>
              </>
            )}
            {step === 3 && (
              <>
                <h2>Review your registration.</h2>
                {Object.entries({
                  ...f,
                  localCommittee: lc.name,
                  memberCommittee: lc.mc,
                }).map(([k, v]) => (
                  <div className="reviewrow" key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
                <p className="notice">
                  Registration is confirmed instantly. No online payments are
                  collected.
                </p>
              </>
            )}
            <div className="formactions">
              {step > 0 && (
                <Btn
                  kind="secondary"
                  type="button"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Btn>
              )}
              <Btn>
                {step === 3 ? "Confirm registration" : "Continue"}{" "}
                <ArrowRight />
              </Btn>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
