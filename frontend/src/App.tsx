
import { useEffect, useState } from "react";
import "./App.css";

type HealthResponse = {
  status: string;
  message: string;
};

function App() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const response = await fetch(
          "http://127.0.0.1:5055/api/health",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: HealthResponse = await response.json();

        setMessage(data.message);
        setIsConnected(true);
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Backend connection error:", error);
        setMessage("Backend connection failed");
        setIsConnected(false);
      }
    }

    checkBackend();

    return () => controller.abort();
  }, []);

  return (
    <main className="app-container">
      <div className="status-card">
        <h1>Hackathon Starter 🚀</h1>

        <p className="subtitle">
          React + TypeScript + Node.js + Express
        </p>

        <div className="connection-status">
          <span
            className={`status-indicator ${
              isConnected ? "connected" : "disconnected"
            }`}
          />

          <span>{message}</span>
        </div>

        <p className="api-info">
          Backend API: 127.0.0.1:5055/api/health
        </p>

        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry Connection
        </button>
      </div>
    </main>
  );
}

export default App;
