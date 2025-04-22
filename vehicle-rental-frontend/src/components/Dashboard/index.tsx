// D:\vehicle-rental-frontend\src\components\Dashboard\index.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import VehicleReviewForm from './VehicleReviewForm';
import ProviderReviewForm from './ProviderReviewForm';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { useNavigate } from 'react-router-dom';
import VehicleList from '../../components/VehicleList';
import CitySelector from '../../components/CitySelector';
import { Paper, Button, Grid } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import StorefrontIcon from '@mui/icons-material/Storefront';

const drawerWidth = 250;

interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [reviewType, setReviewType] = useState<'vehicle' | 'provider' | null>(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // make sure this exists during login

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    axiosInstance
      .get<{ user: UserProfile }>('/profile')
      .then((res) => setProfile(res.data.user))
      .catch((err) => console.error('Profile fetch failed', err));
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Avatar sx={{ width: 64, height: 64, margin: '0 auto', bgcolor: '#3b82f6' }}>
        {profile?.name?.[0] || 'U'}
      </Avatar>
      <Typography variant="h6" mt={1} fontWeight={600}>
        {profile?.name || 'User'}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardCustomizeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => setReviewType('vehicle')}>
  <ListItemIcon>
    <CarRentalIcon color="primary" />
  </ListItemIcon>
  <ListItemText primary="Review Vehicle" />
</ListItemButton>

<ListItemButton onClick={() => setReviewType('provider')}>
  <ListItemIcon>
    <StorefrontIcon color="secondary" />
  </ListItemIcon>
  <ListItemText primary="Review Provider" />
</ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#3b82f6',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Vehicle Rental Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={600} color="primary" gutterBottom>
            Welcome, {profile?.name || 'User'}!
          </Typography>

        {/* review section   */}
      <Box mt={3}>
  {reviewType === 'vehicle' && userId && (
    <VehicleReviewForm city={selectedCity} userId={userId} onClose={() => setReviewType(null)} />
  )}
  {reviewType === 'provider' && userId && (
    <ProviderReviewForm city={selectedCity} userId={userId} onClose={() => setReviewType(null)} />
  )}
</Box>

          <Typography variant="h6" gutterBottom mt={4}>
            Explore Vehicles in Your City
          </Typography>

          <CitySelector
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
          />

          {selectedCity && <VehicleList selectedCity={selectedCity} />}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
