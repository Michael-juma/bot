import React, { useState } from "react";
import BotTable from "./BotTable"; 
export default function BotCollection() {
  const [likedCards, setLikedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const cards = [
    {
      id: 1,
      title: "Bot 1",
      description: "Stealth unit",
      imageUrl: "https://robohash.org/bot1.png",
    },
    {
      id: 2,
      title: "Bot 2",
      description: "Defense unit",
      imageUrl: "https://robohash.org/bot2.png",
    },
    {
      id: 3,
      title: "Bot 3",
      description: "Assault unit",
      imageUrl: "https://robohash.org/bot3.png",
    },
    {
      id: 4,
      title: "Bot 4",
      description: "Recon unit",
      imageUrl: "https://robohash.org/bot4.png",
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

      {/* Bot Cards */}
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
              <div className="card mb-4 h-100 shadow-sm position-relative">
                <img
                  src={card.imageUrl}
                  className="card-img-top"
                  alt={card.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                </div>

                {/* Like Button */}
                <div className="like-button-wrapper position-absolute bottom-0 end-0 p-2">
                  <button
                    className={`btn ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering the card click
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

      {/* Render Bot Table */}
      {selectedCards.length > 0 && <BotTable selectedCards={selectedCards} />}
    </div>
  );
}
