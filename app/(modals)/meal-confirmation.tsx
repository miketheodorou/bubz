import { StyleSheet, Text, View } from 'react-native';

export default function MealConfirmation() {
  return (
    <View style={styles.container}>
      <Text>Meal Confirmation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
