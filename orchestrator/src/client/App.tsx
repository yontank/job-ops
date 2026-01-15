/**
 * Main App component.
 */

import React from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { OrchestratorPage } from "./pages/OrchestratorPage";
import { SettingsPage } from "./pages/SettingsPage";
import { UkVisaJobsPage } from "./pages/UkVisaJobsPage";
import { VisaSponsorsPage } from "./pages/VisaSponsorsPage";

export const App: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<OrchestratorPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/ukvisajobs" element={<UkVisaJobsPage />} />
      <Route path="/visa-sponsors" element={<VisaSponsorsPage />} />
    </Routes>

    <Toaster position="bottom-right" richColors closeButton />
  </>
);
