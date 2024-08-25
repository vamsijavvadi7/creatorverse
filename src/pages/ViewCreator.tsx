import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import { Button, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EditIcon from '@mui/icons-material/Edit';

// Custom Loader Component
const Loader = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
const CardHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  background: 'linear-gradient(90deg, rgba(255,125,135,1) 0%, rgba(255,205,0,1) 100%)', // Bright gradient colors
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));


// Custom Card Style
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  // @ts-ignore
  boxShadow: theme.shadows[5],
  padding: theme.spacing(3),
  maxWidth: '800px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const YouTubeLink = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textDecoration: 'none',
});
// @ts-ignore
const StyledYouTubeIcon = styled(YouTubeIcon)(({ theme }) => ({
  backgroundColor: '#FF0000', // Red background
  color: '#fff',
  borderRadius: '20%',
  padding: '3px',
}));

// Custom Container Style
const Container = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

// Custom Button Style
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  backgroundColor:'transparent',
  margin: theme.spacing(1),
}));

// Image Style
const CreatorImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  height: '350px',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid`,
  marginRight: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    marginBottom: theme.spacing(3),
  },
}));

export default function ViewCreator() {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.log('Error fetching creator:', error);
    } else {
      setCreator(data);
    }
    setLoading(false); // Stop loading after fetch
  }

  if (loading) return <Loader size={60} />; // Display loader during loading state

  return (
    <Container>
      <StyledCard>
      {/* @ts-ignore */}
        {creator.imageurl && (
          <CreatorImage
          // @ts-ignore
            src={creator.imageurl}
            // @ts-ignore
            alt={creator.name}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <CardHeader variant="h6" gutterBottom>
           {/* @ts-ignore */}
            {creator.name}
          </CardHeader>
          <YouTubeLink
          // @ts-ignore
            component="a"
            // @ts-ignore
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
          >
            <StyledYouTubeIcon />
          </YouTubeLink>
          <CardDescription variant="body2">
           {/* @ts-ignore */}
            {creator.description}
          </CardDescription>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <CustomButton variant="outlined" color="secondary">
                Back to Home
              </CustomButton>
            </Link>
          {/* @ts-ignore */}
            <Link to={`/edit/${creator.id}`} style={{ textDecoration: 'none' }}>
              <CustomButton variant="contained" color="primary">
                <EditIcon />
              </CustomButton>
            </Link>
          </Box>
        </CardContent>
      </StyledCard>
    </Container>
  );
}
