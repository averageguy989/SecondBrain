import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../api/user';
import Success from '../components/Success';
import '../styles/profile.css';

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUser();
        setProfile(userData.user);
        setEditedName(userData.user.name || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(profile.name || '');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(profile.name || '');
  };

  const handleSave = async () => {
    if (!editedName.trim()) {
      alert('Name cannot be empty');
      return;
    }

    setSaving(true);
    try {
      await updateUser({name: editedName.trim()});
      setProfile(prev => ({ ...prev, name: editedName.trim() }));
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <header className="profile-header">
          <h1 className="profile-title">Profile</h1>
          <button className="profile-button secondary-button" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </header>
        <main className="profile-main">
          <div className="profile-section">
            <p>Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <button className="profile-button secondary-button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </header>

      <main className="profile-main">
        <section className="profile-section">
          <h2 className="profile-section-title">Personal Information</h2>
          <div className="profile-info">
            {isEditing ? (
              <>
                <div className="profile-field">
                  <span className="profile-label">Name</span>
                  <input
                    className="profile-input"
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="profile-buttons">
                  <button
                    className="profile-button primary-button"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    className="profile-button secondary-button"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="profile-field">
                <span className="profile-label">Name</span>
                <span className="profile-value">{profile.name || 'Not provided'}</span>
                <button className="profile-button secondary-button" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            )}
            
            <div className="profile-field">
              <span className="profile-label">Email</span>
              <span className="profile-value">{profile.email || 'Not provided'}</span>
            </div>
            
            {profile.createdAt && (
              <div className="profile-field">
                <span className="profile-label">Member Since</span>
                <span className="profile-value">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Account Settings</h2>
          <p>Account settings and preferences will be displayed here.</p>
        </section>
      </main>
      
      {success && <Success message={success} onClose={() => setSuccess('')} />}
    </div>
  );
};

export default Profile; 