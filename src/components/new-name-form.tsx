import React from "react";

export default function Form({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };
  return (
    <div className="contest">
      <div className="title">Propose a New Name</div>
      <div className="body">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="newName"
            placeholder="New Name Here.."
          />
          <button type="submit" style={{ marginLeft: "0.5rem" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
