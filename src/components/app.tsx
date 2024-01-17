import React, { useState, useEffect } from "react";
import ContestList from "./contest-list";
import Contest from "./contest";
import NewContestForm from "./new-contest-form";

export default function App({ initialData }) {
  const [currentPage, setCurrentPage] = useState<
    "contest" | "contestsList"
  >(initialData.currentContest ? "contest" : "contestsList");

  const [currentContest, setCurrentContest] = useState<
    object | undefined
  >(initialData.currentContest);

  useEffect(() => {
    window.onpopstate = (event) => {
      const newPage = event.state?.contestId
        ? "contest"
        : "contestsList";
      setCurrentPage(newPage);
      setCurrentContest({ id: event.state?.contestId });
    };
  }, []);

  const navigate = (contestId) => {
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
    setCurrentPage("contest");
    setCurrentContest({ id: contestId });
  };

  const navigateToContestList = () => {
    window.history.pushState({}, "", "/");
    setCurrentPage("contestsList");
    setCurrentContest(undefined);
  };

  const onNewContest = (newContest) => {
    window.history.pushState(
      { contestId: newContest.id },
      "",
      `/contest/${newContest.id}`,
    );
    setCurrentPage("contest");
    setCurrentContest(newContest);
    initialData.contests.push(newContest);
  };

  const pageContent = () => {
    switch (currentPage) {
      case "contestsList":
        return (
          <>
            <ContestList
              initialContests={initialData.contests}
              navigate={navigate}
            />
            <NewContestForm onSuccess={onNewContest} />
          </>
        );
      case "contest":
        return (
          <Contest
            initialContest={currentContest}
            navigateToContestList={navigateToContestList}
          />
        );
    }
  };

  return <div className="container">{pageContent()}</div>;
}
