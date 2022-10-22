import moment from "moment-timezone"; // Look into removing moment from the project
import { format, isThisYear, isToday, isYesterday } from "date-fns";

export const UppercaseTransform = (value: string) => {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
};

export const formatToNGN = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
  minimumFractionDigits: 2,
  currencyDisplay: "symbol",
});

export function formatNumber(
  format?: string,
  currency = "USD",
  fraction = 0,
  currencyDisplay = "symbol"
): Intl.NumberFormat {
  const formattedNum =
    arguments.length > 0
      ? new Intl.NumberFormat(format, {
          currency,
          currencyDisplay,
          style: "currency",
          minimumFractionDigits: fraction,
        })
      : new Intl.NumberFormat();

  return formattedNum;
}

export const setDateToGmt = (date: Date | string) =>
  moment(date).tz("GMT + 1").format("DD-MM-YYYY");

export type Modify<T, R> = Omit<T, keyof R> & R;

export function instanceOf<V>(object: any, string: string): object is V {
  return string in object;
}

export const isJSON = (str: string) => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

export const defaultToNull = (value = null) => value;

export const formatDate = (d: string | number | Date) => {
  const date = new Date(d);

  if (!d) {
    return "";
  }

  if (isToday(date)) {
    return `Today at ${format(date, "kk:mm")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "kk:mm")}`;
  }

  if (!isThisYear(date)) {
    return format(date, "dd MMM yyyy kk:mmaa");
  }

  return format(date, "dd MMM kk:mmaa");
};
