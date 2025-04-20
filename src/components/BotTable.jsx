import React from "react";

export default function BotTable({ selectedCards, onRemove }) {
  return (
    <div className="container mt-4">
      <h4 className="mb-3">Your Bot Army</h4>
      <div className="row">
        {selectedCards.map((card) => (
          <div
            key={card.id}
            className="col-md-3"
            onClick={() => onRemove(card)}
            style={{ cursor: "pointer" }}
          >
            <div className="card mb-4 h-100 shadow-sm">
              <img
                src={card.avatar_url}
                className="card-img-top"
                alt={card.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="text-muted">{card.bot_class}</p>
                <p className="small">
                  ❤️: {card.health} | 🛡: {card.armor} | ⚔️ : {card.damage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
