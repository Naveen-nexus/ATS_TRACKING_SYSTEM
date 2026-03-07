import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Pause, Trash2, Users, Eye, Play, Search, ChevronDown } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { mockRecruiterJobs } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const statusVariant = { Active: 'green', Paused: 'yellow', Draft: 'default', Closed: 'red' };

export const ManageJobs = () => {
  const [jobs, setJobs] = useState(mockRecruiterJobs);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const toggleStatus = (id, current) => {
    const next = current === 'Active' ? 'Paused' : 'Active';
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: next } : j));
    toast.success(`Job ${next === 'Active' ? 'activated' : 'paused'}`);
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    toast.success('Job deleted');
  };

  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || j.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Jobs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{jobs.length} total job postings</p>
        </div>
        <Link to="/recruiter/post-job">
          <Button className="flex items-center gap-1.5"><Plus size={14} /> Post New Job</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {['All', 'Active', 'Paused', 'Draft', 'Closed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState type="jobs" title="No jobs found" description="Try adjusting your search or create a new job posting." action={<Link to="/recruiter/post-job"><Button>Post a Job</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {filtered.map(job => (
            <Card key={job.id} className="p-5">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                    <Badge variant={statusVariant[job.status] || 'default'} dot>{job.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span>Posted {formatDate(job.posted)}</span>
                    <span>Deadline {formatDate(job.deadline)}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300"><strong>{job.applicants}</strong> <span className="text-gray-500 dark:text-gray-400">applicants</span></span>
                    <span className="text-sm text-purple-600 dark:text-purple-400"><strong>{job.shortlisted}</strong> <span className="text-gray-500 dark:text-gray-400">shortlisted</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Link to="/recruiter/applicants">
                    <Button size="sm" variant="secondary" className="flex items-center gap-1.5"><Users size={13} /> Applicants</Button>
                  </Link>
                  {job.status !== 'Closed' && (
                    <button onClick={() => toggleStatus(job.id, job.status)} className={`p-2 rounded-lg border text-xs transition-colors ${job.status === 'Active' ? 'border-yellow-200 dark:border-yellow-800 text-yellow-600 hover:bg-yellow-50' : 'border-green-200 dark:border-green-800 text-green-600 hover:bg-green-50'}`}>
                      {job.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  )}
                  <button onClick={() => deleteJob(job.id)} className="p-2 rounded-lg border border-red-200 dark:border-red-800/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
