import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await fetch('/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!result.ok) throw new Error('Network response was not ok.');
      const data = await result.json();
      const newResponse = data.choices[0].text;
      setResponse(newResponse);
      setHistory([{ prompt, response: newResponse }, ...history]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <header className="App-header" style={{ marginBottom: '20px' }}>
        <h1>Language Model Agent</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Enter your prompt:
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              disabled={isLoading}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <button type="submit" disabled={isLoading} style={{ marginTop: '10px' }}>Generate</button>
        </form>
        {isLoading && <div style={{ marginTop: '10px' }}>Loading...</div>}
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
        {history.length > 0 && (
          <div className="history" style={{ marginTop: '20px' }}>
            <h3>History</h3>
            {history.map((entry, index) => (
              <div key={index} className="history-entry" style={{ marginTop: '10px', textAlign: 'left' }}>
                <strong>Prompt:</strong> {entry.prompt} <br />
                <strong>Response:</strong> {entry.response}
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
