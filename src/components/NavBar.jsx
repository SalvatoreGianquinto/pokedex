import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/NavBar.css"

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const generations = [
    { id: 1, name: "Generazione 1" },
    { id: 2, name: "Generazione 2" },
    { id: 3, name: "Generazione 3" },
    { id: 4, name: "Generazione 4" },
    { id: 5, name: "Generazione 5" },
    { id: 6, name: "Generazione 6" },
    { id: 7, name: "Generazione 7" },
    { id: 8, name: "Generazione 8" },
    { id: 9, name: "Generazione 9" },
  ]

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <div
        className="dropdown"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button className="dropbtn">Generazioni ▼</button>
        {dropdownOpen && (
          <div className="dropdown-content">
            {generations.map((gen) => (
              <Link key={gen.id} to={`/generazione/${gen.id}`}>
                {gen.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
