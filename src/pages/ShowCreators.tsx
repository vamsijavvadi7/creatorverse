import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';

// Custom Container Style
const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  //background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.primary.main})`,
  padding: theme.spacing(4),
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
// @ts-ignore
export default function ShowCreators({ creators }) {
  // @ts-ignore
  const deleteCreator = async (id) => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);
    if (error) console.log('Error deleting creator:', error);
    else window.location.reload();
  };

  return (
    <StyledContainer>
      {creators.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="textSecondary" marginTop={2}>
            No creators found. Add some!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* @ts-ignore */}
          {creators.map((creator) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={creator.id}>
              <CreatorCard creator={creator} onDelete={deleteCreator} />
            </Grid>
          ))}
        </Grid>
      )}
    </StyledContainer>
  );
}
