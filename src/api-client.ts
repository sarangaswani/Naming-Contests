import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchContestList = async () => {
  const response = await axios.get(`${API_SERVER_URL}/contests`);
  return response.data.contests;
};
export const fetchContest = async (id) => {
  const response = await axios.get(
    `${API_SERVER_URL}/contest/${id}`,
  );
  return response.data.contest;
};
export const addNewNameToDB = async ({ id, name }) => {
  const response = await axios.post(
    `${API_SERVER_URL}/contest/${id}`,
    { name },
  );
  return response.data.updatedContest;
};
export const addNewContest = async ({
  categoryName,
  contestName,
  contestDesc,
}) => {
  const response = await axios.post(
    `${API_SERVER_URL}/contests`,
    { categoryName, contestName, contestDesc },
  );
  return response.data.contest;
};
