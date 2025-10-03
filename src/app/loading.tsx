// src/app/loading.tsx

import SkeletonCard from "./components/SkeletonCard";

// This component will now be automatically displayed by Next.js
// whenever ANY page in the entire application is loading.
export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 animate-pulse">
            <div className="space-y-6">
                <SkeletonCard className="h-24 w-24 mx-auto rounded-full" />
                <div className="space-y-3">
                    <SkeletonCard className="h-8 w-3/4 mx-auto" />
                    <SkeletonCard className="h-4 w-1/2 mx-auto" />
                </div>
                <div className="space-y-4 pt-4">
                    <SkeletonCard className="h-10 w-full" />
                    <SkeletonCard className="h-10 w-full" />
                </div>
            </div>
        </div>
    </div>
  );
}
