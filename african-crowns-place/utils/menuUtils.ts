import { COURSES, Course, MenuItem, MenuStatistics } from '../types/menu';

export type FormValues = {
  dishName: string;
  description: string;
  price: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const parsePrice = (text: string): number | null => {
  const value = Number(text.trim().replace(',', '.'));
  return text.trim() !== '' && !isNaN(value) && value > 0 ? value : null;
};

export const validateDishForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.dishName.trim()) errors.dishName = 'Dish name is required.';
  if (!values.description.trim()) errors.description = 'Description is required.';

  if (!values.price.trim()) {
    errors.price = 'Price is required.';
  } else if (parsePrice(values.price) === null) {
    errors.price = 'Enter a valid price greater than 0.';
  }

  return errors;
};

export const filterMenuItems = (
  items: MenuItem[],
  searchText: string,
  course: Course | 'All'
): MenuItem[] => {
  const search = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName = item.dishName.toLowerCase().includes(search);
    const matchesCourse = course === 'All' || item.course === course;
    return matchesName && matchesCourse;
  });
};

export const calculateMenuStatistics = (items: MenuItem[]): MenuStatistics => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const itemsPerCourse = COURSES.reduce(
    (counts, course) => ({
      ...counts,
      [course]: items.filter((item) => item.course === course).length,
    }),
    {} as Record<Course, number>
  );

  return {
    totalItems: items.length,
    averagePrice: items.length > 0 ? totalPrice / items.length : 0,
    itemsPerCourse,
  };
};

export const formatPrice = (price: number): string => `R${price.toFixed(2)}`;
