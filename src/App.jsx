import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExperimentDetail from './pages/ExperimentDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiment/:id" element={<ExperimentDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
