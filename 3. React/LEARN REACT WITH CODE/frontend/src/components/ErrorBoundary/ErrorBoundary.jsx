import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    // {`State : ${console.log(this.state)}`}
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: null };
  }
  render() {
    if (this.state.hasError) {
      // Real life ma bahira bata aayeko fallback component/UI dekhainxa
      return (
        <div
          style={{
            border: "1px solid red",
            padding: "20px ",
            background: "pink",
          }}
        >
          <h2>Opps! Something went wrong</h2>
          {/* <p>Please reload the page</p> */}
          <p>{this.props.fallback}</p>
          {/* <p>{this.state.error.message}</p> */}
          <i>{this.state.error && this.state.error.message}</i>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
