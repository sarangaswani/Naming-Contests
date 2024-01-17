import { useEffect, useState } from "react";

import { fetchContestList } from "../api-client";

import ContestPreview from "./contest-preview";
import Header from "./header";

const ContestList = ({ initialContests, navigate }) => {
  const [contests, setContests] = useState(
    initialContests ?? [],
  );

  useEffect(() => {
    if (!initialContests) {
      fetchContestList().then((contests) => {
        setContests(contests);
      });
    }
  }, [initialContests]);

  return (
    <>
      <Header message={"Naming Contests"} />
      <div className="contest-list">
        {contests.map((contest) => {
          return (
            <ContestPreview
              key={contest.id}
              contest={contest}
              navigate={navigate}
            />
          );
        })}
      </div>
    </>
  );
};

export default ContestList;
