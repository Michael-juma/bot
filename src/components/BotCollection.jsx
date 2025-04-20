import React, { useState } from "react";
import BotTable from "./BotTable";

export default function BotCollection() {
  const [likedCards, setLikedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const cards = [
    {
      id: 101,
      name: "wHz-93",
      health: 94,
      damage: 20,
      armor: 63,
      bot_class: "Support",
      catchphrase: "1010010101001101100011000111101",
      avatar_url:
        "https://robohash.org/nostrumrepellendustenetur.png?size=300x300&set=set1",
    },
    {
      id: 102,
      name: "RyM-66",
      health: 86,
      damage: 36,
      armor: 77,
      bot_class: "Medic",
      catchphrase: "0110011100000100011110100110011000011001",
      avatar_url:
        "https://robohash.org/quidemconsequaturaut.png?size=300x300&set=set1",
    },
    {
      id: 103,
      name: "K4T-22",
      health: 78,
      damage: 45,
      armor: 50,
      bot_class: "Assault",
      catchphrase: "We strike fast and leave no trace.",
      avatar_url:
        "https://robohash.org/suntdebitisvoluptatum.png?size=300x300&set=set1",
    },
    {
      id: 104,
      name: "X9B-88",
      health: 99,
      damage: 15,
      armor: 90,
      bot_class: "Tank",
      catchphrase: "Hold the line at all costs.",
      avatar_url:
        "https://robohash.org/laborealiquamsint.png?size=300x300&set=set1",
    },
  ];

  const toggleLike = (id) => {
    if (likedCards.includes(id)) {
      setLikedCards(likedCards.filter((cardId) => cardId !== id));
    } else {
      setLikedCards([...likedCards, id]);
    }
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

                  {/* Stats */}
                  <p className="small mb-2">
                    ❤️ Health: {card.health} | 🛡 Armor: {card.armor} | ⚔️ Damage: {card.damage}
                  </p>

                  {/* Catchphrase */}
                  <p className="fst-italic text-muted small">
                    "{card.catchphrase}"
                  </p>
                </div>

                {/* Like Button */}
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
