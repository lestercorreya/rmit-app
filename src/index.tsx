import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css"

import SignIn from './pages/signIn';
import LogIn from './pages/logIn'
import Validate from './pages/validate'
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/logIn",
    element: <LogIn />,
  },
  {
    path: "/validate",
    element: <Validate />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
