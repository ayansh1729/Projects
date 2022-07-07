import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    //BEM naming conventions
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Routes>
              <Route path="/app" element={<Sidebar />} />
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Sidebar />
                    <Chat />
                  </>
                }
              />
              <Route path="/" element={<h1>Home Screen</h1>} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
