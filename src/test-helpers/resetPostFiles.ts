import mockFs from "mock-fs";

export function resetPostFiles() {
  mockFs.restore();
}
