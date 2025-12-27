import React from 'react';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

export const LoadingSpinner = ({ fullScreen = false }: LoadingSpinnerProps) => {
    const content = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800 opacity-25"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin"></div>
            </div>
            <p className="text-sm font-medium text-slate-500 animate-pulse">Loading Velox...</p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 z-50">
                {content}
            </div>
        );
    }

    return <div className="flex items-center justify-center p-8">{content}</div>;
};
