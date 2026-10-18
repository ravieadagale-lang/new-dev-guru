import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, ShieldAlert } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-slate-800 space-y-4 my-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {this.props.fallbackTitle || "Astrological Calculation & Rendering Recovery"}
              </h3>
              <p className="text-xs text-slate-600">
                {this.props.fallbackMessage || "An unexpected rendering event occurred in this chart component. You can reload the chart safely without losing your session."}
              </p>
            </div>
          </div>

          {this.state.error && (
            <div className="p-3 rounded-xl bg-slate-900 text-amber-200 text-xs font-mono overflow-x-auto">
              {this.state.error.message || String(this.state.error)}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset &amp; Reload Chart</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
