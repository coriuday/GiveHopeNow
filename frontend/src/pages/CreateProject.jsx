import React from 'react';
import { useState } from 'react';

import axios from 'axios';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    endDate: '',
  });

  const { title, description, goal, endDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/projects', formData);
      console.log(res.data);
      // Handle successful project creation (e.g., redirect or show message)
    } catch (err) {
      console.error(err.response.data);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <React.Fragment>

    <form onSubmit={onSubmit}>
      <input type="text" name="title" value={title} onChange={onChange} placeholder="Project Title" required />
      <textarea name="description" value={description} onChange={onChange} placeholder="Description" required />
      <input type="number" name="goal" value={goal} onChange={onChange} placeholder="Goal Amount" required />
      <input type="date" name="endDate" value={endDate} onChange={onChange} required />
      <button type="submit">Create Project</button>
    </form>
    </React.Fragment>

  );
};

export default CreateProject;
