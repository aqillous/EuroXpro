import { ConferenceProvider } from '../store/ConferenceContext';
import SiteLayout from '../layouts/SiteLayout';

export default function App() {
  return (
    <ConferenceProvider>
      <SiteLayout />
    </ConferenceProvider>
  );
}
