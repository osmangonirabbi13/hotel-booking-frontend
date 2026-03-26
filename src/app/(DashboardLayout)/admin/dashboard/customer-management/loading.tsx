export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-white dark:bg-slate-900">
      {/* Outer Spinning Ring */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Loading...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please wait a moment.
        </p>
      </div>
    </div>
  )
}