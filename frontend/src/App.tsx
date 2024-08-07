import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import EscalationsHomePage from "./components/Escalations/EscalationsHomePage";
import ProductEscalations from "./components/Escalations/ProductEscalations";
import { DataProvider } from "./DataContext";
import EscalationPage from "./components/Escalations/EscalationPage";
import NewEscalation from "./components/Escalations/NewEscalation";
import Srs from "./components/Srs";

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="flex flex-col min-h-screen min-w-[100vw] items-center">
          <Header />
          <Navbar />
          <main className="text-3xl bg-slate-700 min-w-[100vw] flex flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/escalations" element={<EscalationsHomePage />} />
              <Route
                path="/escalations/:productType"
                element={<ProductEscalations />}
              />
              <Route
                path="/escalations/:productType/:escalationId"
                element={<EscalationPage />}
              />
              <Route
                path="/escalations/:productType/new"
                element={<NewEscalation />}
              />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/srs" element={<Srs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
