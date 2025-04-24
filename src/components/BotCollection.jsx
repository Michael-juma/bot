import React, { useEffect, useState } from "react";
import BotTable from "./BotTable";

export default function BotCollection() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/bots")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching bots:", error));
  }, []);

  const handleCardClick = (card) => {
    if (!selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleRemoveFromArmy = (bot) => {
    setSelectedCards((prev) => prev.filter((c) => c.id !== bot.id));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/bots/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the bot from the local state
        setCards((prev) => prev.filter((card) => card.id !== id));
        setSelectedCards((prev) => prev.filter((card) => card.id !== id));
      })
      .catch((error) => console.error("Error deleting bot:", error));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Bot Collection</h3>

      <div className="row">
        {cards.map((card) => (
          <div
            className="col-md-3"
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{ cursor: "pointer" }}
          >
            <div className="card mb-4 h-100 shadow-sm position-relative d-flex flex-column">
              <img
                src={card.avatar_url}
                className="card-img-top"
                alt={card.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="text-muted">{card.bot_class}</p>
                <p className="small mb-2">
                  ❤️: {card.health} | 🛡: {card.armor} | ⚔️: {card.damage}
                </p>
                <p className="fst-italic text-muted small">
                  "{card.catchphrase}"
                </p>
              </div>

              <div className="position-absolute bottom-0 end-0 p-2">
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleDelete(card.id);
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCards.length > 0 && (
        <BotTable selectedCards={selectedCards} onRemove={handleRemoveFromArmy} />
      )}
    </div>
  );
}
