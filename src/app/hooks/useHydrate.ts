"use client";

import { useEffect, useState } from 'react';

export const useHasHydrate = () => {
  const [hasHydrate, setHasHydrate] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrate(true);
  }, []);

  return hasHydrate;
};