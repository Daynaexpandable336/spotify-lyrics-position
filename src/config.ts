import { DEFAULTS, store } from "./store";

const STORAGE_KEY = "lyrics-position:settings";

export function loadCfg() {
	let saved: Partial<typeof DEFAULTS> = {};
	try {
		saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
	} catch {}
	store.cfg = {
		...DEFAULTS,
		...saved,
		popup: { ...DEFAULTS.popup, ...(saved.popup ?? {}) },
		win: { ...DEFAULTS.win, ...(saved.win ?? {}) },
	};
	return store.cfg;
}

/** Restore factory defaults (persisted immediately). */
export function resetCfg() {
	store.cfg = structuredClone(DEFAULTS);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(store.cfg));
	return store.cfg;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function saveCfg() {
	if (saveTimer) clearTimeout(saveTimer);
	saveTimer = setTimeout(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(store.cfg));
	}, 200);
}
