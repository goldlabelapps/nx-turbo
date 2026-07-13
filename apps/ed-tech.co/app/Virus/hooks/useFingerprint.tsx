"use client";
import { useSelector } from 'react-redux';

export function useFingerprint(): string | null {
  return useSelector((state: any) => state?.redux?.virus?.fingerprint ?? null);
}
