'use client';

interface ErrorProps {
  error?: {
    message?: string;
    [key: string]: string | undefined;
  };
}

export default function Error({ error }: ErrorProps, reset: () => void): React.JSX.Element {
  const errorInstance = new globalThis.Error(error?.message || 'An error occurred');
  
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500">Error</div>
      <h1 className="text-red-500">{errorInstance.message}</h1>
      <button onClick={() => reset()} style = {{width: '60px', height: '20px'}} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"> RESET </button>
        
    </div>
  );
}