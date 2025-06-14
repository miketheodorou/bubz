import { supabase } from '../supabase';

export async function getAllMeals() {
  const { data, error } = await supabase.from('meals').select('meal_type,id');

  if (error) {
    throw error;
  }

  return data;
}
