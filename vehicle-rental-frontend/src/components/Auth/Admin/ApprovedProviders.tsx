// D:\vehicle-rental-frontend\src\components\Auth\Admin\ApprovedProviders.tsx
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

const ApprovedProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchApprovedProviders = async () => {
      try {
        const res = await axiosAdmin.get<{ providers: Provider[] }>('http://localhost:5002/api/provider/approved');
        setProviders(res.data.providers);
      } catch (err) {
        console.error('Error fetching approved providers:', err);
      }
    };
    fetchApprovedProviders();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1>✅ Approved Providers</h1>
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

export default ApprovedProviders;
export {};
