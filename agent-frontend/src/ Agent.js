import React, { useState } from 'react';
import axios from 'axios';

const Agent = () => {
  const [product, setProduct] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/generate', { product });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter a product name"
        />
        <button type="submit">Generate</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default Agent;