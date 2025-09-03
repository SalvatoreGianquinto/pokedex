import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import GenerazionePage from "./components/GenerazionePage"
import NavBar from "./components/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/generazione/1" replace />} />
        <Route path="/generazione/:id" element={<GenerazionePage />} />
      </Routes>
    </>
  )
}

export default App
