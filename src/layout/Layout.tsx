import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, CssBaseline, Box } from '@mui/material';
import Profile from '../components/Profile';
import RegisteredUsers from '../components/RegisteredUsers';
import Settings from '../components/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import UsageSamples from '../components/UsageSamples';
import { Description, LightbulbCircleOutlined, MenuBook } from '@mui/icons-material';
import FeatureRequestForm from '../components/FeatureRequestForm';
import SwaggerUI from '../components/Swagger';
import Footer from '../components/Footer';
// import { useAuth } from '../hooks/useAuth';

const drawerWidth = 280; // Increased drawer width

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('settings'); 

  // const user = useAuth()?.currentUser

  const renderComponent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'registered-users':
        return <RegisteredUsers />;
      case 'settings':
        return <Settings />;
      case 'usage-samples':
        return <UsageSamples />;
      case 'feature-requests':
        return <FeatureRequestForm />;
      case 'api-documentation':
        return <SwaggerUI />;
      default:
        return <Settings />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            GateKeeper Pro
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', paddingTop: '5rem' },
        }}
      >
        {/* <Typography sx={{marginTop:"5rem"}}>Welcome <span>{user?.firstname} !</span> </Typography> */}
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemButton
                selected={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
                sx={{ '.MuiListItemText-primary': { fontSize: '1rem', fontWeight: 'bold' } }} // Larger and bolder font
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={activeTab === 'usage-samples'}
                onClick={() => setActiveTab('usage-samples')}
                sx={{ '.MuiListItemText-primary': { fontSize: '1rem', fontWeight: 'bold' } }} // Larger and bolder font
              >
                <ListItemIcon>
                  <MenuBook />
                </ListItemIcon>
                <ListItemText primary="Usage Examples" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={activeTab === 'api-documentation'}
                onClick={() => setActiveTab('api-documentation')}
                sx={{ '.MuiListItemText-primary': { fontSize: '1rem', fontWeight: 'bold' } }} // Larger and bolder font
              >
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="API Documentation" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
                sx={{ '.MuiListItemText-primary': { fontSize: '1rem', fontWeight: 'bold' } }} // Larger and bolder font
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={activeTab === 'registered-users'}
                onClick={() => setActiveTab('registered-users')}
                sx={{ '.MuiListItemText-primary': { fontSize: '1rem', fontWeight: 'bold' } }} // Larger and bolder font
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Registered Users" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={activeTab === 'feature-requests'}
                onClick={() => setActiveTab('feature-requests')}
                sx={{ '.MuiListItemText-primary': { fontSize: '1rem', fontWeight: 'bold' } }} // Larger and bolder font
              >
                <ListItemIcon>
                <LightbulbCircleOutlined />
                </ListItemIcon>
                <ListItemText primary="Feature Request" />
              </ListItemButton>
            </ListItem>


          </List>
        </Box>
      <Footer/>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `-300px`, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%', marginLeft:"15rem" }}>
          {renderComponent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
