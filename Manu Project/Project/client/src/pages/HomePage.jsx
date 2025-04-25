import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profiles");
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles", err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    (Array.isArray(profile.skills) ? profile.skills.join(", ") : profile.skills || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  
  
  useEffect(() => {
    const input = document.querySelector(".search-bar");
    if (input) {
      const handler = (e) => setSearch(e.target.value);
      input.addEventListener("input", handler);
      return () => input.removeEventListener("input", handler);
    }
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2>All Users</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredProfiles.map((profile, index) => (
          <div key={index} style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{profile.name}</h3>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
