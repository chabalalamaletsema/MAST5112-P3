export const COURSES = ['Starter', 'Main Course', 'Dessert'] as const;

export type Course = (typeof COURSES)[number];

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
};

export type MenuItemInput = Omit<MenuItem, 'id'>;

export type MenuStatistics = {
  totalItems: number;
  averagePrice: number;
  itemsPerCourse: Record<Course, number>;
};
