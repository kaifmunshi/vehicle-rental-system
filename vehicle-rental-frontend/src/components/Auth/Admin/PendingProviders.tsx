
import React, { useEffect, useState } from 'react';
import axiosAdmin from '../../../utils/axiosAdmin';
import './AdminDashboard.css';

interface Provider {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  address: string;
  description: string;
  images: string[];
  document: string;
}

const PendingProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchPendingProviders = async () => {
      const res = await axiosAdmin.get<{ providers: Provider[] }>('/providers/pending');
      setProviders(res.data.providers);
    };
    fetchPendingProviders();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    await axiosAdmin.post(`/providers/${id}/status`, { status });
    setProviders(providers.filter(p => p._id !== id));
  };

  return (
    <div className="admin-dashboard-container">
      <h1>🕵️‍♀️ Pending Provider Requests</h1>
      <div className="provider-grid">
        {providers.map((p) => (
          <div key={p._id} className="provider-card">
            <h3>{p.name}</h3>
            <p><b>Email:</b> {p.email}</p>
            <p><b>Mobile:</b> {p.mobile}</p>
            <p><b>City:</b> {p.city}</p>
            <p><b>Description:</b> {p.description}</p>

            <div className="media-preview">
              <img src={p.images[0]} alt="Business Image" />
              <a href={p.document} target="_blank" rel="noopener noreferrer">View Document 📄</a>
            </div>

            <div className="action-buttons">
              <button className="approve" onClick={() => handleStatusUpdate(p._id, 'approved')}>Approve ✅</button>
              <button className="reject" onClick={() => handleStatusUpdate(p._id, 'rejected')}>Reject ❌</button>
            </div>
          </div>
          
        ))}
      </div>
      {/* 🔙 Back Button */}
      <div className="back-to-dashboard" onClick={() => window.location.href = '/admin/dashboard'}>
        🔙 Back to Dashboard
      </div>
    </div>
    
  );
};

export default PendingProviders;
