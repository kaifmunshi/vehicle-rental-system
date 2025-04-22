// ✅ ProviderDashboard.tsx with Edit + Logout functionality added
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Vehicle {
  name: string;
  price: number;
  type: string;
  quantity: number;
}

interface VehicleResponse extends Vehicle {
  _id: string;
  isDeleted: boolean;
}

const ProviderDashboard: React.FC = () => {
  const [form, setForm] = useState<Vehicle>({ name: '', price: 0, type: '', quantity: 0 });
  const [message, setMessage] = useState('');
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [showVehicles, setShowVehicles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('providerToken');
    if (!token) {
      window.location.href = '/provider/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('providerToken');
    localStorage.removeItem('providerId');
    localStorage.removeItem('providerEmail');
    setMessage('👋 Logged out successfully!');
    setTimeout(() => {
      window.location.href = '/provider/login';
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const providerId = localStorage.getItem('providerId');
    if (!providerId) return setMessage('❌ Provider ID not found. Please log in again.');

    try {
      if (editMode && editId) {
        await axios.put(`http://localhost:5002/api/vehicles/${editId}`, form);
        setMessage('✅ Vehicle updated successfully!');
      } else {
        await axios.post('http://localhost:5002/api/vehicles', { providerId, ...form });
        setMessage('✅ Vehicle added successfully!');
      }
      setForm({ name: '', price: 0, type: '', quantity: 0 });
      setEditMode(false);
      setEditId(null);
      handleFetchVehicles();
    } catch (err) {
      console.error('Submit failed:', err);
      setMessage('❌ Something went wrong.');
    }
  };

  const handleFetchVehicles = async () => {
    const providerId = localStorage.getItem('providerId');
    if (!providerId) return alert('Provider ID not found');

    try {
      setLoading(true);
      const res = await axios.get<{ vehicles: VehicleResponse[] }>(
        `http://localhost:5002/api/vehicles/provider/${providerId}`
      );
      setVehicles(res.data.vehicles);
      setShowVehicles(true);
    } catch (err) {
      console.error('Fetch vehicles failed:', err);
      alert('❌ Failed to fetch vehicles.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await axios.delete(`http://localhost:5002/api/vehicles/${vehicleId}`);
      setMessage('✅ Vehicle deleted successfully!');
      handleFetchVehicles();
    } catch (err) {
      console.error('Delete vehicle failed:', err);
      setMessage('❌ Failed to delete vehicle.');
    }
  };

  const handleRestoreVehicle = async (vehicleId: string) => {
    try {
      await axios.put(`http://localhost:5002/api/vehicles/restore/${vehicleId}`);
      setMessage('✅ Vehicle restored successfully!');
      handleFetchVehicles();
    } catch (err) {
      console.error('Restore vehicle failed:', err);
      setMessage('❌ Failed to restore vehicle.');
    }
  };

  const handleEditVehicle = (v: VehicleResponse) => {
    setForm({ name: v.name, price: v.price, type: v.type, quantity: v.quantity });
    setEditId(v._id);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1100px', margin: 'auto', fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2rem' }}>🚘 Provider Dashboard</h2>
        <button onClick={handleLogout} style={logoutBtnStyle}>🚪 Logout</button>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fdfdfd', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>{editMode ? '✏️ Edit Vehicle' : '➕ Add a New Vehicle'}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <input type="text" name="name" placeholder="Vehicle Name" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required style={inputStyle} />
          <select name="type" value={form.type} onChange={handleChange} required style={inputStyle}>
            <option value="">Select Type</option>
            <option value="4-wheeler">4-wheeler</option>
            <option value="2-wheeler">2-wheeler</option>
          </select>
          <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required style={inputStyle} />
        </div>
        <button type="submit" style={submitBtnStyle}>{editMode ? '💾 Update' : '🚀 Add Vehicle'}</button>
      </form>

      <button onClick={handleFetchVehicles} style={primaryBtnStyle}>
        {loading ? '⏳ Fetching Vehicles...' : '📋 View My Vehicles'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('❌') ? '#dc3545' : '#28a745', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>{message}</p>
      )}

      {showVehicles && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>🚗 Uploaded Vehicles</h3>
          {vehicles.length === 0 ? (
            <p>No vehicles uploaded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {vehicles.map((v) => (
                <div key={v._id} style={vehicleCardStyle}>
                  <h4 style={{ margin: '0 0 0.5rem', color: v.isDeleted ? '#888' : '#0d6efd' }}>{v.name} {v.isDeleted ? '(Soft Deleted)' : ''}</h4>
                  <p style={cardText}><b>Type:</b> {v.type}</p>
                  <p style={cardText}><b>Price:</b> ₹{v.price}</p>
                  <p style={cardText}><b>Quantity:</b> {v.quantity}</p>
                  {!v.isDeleted && <button onClick={() => handleEditVehicle(v)} style={editBtnStyle}>✏️ Edit</button>}
                  {v.isDeleted ? (
                    <button onClick={() => handleRestoreVehicle(v._id)} style={restoreBtnStyle}>♻️ Restore</button>
                  ) : (
                    <button onClick={() => handleDeleteVehicle(v._id)} style={deleteBtnStyle}>❌ Delete</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = { flex: '1 1 200px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' };
const submitBtnStyle: React.CSSProperties = { marginTop: '1.5rem', backgroundColor: '#20c997', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };
const primaryBtnStyle: React.CSSProperties = { display: 'block', margin: 'auto', backgroundColor: '#0d6efd', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' };
const vehicleCardStyle: React.CSSProperties = { backgroundColor: '#ffffff', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', border: '1px solid #e3e3e3' };
const cardText: React.CSSProperties = { margin: '0.3rem 0', fontSize: '0.95rem' };
const deleteBtnStyle: React.CSSProperties = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer' };
const restoreBtnStyle: React.CSSProperties = { backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer' };
const editBtnStyle: React.CSSProperties = { backgroundColor: '#ffc107', color: '#333', border: 'none', padding: '8px 14px', borderRadius: '6px', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' };
const logoutBtnStyle: React.CSSProperties = { backgroundColor: '#6c757d', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };

export default ProviderDashboard;