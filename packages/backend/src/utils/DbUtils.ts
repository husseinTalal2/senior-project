export function stringToNumber(str: string | undefined): number {
  if (str === undefined || isNaN(parseInt(str))) {
    throw new Error("Not a number");
  }
  return parseInt(str);
}
