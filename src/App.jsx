import React from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

// Error Page
import ErrorPage from "./pages/ErrorPage";

// Greetings Pages
import Greetings from "./pages/Greetings";

// Authentications
import Authentication from "./pages/Authentication/Authentication";
import OtpSend from "./pages/Authentication/OtpSend";
import OtpVerify from "./pages/Authentication/OtpVerify";
import ResetPassword from "./pages/Authentication/ResetPassword";

// MainLayout
import Dashboard from "./pages/Main/Dashboard";
import Sidebar from "./components/Main/Sidebar/Sidebar";
import Header from "./components/Main/Header/Header";

function App() {
  // MainLayout
  const MainLayout = () => {
    return (
      <div
        className="flex w-full"
        style={{
          background: "linear-gradient(to bottom, #1B1E24, #1E252E, #282E37)",
        }}
      >
        <Sidebar />
        <div className="w-full">
          <Header />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <Greetings />,
    },
    {
      path: "/auth",
      element: <Authentication />,
    },
    {
      path: "/otp-send",
      element: <OtpSend />,
    },
    {
      path: "/otp-verify",
      element: <OtpVerify />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/main",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
