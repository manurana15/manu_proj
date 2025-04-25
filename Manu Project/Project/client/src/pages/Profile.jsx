import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');

  const token = localStorage.getItem('token');

  // Optional: Fetch existing profile data on mount (if you want to allow edit)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profiles/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBio(res.data.bio || '');
        setSkills(res.data.skills?.join(', ') || '');
      } catch (error) {
        console.log("No existing profile or not logged in.");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profiles",
        {
          bio,
          skills: skills.split(',').map(s => s.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Profile saved successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to save profile. Are you logged in?");
    }
  };

  return (
    <div className="form-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
