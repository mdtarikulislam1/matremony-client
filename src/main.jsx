import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Routes";
import AuthProvider from "./Context/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// AOS init useEffect এর মাধ্যমে
function AppWrapper() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 50,
    });
  }, []);

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
