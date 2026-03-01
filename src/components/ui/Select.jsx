import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export const Select = ({ label, error, options = [], className, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <div className="relative">
      <select
        className={cn(
          'w-full appearance-none rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 pr-9 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
    {error && <span className="text-xs text-red-600">{error}</span>}
  </div>
);
