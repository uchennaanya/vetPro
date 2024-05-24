import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

import Router from "./router/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    
    <AuthContextProvider>
      
      <RouterProvider router={Router} />
    </AuthContextProvider>
  </QueryClientProvider>
);
