import { cn } from '../../utils/cn';

export const Card = ({ children, className, hover = false, ...props }) => (
  <div
    className={cn(
      'bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm',
      hover && 'hover:shadow-md hover:border-blue-100 dark:hover:border-blue-800 transition-all duration-200 cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 border-b border-gray-100 dark:border-gray-700', className)} {...props}>{children}</div>
);

export const CardBody = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>{children}</div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl', className)} {...props}>{children}</div>
);
