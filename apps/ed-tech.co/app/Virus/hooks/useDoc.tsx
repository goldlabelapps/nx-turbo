"use client";
import { useSelector } from 'react-redux';

const EMPTY_OBJECT = {};
export function useDoc() {
  const slice = useSelector((state: any) => state?.redux?.virus?.fingerprintDoc ?? EMPTY_OBJECT);
  return slice;
}
