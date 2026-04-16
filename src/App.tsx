import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { PaperBagPrincess } from './pages/fakeConsumerPage/PaperBagPrincess';
import { ExperimentalProjectPage } from './pages/experiments/ExperimentalProjectPage';
import { ScrollToHash } from './components/ScrollToHash';
import { CookieBanner } from './components/CookieBanner';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="App">
        <CookieBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/interactive/paperbagprincess" element={<PaperBagPrincess />} />
          <Route path="/experiments" element={<ExperimentalProjectPage />} />
          <Route path="/experiments/:projectId" element={<ExperimentalProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
