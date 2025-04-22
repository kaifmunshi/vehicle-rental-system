// D:\vehicle-rental-frontend\src\components\Auth\Admin\RejectedProviders.tsx
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

const RejectedProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchRejected = async () => {
      try {
        const res = await axiosAdmin.get<{ providers: Provider[] }>('http://localhost:5002/api/provider/rejected');
        setProviders(res.data.providers);
      } catch (err) {
        console.error('Error fetching rejected providers:', err);
      }
    };
    fetchRejected();
  }, []);

  const handleApprove = async (id: string) => {
    try {
        await axiosAdmin.post(`/providers/${id}/status`, { status: 'approved' });

      setProviders(providers.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error approving provider:', err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1>❌ Rejected Providers</h1>
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
              <button className="approve" onClick={() => handleApprove(p._id)}>Looks fine? Click to Approve</button>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="back-to-dashboard" onClick={() => window.location.href = '/admin/dashboard'}>
        🔙 Back to Dashboard
      </div>
    </div>
  );
};

export default RejectedProviders;
export {};
