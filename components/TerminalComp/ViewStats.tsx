"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/lib/time";

interface ViewStatsProps {
  slug: string;
}

interface Stats {
  total: number;
  lastViewedAt: string | null;
}

export default function ViewStats({ slug }: ViewStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/blog/${slug}/view`, { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Stats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!stats) return null;

  return (
    <span>
      {stats.total} view{stats.total === 1 ? "" : "s"}
      {stats.lastViewedAt &&
        ` · last viewed ${formatRelativeTime(stats.lastViewedAt)}`}
    </span>
  );
}
