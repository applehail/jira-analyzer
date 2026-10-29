export interface DetailedMonthCalendar {
  monthIndex: number; // 0 — Январь, 11 — Декабрь
  monthName: string;
  totalDays: number;
  workDaysCount: number;
  weekendDaysCount: number;
  // Конкретные числа месяца, которые официально являются праздничными или перенесенными выходными
  holidayDates: number[]; 
}

export type DetailedFiveYearCalendar = Record<number, DetailedMonthCalendar[]>;

export const RU_DETAILED_CALENDAR: DetailedFiveYearCalendar = {
  2022: [
    { monthIndex: 0, monthName: 'Январь', totalDays: 31, workDaysCount: 16, weekendDaysCount: 15, holidayDates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 1, monthName: 'Февраль', totalDays: 28, workDaysCount: 19, weekendDaysCount: 9, holidayDates: [5, 6, 12, 13, 19, 20, 23, 26, 27] },
    { monthIndex: 2, monthName: 'Март', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [5, 6, 7, 8, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 3, monthName: 'Апрель', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [2, 3, 9, 10, 16, 17, 23, 24, 30] },
    { monthIndex: 4, monthName: 'Май', totalDays: 31, workDaysCount: 18, weekendDaysCount: 13, holidayDates: [1, 2, 3, 7, 8, 9, 10, 14, 15, 21, 22, 28, 29] },
    { monthIndex: 5, monthName: 'Июнь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [4, 5, 11, 12, 13, 18, 19, 25, 26] },
    { monthIndex: 6, monthName: 'Июль', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [2, 3, 9, 10, 16, 17, 23, 24, 30, 31] },
    { monthIndex: 7, monthName: 'Август', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [6, 7, 13, 14, 20, 21, 27, 28] },
    { monthIndex: 8, monthName: 'Сентябрь', totalDays: 30, workDaysCount: 22, weekendDaysCount: 8, holidayDates: [3, 4, 10, 11, 17, 18, 24, 25] },
    { monthIndex: 9, monthName: 'Октябрь', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 10, monthName: 'Ноябрь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [4, 5, 6, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 11, monthName: 'Декабрь', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [3, 4, 10, 11, 17, 18, 24, 25, 31] }
  ],
  2023: [
    { monthIndex: 0, monthName: 'Январь', totalDays: 31, workDaysCount: 17, weekendDaysCount: 14, holidayDates: [1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 21, 22, 28, 29] },
    { monthIndex: 1, monthName: 'Февраль', totalDays: 28, workDaysCount: 18, weekendDaysCount: 10, holidayDates: [4, 5, 11, 12, 18, 19, 23, 24, 25, 26] },
    { monthIndex: 2, monthName: 'Март', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [4, 5, 8, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 3, monthName: 'Апрель', totalDays: 30, workDaysCount: 20, weekendDaysCount: 10, holidayDates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 4, monthName: 'Май', totalDays: 31, workDaysCount: 19, weekendDaysCount: 12, holidayDates: [1, 6, 7, 8, 9, 13, 14, 20, 21, 27, 28] },
    { monthIndex: 5, monthName: 'Июнь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [3, 4, 10, 11, 12, 17, 18, 24, 25] },
    { monthIndex: 6, monthName: 'Июль', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 7, monthName: 'Август', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [5, 6, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 8, monthName: 'Сентябрь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [2, 3, 9, 10, 16, 17, 23, 24, 30] },
    { monthIndex: 9, monthName: 'Октябрь', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [1, 7, 8, 14, 15, 21, 22, 28, 29] },
    { monthIndex: 10, monthName: 'Ноябрь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [4, 5, 6, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 11, monthName: 'Декабрь', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [2, 3, 9, 10, 16, 17, 23, 24, 30, 31] }
  ],
  2024: [
    { monthIndex: 0, monthName: 'Январь', totalDays: 31, workDaysCount: 17, weekendDaysCount: 14, holidayDates: [1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 20, 21, 27, 28] },
    { monthIndex: 1, monthName: 'Февраль', totalDays: 29, workDaysCount: 20, weekendDaysCount: 9, holidayDates: [3, 4, 10, 11, 17, 18, 23, 24, 25] },
    { monthIndex: 2, monthName: 'Март', totalDays: 31, workDaysCount: 20, weekendDaysCount: 11, holidayDates: [2, 3, 8, 9, 10, 16, 17, 23, 24, 30, 31] },
    { monthIndex: 3, monthName: 'Апрель', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [6, 7, 13, 14, 20, 21, 28, 29, 30] },
    { monthIndex: 4, monthName: 'Май', totalDays: 31, workDaysCount: 20, weekendDaysCount: 11, holidayDates: [1, 4, 5, 9, 10, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 5, monthName: 'Июнь', totalDays: 30, workDaysCount: 19, weekendDaysCount: 11, holidayDates: [1, 2, 8, 9, 12, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 6, monthName: 'Июль', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [6, 7, 13, 14, 20, 21, 27, 28] },
    { monthIndex: 7, monthName: 'Август', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [3, 4, 10, 11, 17, 18, 24, 25, 31] },
    { monthIndex: 8, monthName: 'Сентябрь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [1, 7, 8, 14, 15, 21, 22, 28, 29] },
    { monthIndex: 9, monthName: 'Октябрь', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [5, 6, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 10, monthName: 'Ноябрь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [3, 4, 9, 10, 16, 17, 23, 24, 30] },
    { monthIndex: 11, monthName: 'Декабрь', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [1, 7, 8, 14, 15, 21, 22, 29, 30, 31] }
  ],
  2025: [
    { monthIndex: 0, monthName: 'Январь', totalDays: 31, workDaysCount: 17, weekendDaysCount: 14, holidayDates: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 1, monthName: 'Февраль', totalDays: 28, workDaysCount: 20, weekendDaysCount: 8, holidayDates: [1, 2, 8, 9, 15, 16, 22, 23] },
    { monthIndex: 2, monthName: 'Март', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 3, monthName: 'Апрель', totalDays: 30, workDaysCount: 22, weekendDaysCount: 8, holidayDates: [5, 6, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 4, monthName: 'Май', totalDays: 31, workDaysCount: 18, weekendDaysCount: 13, holidayDates: [1, 2, 3, 4, 9, 10, 11, 17, 18, 24, 25, 31] },
    { monthIndex: 5, monthName: 'Июнь', totalDays: 30, workDaysCount: 19, weekendDaysCount: 11, holidayDates: [1, 7, 8, 12, 13, 14, 15, 21, 22, 28, 29] },
    { monthIndex: 6, monthName: 'Июль', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [5, 6, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 7, monthName: 'Август', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [2, 3, 9, 10, 16, 17, 23, 24, 30, 31] },
    { monthIndex: 8, monthName: 'Сентябрь', totalDays: 30, workDaysCount: 22, weekendDaysCount: 8, holidayDates: [6, 7, 13, 14, 20, 21, 27, 28] },
    { monthIndex: 9, monthName: 'Октябрь', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [4, 5, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 10, monthName: 'Ноябрь', totalDays: 30, workDaysCount: 19, weekendDaysCount: 11, holidayDates: [1, 2, 3, 4, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 11, monthName: 'Декабрь', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [6, 7, 13, 14, 20, 21, 27, 28, 31] }
  ],
  2026: [
    { monthIndex: 0, monthName: 'Январь', totalDays: 31, workDaysCount: 15, weekendDaysCount: 16, holidayDates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 18, 24, 25, 31] },
    { monthIndex: 1, monthName: 'Февраль', totalDays: 28, workDaysCount: 19, weekendDaysCount: 9, holidayDates: [1, 7, 8, 14, 15, 21, 22, 23, 28] },
    { monthIndex: 2, monthName: 'Март', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [1, 7, 8, 9, 14, 15, 22, 23, 28, 29] },
    { monthIndex: 3, monthName: 'Апрель', totalDays: 30, workDaysCount: 22, weekendDaysCount: 8, holidayDates: [4, 5, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 4, monthName: 'Май', totalDays: 31, workDaysCount: 19, weekendDaysCount: 12, holidayDates: [1, 2, 3, 9, 10, 11, 16, 17, 23, 24, 30, 31] },
    { monthIndex: 5, monthName: 'Июнь', totalDays: 30, workDaysCount: 21, weekendDaysCount: 9, holidayDates: [6, 7, 12, 13, 14, 20, 21, 27, 28] },
    { monthIndex: 6, monthName: 'Июль', totalDays: 31, workDaysCount: 23, weekendDaysCount: 8, holidayDates: [4, 5, 11, 12, 18, 19, 25, 26] },
    { monthIndex: 7, monthName: 'Август', totalDays: 31, workDaysCount: 21, weekendDaysCount: 10, holidayDates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30] },
    { monthIndex: 8, monthName: 'Сентябрь', totalDays: 30, workDaysCount: 22, weekendDaysCount: 8, holidayDates: [5, 6, 12, 13, 19, 20, 26, 27] },
    { monthIndex: 9, monthName: 'Октябрь', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [3, 4, 10, 11, 17, 18, 24, 25, 31] },
    { monthIndex: 10, monthName: 'Ноябрь', totalDays: 30, workDaysCount: 20, weekendDaysCount: 10, holidayDates: [1, 4, 7, 8, 14, 15, 21, 22, 28, 29] },
    { monthIndex: 11, monthName: 'Декабрь', totalDays: 31, workDaysCount: 22, weekendDaysCount: 9, holidayDates: [5, 6, 12, 13, 19, 20, 26, 27, 31] }
  ]
};

/**
 * Функция-хелпер для получения массива месяцев под конкретный год.
 */
export function getCalendarByYear(year: number): DetailedMonthCalendar[] {
  return RU_DETAILED_CALENDAR[year] ?? [];
}
