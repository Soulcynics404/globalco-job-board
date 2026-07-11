"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "globalco:bookmarks";

export function useBookmarks() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // Client-only hydration of persisted bookmarks after mount; intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage may be unavailable
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
    },
    [ids, persist],
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, has, toggle, ready, count: ids.length };
}
