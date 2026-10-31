import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COURSES, Course } from '../types/menu';
import { colors } from '../constants/theme';

export type CourseSelection = Course | 'All';

type Props = { selected: CourseSelection; onSelect: (course: CourseSelection) => void };

const OPTIONS: CourseSelection[] = ['All', ...COURSES];

export default function CourseFilter({ selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const isSelected = option === selected;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 8,
    marginBottom: 6,
  },
  chipSelected: { backgroundColor: colors.primary },
  chipText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: '#fff' },
});
