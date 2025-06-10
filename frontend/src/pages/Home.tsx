// frontend/src/pages/Home.tsx
import React, { useState } from 'react';
import CreateContentForm from '../components/CreateContentForm';
import type { ContentFormData } from '../components/CreateContentForm';
import { Plus, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateContent = (formData: ContentFormData) => {
    console.log('Form submitted with data:', formData);
    alert('Content created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Welcome Back!
                  </h1>
                  <p className="text-gray-600 mt-1">Ready to share something amazing?</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Content
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Total Content</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Public Items</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Private Items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">✨</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Your Content Journey</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first piece of content and share it with the world. 
              Whether it's a video, article, or link, we've got you covered.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-semibold shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Your First Content
            </button>
          </div>
        </div>
      </div>
      
      <CreateContentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateContent}
      />
    </div>
  );
};

export default Home;