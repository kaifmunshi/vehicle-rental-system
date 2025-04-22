import React, { useState } from 'react';
import axios from 'axios';

const ProviderRegister: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    address: '',
    mobile: '',
    description: '',
  });
  const [document, setDocument] = useState<File | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === 'document') setDocument(files?.[0] || null);
    else if (name === 'images') setImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let documentUrl = '';
      if (document) {
        const formData = new FormData();
        formData.append('document', document);
        const docRes = await axios.post<{ fileUrl: string }>(
          'http://localhost:5002/api/provider/upload/document',
          formData
        );
        documentUrl = docRes.data.fileUrl;
      }

      let imageUrls: string[] = [];
      if (images) {
        const formData = new FormData();
        Array.from(images).forEach((img) => formData.append('images', img));
        const imgRes = await axios.post<{ fileUrls: string[] }>(
          'http://localhost:5002/api/provider/upload/images',
          formData
        );
        imageUrls = imgRes.data.fileUrls;
      }

      const payload = { ...form, images: imageUrls, document: documentUrl };
      await axios.post('http://localhost:5002/api/provider/register', payload);

      setMessage('✅ Provider registered successfully! Redirecting...');
      setForm({
        name: '',
        email: '',
        password: '',
        city: '',
        address: '',
        mobile: '',
        description: '',
      });
      setDocument(null);
      setImages(null);

      setTimeout(() => {
        window.location.href = '/provider/login';
      }, 2500);
    } catch (error) {
      console.error(error);
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to top left, #eef2ff, #e0e7ff)',
      padding: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px 25px',
      borderRadius: '20px',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '480px',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '24px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '20px',
      color: '#1f2937',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      marginBottom: '12px',
      borderRadius: '10px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      backgroundColor: '#f9fafb',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px 14px',
      marginBottom: '12px',
      borderRadius: '10px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      backgroundColor: '#f9fafb',
      resize: 'vertical',
      minHeight: '60px',
      maxHeight: '100px',
      boxSizing: 'border-box',
    },
    label: {
      fontWeight: 500,
      fontSize: '13px',
      marginBottom: '4px',
      display: 'block',
      color: '#4b5563',
    },
    fileInput: {
      marginBottom: '14px',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(to right, #7c3aed, #9333ea)',
      color: '#fff',
      fontWeight: 600,
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '15px',
    },
    message: {
      marginTop: '14px',
      fontWeight: 600,
      textAlign: 'center',
      color: message.includes('✅') ? '#16a34a' : '#dc2626',
    },
    loginPrompt: {
      marginTop: '16px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#4b5563',
    },
    loginLink: {
      marginLeft: '5px',
      color: '#7c3aed',
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📑 Provider Registration</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required value={form.name} style={styles.input} />
          <input name="email" placeholder="Email" onChange={handleChange} required value={form.email} style={styles.input} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required value={form.password} style={styles.input} />
          <input name="city" placeholder="City" onChange={handleChange} required value={form.city} style={styles.input} />
          <input name="address" placeholder="Address" onChange={handleChange} required value={form.address} style={styles.input} />
          <input
  name="mobile"
  placeholder="Mobile"
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      handleChange(e);
    }
  }}
  required
  value={form.mobile}
  style={styles.input}
  maxLength={10}
/>
          <textarea name="description" placeholder="Business Description" onChange={handleChange} value={form.description} style={styles.textarea} />

          <label style={styles.label}>Upload Document (PDF):</label>
          <input type="file" name="document" accept=".pdf" onChange={handleFileChange} required style={styles.fileInput} />

          <label style={styles.label}>Upload Business Images:</label>
          <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} style={styles.fileInput} />

          <button type="submit" style={styles.button}> Register Now</button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.loginPrompt}>
          Already registered?
          <span
            style={styles.loginLink}
            onClick={() => (window.location.href = '/provider/login')}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegister;
