import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import DishCard from '../components/DishCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import CourseFilter, { CourseSelection } from '../components/CourseFilter';
import { useMenu } from '../context/MenuContext';
import { filterMenuItems } from '../utils/menuUtils';
import { colors } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { menuItems, deleteMenuItem } = useMenu();

  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseSelection>('All');

  const visibleItems = filterMenuItems(menuItems, searchText, selectedCourse);
  const isFiltering = searchText.trim() !== '' || selectedCourse !== 'All';

  const clearFilters = () => {
    setSearchText('');
    setSelectedCourse('All');
  };

  const renderEmptyList = () =>
    menuItems.length === 0 ? (
      <EmptyState title="No dishes added yet." message='Tap "Add New Dish" to get started.' />
    ) : (
      <EmptyState title="No matching dishes" message="Try a different search or clear the filters." />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>African Crowns Place Menu</Text>

      <View style={styles.buttonRow}>
        <View style={styles.buttonSlot}>
          <AppButton label="+ Add New Dish" onPress={() => router.push('/add-dish')} />
        </View>
        <View style={styles.buttonSlot}>
          <AppButton label="Statistics" variant="secondary" onPress={() => router.push('/statistics')} />
        </View>
      </View>

      <SearchBar value={searchText} onChangeText={setSearchText} />
      <CourseFilter selected={selectedCourse} onSelect={setSelectedCourse} />

      {isFiltering && (
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            Showing {visibleItems.length} of {menuItems.length} dishes
          </Text>
          <Text style={styles.clearLink} onPress={clearFilters}>
            Clear filters
          </Text>
        </View>
      )}

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => (
          <DishCard
            item={item}
            onEdit={() => router.push({ pathname: '/edit-dish', params: { id: item.id } })}
            onDelete={() => deleteMenuItem(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 16 },
  buttonRow: { flexDirection: 'row', marginBottom: 14 },
  buttonSlot: { flex: 1, marginRight: 8 },
  resultsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  resultsText: { fontSize: 13, color: colors.muted },
  clearLink: { fontSize: 13, color: colors.primary, fontWeight: '600' },
});