
import { useState, useMemo } from 'react';

interface UseDateFilterProps<T> {
  data: T[];
  dateField: keyof T;
}

export const useDateFilter = <T>({ data, dateField }: UseDateFilterProps<T>) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const filteredData = useMemo(() => {
    if (!startDate && !endDate) {
      return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item[dateField] as string);
      
      if (startDate && endDate) {
        return itemDate >= startDate && itemDate <= endDate;
      } else if (startDate) {
        return itemDate >= startDate;
      } else if (endDate) {
        return itemDate <= endDate;
      }
      
      return true;
    });
  }, [data, startDate, endDate, dateField]);

  const clearDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filteredData,
    clearDateFilter,
    hasDateFilter: !!(startDate || endDate),
  };
};
