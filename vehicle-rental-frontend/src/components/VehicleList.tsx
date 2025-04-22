// src/components/VehicleList.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Tooltip,
  Typography,
  Zoom,
  Button,
} from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';

import { getVehiclesByCity } from '../services/publicService';
import { getVehicleRatings, getAvgProviderRating } from '../types/reviewService';
import { Vehicle } from '../types/vehicle';
import VehicleReviewModal from './Dashboard/VehicleReviewModal'; // ✅ Ensure this component exists and is imported
import ProviderReviewModal from './Dashboard/ProviderReviewModal'; // adjust path as needed

interface Props {
  selectedCity: string;
}

const VehicleList: React.FC<Props> = ({ selectedCity }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleRatings, setVehicleRatings] = useState<Record<string, number>>({});
  const [providerRatings, setProviderRatings] = useState<Record<string, number>>({});

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null); // ✅
  const [showReviewModal, setShowReviewModal] = useState(false); // ✅
  const [openProviderModal, setOpenProviderModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('');
  const handleViewProviderReviews = (providerId: string) => {
    setSelectedProviderId(providerId);
    setOpenProviderModal(true);
  };
  
  useEffect(() => {
    if (!selectedCity) return;

    const fetchData = async () => {
      try {
        const vehiclesData = await getVehiclesByCity(selectedCity);
        setVehicles(vehiclesData);

        const vehicleIds = vehiclesData.map((v) => v._id);
        const ratings = await getVehicleRatings(vehicleIds);
        setVehicleRatings(ratings);

        const uniqueProviders = Array.from(
          new Set(vehiclesData.map((v) => v.provider._id))
        );

        const ratingPromises = uniqueProviders.map(async (providerId) => {
          const { avgRating } = await getAvgProviderRating(providerId);
          return { providerId, avgRating };
        });

        const resolvedRatings = await Promise.all(ratingPromises);
        const providerMap: Record<string, number> = {};
        resolvedRatings.forEach(({ providerId, avgRating }) => {
          providerMap[providerId] = avgRating;
        });
        setProviderRatings(providerMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCity]);

  const getVehicleIcon = (type: string) =>
    type.toLowerCase().includes('4') ? (
      <DirectionsCarIcon fontSize="large" color="primary" />
    ) : (
      <TwoWheelerIcon fontSize="large" color="secondary" />
    );

  return (
    <Box mt={4}>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mt: 2,
          mb: 3,
          color: '#616161',
          fontStyle: 'italic',
        }}
      >
        💡 This platform is for comparing providers & prices. For bookings, feel free to contact any provider directly!
      </Typography>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        🚘 Vehicles available in {selectedCity}
      </Typography>

      {vehicles.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No vehicles found in this city.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {vehicles.map((v) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={v._id}>
              <Zoom in>
                <Card
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    transition: 'transform 0.2s ease, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    },
                    backgroundColor: '#fefefe',
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1} justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      {getVehicleIcon(v.type)}
                      <Typography variant="h6" ml={1}>
                        {v.name}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <StarIcon fontSize="small" sx={{ color: '#ffa000', mr: 0.5 }} />
                      <Typography variant="body2" fontWeight={500}>
                        {vehicleRatings[v._id]?.toFixed(1) || 'N/A'} / 5
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent sx={{ pt: 0 }}>
                    <Chip label={v.type} size="small" color="info" sx={{ mr: 1, mb: 1 }} />
                    <Chip label={`₹${v.price}`} size="small" color="success" sx={{ mr: 1, mb: 1 }} />
                    <Chip label={`Qty: ${v.quantity}`} size="small" color="warning" sx={{ mb: 1 }} />

                    <Tooltip title={`${v.provider.address}, ${v.provider.city}`}>
                      <Box display="flex" alignItems="center" mt={1}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" ml={0.5} color="text.secondary">
                          {v.provider.name}
                        </Typography>
                        <StarIcon fontSize="small" sx={{ color: '#fbc02d', ml: 1, mr: 0.5 }} />
                        <Typography variant="body2">
                          {providerRatings[v.provider._id]?.toFixed(1) || 'N/A'} / 5
                        </Typography>
                      </Box>
                    </Tooltip>

                    {v.provider.mobile ? (
                      <Box
                        mt={2}
                        display="flex"
                        alignItems="center"
                        sx={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                        }}
                      >
                        <PhoneIcon sx={{ color: '#d32f2f', mr: 1 }} />
                        <Typography variant="body2" fontWeight={600} color="text.primary">
                          {v.provider.mobile}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        mt={2}
                        display="flex"
                        alignItems="center"
                        sx={{
                          backgroundColor: '#fce4ec',
                          border: '1px solid #f8bbd0',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                        }}
                      >
                        <PhoneIcon sx={{ color: '#d81b60', mr: 1 }} />
                        <Typography variant="body2" fontWeight={500} color="text.secondary">
                          Number not available
                        </Typography>
                      </Box>
                    )}

                    {/* ✅ View Reviews Button */}
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedVehicleId(v._id);
                        setShowReviewModal(true);
                      }}
                      variant="outlined"
                      sx={{ mt: 1 }}
                    >
                      View Reviews
                    </Button>
                    <Button
  size="small"
  variant="outlined"
  onClick={() => handleViewProviderReviews(v.provider._id)} // assuming v.provider exists
>
  VIEW PROVIDER REVIEWS
</Button>

                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ✅ Review Modal at the bottom */}
      {showReviewModal && selectedVehicleId && (
        <VehicleReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          vehicleId={selectedVehicleId}
        />
        
      )}
      
      <ProviderReviewModal
      open={openProviderModal}
      onClose={() => setOpenProviderModal(false)}
      providerId={selectedProviderId}
    />
    
    </Box>
  );
};

export default VehicleList;
