import React, { useState, useEffect } from "react";
import { addNewNameToDB, fetchContest } from "../api-client";
import Header from "./header";
import ProposedNames from "./proposed-names";
import Form from "./new-name-form";

function Contest({ initialContest, navigateToContestList }) {
  const [contest, setContest] = useState(initialContest);

  useEffect(() => {
    if (!contest.names) {
      fetchContest(contest.id).then((res) => {
        setContest(res);
      });
    }
  }, [contest.id, contest.names]);

  const handleClick = (e) => {
    e.preventDefault();
    navigateToContestList();
  };

  const handleNewNameSubmit = async (e) => {
    const newNameInput = e.target.newName;
    const res = await addNewNameToDB({
      id: contest.id,
      name: newNameInput.value,
    });
    setContest(res);
  };

  return (
    <>
      <Header message={contest.contestName} />

      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>
      </div>

      <ProposedNames contest={contest} />

      <Form onSubmit={handleNewNameSubmit} />

      <a href="/" className="link" onClick={handleClick}>
        Contest List
      </a>
    </>
  );
}

export default Contest;
