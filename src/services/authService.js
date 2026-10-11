const ACCOUNTS_KEY = "shoppy_accounts";
const SESSION_KEY = "shoppy_user";
const PASSWORD_ITERATIONS = 210000;

function getLocalStorage() {
    try {
        return window.localStorage;
    } catch {
        throw new Error("Browser storage is unavailable. Enable local storage and try again.");
    }
}

function readAccounts() {
    const storedAccounts = getLocalStorage().getItem(ACCOUNTS_KEY);
    if (!storedAccounts) return [];

    let accounts;
    try {
        accounts = JSON.parse(storedAccounts);
    } catch {
        throw new Error("Saved account data is invalid. Clear this site's account data and register again.");
    }

    if (
        !Array.isArray(accounts) ||
        !accounts.every(
            (account) =>
                account &&
                typeof account.id === "string" &&
                typeof account.email === "string" &&
                typeof account.username === "string" &&
                typeof account.passwordSalt === "string" &&
                /^[0-9a-f]{32}$/i.test(account.passwordSalt) &&
                typeof account.passwordHash === "string" &&
                /^[0-9a-f]{64}$/i.test(account.passwordHash) &&
                account.name &&
                typeof account.name.firstname === "string" &&
                typeof account.name.lastname === "string",
        )
    ) {
        throw new Error("Saved account data is invalid. Clear this site's account data and register again.");
    }

    return accounts;
}

function toHex(buffer) {
    return Array.from(new Uint8Array(buffer), (byte) =>
        byte.toString(16).padStart(2, "0"),
    ).join("");
}

function fromHex(value) {
    const bytes = new Uint8Array(value.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
    return bytes;
}

async function hashPassword(password, salt) {
    if (!globalThis.crypto?.subtle) {
        throw new Error("Secure password hashing is unavailable in this browser. Use a modern browser over HTTPS.");
    }

    const key = await globalThis.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"],
    );

    return globalThis.crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations: PASSWORD_ITERATIONS,
            hash: "SHA-256",
        },
        key,
        256,
    );
}

function makeUser(account) {
    return {
        id: account.id,
        email: account.email,
        username: account.username,
        name: account.name,
    };
}

export function readSession() {
    const storedSession = getLocalStorage().getItem(SESSION_KEY);
    if (!storedSession) return null;

    let session;
    try {
        session = JSON.parse(storedSession);
    } catch {
        throw new Error("Saved sign-in data is invalid. Sign in again.");
    }

    if (
        !session ||
        typeof session.id !== "string" ||
        typeof session.email !== "string" ||
        typeof session.username !== "string"
    ) {
        throw new Error("Saved sign-in data is invalid. Sign in again.");
    }

    return session;
}

export async function registerLocalUser({ firstName, lastName, email, password }) {
    if (
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        throw new Error("Complete all registration fields and try again.");
    }

    if (!firstName.trim() || !lastName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        throw new Error("Enter your name and a valid email address.");
    }

    if (password.length < 8 || password.length > 128) {
        throw new Error("Password must be between 8 and 128 characters.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readAccounts();

    if (accounts.some((account) => account.email === normalizedEmail)) {
        throw new Error("An account with this email already exists. Sign in instead.");
    }

    if (!globalThis.crypto?.getRandomValues) {
        throw new Error("Secure account creation is unavailable in this browser. Use a modern browser over HTTPS.");
    }

    const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
    const passwordHash = await hashPassword(password, salt);
    const account = {
        id: globalThis.crypto.randomUUID(),
        email: normalizedEmail,
        username: firstName.trim(),
        name: {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
        },
        passwordSalt: toHex(salt),
        passwordHash: toHex(passwordHash),
    };

    try {
        getLocalStorage().setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    } catch {
        throw new Error("Could not save this account in browser storage. Check available storage and try again.");
    }

    return makeUser(account);
}

export async function loginLocalUser(email, password) {
    if (typeof email !== "string" || typeof password !== "string" || !password) {
        throw new Error("Enter your email and password.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const account = readAccounts().find((item) => item.email === normalizedEmail);

    if (!account) {
        throw new Error("Email or password is incorrect.");
    }

    const actualHash = new Uint8Array(
        await hashPassword(password, fromHex(account.passwordSalt)),
    );
    const expectedHash = fromHex(account.passwordHash);

    let difference = actualHash.length ^ expectedHash.length;
    for (let index = 0; index < Math.max(actualHash.length, expectedHash.length); index += 1) {
        difference |= (actualHash[index] || 0) ^ (expectedHash[index] || 0);
    }

    if (difference !== 0) {
        throw new Error("Email or password is incorrect.");
    }

    return makeUser(account);
}

export function saveSession(user) {
    try {
        getLocalStorage().setItem(SESSION_KEY, JSON.stringify(user));
    } catch {
        throw new Error("Could not save your sign-in state in browser storage. Check available storage and try again.");
    }
}

export function clearSession() {
    try {
        getLocalStorage().removeItem(SESSION_KEY);
    } catch {
        throw new Error("Could not clear your sign-in state from browser storage.");
    }
}
