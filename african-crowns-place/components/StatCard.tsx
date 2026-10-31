import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

type Props = { label: string; value: string | number };

export default function StatCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: { fontSize: 13, color: colors.muted, textTransform: 'uppercase' },
  value: { fontSize: 28, fontWeight: '700', color: colors.primary, marginTop: 4 },
});
