import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { lcs } from "../data";
import { Btn } from "../components/ui";
import { Eyebrow } from "../components/ui";
import { Field } from "../components/ui";
import Art from "../components/Art";
import { useStore } from "../store/ConferenceContext";

export function Login() {
  const { s, u } = useStore();
  const [lc, setLc] = useState(s.lcs[0].id);
  const [name, setName] = useState("");
  const go = useNavigate();
  const continueAsDelegate = () => {
    const l = s.lcs.find((x) => x.id === lc);
    if (!l) {
      return;
    }
    u((p) => ({
      ...p,
      user: {
        id: "delegate-current",
        name: name.trim() || "Aylin Yilmaz",
        email: "delegate@example.org",
        role: "Delegate",
        lcId: l.id,
        lcName: l.name,
        mc: l.mc,
      },
    }));
    go("/registration");
  };
  const continueAsOrganiser = () => {
    u((p) => ({
      ...p,
      user: {
        id: "cc-demo",
        name: "Conference Committee",
        email: "cc-demo@example.org",
        role: "Organiser",
      },
    }));
    go("/admin");
  };
  return (
    <div className="login">
      <div className="loginvisual">
        <h2>
          Big change starts when we decide to move <em>together.</em>
        </h2>
        <Art />
        <small>ANTALYA, TÜRKİYE · 31 MAR – 4 APR 2027</small>
      </div>
      <div className="loginform">
        <Link to="/">← Back to conference website</Link>
        <div className="loginbox">
          <Eyebrow>DEMO ACCESS</Eyebrow>
          <h1>Welcome.</h1>
          <p>
            Choose a demo role. No password or backend authentication is used.
          </p>
          <div className="login-demo-actions">
            <Field label="Your name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (optional)"
              />
            </Field>
            <Field label="Local Committee">
              <select value={lc} onChange={(e) => setLc(e.target.value)}>
                {s.lcs.map((l) => (
                  <option value={l.id} key={l.id}>
                    {l.name} — {l.mc}
                  </option>
                ))}
              </select>
            </Field>
            <Btn type="button" onClick={continueAsDelegate}>
              Continue as Delegate <ArrowRight size={16} />
            </Btn>
            <div className="login-divider">
              <span>OR</span>
            </div>
            <Btn type="button" kind="secondary" onClick={continueAsOrganiser}>
              <ShieldCheck size={16} /> Continue as CC (Organiser)
            </Btn>
          </div>
          <p className="note">
            <ShieldCheck size={16} /> Demo roles are stored in this browser only
            and are not secure for real delegate data.
          </p>
          <div className="three-stats">
            <span>
              <b>60+</b>
              <small>Local Committees</small>
            </span>
            <span>
              <b>15</b>
              <small>Member Committees</small>
            </span>
            <span>
              <b>5 days</b>
              <small>One region</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
