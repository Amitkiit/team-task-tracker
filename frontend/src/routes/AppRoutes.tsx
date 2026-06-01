import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "../pages/Tasks";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Members from "../pages/Members";
import Organization from "../pages/Organization";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
  path="/members"
  element={
    <ProtectedRoute>
      <Members />
    </ProtectedRoute>
  }
/>

<Route
  path="/members"
  element={
    <ProtectedRoute>
      <Members />
    </ProtectedRoute>
  }
/>
<Route
  path="/organization"
  element={
    <ProtectedRoute>
      <Organization />
    </ProtectedRoute>
  }
/>

        <Route

          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
