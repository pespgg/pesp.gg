import { digest } from "ohash";

export { z } from "zod";

export const hash = (string: string, salt?: string) => {
  return digest(salt ? string + salt : string);
};
