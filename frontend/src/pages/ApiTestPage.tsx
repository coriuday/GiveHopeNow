import { useState, useEffect } from 'react';
import { testApiConnection, getApiInfo } from '../utils/apiConnectionTest';
import { shouldUseMockApi, setUseMockApi } from '../services/mockApiService';

interface ConnectionStatus {
  success: boolean;
  message: string;
  apiUrl?: string;
  timestamp?: string;
  details?: any;
}

const ApiTestPage = () => {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiInfo, setApiInfo] = useState(getApiInfo());
  const [useMock, setUseMock] = useState(shouldUseMockApi());

  useEffect(() => {
    checkConnection();
  }, [useMock]);

  const checkConnection = async () => {
    setLoading(true);
    try {
      const result = await testApiConnection();
      setStatus(result);
    } catch {
      setStatus({
        success: false,
        message: 'Failed to perform connection test',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMock = () => {
    const newValue = !useMock;
    setUseMock(newValue);
    setUseMockApi(newValue);
  };

  return (
    <div className="container py-6">
      <div className="has-text-centered mb-6">
        <h1 className="title is-3 mb-2">API Connection Test</h1>
        <p className="subtitle is-5 has-text-grey">
          Verify the connection between frontend and backend
        </p>
      </div>

      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="box">
            <div className="level">
              <div className="level-left">
                <h2 className="title is-4 mb-4">API Configuration</h2>
              </div>
              <div className="level-right">
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input 
                        type="checkbox" 
                        checked={useMock}
                        onChange={handleToggleMock}
                        className="mr-2"
                      />
                      Use Mock API
                    </label>
                    <p className="help has-text-danger">For development/testing only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              {useMock ? (
                <div className="notification is-danger is-light">
                  <p className="has-text-weight-bold">WARNING: Mock API Mode is Enabled</p>
                  <p>The application is currently using simulated responses and not connecting to the real backend.</p>
                  <p className="is-size-7 mt-2">For production use, please disable Mock API Mode to ensure that login, registration, and payments work correctly with the actual backend.</p>
                </div>
              ) : (
                <>
                  <p><strong>Base URL:</strong> {apiInfo.baseUrl}</p>
                  <p><strong>Auth Token Present:</strong> {apiInfo.hasToken ? 'Yes' : 'No'}</p>
                </>
              )}
            </div>

            <hr />

            <h2 className="title is-4 mb-4">Connection Status</h2>
            
            {status ? (
              <div className={`notification ${status.success ? 'is-success' : 'is-danger'} is-light`}>
                <p className="has-text-weight-bold mb-2">{status.success ? 'Connected' : 'Connection Failed'}</p>
                <p>{status.message}</p>
                {status.apiUrl && <p className="is-size-7 mt-2">API URL: {status.apiUrl}</p>}
                {status.timestamp && <p className="is-size-7">Last checked: {new Date(status.timestamp).toLocaleString()}</p>}
                
                {status.details && (
                  <div className="content mt-4">
                    <details>
                      <summary className="has-text-weight-medium">Connection Details</summary>
                      <div className="pl-4 mt-2">
                        {Object.entries(status.details).map(([key, value]) => (
                          <div key={key} className="mb-2">
                            <strong className="has-text-grey">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {
                              typeof value === 'object' 
                                ? (
                                  <pre className="has-background-grey-lighter p-2 is-size-7 mt-1">{
                                    Array.isArray(value)
                                      ? value.map((item, i) => <div key={i}>{String(item)}</div>)
                                      : JSON.stringify(value, null, 2)
                                  }</pre>
                                )
                                : String(value)
                            }
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ) : (
              <p className="has-text-grey">No connection test has been performed yet.</p>
            )}

            <div className="field is-grouped mt-5">
              <div className="control">
                <button 
                  className={`button is-primary is-outlined ${loading ? 'is-loading' : ''}`}
                  onClick={checkConnection}
                  disabled={loading}
                >
                  Test Connection
                </button>
              </div>
              {status && !status.success && !useMock && (
                <div className="control">
                  <button 
                    className="button is-info is-outlined"
                    onClick={handleToggleMock}
                  >
                    Enable Mock API
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage; 