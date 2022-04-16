import { raw } from "suretype";

export function never() {
  return raw({ not: {} });
}
