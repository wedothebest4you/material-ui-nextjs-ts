'use client';

import { createContext, useContext } from 'react';

export const PlatformContext = createContext<any>(null);

export function usePlatform() {
  return useContext(PlatformContext);
}
