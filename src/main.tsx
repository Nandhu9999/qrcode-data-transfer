import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import TextInputModule from "./components/TextInputModule.tsx";
import CameraModule from "./components/CameraModule.tsx";
import ControlsInputModule from "./components/ControlsInputModule.tsx";

const ContentLayout = lazy(() => import("./layouts/ContentLayout.tsx"));
const QRCodeModule = lazy(() => import("./components/QRCodeModule.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "scan",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ContentLayout
              first={<QRCodeModule />}
              second={<TextInputModule />}
            />
          </Suspense>
        ),
      },
      { path: "scan2", element: null },
      {
        path: "read",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ContentLayout
              first={<CameraModule />}
              second={<ControlsInputModule />}
            />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
