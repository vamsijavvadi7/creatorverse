import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import { AppBar, Toolbar, Typography, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';

// Custom Container Style
const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  paddingTop: theme.spacing(8), // Adjust to account for fixed AppBar height
  margin: 0, // Remove default margin
  boxSizing: 'border-box', // Include padding in element's total width and height
}));

// Custom AppBar Style
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none', // Remove default box shadow
  width: '100%', // Ensure AppBar spans full width
  position: 'fixed', // Make sure the AppBar stays at the top
  top: 0,
  left: 0,
}));

// Custom Navigation Link Style
const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

// Custom Loading Spinner
const Loader = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export default function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    const { data, error } = await supabase.from('creators').select('*');
    if (error) {
      console.log('Error fetching creators:', error);
    } else {
      // @ts-ignore
      setCreators(data);
    }
    setLoading(false); // Stop loading after fetch
  }

  return (
    <Router>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Creatorverse
          </Typography>
          <StyledLink to="/">
            <Button color="inherit">Home</Button>
          </StyledLink>
          <StyledLink to="/add">
            <Button color="inherit">Add Creator</Button>
          </StyledLink>
        </Toolbar>
      </StyledAppBar>

      <StyledContainer>
        {/* Main Content */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Loader size={60} />
          </Box>
        ) : (
          <Routes>
            <Route path="/" element={<ShowCreators creators={creators} />} />
            <Route path="/creator/:id" element={<ViewCreator />} />
            <Route path="/add" element={<AddCreator onAdd={fetchCreators} />} />
            <Route path="/edit/:id" element={<EditCreator onEdit={fetchCreators} />} />
          </Routes>
        )}
      </StyledContainer>
    </Router>
  );
}
