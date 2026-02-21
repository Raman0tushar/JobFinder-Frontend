// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { getAllJobs, searchJobs } from '../services/api';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (Object.keys(filters).length > 0) {
        data = await searchJobs(filters);
      } else {
        data = await getAllJobs();
      }
      setJobs(data || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load jobs at the moment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {};
    if (keyword.trim()) filters.title = keyword.trim();
    if (location.trim()) filters.location = location.trim();
    loadJobs(filters);
  };

  const resetSearch = () => {
    setKeyword('');
    setLocation('');
    loadJobs();
  };

  return (
    <div className="pt-8 pb-16">
      {/* Hero / Search Section */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight">
          Discover Your Next Opportunity
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Explore thousands of job openings from top companies — remote, hybrid & on-site.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 md:gap-5">
            <input
              type="text"
              placeholder="Job title, skill, company name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />

            <input
              type="text"
              placeholder="City, state or 'remote'"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all shadow-md hover:shadow-lg"
              >
                Search
              </button>

              {(keyword || location) && (
                <button
                  type="button"
                  onClick={resetSearch}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-xl text-lg transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </form>
      </section>

      {/* Jobs Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {keyword || location ? 'Search Results' : 'Featured & Latest Jobs'}
            {jobs.length > 0 && (
              <span className="ml-3 text-xl font-normal text-gray-500">({jobs.length})</span>
            )}
          </h2>

          
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-xl">
            <p className="text-xl font-medium text-red-700 mb-4">{error}</p>
            <button
              onClick={() => loadJobs()}
              className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              Retry
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or browse all available positions.
            </p>
            <button
              onClick={resetSearch}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              See All Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
}