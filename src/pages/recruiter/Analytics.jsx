import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { MetricCard } from '../../components/ui/MetricCard';
import { ApplicantsBarChart } from '../../components/charts/ApplicantsBarChart';
import { SkillBarChart } from '../../components/charts/SkillBarChart';
import { ActivityLineChart } from '../../components/charts/ActivityLineChart';
import { ApplicationPieChart } from '../../components/charts/ApplicationPieChart';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Briefcase, Users, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { applicantsPerJobData, skillDemandData, monthlyApplicationsData, mockRecruiterJobs } from '../../data/mockData';

const hiringFunnelData = [
  { stage: 'Total Applicants', value: 161, pct: 100, color: 'blue' },
  { stage: 'Under Review', value: 89, pct: 55, color: 'yellow' },
  { stage: 'Shortlisted', value: 27, pct: 17, color: 'purple' },
  { stage: 'Interviewed', value: 14, pct: 9, color: 'indigo' },
  { stage: 'Offers Made', value: 6, pct: 4, color: 'green' },
  { stage: 'Hired', value: 3, pct: 2, color: 'green' },
];

const timeToHireData = [
  { month: 'Aug', applications: 18 },
  { month: 'Sep', applications: 22 },
  { month: 'Oct', applications: 31 },
  { month: 'Nov', applications: 28 },
  { month: 'Dec', applications: 35 },
  { month: 'Jan', applications: 42 },
];

const statusDistribution = [
  { name: 'Applied', value: 45, color: '#3b82f6' },
  { name: 'Under Review', value: 30, color: '#f59e0b' },
  { name: 'Shortlisted', value: 15, color: '#8b5cf6' },
  { name: 'Interviewed', value: 7, color: '#6366f1' },
  { name: 'Hired', value: 3, color: '#10b981' },
];

export const Analytics = () => {
  const totalApplicants = mockRecruiterJobs.reduce((a, j) => a + j.applicants, 0);
  const totalShortlisted = mockRecruiterJobs.reduce((a, j) => a + j.shortlisted, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hiring Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Insights and metrics for your recruitment process</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Jobs Posted" value={mockRecruiterJobs.length} icon={Briefcase} iconColor="blue" trend={10} />
        <MetricCard title="Total Applicants" value={totalApplicants} icon={Users} iconColor="indigo" trend={18} />
        <MetricCard title="Shortlisted" value={totalShortlisted} icon={CheckCircle2} iconColor="green" trend={7} />
        <MetricCard title="Avg. Time to Hire" value="12 days" icon={Clock} iconColor="yellow" trend={-5} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Hiring Funnel</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Candidate pipeline conversion rates</p>
          </CardHeader>
          <CardBody className="space-y-3">
            {hiringFunnelData.map(item => (
              <div key={item.stage} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-36 flex-shrink-0">{item.stage}</span>
                <div className="flex-1">
                  <ProgressBar value={item.pct} color={item.color} size="md" />
                </div>
                <div className="text-right w-20 flex-shrink-0">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.value}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({item.pct}%)</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Application Status Distribution</h3>
          </CardHeader>
          <CardBody>
            <ApplicationPieChart data={statusDistribution} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Applicants per Job</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Total vs shortlisted per posting</p>
          </CardHeader>
          <CardBody>
            <ApplicantsBarChart data={applicantsPerJobData} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Monthly Application Volume</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Incoming applications over time</p>
          </CardHeader>
          <CardBody>
            <ActivityLineChart data={timeToHireData} />
          </CardBody>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Top Skills in Demand</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Most requested skills across all job postings</p>
          </CardHeader>
          <CardBody>
            <SkillBarChart data={skillDemandData} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
