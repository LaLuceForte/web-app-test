import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { List, Button } from '@mui/material';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const isActiveRoute = (route) => location.pathname === route;

  return (
    <div style={{ width: 200, backgroundColor: '#f5f5f5', padding: 16, height: '100vh' }}>
      <List>
        <Button
          fullWidth
          variant={isActiveRoute('/dashboard') ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleNavigation('/dashboard')}
          sx={{ marginBottom: 2 }}
        >
          Dashboard
        </Button>
        <Button
          fullWidth
          variant={isActiveRoute('/joined') ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleNavigation('/joined')}
        >
          Joined Table
        </Button>
      </List>
    </div>
  );
};

export default Sidebar;
