// src/components/Dashboard/ProviderReviewModal.tsx

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
import axiosReview from '../../utils/axiosReviewForModal'; // ✅ custom instance for review service

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  providerId: string;
}

const ProviderReviewModal: React.FC<Props> = ({ open, onClose, providerId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!providerId) return;

    axiosReview
      .get<{ reviews: Review[] }>(`/reviews/provider/${providerId}`)
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.error('Error fetching provider reviews:', err));
  }, [providerId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Provider Reviews</DialogTitle>
      <DialogContent dividers>
        {reviews.length === 0 ? (
          <Typography>No reviews found for this provider.</Typography>
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

export default ProviderReviewModal;
