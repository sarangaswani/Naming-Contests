import React, { useState } from "react";
import { addNewContest } from "../api-client";

function NewContestForm({ onSuccess }) {
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContestNameInput = e.target.contestName;
    const newCategoryNameInput = e.target.categoryName;
    const newContestDescriptionInput = e.target.description;
    const res = await addNewContest({
      contestName: newContestNameInput.value,
      categoryName: newCategoryNameInput.value,
      contestDesc: newContestDescriptionInput.value,
    });
    if (res?.id) {
      onSuccess(res);
      e.target.reset();
      setShowForm(false);
    }
  };
  return (
    <div className="add-new-contest">
      {!showForm && (
        <div className="link" onClick={() => setShowForm(true)}>
          Add New Contest
        </div>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Contest Name"
            name="contestName"
          />
          <input
            type="text"
            placeholder="Contest Category"
            name="categoryName"
          />
          <textarea
            placeholder="Contest Description"
            name="description"
            rows={5}
          />
          <button type="submit">Sumbit</button>
        </form>
      )}
    </div>
  );
}

export default NewContestForm;
