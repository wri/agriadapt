export interface Output {
    type: 'number' | 'string';
    suffix?: string;
    prefix?: string;
  }

export const average = (
    arr: number[],
    valueMap: Record<string, string>,
    { type, prefix, suffix: s }: Output
  ) => {
    let suffix = s;
    let avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    if (suffix?.includes('minutes')) {
      // Convert time
      if (avg > 30 * 24 * 60) {
        // months
        avg /= 30 * 24 * 60;
        suffix = ' m';
      } else if (avg > 24 * 60) {
        // days
        avg /= 24 * 60;
        suffix = ' d';
      } else {
        // hours
        avg /= 60;
        suffix = ' h';
      }
    }
    let num = avg.toFixed(2);

    if (suffix) num = +num + suffix;
    if (prefix) num = prefix + +num;
    if (type === 'number' || !valueMap) return num;
    else return valueMap[Math.round(avg)];
  };