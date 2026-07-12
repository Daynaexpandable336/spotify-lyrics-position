// Minimal typings for the Spicetify APIs used by this extension.
export {};

declare global {
	interface Window {
		Spicetify?: typeof Spicetify;
	}

	namespace Spicetify {
		const Player: {
			data: any;
			addEventListener(type: string, callback: (event?: any) => void): void;
			getProgress(): number;
			seek(positionMs: number): void;
		};

		const CosmosAsync: {
			get(url: string, body?: any, headers?: any): Promise<any>;
		};

		const PopupModal: {
			display(options: { title: string; content: HTMLElement; isLarge?: boolean }): void;
			hide(): void;
		};

		namespace Menu {
			class Item {
				constructor(
					name: string,
					isEnabled: boolean,
					onClick: (item?: Item) => void,
					icon?: string,
				);
				register(): void;
				deregister(): void;
			}
		}

		interface BarButton {
			element?: HTMLElement;
			label: string;
			active: boolean;
		}

		const Playbar:
			| {
					Button: new (
						label: string,
						icon: string,
						onClick: () => void,
						disabled?: boolean,
						active?: boolean,
						registerOnCreate?: boolean,
					) => BarButton;
			  }
			| undefined;

		const Topbar:
			| {
					Button: new (
						label: string,
						icon: string,
						onClick: () => void,
						disabled?: boolean,
					) => BarButton;
			  }
			| undefined;

		const SVGIcons: Record<string, string> | undefined;

		const Locale:
			| {
					getLocale(): string;
			  }
			| undefined;

		function showNotification(message: string, isError?: boolean, msTimeout?: number): void;

		function colorExtractor(uri: string): Promise<Record<string, string>>;
	}
}
