import { t } from "./i18n";
import { toggleMode } from "./modes";
import { openSettings } from "./settings-ui";
import { LOG, store } from "./store";

let barButton: Spicetify.BarButton | null = null;
let menuItem: Spicetify.Menu.Item | null = null;

export function updateButton() {
	if (!barButton) return;
	try {
		barButton.active = store.cfg.mode !== "off";
		// While the official button is hooked, our own button is redundant and
		// having two identical mic icons side by side is confusing — hide it.
		if (barButton.element) barButton.element.style.display = store.cfg.hookOfficial ? "none" : "";
	} catch {}
}

function registerMenuItem() {
	try {
		menuItem = new Spicetify.Menu.Item(t("setTitle"), false, () => openSettings());
		menuItem.register();
	} catch (e) {
		console.warn(LOG, "menu item registration failed:", e);
	}
}

export function registerButtons() {
	try {
		if (Spicetify.Playbar?.Button) {
			barButton = new Spicetify.Playbar.Button(
				t("barLabel"),
				"lyrics",
				toggleMode,
				false,
				store.cfg.mode !== "off",
			);
		} else if (Spicetify.Topbar?.Button) {
			barButton = new Spicetify.Topbar.Button(
				t("barLabel"),
				`<svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">${Spicetify.SVGIcons?.lyrics ?? ""}</svg>`,
				toggleMode,
			);
		}
		barButton?.element?.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			openSettings();
		});
	} catch (e) {
		console.warn(LOG, "button registration failed:", e);
	}
	registerMenuItem();
}

/** Re-apply translated labels after a language change (best effort). */
export function refreshUiLanguage() {
	try {
		menuItem?.deregister();
	} catch {}
	registerMenuItem();
	try {
		if (barButton) barButton.label = t("barLabel");
	} catch {}
}

/** Hijack the official lyrics button so it toggles our display instead. */
export function hookOfficialLyricsButton() {
	const SEL = '[data-testid="lyrics-button"], [data-testid="control-button-lyrics"]';
	document.addEventListener(
		"click",
		(e) => {
			if (!store.cfg.hookOfficial) return;
			if (!(e.target as HTMLElement | null)?.closest?.(SEL)) return;
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			toggleMode();
		},
		true,
	);
	document.addEventListener(
		"contextmenu",
		(e) => {
			if (!(e.target as HTMLElement | null)?.closest?.(SEL)) return;
			e.preventDefault();
			e.stopPropagation();
			openSettings();
		},
		true,
	);
}
