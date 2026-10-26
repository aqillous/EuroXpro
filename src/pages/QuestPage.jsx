import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { ProgressBar } from '../components/ui';
import { useStore } from '../store/ConferenceContext';

export function Quest() {
  const { s, u } = useStore();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const uid = s.user?.id || "delegate-current";
  const scans = s.scans.filter((x) => x.uid === uid);
  const points = scans.reduce((a, x) => a + x.points, 0);
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>EXPLORER QUEST</Eyebrow>
          <h1>
            Explore more. Earn <em>points.</em>
          </h1>
          <p>Discover conference stations and unlock rewards as you go.</p>
        </div>
      </div>
      <div className="questhero">
        <Eyebrow>YOUR EXPLORER SCORE</Eyebrow>
        <h2>
          {points} <small>PTS</small>
        </h2>
        <p>Every station is another chance to discover something new.</p>
        <ProgressBar value={Math.min(100, points / 5)} />
      </div>
      <div className="twocol">
        <Card>
          <h2>Station trail</h2>
          {s.stations.map((x) => (
            <div className="station" key={x.id}>
              <div>
                <b>{x.name}</b>
                <small>{x.id}</small>
              </div>
              <Pill>
                {scans.some((a) => a.stationId === x.id)
                  ? "Visited"
                  : `+${x.points} pts`}
              </Pill>
            </div>
          ))}
        </Card>
        <div>
          <Card>
            <h2>Scan a station</h2>
              {s.user ? (
                <>
                  <p>Find a station QR sign and enter the code printed beneath it.</p>
                  <form
              onSubmit={(e) => {
                e.preventDefault();
                const st = s.stations.find(
                  (x) => x.id === code.trim().toUpperCase(),
                );
                if (!st)
                  setMsg(
                    "Station code not found. Check the code and try again.",
                  );
                else if (scans.some((x) => x.stationId === st.id))
                  setMsg("You have already checked in at this station.");
                else {
                  u((p) => ({
                    ...p,
                    scans: [
                      ...p.scans,
                      { uid, stationId: st.id, points: st.points },
                    ],
                  }));
                  setMsg(`Nice find! +${st.points} points for ${st.name}.`);
                  setCode("");
                }
              }}
              className="scan"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. STN-001"
              />
              <Btn>Check in</Btn>
                </form>
                {msg && <p className="notice">{msg}</p>}
                <small>
                  Manual code entry is available as an accessible alternative to QR
                  scanning.
                </small>
              </>
            ) : (
              <>
                <p>Sign in with the delegate demo to check in at stations, earn points, and claim rewards.</p>
                <Link className="btn" to="/login">Sign in to play</Link>
              </>
            )}
          </Card>
          <Card>
            <h2>Rewards catalogue</h2>
            {s.rewards.map((r) => (
              <div className="reviewrow" key={r.id}>
                <span>
                  {r.name}
                  <small>{r.points} points</small>
                </span>
                <Btn
                  kind="secondary"
                  disabled={
                    !s.user ||
                    points < r.points ||
                    s.claims.some((c) => c.uid === uid && c.rewardId === r.id)
                  }
                  onClick={() =>
                    u((p) => ({
                      ...p,
                      claims: [
                        ...p.claims,
                        { uid, rewardId: r.id, status: "Requested" },
                      ],
                    }))
                  }
                >
                  {!s.user
                    ? "Sign in"
                    : s.claims.some((c) => c.uid === uid && c.rewardId === r.id)
                    ? "Claimed"
                    : points >= r.points
                      ? "Claim"
                      : "Locked"}
                </Btn>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
