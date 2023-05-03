import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainView from "./components/mainView";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainView />} />
      </Routes>
    </Router>
  );
}

export default App;
