// src/app/components/SkeletonCard.tsx

// This is a simple, reusable component for our loading state.
// The animate-pulse class from Tailwind CSS creates the gentle shimmer effect.
const SkeletonCard = ({ className }: { className?: string }) => {
  return <div className={`bg-gray-200 rounded-xl ${className}`}></div>;
};

export default SkeletonCard;
