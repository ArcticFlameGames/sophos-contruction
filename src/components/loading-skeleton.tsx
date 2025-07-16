export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header Skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      
      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
      
      {/* Button Skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-6"></div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}
