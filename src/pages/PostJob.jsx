import { useState } from "react";
import { postJob } from  '../services/jobApi';
export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    companyName: "",
    expiresAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await postJob({
        ...form,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
        expiresAt: `${form.expiresAt}T00:00:00`,
      });

      setSuccess("🎉 Job posted successfully!");
      setForm({
        title: "",
        description: "",
        location: "",
        jobType: "",
        salaryMin: "",
        salaryMax: "",
        companyName: "",
        expiresAt: "",
      });
    } catch (err) {
      console.error(err);
      setError("❌ Failed to post job. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Job Title"
          className="input"
          onChange={handleChange}
          value={form.title}
          required
        />

        <input
          name="companyName"
          placeholder="Company Name"
          className="input"
          onChange={handleChange}
          value={form.companyName}
          required
        />

        <input
          name="location"
          placeholder="Location"
          className="input"
          onChange={handleChange}
          value={form.location}
          required
        />

        <select
          name="jobType"
          className="input"
          onChange={handleChange}
          value={form.jobType}
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          className="input h-32"
          onChange={handleChange}
          value={form.description}
          required
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="salaryMin"
            placeholder="Min Salary (₹)"
            className="input"
            onChange={handleChange}
            value={form.salaryMin}
            required
          />

          <input
            type="number"
            name="salaryMax"
            placeholder="Max Salary (₹)"
            className="input"
            onChange={handleChange}
            value={form.salaryMax}
            required
          />
        </div>

        <input
          type="date"
          name="expiresAt"
          className="input"
          onChange={handleChange}
          value={form.expiresAt}
          required
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
