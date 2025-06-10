"use client";
// Skeleton Component
const CardSkeleton = () => {
  return (
    <div className="animate-pulse border rounded-lg p-4">
      <div className="h-40 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};
export default CardSkeleton;