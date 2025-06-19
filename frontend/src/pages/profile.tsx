import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../api/user';


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
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Profile</h1>
        <div>
          <button onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
      </header>

      <main>
        <h2>User Profile</h2>
        
        <div>
          <h3>Personal Information</h3>
          
          {isEditing ? (
            <div>
              <p>
                <strong>Name:</strong> 
                <input 
                  type="text" 
                  value={editedName} 
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter your name"
                />
              </p>
              <div>
                <button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleCancel} disabled={saving}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {profile.name || 'Not provided'}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
          
          <p><strong>Email:</strong> {profile.email || 'Not provided'}</p>
          {profile.createdAt && (
            <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          )}
        </div>

        <div>
          <h3>Account Settings</h3>
          <p>Account settings and preferences will be displayed here.</p>
        </div>
      </main>
    </div>
  );
};

export default Profile; 