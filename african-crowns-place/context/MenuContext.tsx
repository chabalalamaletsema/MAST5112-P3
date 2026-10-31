import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, MenuItemInput } from '../types/menu';

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItemInput) => void;
  updateMenuItem: (id: string, item: MenuItemInput) => void;
  deleteMenuItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const createId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Holds the menu in memory and shares it with every screen.
export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItemInput) => {
    setMenuItems((current) => [...current, { ...item, id: createId() }]);
  };

  const updateMenuItem = (id: string, item: MenuItemInput) => {
    setMenuItems((current) =>
      current.map((existing) => (existing.id === id ? { ...item, id } : existing))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside a MenuProvider');
  }
  return context;
}
