import { lazy } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router"
import RootLayout from "./root";

const Note = lazy(() => import("./features/note"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/notes" replace />} />
          <Route path="notes" element={<Note />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}