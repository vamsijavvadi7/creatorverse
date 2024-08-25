import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import CreatorForm from '../components/CreatorForm';
// @ts-ignore
export default function EditCreator({ onEdit:any }) {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();
    if (error) console.log('Error fetching creator:', error);
    else setCreator(data);
  }

  const handleSubmit = async (updatedCreator:any) => {
    const { data, error } = await supabase
      .from('creators')
      .update(updatedCreator)
      .eq('id', id);

    if (error) console.log('Error updating creator:', error);
    else {
      // @ts-ignore
      onEdit();
      navigate('/');
      console.log(data)
    }
  };

  if (!creator) return <div>Loading...</div>;

  return (
    <div>
      <CreatorForm creator={creator} onSubmit={handleSubmit} />
    </div>
  );
}