import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class MenteeErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('MenteeErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 bg-upn-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📋</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-slate-800">Mentee Module Error</h2>
                        <p className="text-slate-600 mb-4 text-sm">Something went wrong in the mentee section. Please try again.</p>
                        <button 
                            onClick={() => this.setState({ hasError: false, error: undefined })}
                            className="px-4 py-2 bg-upn-green text-white rounded-lg hover:bg-upn-green/90 transition-colors font-semibold text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
