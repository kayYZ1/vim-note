import { lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import RootLayout from "./root";

const Note = lazy(() => import("./features/note"));
const NoteGuard = lazy(() => import("./guards/note-guard"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/notes" replace />} />
          <Route path="notes" element={<NoteGuard />}>
            <Route path=":id" element={<Note />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
