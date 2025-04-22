// D:\vehicle-rental-frontend\src\components\Auth\Admin\AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import axiosAdmin from '../../../utils/axiosAdmin';
import './AdminDashboard.css';
import AdminTopbar from './AdminTopbar';
import AdminAnalyticsCharts from './AdminAnalyticsCharts';

interface AnalyticsData {
  providers: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
  vehicles: {
    total: number;
    twoWheelers: number;
    fourWheelers: number;
  };
}

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosAdmin.get<{ data: AnalyticsData }>('/analytics');
        const fixedData: AnalyticsData = {
          ...res.data.data,
          vehicles: {
            ...res.data.data.vehicles,
            twoWheelers: res.data.data.vehicles.twoWheelers ?? res.data.data.vehicles['twoWheelers'],
            fourWheelers: res.data.data.vehicles.fourWheelers ?? res.data.data.vehicles['fourWheelers'],
          },
        };
        setAnalytics(fixedData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      
      <AdminTopbar />

      {analytics ? (
        <>
          <div className="dashboard-cards">
            <div className="card purple">
              <h3>Total Providers</h3>
              <p>{analytics.providers.total}</p>
            </div>

            <div
              className="card orange clickable-card"
              onClick={() => window.location.href = '/admin/pending-providers'}
            >
              <h3>Pending Providers</h3>
              <p>{analytics.providers.pending}</p>
            </div>

            <div
              className="card green clickable-card"
              onClick={() => window.location.href = '/admin/approved-providers'}
            >
              <h3>Approved Providers</h3>
              <p>{analytics.providers.approved}</p>
            </div>

            <div
              className="card red clickable-card"
              onClick={() => window.location.href = '/admin/rejected-providers'}
            >
              <h3>Rejected Providers</h3>
              <p>{analytics.providers.rejected}</p>
            </div>

            <div className="card blue">
              <h3>Total Vehicles</h3>
              <p>{analytics.vehicles.total}</p>
            </div>
          </div>

          <AdminAnalyticsCharts data={{
            providers: analytics.providers,
            vehicles: {
              twoWheelers: analytics.vehicles.twoWheelers,
              fourWheelers: analytics.vehicles.fourWheelers,
            }
          }} />
        </>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
