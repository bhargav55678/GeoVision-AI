import { ArrowPathIcon } from "@heroicons/react/24/solid";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-3">

      <ArrowPathIcon className="w-6 h-6 animate-spin" />

      <span>Comparing Images...</span>

    </div>
  );
};

export default LoadingSpinner;