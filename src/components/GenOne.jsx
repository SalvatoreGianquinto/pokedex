import { useEffect, useState } from "react"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import "../styles/GenOne.css"

const GenOne = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("selectedPokemon")
    if (stored) {
      setSelected(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("selectedPokemon", JSON.stringify(selected))
  }, [selected])

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        const fetched = response.data.results.map((p, idx) => ({
          name: p.name,
          number: idx + 1,
        }))
        setPokemonList(fetched)
      })
      .catch((e) => console.log("Errore nel fetch:", e))
      .finally(() => setLoading(false))
  }, [])

  const toggleSelect = (number) => {
    setSelected((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    )
  }

  return (
    <div className="m-2">
      <h1 className="mb-4">
        Pokémon Prima Generazione{" "}
        <small className="text-muted">
          ({selected.length} / {pokemonList.length})
        </small>
      </h1>

      {loading ? (
        <p>Caricamento in corso...</p>
      ) : (
        <Row xs={2} sm={3} md={4} lg={6} className="g-3">
          {pokemonList.map((pokemon) => {
            const isSelected = selected.includes(pokemon.number)
            return (
              <Col key={pokemon.number}>
                <Card
                  className={`text-center pokemon-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleSelect(pokemon.number)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`}
                    alt={pokemon.name}
                    style={{
                      width: "96px",
                      height: "96px",
                      margin: "0 auto",
                      paddingTop: "10px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="text-capitalize">
                      #{pokemon.number.toString().padStart(3, "0")}{" "}
                      {pokemon.name}
                      {isSelected && " ✅"}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}

export default GenOne
