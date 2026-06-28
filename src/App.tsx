import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Fun } from "./pages/Fun";
import { About } from "./pages/About";
import { CaseStudyPage } from "./pages/case-studies/CaseStudyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<CaseStudyPage />} />
      <Route path="/fun" element={<Fun />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
