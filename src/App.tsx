import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AdminPage from "./admin/page";
import { TicketProvider } from "./context/TicketContext";
import HistoryPage from "./history/page";
import ScanPage from "./scan/page";

function App() {
  return (
    <BrowserRouter>
      <TicketProvider>
        <div className="max-w-md mx-auto min-h-screen bg-black overflow-hidden relative shadow-2xl">
          <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/history/:id" element={<HistoryPage />} />
          </Routes>
          <Toaster position="top-center" theme="dark" />
        </div>
      </TicketProvider>
    </BrowserRouter>
  );
}

export default App;
