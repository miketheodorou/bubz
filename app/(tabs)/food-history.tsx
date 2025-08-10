import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getAllMeals } from '@/lib/database/api/meals';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

export default function FoodView() {
  const tabBarHeight = useBottomTabBarHeight();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { data, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: getAllMeals
  });

  return (
    <ThemedView style={{ flex: 1, paddingBottom: tabBarHeight }}>
      <SafeAreaView style={{ flex: 1, paddingBottom: tabBarHeight }}>
        <CalendarProvider date={date} onDateChanged={setDate}>
          <ExpandableCalendar />
          <ThemedText>{date}</ThemedText>

          {isLoading ? (
            <ThemedText>Loading...</ThemedText>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <ThemedView>
                  <ThemedText>{item.meal_type}</ThemedText>
                </ThemedView>
              )}
            />
          )}
        </CalendarProvider>
      </SafeAreaView>
    </ThemedView>
  );
}
