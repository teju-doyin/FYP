'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import { useErrorStore } from '../stores/error.store';
import BlockerPage from './BlockerPage';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => {
  const { hasCriticalError, setCriticalError } = useErrorStore();
  const [localHasError] = React.useState(false);
  const [localError] = React.useState<Error | null>(null);
  React.useEffect(() => {
    if (localHasError && localError) {
      setCriticalError({
        type: 'render_error',
        message: 'A critical rendering error occurred. The application cannot proceed.',
      });
    }
  }, [localHasError, localError, setCriticalError]);

  if (hasCriticalError) {
    return <BlockerPage />;
  }
  return (
    <ErrorBoundaryClassComponent>
      {children}
    </ErrorBoundaryClassComponent>
  );
};
class ErrorBoundaryClassComponent extends React.Component<AppErrorBoundaryProps, { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null }> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null } {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught React rendering error (Class Component):", error, errorInfo);
    useErrorStore.getState().setCriticalError({
      type: 'render_error',
      message: 'A critical rendering error occurred. The application cannot proceed.',
      componentStack: errorInfo.componentStack ?? undefined,
    });
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError && !useErrorStore.getState().hasCriticalError) {
        
        return <BlockerPage />; 
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;