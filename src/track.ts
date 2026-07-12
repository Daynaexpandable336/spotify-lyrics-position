export interface TrackInfo {
	uri: string;
	title: string;
	artist: string;
	album: string;
	durationMs: number;
}

export function getTrackInfo(): TrackInfo | null {
	const data = Spicetify.Player.data;
	const item = data?.item ?? data?.track;
	if (!item) return null;
	const meta = item.metadata ?? {};
	return {
		uri: item.uri ?? "",
		title: meta.title ?? item.name ?? "",
		artist: meta.artist_name ?? item.artists?.map((a: any) => a.name).join(", ") ?? "",
		album: meta.album_title ?? item.album?.name ?? "",
		durationMs: Number(meta.duration ?? item.duration?.milliseconds ?? 0),
	};
}
