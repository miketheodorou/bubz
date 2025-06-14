import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getAllMeals } from '@/lib/database/api/meals';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import { FlatList, SafeAreaView } from 'react-native';

export default function FoodView() {
  const tabBarHeight = useBottomTabBarHeight();
  const { data, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: getAllMeals
  });

  if (isLoading) return <ThemedText>Loading...</ThemedText>;

  return (
    <ThemedView style={{ padding: 16, paddingBottom: tabBarHeight }}>
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ThemedView>
              <ThemedText>{item.meal_type}</ThemedText>
            </ThemedView>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
