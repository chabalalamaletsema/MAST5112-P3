import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

type Props = { title: string; message: string };

export default function EmptyState({ title, message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 6 },
  message: { fontSize: 14, color: colors.muted, textAlign: 'center' },
});
