import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Autocomplete,
  TextField,
  Fade,
} from '@mui/material';
import { getCities } from '../services/publicService';

interface CitySelectorProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onSelectCity,
}) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
        if (!selectedCity && citiesData.length > 0) {
          onSelectCity(citiesData[0]);
        }
      } catch (error) {
        console.error('City fetch failed', error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <Fade in timeout={600}>
      <Card
        elevation={5}
        sx={{
          p: 3,
          maxWidth: 500,
          mx: 'auto',
          background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
          borderRadius: 4,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center" color="primary">
          🌆 Select Your City
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress />
          </Box>
        ) : cities.length === 0 ? (
          <Typography variant="body2" textAlign="center" color="text.secondary">
            No cities available at the moment.
          </Typography>
        ) : (
          <Autocomplete
            options={cities}
            value={selectedCity || null}
            onChange={(_, value) => onSelectCity(value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a city"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              />
            )}
          />
        )}
      </Card>
    </Fade>
  );
};

export default CitySelector;
