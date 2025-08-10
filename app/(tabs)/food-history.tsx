import { MealCard, MealData } from '@/components/MealCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getMeals } from '@/lib/database/api/meals';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';

export default function FoodView() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tabBarHeight = useBottomTabBarHeight();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { data, isLoading } = useQuery({
    queryKey: ['meals', date],
    queryFn: () => getMeals(date)
  });

  const handleMealPress = (meal: MealData) => {
    Alert.alert(
      `${meal.meal_type}`,
      `Status: ${meal.is_eaten ? 'Eaten' : 'Not eaten yet'}\nTime: ${new Date(
        meal.meal_timestamp
      ).toLocaleString()}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ThemedView style={{ flex: 1, paddingBottom: tabBarHeight }}>
      <SafeAreaView style={{ flex: 1, paddingBottom: tabBarHeight }}>
        <CalendarProvider date={date} onDateChanged={setDate}>
          <ExpandableCalendar
            theme={{
              backgroundColor,
              calendarBackground: backgroundColor,
              monthTextColor: textColor,
              todayTextColor: '#a855f7',
              dayTextColor: textColor,
              arrowColor: '#a855f7',
              selectedDayBackgroundColor: '#a855f7'
            }}
          />
          <ThemedView style={{ flex: 1, paddingTop: 20 }}>
            {isLoading ? (
              <ThemedText>Loading meals...</ThemedText>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <MealCard meal={item} onPress={handleMealPress} />
                )}
              />
            )}
          </ThemedView>
        </CalendarProvider>
      </SafeAreaView>
    </ThemedView>
  );
}
