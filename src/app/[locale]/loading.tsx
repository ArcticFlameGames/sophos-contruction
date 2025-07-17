// Loading skeleton component for the loading state

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="mb-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 max-w-md mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 max-w-xs mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48"></div>
        </div>
        
        {/* Services Section Skeleton */}
        <div className="mb-12">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 max-w-xs mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section Skeleton */}
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 max-w-xs mx-auto mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 max-w-md mx-auto mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
