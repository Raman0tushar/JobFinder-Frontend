import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {job.title}
        </h3>
        <p className="text-indigo-600 font-medium mb-3">{job.companyName}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {job.jobType || 'Full-time'}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {job.location || 'Remote'}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            {new Date(job.postedAt).toLocaleDateString()}
          </span>
          {job.salaryMin && (
            <span className="font-medium text-green-700">
              ₹{job.salaryMin.toLocaleString()}
              {job.salaryMax ? ` -  ₹${job.salaryMax.toLocaleString()}` : '+'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}