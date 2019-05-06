export const required = (fieldName: string): any => {
  throw new Error(`${fieldName} is required`);
}
