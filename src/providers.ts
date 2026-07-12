import { t } from "./i18n";
import { LOG, LyricsResult, SyncedLine } from "./store";
import { TrackInfo } from "./track";

export function parseLRC(text: string): SyncedLine[] | null {
	const out: SyncedLine[] = [];
	for (const raw of String(text).split(/\r?\n/)) {
		const stamps = [...raw.matchAll(/\[(\d+):(\d+)(?:[.:](\d+))?\]/g)];
		if (!stamps.length) continue;
		const content = raw.replace(/\[[^\]]*\]/g, "").trim();
		for (const m of stamps) {
			const frac = m[3] ? Number(m[3].padEnd(3, "0").slice(0, 3)) : 0;
			out.push({ time: Number(m[1]) * 60000 + Number(m[2]) * 1000 + frac, text: content });
		}
	}
	out.sort((a, b) => a.time - b.time);
	return out.length ? out : null;
}

/** Official Spotify lyrics via the same internal API lyrics-plus uses. */
export async function fetchSpotify(
	track: TrackInfo,
	errors: string[],
): Promise<LyricsResult | null> {
	const id = track.uri.startsWith("spotify:track:") ? track.uri.split(":")[2] : null;
	if (!id) {
		errors.push(`Spotify: ${t("errNoTrackId")}`);
		return null;
	}
	let res: any;
	try {
		res = await Spicetify.CosmosAsync.get(
			`https://spclient.wg.spotify.com/color-lyrics/v2/track/${id}?format=json&vocalRemoval=false&market=from_token`,
		);
	} catch (e: any) {
		errors.push(`Spotify: ${e?.status ?? e?.code ?? e?.message ?? "error"}`);
		console.warn(LOG, "Spotify lyrics failed:", e);
		return null;
	}
	const lyrics = res?.lyrics;
	if (!lyrics?.lines?.length) {
		errors.push(`Spotify: ${t("errNoLyrics")}`);
		return null;
	}
	if (lyrics.syncType === "LINE_SYNCED") {
		return {
			synced: lyrics.lines
				.map((l: any) => ({ time: Number(l.startTimeMs), text: l.words ?? "" }))
				.filter((l: SyncedLine) => l.text !== ""),
			source: "Spotify",
		};
	}
	return { plain: lyrics.lines.map((l: any) => l.words ?? "").join("\n"), source: "Spotify" };
}

/** LRCLIB (free, no auth). */
export async function fetchLRCLIB(
	track: TrackInfo,
	errors: string[],
): Promise<LyricsResult | null> {
	const headers = { "x-user-agent": "spicetify-lyrics-position" };
	let data: any = null;
	try {
		const p = new URLSearchParams({ track_name: track.title, artist_name: track.artist });
		if (track.album) p.set("album_name", track.album);
		if (track.durationMs) p.set("duration", String(Math.round(track.durationMs / 1000)));
		const r = await fetch("https://lrclib.net/api/get?" + p.toString(), { headers });
		if (r.ok) data = await r.json();
	} catch (e) {
		console.warn(LOG, "LRCLIB get failed:", e);
	}
	if (!data) {
		try {
			const p = new URLSearchParams({ track_name: track.title, artist_name: track.artist });
			const r = await fetch("https://lrclib.net/api/search?" + p.toString(), { headers });
			if (r.ok) {
				const arr: any[] = (await r.json()) ?? [];
				data = arr.find((x) => x.syncedLyrics) ?? arr.find((x) => x.plainLyrics) ?? null;
			}
		} catch (e) {
			console.warn(LOG, "LRCLIB search failed:", e);
			errors.push(`LRCLIB: ${t("errNetwork")}`);
			return null;
		}
	}
	if (!data) {
		errors.push(`LRCLIB: ${t("errNotFound")}`);
		return null;
	}
	if (data.instrumental) return { plain: t("msgInstrumental"), source: "LRCLIB" };
	if (data.syncedLyrics) {
		const synced = parseLRC(data.syncedLyrics);
		if (synced) return { synced, source: "LRCLIB" };
	}
	if (data.plainLyrics) return { plain: data.plainLyrics, source: "LRCLIB" };
	errors.push(`LRCLIB: ${t("errNoLyrics")}`);
	return null;
}
