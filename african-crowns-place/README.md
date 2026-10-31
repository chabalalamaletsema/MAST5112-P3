# African Crowns Place - Chef's Menu Manager (Final PoE)

React Native (Expo Router) app that lets a chef add, edit, delete, search, filter and review statistics for menu items.

## How to run

1. Unzip and open the folder in VS Code.
2. In the VS Code terminal (`Ctrl + ``):

```bash
npm install
npx expo start
```

Press `w` for the browser, or scan the QR code with Expo Go.

## Project structure

| Folder | Purpose |
|---|---|
| `app/` | Screens: Home, Add Dish, Edit Dish, Statistics |
| `components/` | Reusable UI: AppButton, DishCard, DishForm, SearchBar, CourseFilter, StatCard, EmptyState |
| `context/` | MenuContext - shared menu data and add/update/delete functions |
| `utils/` | Reusable functions: validation, filtering, statistics, price formatting |
| `types/`, `constants/` | Shared types, course list and colour theme |

## Change log (changes since Part 2)

### New features
- Edit a dish: Edit button on each card opens a pre-filled form (`app/edit-dish.tsx`).
- Delete a dish: Delete button with a confirmation prompt.
- Search by dish name (`SearchBar`).
- Filter by course: All, Starter, Main Course, Dessert (`CourseFilter`).
- Clear filters link, plus a "Showing X of Y dishes" counter.
- Menu statistics screen: total items, average price, items per course.
- "No matching dishes" message when a search or filter finds nothing.

### Refactoring
- One `DishForm` component now serves both Add and Edit screens, so the form and validation code is no longer repeated.
- Validation, filtering and statistics moved into `utils/menuUtils.ts` as reusable functions.
- Cards, buttons, stat cards, search bar and empty states are now separate components.
- Colours moved to `constants/theme.ts` so every screen looks consistent.
- Price is now stored as a number (was text) so the average price can be calculated.
- Course is now a typed list (`COURSES`) shared by the form, filter and statistics.
- `MenuContext` gained `updateMenuItem` and `deleteMenuItem`.
- App renamed to African Crowns Place.

### User experience
- Success alerts after adding and updating, confirm prompt before deleting.
- Clear error messages under each invalid field; comma prices such as `89,99` are accepted.
- Same header colour, buttons and spacing on all four screens.
