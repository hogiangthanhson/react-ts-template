import { differenceInDays, formatDistance, parseISO } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const formatCurrency = (value: number | null) => {
  if (!value) return;
  return new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(value);
};
export const subtractDates = (dateStr1: string, dateStr2: string): number => {
  const date1 = parseISO(String(dateStr1));
  const date2 = parseISO(String(dateStr2));

  const days = differenceInDays(date1, date2);

  return days;
};

export const formatDistanceFromNow = (dateStr: string): string => {
  const distance = formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  });

  return distance.replace("about ", "").replace("in", "In");
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};
