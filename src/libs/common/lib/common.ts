import dayjs, { Dayjs } from "dayjs";
import _ from "lodash";

import type { Size } from "@/libs/types";
import { path } from "@/app/router/route-paths";

export function getRand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param time ms
 * @returns
 */
export const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(time), time);
  });

/**
 * find item from array
 * @param items
 * @param idx
 * @returns
 */
export const findArrayItem = <T>(items: Array<T>, idx: number, fn: keyof T) => {
  return items.find((el) => {
    return el[fn] === idx;
  });
};

/**
 * get window coord
 * @param n
 * @returns
 */
export const getWindowCoord = (n: number) => {
  const small = window.innerWidth < 640;
  const kx1 = small ? 15 : 50;
  const kx2 = small ? 15 : 70;
  const ky = small ? 100 : 40;
  const x = kx1 + n * kx2;
  const y = ky + n * kx2;
  return { x, y };
};

/**
 * get scale from size
 */
export const getScale = (size: Size) => {
  if (!size.width || !size.height) {
    return 1;
  }
  const imgWidth = 1876;
  const imgHeight = 970;
  let scale = (size.width * 100) / imgWidth / 100;
  if (scale > 1) {
    scale = 1;
  }
  const dy = 100;
  if (size.height - dy < imgHeight * scale) {
    const scale2 = ((size.height - dy) * 100) / imgHeight / 100;
    if (scale2 < scale) {
      scale = scale2;
    }
  }
  return scale;
};

/**
 * get next url after login
 * @param role
 * @returns
 */
export const getNextUrl = (role?: string) => {
  return role === "admin" ? path("main") : path("main");
};

/**
 * get valute
 * @param val in dec
 * @returns
 */
export const formatPrice = (val: number | string, force?: boolean) => {
  if (!val && !force) {
    return "";
  }

  const valOk = typeof val === "number" ? val : Number(val);

  return valOk.toLocaleString(undefined, { minimumFractionDigits: 0 }) + " ₽";
  // return val / 100 + " ₽";
};

/**
 * tranform price from decimal to int
 * @param val
 * @returns
 */
export const priceFromBackend = (val: number) => {
  if (!val) {
    return val;
  }
  return val / 100;
};

/**
 * tranform price from decimal to int
 * @param val
 * @returns
 */
export const priceToBackend = (val: number) => {
  if (!val) {
    return val;
  }
  return Math.round(val * 100);
};

export const formatIP = (ip: string): number => {
  if (!ip) {
    return 0;
  }
  const ipa = ip.split(":");
  const a = ipa[0].split(".");
  let out = parseInt(a[0]) * 0x1000000 + parseInt(a[1]) * 0x10000 + parseInt(a[2]) * 0x100 + parseInt(a[3]) * 1;
  if (ipa[1]) {
    out += parseInt(ipa[1]) / 10000;
  }
  return out;
};

/**
 * format date from be
 * @param time
 * @param format
 * @returns
 */
export const dateFromBackend = (time?: string | number | Date | Dayjs, format = "D MMM YYYY HH:mm:ss") => {
  const out = dayjs(time);
  out.locale("ru");
  return out.format(format);
};

/**
 * add days to date and return formatted string
 * @param time
 * @param days
 * @returns
 */
export const dateAddFromBackend = (time: string | number | Date, days: number) => {
  const out = dayjs(time).add(days, "days");
  // console.log('🚀 ~ dateAddFromBackend ~ out:', out);
  return dateFromBackend(out);
};

/**
 * deep clone
 * @param data
 * @returns
 */
export const clone = <T = unknown>(data: T) => {
  return _.cloneDeep(data);
};

export const prepareImgForApi = (out: { img: string | { encoded: string } }) => {
  if (out.img && typeof out.img === "object") {
    out.img = out.img.encoded;
  }
};

export const getConfigCat = (id: number, config: Record<string, any>) => {
  return config[`category_${id}`];
};

const categoryTypes: Record<string, { title: string; color: string }> = {
  po: { title: "Программное обеспечение", color: "blue" },
  equipment: { title: "Оборудование", color: "#42b972" },
  services: { title: "Услуги", color: "magenta" },
};

export const getCategoryData = (type: string) => {
  return categoryTypes[type] ?? null;
};

export const getCategoryType = (name: string) => {
  const test = name.toLocaleLowerCase();
  return test.includes("программное") ? "po" : test.includes("работ") ? "services" : "equipment";
};

export const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export const resetApp = () => {
  return window.location.reload();
};

/**
 * format number
 * @param val
 * @returns
 */
export const formatNumber = (val: number) => new Intl.NumberFormat("ru-RU").format(val);

/**
 * rem to pix
 * @param rem
 * @returns
 */
export const remToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
