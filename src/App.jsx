import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Forecasts from './pages/Forecasts';
import Polling from './pages/Polling';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import Interactives from './pages/Interactives';
import SenateSwingometer from './pages/SenateSwingometer';
import HouseSwingometer from './pages/HouseSwingometer';
import GovernorsSwingometer from './pages/GovernorsSwingometer';
import PresidentialMapBuilder from './pages/PresidentialMapBuilder';

import SenateForecast from './pages/SenateForecast';
import HouseForecast from './pages/HouseForecast';
import GovernorsForecast from './pages/GovernorsForecast';
import Elections from './pages/Elections';
import ElectionDetail from './pages/ElectionDetail';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Forecasts" element={<Forecasts />} />
        <Route path="/Polling" element={<Polling />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/ArticleView/:id" element={<ArticleView />} />
        <Route path="/Interactives" element={<Interactives />} />
        <Route path="/SenateSwingometer" element={<SenateSwingometer />} />
        <Route path="/HouseSwingometer" element={<HouseSwingometer />} />
        <Route path="/GovernorsSwingometer" element={<GovernorsSwingometer />} />
        <Route path="/PresidentialMapBuilder" element={<PresidentialMapBuilder />} />

        <Route path="/SenateForecast" element={<SenateForecast />} />
        <Route path="/HouseForecast" element={<HouseForecast />} />
        <Route path="/GovernorsForecast" element={<GovernorsForecast />} />
        <Route path="/Elections" element={<Elections />} />
        <Route path="/ElectionDetail/:id" element={<ElectionDetail />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App