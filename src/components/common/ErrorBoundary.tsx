import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <div className="text-center p-8 max-w-md">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-2 text-slate-800">Something went wrong</h1>
                        <p className="text-slate-600 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-upn-green text-white rounded-lg hover:bg-upn-green/90 transition-colors font-bold"
                        >
                            Refresh Page
                        </button>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm font-bold text-slate-500 hover:text-slate-700">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="mt-2 p-4 bg-slate-100 rounded-lg text-xs overflow-auto text-left">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
