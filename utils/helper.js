import path from "path";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export function generateUniqueName(prefix) {
    return `${prefix}-${Date.now()}`;
}

export function resolveTestDataFile(fileName) {
    return path.join(currentDir, "..", "test-data", fileName);
}
