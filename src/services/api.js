const API_URL =
  import.meta.env.VITE_API_URL || "https://celebrated-clarity-production.up.railway.app/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};


// ✅ GET ALL JOBS
export const getAllJobs = async () => {
  const res = await fetch(`${API_URL}/jobs`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch jobs");

  return res.json();
};


// ✅ GET JOB BY ID
export const getJobById = async (id) => {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch job");

  return res.json();
};


// ✅ SEARCH JOBS
export const searchJobs = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `${API_URL}/jobs/search?${query}`,
    { headers: getHeaders() }
  );

  if (!res.ok) throw new Error("Search failed");

  return res.json();
};



