import React, { useEffect, useState } from "react";
import BotTable from "./BotTable";

export default function BotCollection() {
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/bots")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching bots:", error));
  }, []);


  const toggleLike = (id) => {
    const isLiked = likedCards.includes(id);
    setLikedCards((prev) =>
      isLiked ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );

    
    fetch(`http://localhost:5000/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ botId: id, liked: !isLiked }),
    });
  };

  const handleCardClick = (card) => {
    if (!selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Bot Collection</h3>

      <div className="row">
        {cards.map((card) => {
          const isLiked = likedCards.includes(card.id);

          return (
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
                    ❤️: {card.health} | 🛡: {card.armor} | ⚔️ : {card.damage}
                  </p>

                  <p className="fst-italic text-muted small">
                    "{card.catchphrase}"
                  </p>
                </div>

                <div className="like-button-wrapper position-absolute bottom-0 end-0 p-2">
                  <button
                    className={`btn ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(card.id);
                    }}
                  >
                    {isLiked ? "❤️ Liked" : "🤍 Like"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCards.length > 0 && <BotTable selectedCards={selectedCards} />}
    </div>
  );
}
