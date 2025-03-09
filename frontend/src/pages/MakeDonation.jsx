import React from 'react';
import { useState } from 'react';

import axios from 'axios';

const MakeDonation = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    amount: '',
  });

  const { projectId, amount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/donations', formData);
      console.log(res.data);
      // Handle successful donation (e.g., redirect or show message)
    } catch (err) {
      console.error(err.response.data);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <React.Fragment>

    <form onSubmit={onSubmit}>
      <input type="text" name="projectId" value={projectId} onChange={onChange} placeholder="Project ID" required />
      <input type="number" name="amount" value={amount} onChange={onChange} placeholder="Donation Amount" required />
      <button type="submit">Make Donation</button>
    </form>
    </React.Fragment>

  );
};

export default MakeDonation;
