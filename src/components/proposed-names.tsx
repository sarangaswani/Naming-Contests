import React from "react";

export default function ProposedNames({ contest }) {
  const { names: contestants } = contest;
  return (
    <div className="contest">
      <div className="title">Proposed Names</div>
      <div className="body">
        {contestants?.length > 0 ? (
          <div className="list">
            {contestants.map((person) => (
              <div key={person.id} className="item">
                {person.name}
              </div>
            ))}
          </div>
        ) : (
          <div>No names proposed yet</div>
        )}
      </div>
    </div>
  );
}
