import { ScrollView, Text, StyleSheet } from 'react-native';
import StatCard from '../components/StatCard';
import EmptyState from '../components/EmptyState';
import { useMenu } from '../context/MenuContext';
import { COURSES } from '../types/menu';
import { calculateMenuStatistics, formatPrice } from '../utils/menuUtils';
import { colors } from '../constants/theme';

export default function StatisticsScreen() {
  const { menuItems } = useMenu();

  if (menuItems.length === 0) {
    return (
      <EmptyState title="No statistics yet" message="Add some dishes to see your menu overview." />
    );
  }

  const stats = calculateMenuStatistics(menuItems);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Menu Overview</Text>
      <StatCard label="Total menu items" value={stats.totalItems} />
      <StatCard label="Average price" value={formatPrice(stats.averagePrice)} />
      <Text style={styles.sectionTitle}>Items per course</Text>
      {COURSES.map((course) => (
        <StatCard key={course} label={course} value={stats.itemsPerCourse[course]} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginVertical: 8 },
});
