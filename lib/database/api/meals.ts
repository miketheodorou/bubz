import { supabase } from '../supabase';

export async function getAllMeals() {
  const { data, error } = await supabase
    .from('dog_meals')
    .select('meal_type,id,meal_timestamp,is_eaten');

  if (error) {
    throw error;
  }

  return data;
}
