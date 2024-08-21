import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import CreatePatient from "./pages/CreatePatient";
import EditPatient from "./pages/EditPatient";
import Routeguard from "./components/Routeguard";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Home />
            </Routeguard>
          }
        />
        <Route
          path="/create"
          element={
            <Routeguard>
              <CreatePatient />
            </Routeguard>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Routeguard>
              <EditPatient />
            </Routeguard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
