import { useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  CircleHelp,
  House,
  Info,
  MapPin,
  Menu,
  Plane,
  ShoppingBag,
  Ticket,
} from 'lucide-react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useStore } from '../store/ConferenceContext';
import { AccessDenied, Admin, NeedOrganiser, NeedUser } from '../pages/AdminPages';
import { Approvals } from '../pages/ApprovalsPage';
import { About } from '../pages/AboutPage';
import { Agenda } from '../pages/AgendaPage';
import { FAQ } from '../pages/FAQPage';
import { Home } from '../pages/HomePage';
import { Login } from '../pages/LoginPage';
import { MyLC } from '../pages/MyLCPage';
import { MyTicket } from '../pages/TicketPage';
import { Notifications } from '../pages/NotificationsPage';
import { Programme } from '../pages/ProgrammePage';
import { Quest } from '../pages/QuestPage';
import { Registration } from '../pages/RegistrationPage';
import { Stay } from '../pages/StayPage';
import { Store } from '../pages/StorePage';
import { Travel } from '../pages/TravelPage';
import { InfoPage } from '../pages/VenuePage';

const navigation = [
  ['/', 'Home', House],
  ['/approvals', 'Approvals Hub', ChartNoAxesCombined],
  ['/programme', 'Programme', CalendarDays],
  ['/store', 'Store', ShoppingBag],
  ['/quest', 'Quest', CircleHelp],
  ['/venue', 'Venue', MapPin],
  ['/travel', 'Travel & Visa', Plane],
  ['/accommodation', 'Stay', Ticket],
  ['/faq', 'FAQ', Info],
];

function SiteHeader() {
  const { s, u } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const switchRole = (role) => {
    u((current) => {
      const lc = current.lcs.find((item) => item.id === current.user?.lcId) || current.lcs[0];
      if (role === 'Organiser') {
        return {
          ...current,
          user: {
            id: 'cc-demo',
            name: 'Conference Committee',
            email: 'cc-demo@example.org',
            role,
          },
        };
      }

      const name = current.user?.id === 'cc-demo'
        ? 'Aylin Yilmaz'
        : current.user?.name || 'Aylin Yilmaz';
      return {
        ...current,
        user: {
          id: 'delegate-current',
          name,
          email: 'delegate@example.org',
          role,
          lcId: lc.id,
          lcName: lc.name,
          mc: lc.mc,
        },
      };
    });
    navigate(role === 'Organiser' ? '/admin' : '/');
  };

  const signOut = () => {
    u((current) => ({ ...current, user: null }));
    navigate('/');
  };

  return (
    <>
      <div className="demo-banner" role="status">
        <span>DEMO DATA</span>
        {' '}Numbers are illustrative; this demo has no backend authentication.
      </div>
      <header className="top">
        <Link className="brand" to="/">
          <b className="mark">E</b>
          <span><b>{s.settings?.name || "EUROXPRO'27"}</b><small>ANTALYA · TÜRKİYE</small></span>
        </Link>
        <nav aria-label="Main navigation" className={menuOpen ? 'nav open' : 'nav'}>
          {navigation.map(([to, title, Icon]) => (
            <NavLink
              end={to === '/'}
              key={to}
              onClick={() => setMenuOpen(false)}
              to={to}
            >
              <Icon aria-hidden="true" size={15} />
              {title}
            </NavLink>
          ))}
        </nav>
        <div className="topright">
          {s.user && (
            <Link aria-label="Notifications" className="bell" to="/notifications">
              <Bell aria-hidden="true" size={18} />
            </Link>
          )}
          {s.user ? (
            <div className="userbox">
              <span className="avatar">{s.user.name[0]}</span>
              <span><b>{s.user.name}</b><small>{s.user.role}</small></span>
              <details>
                <summary aria-label="Account menu"><ChevronDown aria-hidden="true" size={14} /></summary>
                <div className="dropdown">
                  {s.user.role === 'Delegate' && (
                    <>
                      <Link to="/registration">My registration</Link>
                      <Link to="/ticket">My ticket</Link>
                      <Link to="/my-lc">My LC</Link>
                      <button onClick={() => switchRole('Organiser')} type="button">Switch to organiser demo</button>
                    </>
                  )}
                  {s.user.role === 'Organiser' && (
                    <>
                      <Link to="/admin">Admin panel</Link>
                      <button onClick={() => switchRole('Delegate')} type="button">Switch to delegate demo</button>
                    </>
                  )}
                  <button onClick={signOut} type="button">Sign out</button>
                </div>
              </details>
            </div>
          ) : (
            <Link className="btn" to="/login">Sign in <ArrowUpRight aria-hidden="true" size={14} /></Link>
          )}
        </div>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          className="mobile"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Menu aria-hidden="true" />
        </button>
      </header>
    </>
  );
}

function SiteFooter() {
  const { s } = useStore();
  return (
    <footer>
      <div>
        <b className="mark">E</b>
        <h3>{s.settings?.name || "EUROXPRO'27"}</h3>
        <p>A regional gathering for the people shaping the future of youth leadership and exchange.</p>
      </div>
      <div>
        <b>Explore</b>
        <Link to="/programme">Programme</Link>
        <Link to="/approvals">Approvals Hub</Link>
        <Link to="/store">Conference store</Link>
        <Link to="/quest">Explorer Quest</Link>
        <Link to="/travel">Travel &amp; Visa</Link>
      </div>
      <div>
        <b>Contact</b>
        <a href={`mailto:${s.settings?.email || "conference@euroxpro27.org"}`}>{s.settings?.email || "conference@euroxpro27.org"}</a>
        <Link to="/about">About this platform</Link>
      </div>
      <small className="copyright">© 2027 EUROXPRO&apos;27 · Made by Aqil Safarli</small>
    </footer>
  );
}

function SiteRoutes() {
  return (
    <main>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Approvals />} path="/approvals" />
        <Route element={<Programme />} path="/programme" />
        <Route element={<InfoPage type="venue" />} path="/venue" />
        <Route element={<Travel />} path="/travel" />
        <Route element={<Stay />} path="/accommodation" />
        <Route element={<FAQ />} path="/faq" />
        <Route element={<About />} path="/about" />
        <Route element={<AccessDenied />} path="/access-denied" />
        <Route element={<NeedOrganiser />} path="/admin/*">
          <Route element={<Admin />} path="*" />
        </Route>
        <Route element={<NeedUser />}>
          <Route element={<Registration />} path="/registration" />
          <Route element={<MyTicket />} path="/ticket" />
          <Route element={<MyLC />} path="/my-lc" />
          <Route element={<Agenda />} path="/agenda" />
          <Route element={<Notifications />} path="/notifications" />
        </Route>
        <Route element={<Store />} path="/store" />
        <Route element={<Quest />} path="/quest" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </main>
  );
}

export default function SiteLayout() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <SiteRoutes />
      <SiteFooter />
    </BrowserRouter>
  );
}
