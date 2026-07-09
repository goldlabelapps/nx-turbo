"use client";
import type { T_RootState } from '../../../NX/Uberedux/store';
import { useSelector } from 'react-redux';

export function useProducts() {
  const slice = useSelector((state: T_RootState) => state.redux.products);
  return slice;
}
