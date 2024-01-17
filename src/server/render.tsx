import React from "react";
import { fetchContest, fetchContestList } from "../api-client";
import ReactDOMServer from "react-dom/server";
import App from "../components/app";
export default async function serverRender(req) {
  const { contestId } = req.params;

  const initialData = contestId
    ? { currentContest: await fetchContest(contestId) }
    : { contests: await fetchContestList() };

  const initialMarkup = ReactDOMServer.renderToString(
    <App initialData={initialData} />,
  );

  return { initialMarkup, initialData };
}
