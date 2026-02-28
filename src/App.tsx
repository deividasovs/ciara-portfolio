import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { PaperBagPrincess } from './pages/fakeConsumerPage/PaperBagPrincess';
import { ScrollToHash } from './components/ScrollToHash';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/interactive/paperbagprincess" element={<PaperBagPrincess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
