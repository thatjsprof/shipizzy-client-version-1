import React from "react";
import styles from "./ErrorBoundary.module.scss";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    const { children } = this.props;
    return this.state.hasError ? (
      <div className={styles.errorImageOverlay}>
        <img className={styles.errorContainer} alt="Error" />
        <p className={styles.errorText}>Sorry seems an Error has Occured</p>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
