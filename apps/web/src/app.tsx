import { lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";

const RootLayout = lazy(() => import("./root"));
const GraphView = lazy(() => import("./features/graph-view"));
const Note = lazy(() => import("./features/note"));
const NoteGuard = lazy(() => import("./guards/note-guard"));
const Settings = lazy(() => import("./features/settings"));
const Sync = lazy(() => import("./features/settings/sync"));
const Bindings = lazy(() => import("./features/settings/bindings"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="graph" element={<GraphView />} />
          <Route index element={<Navigate to="/note" replace />} />
          <Route path="note" element={<NoteGuard />}>
            <Route path=":id" element={<Note />} />
          </Route>
          <Route path="settings">
            <Route index element={<Settings />} />
            <Route path="sync" element={<Sync />} />
            <Route path="bindings" element={<Bindings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
