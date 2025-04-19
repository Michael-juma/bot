import React from "react";

export default function BotTable({ selectedCards }) {
  return (
    <div className="mt-5">
      <h4>Your Bot Army</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Bot Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {selectedCards.map((bot) => (
            <tr key={bot.id}>
              <td>
                <img src={bot.imageUrl} alt={bot.title} width="50" />
              </td>
              <td>{bot.title}</td>
              <td>{bot.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
