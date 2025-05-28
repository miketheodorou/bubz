import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function WalksView() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ThemedText>All of the Bubbiez Walks</ThemedText>
    </ThemedView>
  );
}
