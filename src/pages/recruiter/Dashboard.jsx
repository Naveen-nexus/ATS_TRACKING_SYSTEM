import { Link } from 'react-router-dom';
import { Briefcase, Users, Star, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MetricCard } from '../../components/ui/MetricCard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ApplicantsBarChart } from '../../components/charts/ApplicantsBarChart';
import { SkillBarChart } from '../../components/charts/SkillBarChart';
import { ActivityLineChart } from '../../components/charts/ActivityLineChart';
import { mockRecruiterJobs, mockCandidates, applicantsPerJobData, skillDemandData, monthlyApplicationsData } from '../../data/mockData';
import { getStatusColor, formatDate } from '../../utils/helpers';

const jobStatusVariant = { Active: 'green', Paused: 'yellow', Draft: 'default', Closed: 'red' };

export const RecruiterDashboard = () => {
  const { user } = useAuth();
  const totalJobs = mockRecruiterJobs.length;
  const totalApplicants = mockRecruiterJobs.reduce((a, j) => a + j.applicants, 0);
  const totalShortlisted = mockRecruiterJobs.reduce((a, j) => a + j.shortlisted, 0);
  const conversionRate = totalApplicants > 0 ? Math.round((totalShortlisted / totalApplicants) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recruiter Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back, {user?.name?.split(' ')[0]}! Here's your hiring overview.</p>
        </div>
        <Link to="/recruiter/post-job">
          <Button size="sm" className="hidden sm:flex items-center gap-1.5"><Plus size={14} /> Post Job</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Jobs Posted" value={totalJobs} icon={Briefcase} iconColor="blue" trend={10} subtitle="Total active + draft" />
        <MetricCard title="Total Applicants" value={totalApplicants} icon={Users} iconColor="indigo" trend={18} subtitle="Across all jobs" />
        <MetricCard title="Shortlisted" value={totalShortlisted} icon={Star} iconColor="yellow" trend={7} subtitle="Ready for interview" />
        <MetricCard title="Conversion Rate" value={`${conversionRate}%`} icon={TrendingUp} iconColor="green" trend={3} subtitle="Shortlist ratio" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Applicants per Job</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Total vs. shortlisted candidates</p>
            </CardHeader>
            <CardBody>
              <ApplicantsBarChart data={applicantsPerJobData} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Active Jobs</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Current job postings</p>
              </div>
              <Link to="/recruiter/jobs">
                <Button variant="ghost" size="xs">View all <ArrowRight size={12} /></Button>
              </Link>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-t border-gray-100 dark:border-gray-700">
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Job Title</th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Applicants</th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Shortlisted</th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {mockRecruiterJobs.slice(0, 4).map(job => (
                    <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{job.type} • {job.location}</p>
                      </td>
                      <td className="px-6 py-3 hidden sm:table-cell">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{job.applicants}</p>
                      </td>
                      <td className="px-6 py-3 hidden md:table-cell">
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{job.shortlisted}</p>
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={jobStatusVariant[job.status] || 'default'} dot>{job.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Top Skills Demanded</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Most required in job postings</p>
            </CardHeader>
            <CardBody>
              <SkillBarChart data={skillDemandData} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Applicants</h3></CardHeader>
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {mockCandidates.slice(0, 4).map(c => (
                <Link key={c.id} to={`/recruiter/applicants/${c.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.experience}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.matchScore >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.matchScore}%</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
