import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold gold-text-gradient">אופס! משהו השתבש.</h1>
            <p className="text-pearl/60">אנחנו מצטערים על התקלה. אנא נסו לרענן את הדף או ליצור קשר עם התמיכה שלנו.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gold text-charcoal font-bold rounded-full hover:scale-105 transition-transform"
            >
              רענון הדף
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
