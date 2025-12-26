import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AdminPage from "./admin/page";
import { LanguageProvider } from "./context/LanguageContext";
import { TicketProvider } from "./context/TicketContext";
import HistoryPage from "./history/page";
import ScanPage from "./scan/page";

import DashboardPage from "./dashboard/page";

import { useLocation } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <div className="min-h-screen bg-black text-white">{children}</div>;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black overflow-hidden relative shadow-2xl">
      {children}
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <TicketProvider>
          <Routes>
            {/* Dashboard Routes (Full Width) */}
            <Route path="/dashboard/*" element={<DashboardPage />} />

            {/* Mobile App Routes (Restricted Width) */}
            <Route path="/" element={<Layout><AdminPage /></Layout>} />
            <Route path="/scan" element={<Layout><ScanPage /></Layout>} />
            <Route path="/history/:id" element={<Layout><HistoryPage /></Layout>} />
          </Routes>
        </TicketProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
