// ErrorFallback.jsx
import React, { useState } from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // एररलाई कन्सोल वा एरर ट्र्याकिङ टुल (Sentry / LogRocket) मा पठाउने
  React.useEffect(() => {
    if (error) {
      console.error("Application Error Logged:", error);
    }
  }, [error]);

  // एरर लग क्लिपबोर्डमा कपि गर्ने फङ्सन
  const handleCopyError = async () => {
    if (!error) return;
    try {
      const errorPayload = `Message: ${error.message || error}\n\nStack:\n${error.stack || 'No stack trace available'}`;
      await navigator.clipboard.writeText(errorPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy error", err);
    }
  };

  return (
    <div 
      role="alert" 
      aria-live="assertive"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="max-w-lg w-full space-y-6 p-6 sm:p-8 rounded-2xl bg-white shadow-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 animate-in fade-in zoom-in-95 duration-300">
        
        {/* चेतावनी आइकन (Warning Icon with Soft Pulse) */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-500 animate-pulse">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* मुख्य मेसेज र जानकारी */}
        <div className="space-y-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            केही गडबड भयो!
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
            हाम्रो सिस्टममा केही प्राविधिक समस्या आयो। कृपया पेज रिफ्रेस गरेर वा केही समयपछि फेरि प्रयास गर्नुहोला।
          </p>
        </div>

        {/* एक्सन बटनहरू */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
          {resetErrorBoundary ? (
            <button
              onClick={resetErrorBoundary}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all cursor-pointer"
            >
              फेरि प्रयास गर्नुहोस
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer"
            >
              पेज रिफ्रेस गर्नुहोस
            </button>
          )}
          
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 active:scale-95 transition-all"
          >
            होमपेजमा जानुहोस
          </a>
        </div>

        {/* डायग्नोस्टिक्स (Error Details Panel) */}
        {error && (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700/80 text-left">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 cursor-pointer"
              >
                <span>{showDetails ? "इरर विवरण लुकाउनुहोस्" : "इरर विवरण हेर्नुहोस्"}</span>
                <svg 
                  className={`h-3 w-3 transform transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDetails && (
                <button
                  onClick={handleCopyError}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  {copied ? "कपि भयो! ✓" : "लग कपि गर्नुहोस"}
                </button>
              )}
            </div>

            {/* Error Message Section */}
            {showDetails && (
              <div className="mt-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-900/60 font-mono text-xs text-red-600 dark:text-red-400 overflow-x-auto border border-gray-200 dark:border-gray-800 max-h-40">
                <p className="font-bold">Error: {error.message || error.toString()}</p>
                {error.stack && (
                  <pre className="whitespace-pre-wrap text-gray-600 dark:text-gray-400 mt-2 text-[11px] leading-normal">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;