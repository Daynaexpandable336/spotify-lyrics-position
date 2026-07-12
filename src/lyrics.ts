import { t } from "./i18n";
import { fetchLRCLIB, fetchSpotify } from "./providers";
import { applyColors, renderLyrics } from "./render";
import { LOG, LyricsResult, store } from "./store";
import { getTrackInfo } from "./track";

let lastUri: string | null = null;

function setNone(errors: string[]) {
	store.lyrics = { status: "none", synced: null, plain: null, source: "", errors };
	renderLyrics();
}

export async function loadLyrics(force = false) {
	const track = getTrackInfo();

	// Skip refetch on repeat plays and duplicate songchange events.
	if (!force && track?.uri && track.uri === lastUri && store.lyrics.status === "ok") return;
	lastUri = track?.uri ?? null;

	const my = ++store.fetchToken;
	store.lyrics = { status: "loading", synced: null, plain: null, source: "", errors: [] };
	renderLyrics();

	if (!track?.title) {
		setNone([t("msgNoTrack")]);
		return;
	}
	if (track.uri.includes(":episode:") || track.uri.includes(":ad:")) {
		setNone([t("msgUnsupported")]);
		return;
	}

	console.log(LOG, "fetching lyrics for:", track.title, "-", track.artist);

	const cfg = store.cfg;
	const errors: string[] = [];
	let a: LyricsResult | null = null;
	let b: LyricsResult | null = null;
	if (cfg.provider !== "lrclib") a = await fetchSpotify(track, errors);
	if (my !== store.fetchToken) return;
	if (cfg.provider !== "spotify" && !a?.synced) b = await fetchLRCLIB(track, errors);
	if (my !== store.fetchToken) return;

	// Prefer synced lyrics from either provider.
	const pick = (a?.synced && a) || (b?.synced && b) || a || b;
	store.lyrics = pick
		? {
				status: "ok",
				synced: pick.synced ?? null,
				plain: pick.plain ?? null,
				source: pick.source,
				errors,
			}
		: { status: "none", synced: null, plain: null, source: "", errors };
	if (!pick) console.warn(LOG, "no lyrics found:", errors.join(" / "));
	renderLyrics();
}

let colorToken = 0;

/** Extract the album color; the token guard keeps only the newest track's color. */
export async function updateColors() {
	const my = ++colorToken;
	const track = getTrackInfo();
	let colors: { bg: string } | null = null;
	if (track?.uri && Spicetify.colorExtractor) {
		try {
			const c = await Spicetify.colorExtractor(track.uri);
			const bg = c?.VIBRANT_NON_ALARMING ?? c?.VIBRANT ?? c?.DARK_VIBRANT ?? c?.PROMINENT;
			if (bg) colors = { bg };
		} catch (e) {
			console.warn(LOG, "colorExtractor failed:", e);
		}
	}
	if (my !== colorToken) return;
	store.colors = colors;
	applyColors();
}
