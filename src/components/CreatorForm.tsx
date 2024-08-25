import { useState, useEffect } from 'react';
import { Button } from "../headcomp/components/ui/button";
import { Input } from "../headcomp/components/ui/input";
import { Label } from "../headcomp/components/ui/label";
import { Textarea } from "../headcomp/components/ui/textarea";
import { styled } from '@mui/system';

const Container = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  padding: theme.spacing(4),
  //background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.primary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const FormContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '600px', // Set a max-width for the form container
  backgroundColor: theme.palette.background.paper, // Light background for the form
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius, 
  // @ts-ignore// Rounded corners
  boxShadow: theme.shadows[3], // Subtle shadow
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const FormField = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledInput = styled(Input)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  color: '#000', // Black text color
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));

const StyledTextarea = styled(Textarea)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  color: '#000', // Black text color
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'uppercase',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));
// @ts-ignore
export default function CreatorForm({ creator, onSubmit }) {
  const [name, setName] = useState(creator?.name || '');
  const [url, setUrl] = useState(creator?.url || '');
  const [description, setDescription] = useState(creator?.description || '');
  const [imageurl, setImageurl] = useState(creator?.imageurl || '');

  useEffect(() => {
    if (creator) {
      setName(creator.name);
      setUrl(creator.url);
      setDescription(creator.description);
      setImageurl(creator.imageurl);
    }
  }, [creator]);
// @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, url, description, imageurl });
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <StyledInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="url">URL</Label>
            <StyledInput
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <StyledTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="imageurl">Image URL (optional)</Label>
            <StyledInput
              id="imageurl"
              type="url"
              value={imageurl}
              onChange={(e) => setImageurl(e.target.value)}
            />
          </FormField>
          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
}
