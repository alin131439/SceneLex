import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import Learn from "@/pages/Learn";
import Stats from "@/pages/Stats";
import Novel from "@/pages/Novel";
import Profile from "@/pages/Profile";
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <HashRouter>
      <div className="h-full flex flex-col bg-surface">
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/novel" element={<Novel />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Navbar />
      </div>
    </HashRouter>
  );
}
