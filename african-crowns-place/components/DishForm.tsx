import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppButton from './AppButton';
import { COURSES, Course, MenuItemInput } from '../types/menu';
import { FormErrors, parsePrice, validateDishForm } from '../utils/menuUtils';
import { colors } from '../constants/theme';

type Props = {
  title: string;
  submitLabel: string;
  initialValues?: MenuItemInput;
  onSubmit: (dish: MenuItemInput) => void;
  onCancel: () => void;
};

// Used by both the Add Dish and Edit Dish screens.
export default function DishForm({ title, submitLabel, initialValues, onSubmit, onCancel }: Props) {
  const [dishName, setDishName] = useState(initialValues?.dishName ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [course, setCourse] = useState<Course>(initialValues?.course ?? COURSES[0]);
  const [price, setPrice] = useState(initialValues ? String(initialValues.price) : '');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    const validationErrors = validateDishForm({ dishName, description, price });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parsePrice(price) as number,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={[styles.input, errors.dishName && styles.inputError]}
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Bobotie"
      />
      {errors.dishName && <Text style={styles.errorText}>{errors.dishName}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline, errors.description && styles.inputError]}
        value={description}
        onChangeText={setDescription}
        placeholder="Short description of the dish"
        multiline
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={course} onValueChange={(value) => setCourse(value)}>
          {COURSES.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={[styles.input, errors.price && styles.inputError]}
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 89.99"
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <View style={styles.buttons}>
        <AppButton label={submitLabel} onPress={handleSubmit} />
        <View style={styles.gap} />
        <AppButton label="Cancel" variant="secondary" onPress={onCancel} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  multiline: { height: 80, textAlignVertical: 'top' },
  inputError: { borderColor: colors.error },
  errorText: { color: colors.error, fontSize: 13, marginTop: 4 },
  pickerWrapper: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttons: { marginTop: 28 },
  gap: { height: 10 },
});
