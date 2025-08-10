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

export async function getMeals(date: string) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('dog_meals')
    .select('meal_type,id,meal_timestamp,is_eaten')
    .gte('meal_timestamp', startOfDay.toISOString())
    .lte('meal_timestamp', endOfDay.toISOString());

  if (error) {
    throw error;
  }

  return data;
}
