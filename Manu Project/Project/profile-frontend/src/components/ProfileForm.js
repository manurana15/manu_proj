import React, { useState } from 'react';
import axios from '../utils/api';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async () => {
    await axios.post('/profiles', {
      name, bio, skills: skills.split(',').map(s => s.trim())
    });
    alert('Profile Saved');
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
      <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default ProfileForm;
