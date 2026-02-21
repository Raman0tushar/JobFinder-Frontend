import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/api';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Oops!</h2>
        <p className="text-xl text-gray-700 mb-8">{error || 'Job not found'}</p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-indigo-700"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 font-medium"
      >
        ← Back to all jobs
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
      <p className="text-xl text-indigo-700 font-semibold mb-6">{job.companyName}</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">
          {job.jobType || 'Full-time'}
        </span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
          {job.location || 'Remote'}
        </span>
      </div>

      {job.salaryMin && (
        <div className="mb-8">
          <span className="text-2xl font-bold text-green-700">
            ${job.salaryMin.toLocaleString()}
            {job.salaryMax ? ` – $${job.salaryMax.toLocaleString()}` : '+'}
          </span>
          <span className="text-gray-600 ml-2">/ year</span>
        </div>
      )}

      <div className="prose max-w-none mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Job Description</h2>
        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
          {job.description}
        </div>
      </div>

      <div className="border-t pt-6 mt-10 text-sm text-gray-500">
        Posted on {new Date(job.postedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>

      <button className="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-xl text-lg transition-colors duration-200 shadow-lg">
        Apply Now
      </button>
    </div>
  );
}