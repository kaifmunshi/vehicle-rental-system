import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AdminAnalyticsChartsProps {
  data: {
    providers: {
      approved: number;
      pending: number;
      rejected: number;
    };
    vehicles: {
      twoWheelers: number;
      fourWheelers: number;
    };
  };
}

const PROVIDER_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];  // richer green/yellow/red
const VEHICLE_COLORS = ['#3b82f6', '#8b5cf6'];              // blue + indigo


const AdminAnalyticsCharts: React.FC<AdminAnalyticsChartsProps> = ({ data }) => {
  const providerData = [
    { name: 'Approved', value: data.providers.approved },
    { name: 'Pending', value: data.providers.pending },
    { name: 'Rejected', value: data.providers.rejected },
  ];

  const vehicleData = [
    { name: 'Two Wheelers', value: data.vehicles.twoWheelers },
    { name: 'Four Wheelers', value: data.vehicles.fourWheelers },
  ];

  return (
    <div className="analytics-section">
      <div className="charts-row">
        {/* Provider Pie */}
        <div className="chart-box chart-shadow">
          <h2> Provider Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={providerData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
                isAnimationActive={true}
              >
                {providerData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PROVIDER_COLORS[index % PROVIDER_COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Pie */}
        <div className="chart-box chart-shadow">
          <h2> Vehicle Type Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={vehicleData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
                isAnimationActive={true}
              >
                {vehicleData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={VEHICLE_COLORS[index % VEHICLE_COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsCharts;
