import { Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { lcs } from '../data';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { useStore } from '../store/ConferenceContext';

export function MyTicket() {
  const { s } = useStore();
  const u = s.user;
  const lc = s.lcs.find((l) => l.id === u?.lcId) || s.lcs[0];
  return (
    <div className="section inner narrow">
      <div className="pagehead">
        <div>
          <Eyebrow>YOUR CONFERENCE PASS</Eyebrow>
          <h1>
            My <em>ticket.</em>
          </h1>
          <p>Keep your pass close for a smoother check-in.</p>
        </div>
        <Pill tone="green">Registered</Pill>
      </div>
      <Card className="ticket">
        <div className="tickethead">
          <b>EUROXPRO'27</b>
          <Pill>GENERAL DELEGATE</Pill>
        </div>
        <div className="ticketbody">
          <div>
            <small>DELEGATE NAME</small>
            <h2>{u?.name}</h2>
            <Pill>{lc.mc}</Pill> <Pill>{lc.name}</Pill>
            <div className="twocol">
              <div>
                <small>DATES</small>
                <b>31 MAR – 4 APR 2027</b>
              </div>
              <div>
                <small>LOCATION</small>
                <b>ANTALYA, TÜRKİYE</b>
              </div>
              <div>
                <small>PASS ID</small>
                <b>{u?.id}</b>
              </div>
            </div>
          </div>
          <QRCodeSVG value={`EUROXPRO27|${u?.id}|${u?.email}`} size={145} />
        </div>
        <div className="ticketfoot">
          ✓ Registration confirmed{" "}
          <span>Keep this ticket available on arrival</span>
        </div>
      </Card>
      <Btn
        onClick={() => {
          const blob = new Blob(
              [
                `EUROXPRO'27 TICKET\\n${u?.name}\\n${lc.name}\\n${lc.mc}\\n${u?.id}`,
              ],
              { type: "text/plain" },
            ),
            url = URL.createObjectURL(blob),
            a = document.createElement("a");
          a.href = url;
          a.download = "euroxpro27-ticket.txt";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        <Download /> Download ticket details
      </Btn>
    </div>
  );
}
