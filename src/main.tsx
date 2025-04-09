import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import CountryDetail from "./pages/CountryDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

import MainLayout from "./layouts/MainLayout.tsx";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/country/:name",
        element: <CountryDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
