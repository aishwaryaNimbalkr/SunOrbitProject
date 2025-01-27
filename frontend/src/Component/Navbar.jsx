import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useMediaQuery, Stack } from '@mui/material';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const menuLinks = (
    <>
      <Link href="/" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        DASHBOARD
      </Link>
      <Link href="/about" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        CUSTOMERS
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        SIGNUP
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        QUERIES
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        RM'S
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        LEADS
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        LOCATIONS
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        LEAD CONFIG
      </Link>
      <Link href="/contact" color="inherit" underline="none" sx={{ fontFamily: 'Arial, sans-serif', marginLeft: 2, fontSize: '15px' }}>
        BONUS CONFIG
      </Link>
    </>
  );

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#F66300' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo or Title */}
          <Typography variant="h6" style={{ backgroundColor: '#FFB600' }} component="div" sx={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
            vj<b>ONE</b>परिवार
          </Typography>

          {/* Links on the right (only shown on large screens) */}
          {!isMobile && menuLinks}

          {/* Notifications Icon */}
          <IconButton color="inherit" sx={{ marginLeft: 'auto' }}>
            <NotificationsActiveIcon />
          </IconButton>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton color="inherit" sx={{ marginLeft: 'auto' }} onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
          <Box sx={{ padding: 2 }}>
            {/* Use Stack to align links vertically in the Drawer */}
            <Stack spacing={2}>
              {menuLinks}
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
