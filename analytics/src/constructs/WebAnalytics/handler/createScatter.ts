import { config } from "./config";

export function createScatter() {
  return Math.floor(Math.random() * config.maxScatter);
}
