// src/app/dashboard/loading.tsx

import SkeletonCard from "../components/SkeletonCard";

// This component will be automatically displayed by Next.js
// whenever a page inside the /dashboard route is loading.
export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-12">
        <SkeletonCard className="h-8 w-1/3 mb-4" />
        <SkeletonCard className="h-6 w-1/2" />
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <SkeletonCard className="h-64 w-full" />
          <SkeletonCard className="h-48 w-full" />
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          <SkeletonCard className="h-32 w-full" />
          <SkeletonCard className="h-32 w-full" />
        </div>

      </div>
    </div>
  );
}
