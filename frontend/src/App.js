import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CDUCalculator from './components/CDUCalculator';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CDUCalculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;