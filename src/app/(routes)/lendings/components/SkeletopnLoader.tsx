const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="h-24 bg-gray-200 rounded-md mb-3"></div>
      </div>
    ))}
  </div>
);
export default SkeletonLoader;