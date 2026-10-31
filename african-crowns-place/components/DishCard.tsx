import { View, Text, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { MenuItem } from '../types/menu';
import { formatPrice } from '../utils/menuUtils';
import { colors } from '../constants/theme';

type Props = { item: MenuItem; onEdit: () => void; onDelete: () => void };

export default function DishCard({ item, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.dishName}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <AppButton label="Edit" variant="secondary" onPress={onEdit} />
        </View>
        <View style={styles.actionButton}>
          <AppButton label="Delete" variant="danger" onPress={onDelete} />
        </View>
      </View>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '600', color: colors.text, flex: 1, marginRight: 8 },
  price: { fontSize: 16, fontWeight: '600', color: colors.primary },
  course: { fontSize: 12, color: colors.muted, marginTop: 4, textTransform: 'uppercase' },
  description: { fontSize: 14, color: '#555', marginTop: 8, lineHeight: 20 },
  actions: { flexDirection: 'row', marginTop: 12 },
  actionButton: { flex: 1, marginRight: 8 },
});
