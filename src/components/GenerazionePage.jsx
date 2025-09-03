import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Card, Row, Col, Button } from "react-bootstrap"
import "../styles/GenerazionePage.css"

const GenerazionePage = () => {
  const { id } = useParams()
  const [pokemonList, setPokemonList] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(`selectedPokemonGen${id}`)
    if (stored) setSelected(JSON.parse(stored))
  }, [id])

  useEffect(() => {
    localStorage.setItem(`selectedPokemonGen${id}`, JSON.stringify(selected))
  }, [selected, id])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://pokeapi.co/api/v2/generation/${id}`)
      .then((response) => {
        const fetched = response.data.pokemon_species
          .map((p) => {
            const urlParts = p.url.split("/").filter(Boolean)
            const number = parseInt(urlParts[urlParts.length - 1])
            return { name: p.name, number }
          })
          .sort((a, b) => a.number - b.number)
        setPokemonList(fetched)
      })
      .catch((e) => console.log("Errore nel fetch:", e))
      .finally(() => setLoading(false))
  }, [id])

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
        Pokémon Generazione {id}{" "}
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
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="scroll-top-button"
      >
        Torna su
      </Button>
    </div>
  )
}

export default GenerazionePage
