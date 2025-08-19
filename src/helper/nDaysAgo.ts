import { supabase } from "../lib/supabaseClient";

export function isoNDaysAgo(n: number) {
  // n days ago in UTC, as ISO 8601 string
  const ms = n * 24 * 60 * 60 * 1000;
  return new Date(Date.now() - ms).toISOString(); // ends with 'Z' (UTC)
}

async function fetchLastNDays(n: number) {
  const from = isoNDaysAgo(n);
  const to = new Date().toISOString();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .gte("created_at", from)   // created_at >= from (UTC)
    .lte("created_at", to)     // created_at <= now
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// “This week” = last 8 days (your rule)
async function onClickThisWeek() {
  const rows = await fetchLastNDays(8);
  // do something with rows
}

// “This month” = last 30 days
async function onClickThisMonth() {
  const rows = await fetchLastNDays(30);
  // do something with rows
}
