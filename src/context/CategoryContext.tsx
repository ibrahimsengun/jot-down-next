import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import useSWR from "swr";
import { NextAPI } from "../axios";
import { ITodoCategory } from "../models/Todo";

interface ICategoryContext {
  categories: ITodoCategory[] | undefined;
  isLoading: boolean;
}

export const CategoryContext = createContext({} as ICategoryContext);

const fetcher = (url: string) => NextAPI.get(url).then((res) => res.data);

export const CategoryContextProvider: React.FC<any> = ({ children }) => {
  const {
    data: categories,
    isValidating: isLoading,
    mutate: mutateCategories,
  } = useSWR<ITodoCategory[], Error>("/api/categories/allCategories", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const contextValue: ICategoryContext = useMemo(
    () => ({
      categories,
      isLoading,
    }),
    [categories, isLoading]
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
