import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { initDB } from '../utils/database';
import { loadItems } from '../store/itemsSlice';

const DBInitWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeDatabaseAndLoadItems = async () => {
        await initDB();
        dispatch(loadItems());
    };
    
    initializeDatabaseAndLoadItems();
  }, [dispatch]);

  return <>{children}</>;
};

export default DBInitWrapper;