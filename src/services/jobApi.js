import axios from "axios";

const BASE_URL = "https://celebrated-clarity-production.up.railway.app/api/jobs ";

export const postJob = async (jobData) => {
  const response = await axios.post(`${BASE_URL}/post`, jobData);
  return response.data;
};
