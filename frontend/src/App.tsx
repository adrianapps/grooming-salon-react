import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import "./index.css";
import DogPage from "./pages/DogPage";
import VisitPage from "./pages/VisitPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/serwisy" element={<ServicePage />} />
          <Route path="/wizyty" element={<VisitPage />} />
          <Route path="/psy" element={<DogPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
