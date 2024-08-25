import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import CreatorForm from '../components/CreatorForm';
// @ts-ignore
export default function AddCreator({ onAdd }) {
  const navigate = useNavigate();
// @ts-ignore
  const handleSubmit = async (creatorData) => {
    
  
    const { data, error } = await supabase
      .from('creators')
      .insert([creatorData]);
      console.log(data)
    if (error) console.log('Error adding creator:', error);
    else {
      onAdd();
      navigate('/');
    }
  };

  return (
    <div>
  {/* @ts-ignore */}
      <CreatorForm onSubmit={handleSubmit} />
    </div>
  );
}