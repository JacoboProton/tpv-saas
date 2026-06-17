import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: Item[];
  addItem: (item: Omit<Item, "qty">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  itemCount: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }

      return {
        items: [...state.items, { ...item, qty: 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter(i => i.id !== id),
    })),

  updateQuantity: (id, qty) =>
    set((state) => ({
      items: state.items.map(i =>
        i.id === id ? { ...i, qty: Math.max(0, qty) } : i
      ).filter(i => i.qty > 0),
    })),

  clear: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

  itemCount: () =>
    get().items.reduce((sum, i) => sum + i.qty, 0),
}));