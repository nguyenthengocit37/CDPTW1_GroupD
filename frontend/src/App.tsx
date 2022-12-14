import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import MainLayout from './layout/MainLayout';
import DetailPage from './pages/Detail/DetailPage';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="job">
              <Route path=":slug" element={<DetailPage />} />
            </Route>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
