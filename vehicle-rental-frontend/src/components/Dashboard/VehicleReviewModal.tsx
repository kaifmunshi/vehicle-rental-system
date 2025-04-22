// src/components/Dashboard/VehicleReviewModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Rating,
  Divider,
} from '@mui/material';
import axiosReview from '../../utils/axiosReviewForModal'; // ✅ use correct axios

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  vehicleId: string;
}

const VehicleReviewModal: React.FC<Props> = ({ open, onClose, vehicleId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!vehicleId) return;
    axiosReview
      .get<{ reviews: Review[] }>(`/reviews/vehicle/${vehicleId}`)
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.error('Error fetching vehicle reviews:', err));
  }, [vehicleId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Vehicle Reviews</DialogTitle>
      <DialogContent dividers>
        {reviews.length === 0 ? (
          <Typography>No reviews found for this vehicle.</Typography>
        ) : (
          reviews.map((review) => (
            <Box key={review._id} mb={2}>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>{review.comment}</Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VehicleReviewModal;
