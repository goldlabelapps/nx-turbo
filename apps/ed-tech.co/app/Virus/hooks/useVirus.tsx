"use client";
import { useSelector } from 'react-redux';

const EMPTY_OBJECT = {};
export function useVirus() {
  const slice = useSelector((state: any) => state?.redux?.virus ?? EMPTY_OBJECT);
  return slice;
}
