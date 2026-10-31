import { useRouter } from 'expo-router';
import DishForm from '../components/DishForm';
import { useMenu } from '../context/MenuContext';
import { MenuItemInput } from '../types/menu';

export default function AddDishScreen() {
  const router = useRouter();
  const { addMenuItem } = useMenu();

  const handleAdd = (dish: MenuItemInput) => {
    addMenuItem(dish);
    router.replace('/');
  };

  return (
    <DishForm
      title="Add Dish"
      submitLabel="Save Dish"
      onSubmit={handleAdd}
      onCancel={() => router.replace('/')}
    />
  );
}
