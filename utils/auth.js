import fs from "fs";
import path from "path";

import { AUTH_FILE } from "./constants.js";

export function ensureAuthDirectory() {
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
}

export function authFileExists() {
    return fs.existsSync(AUTH_FILE);
}

export async function saveAuthState(context) {
    ensureAuthDirectory();
    await context.storageState({ path: AUTH_FILE });
}
