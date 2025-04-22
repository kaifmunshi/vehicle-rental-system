import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, MenuItem, Rating, Paper,
} from '@mui/material';
import { Vehicle } from '../../types/vehicle';
import { getVehiclesByCity } from '../../services/publicService';
import axiosUser from '../../utils/axiosUser';

interface Props {
  city: string;
  userId: string;
  onClose: () => void;
}

const VehicleReviewForm: React.FC<Props> = ({ city, userId, onClose }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getVehiclesByCity(city);
      setVehicles(data);
    };
    fetchVehicles();
  }, [city]);

  const handleSubmit = async () => {
    if (!selectedVehicle || rating === null) return;
    try {
      await axiosUser.post('http://localhost:5002/api/reviews', {
        reviewedBy: userId,
        vehicle: selectedVehicle,
        rating,
        comment,
      });
      alert('Vehicle review submitted!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit review.');
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Review a Vehicle</Typography>

      <TextField
        select
        label="Select Vehicle"
        fullWidth
        margin="normal"
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        {vehicles.map((v) => (
          <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
        ))}
      </TextField>

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <Typography>Rating:</Typography>
        <Rating
          name="vehicle-rating"
          value={rating}
          onChange={(_, value) => setRating(value)}
        />
      </Box>

      <TextField
        label="Comment"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!selectedVehicle || rating === null}>
          Submit Review
        </Button>
      </Box>
    </Paper>
  );
};

export default VehicleReviewForm;
