import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Rating,
  Paper,
} from '@mui/material';
import axiosPublic from '../../utils/axiosPublic';  // ✅ for public data
import axiosUser from '../../utils/axiosUser';      // ✅ for POST review

interface Props {
  city: string;
  userId: string;
  onClose: () => void;
}

interface Provider {
  _id: string;
  name: string;
  address: string;
  mobile: string;
}

interface VehicleWithProvider {
  provider: Provider;
}

const ProviderReviewForm: React.FC<Props> = ({ city, userId, onClose }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axiosPublic.get<VehicleWithProvider[]>(`/vehicles-by-city/${city}`);
        const vehicles = res.data;

        const providerMap = new Map<string, Provider>();
        vehicles.forEach((v) => {
          if (v.provider && !providerMap.has(v.provider._id)) {
            providerMap.set(v.provider._id, v.provider);
          }
        });

        setProviders(Array.from(providerMap.values()));
      } catch (err) {
        console.error('Error fetching providers from vehicle data:', err);
      }
    };

    if (city) fetchProviders();
  }, [city]);

  const handleSubmit = async () => {
    if (!selectedProvider || rating === null) return;

    try {
      await axiosUser.post('http://localhost:5002/api/reviews', {
        reviewedBy: userId,
        provider: selectedProvider,
        rating,
        comment,
      });
      alert('✅ Provider review submitted!');
      onClose();
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('❌ Failed to submit review. Try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Leave a Review for a Provider
      </Typography>

      <TextField
        select
        fullWidth
        label="Select Provider"
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
        sx={{ mb: 2 }}
      >
        {providers.map((p) => (
          <MenuItem key={p._id} value={p._id}>
            {p.name} - {p.address}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Rating</Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        label="Comment"
        minRows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box textAlign="right">
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedProvider || rating === null}
        >
          Submit Review
        </Button>
      </Box>
    </Paper>
  );
};

export default ProviderReviewForm;
