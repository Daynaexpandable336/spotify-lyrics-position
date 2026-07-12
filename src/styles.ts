import CSS from "./styles.css";

export function injectStyles(doc: Document = document, extra = ""): HTMLStyleElement {
	const el = doc.createElement("style");
	el.className = "lyrics-position-css";
	el.textContent = CSS + extra;
	doc.head.appendChild(el);
	return el;
}
