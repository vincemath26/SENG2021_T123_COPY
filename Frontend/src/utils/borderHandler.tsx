export class BorderHandler {
	static setBorderState(state: boolean): void {
		localStorage.setItem("borderSetting", state.toString());
		console.log(state.toString());
	}

	static getBorderState(): boolean {
		try {
			return (localStorage.getItem("borderSetting")?.toLocaleLowerCase?.() === "true");
		} catch {
			return false;
		}
	}

	/**
	 * Sets a border on a given HTML element.
	 *
	 * @param element - webpage element to adjust
	 * @returns true/false on success/failure
	 */
	static enableBorder(element: HTMLElement): boolean {
		try {
			element.style.border = "4px solid #000000";
		} catch {
			return false;
		}
		return true;
	}

	/**
	 * Removes a border from a given HTML element.
	 *
	 * @param element - webpage element to adjust
	 * @returns true/false on success/failure
	 */
	static disableBorder(element: HTMLElement): boolean {
		try {
			element.style.border = "none";
		} catch {
			return false;
		}
		return true;
	}

	static enableAllButtonBorders() {
		console.log("borders enabled!");
		if (typeof window !== "undefined") {
			document.getElementsByName("Button").forEach((element) => {
				BorderHandler.enableBorder(element);
				console.log(element);
			});
		}
	}

	static disableAllButtonBorders() {
		console.log("borders disabled!");
		if (typeof window !== "undefined") {
			document.getElementsByName("Button").forEach((element) => {
				BorderHandler.disableBorder(element);
				console.log(element);
			});
		}
	}

	static autoSetBorders(state: boolean) {
		// if (typeof window !== "undefined") {
		if (state === true) {
			BorderHandler.enableAllButtonBorders();
		} else {
			BorderHandler.disableAllButtonBorders();
		}
		// }
	}
}
