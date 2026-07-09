"use client";
import type { T_RootState } from '../../../NX/Uberedux/store';
import { useSelector } from 'react-redux';

export function useUI() {
  const slice = useSelector((state: T_RootState) => state.redux.ui);
  return slice;
}
