import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, IconButton,Box } from '@mui/material';
import { styled } from '@mui/system';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

// Custom styled components Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxWidth: '350px',
  maxHeight: '450px',
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  // @ts-ignore
  boxShadow: theme.shadows[5],
  position: 'relative',
  overflow: 'hidden',
  transform: 'scale(1.02)',
  transition: 'transform 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    transform: 'scale(1)',
  },
}));

const CreatorImage = styled(CardMedia)({
  height: '200px',
  width: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
});

const CardInfoOverlay = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  color: '#fff', // White text on overlay
  padding: theme.spacing(2),
  textAlign: 'center',
  zIndex: 1, // Ensure content is above the image
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CardHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
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

const InfoButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 2,
  color: theme.palette.text.primary,
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: theme.spacing(1),
  zIndex: 2,
  color: theme.palette.text.primary,
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 2,
  color: theme.palette.text.primary,
}));
// @ts-ignore
export default function CreatorCard({ creator, onDelete }) {
  return (
    <StyledCard>
     
        {creator.imageurl && (

          <Box position="relative" width="100%" height="200px" sx={{ mb: 2 }}>
            <CreatorImage
            // @ts-ignore
              component="img"
              image={creator.imageurl}
              alt={creator.name}
            />
            <CardInfoOverlay>

              <CardHeader variant="h6" gutterBottom>
                {creator.name}
              </CardHeader>
              
             
              <Box display="flex" justifyContent="center" mt={2}>
              <YouTubeLink
              // @ts-ignore
                component="a"
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
              >
                <StyledYouTubeIcon />
              </YouTubeLink>
              <Link to={`/creator/${creator.id}`} style={{ textDecoration: 'none' }}>
          <InfoButton>
            <InfoIcon />
          </InfoButton>
        </Link>
               
                <Link to={`/edit/${creator.id}`} style={{ textDecoration: 'none' }}>
                  <EditButton 
                  // @ts-ignore
                  variant="contained" size="small">
                    <EditIcon />
                  </EditButton>
                </Link>
                <DeleteButton
                // @ts-ignore
                  variant="contained"
                  size="small"
                  onClick={() => onDelete(creator.id)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </DeleteButton>
                <CardDescription variant="body2">
                {creator.description}
              </CardDescription>
              </Box>
            </CardInfoOverlay>
          </Box>
        )}
        {!creator.imageurl && (
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {creator.name}
            </Typography>
            <YouTubeLink
            // @ts-ignore
              component="a"
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
            >
              <StyledYouTubeIcon />
            </YouTubeLink>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              {creator.description}
            </Typography>
            
            <Box display="flex" justifyContent="center" mt={2}>
            <Link to={`/creator/${creator.id}`} style={{ textDecoration: 'none' }}>
          <InfoButton>
            <InfoIcon />
          </InfoButton>
        </Link>
              <Link to={`/edit/${creator.id}`} style={{ textDecoration: 'none' }}>
                <EditButton size="small">
                  <EditIcon />
                </EditButton>
              </Link>
              <DeleteButton
              // @ts-ignore
                variant="contained"
                size="small"
                onClick={() => onDelete(creator.id)}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </DeleteButton>
            </Box>
          </CardContent>
        )}
    
    </StyledCard>
  );
}
