import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Error Page
import ErrorPage from "./pages/ErrorPage";

// Greetings Pages
import Greetings from "./pages/Greetings";

// Authentications
import Authentication from "./pages/Authentication/Authentication";
import OtpSend from "./pages/Authentication/OtpSend";
import OtpVerify from "./pages/Authentication/OtpVerify";
import ResetPassword from "./pages/Authentication/ResetPassword";

function App() {
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
