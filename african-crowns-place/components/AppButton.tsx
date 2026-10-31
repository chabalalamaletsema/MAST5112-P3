import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

export default function AppButton({ label, onPress, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity style={[styles.base, styles[variant]]} onPress={onPress}>
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center' },
  primary: { backgroundColor: colors.primary },
  danger: { backgroundColor: colors.error },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
  text: { color: '#fff', fontSize: 15, fontWeight: '600' },
  secondaryText: { color: colors.primary },
});
