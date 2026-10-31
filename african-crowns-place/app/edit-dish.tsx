import { useLocalSearchParams, useRouter } from 'expo-router';
import DishForm from '../components/DishForm';
import EmptyState from '../components/EmptyState';
import { useMenu } from '../context/MenuContext';
import { MenuItemInput } from '../types/menu';

export default function EditDishScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { menuItems, updateMenuItem } = useMenu();

  const dishToEdit = menuItems.find((item) => item.id === id);

  if (!dishToEdit) {
    return <EmptyState title="Dish not found" message="This dish may have been deleted." />;
  }

  const handleUpdate = (dish: MenuItemInput) => {
    updateMenuItem(dishToEdit.id, dish);
    router.replace('/');
  };

  return (
    <DishForm
      title="Edit Dish"
      submitLabel="Update Dish"
      initialValues={dishToEdit}
      onSubmit={handleUpdate}
      onCancel={() => router.replace('/')}
    />
  );
}
