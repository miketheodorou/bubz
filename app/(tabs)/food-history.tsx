import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/database/supabase';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from 'react-native';

export default function FoodView() {
  const { data } = useQuery({
    queryKey: ['meals'],
    queryFn: () => supabase.from('meals').select('*')
  });

  return (
    <ScrollView>
      <ThemedView>
        <ThemedText>{JSON.stringify(data, null, 2)}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}
