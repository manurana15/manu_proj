import React, { useState, useEffect } from 'react';
import axios from '../utils/api';

const ProfileList = () => {
  const [skill, setSkill] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const res = await axios.get(`/profiles${skill ? `?skill=${skill}` : ''}`);
    setProfiles(res.data);
  };

  return (
    <div>
      <input value={skill} onChange={e => setSkill(e.target.value)} placeholder="Search by skill" />
      <button onClick={fetchProfiles}>Search</button>
      <ul>
        {profiles.map(p => <li key={p._id}>{p.name} - {p.skills.join(', ')}</li>)}
      </ul>
    </div>
  );
};

export default ProfileList;
