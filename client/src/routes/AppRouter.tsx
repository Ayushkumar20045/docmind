import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ChatPage from "../pages/Chat/ChatPage";
import DocumentsPage from "../pages/Documents/DocumentsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;