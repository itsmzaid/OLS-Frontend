import React, {createContext, useContext, useState} from 'react';

type OrderItem = {
  itemId: string;
  itemName: string;
  serviceName: string;
  quantity: number;
  price: number;
};

type OrderContextType = {
  selectedItems: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (itemId: string) => void;
  clearOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const addItem = (item: OrderItem) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(i => i.itemId === item.itemId);
      if (existingItem) {
        return prev.map(i =>
          i.itemId === item.itemId ? {...i, quantity: item.quantity} : i,
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.itemId !== itemId));
  };

  const clearOrder = () => {
    setSelectedItems([]);
  };

  return (
    <OrderContext.Provider
      value={{selectedItems, addItem, removeItem, clearOrder}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
