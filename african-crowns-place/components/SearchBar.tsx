import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

type Props = { value: string; onChangeText: (text: string) => void };

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by dish name"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Text style={styles.clear}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 15 },
  clear: { color: colors.primary, fontWeight: '600' },
});
