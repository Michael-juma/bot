import React from "react";

export default function BotTable({ selectedCards }) {
  return (
    <div className="mt-5">
      <h4>Your Bot Army</h4>

      <div className="d-flex flex-wrap gap-4 mt-3 justify-content-start">
        {selectedCards.map((bot) => (
          <div
            key={bot.id}
            className="card shadow-sm"
            style={{ width: "250px" }}
          >
            <img
              src={bot.avatar_url}
              alt={bot.name}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{bot.name}</h5>
              <p className="card-text"><em>{bot.bot_class}</em></p>
              <p className="card-text small text-muted">
                <strong>Health:</strong> {bot.health} <br />
                <strong>Damage:</strong> {bot.damage} <br />
                <strong>Armor:</strong> {bot.armor}
              </p>
              <p className="card-text"><q>{bot.catchphrase}</q></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
