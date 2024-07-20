import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePersistedState = (key, defaultValue) => {
	// Retrieve the value from the cookie storage or use the default value
	const storedValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
	const [value, setValue] = useState(storedValue);

	useEffect(() => {
		// Save the value to the cookie storage whenever it changes
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const isFormCompleted = () => {
	const formStatus = localStorage.getItem("formCompleted");
	return formStatus === "true";
};

export const setFormCompleted = () => {
	localStorage.setItem("formCompleted", "true");
};

export const capitalize = (value) => {
	if (typeof value !== "string" || value.length === 0) return value;

	return value.charAt(0) + value.slice(1).toLowerCase();
};

export const toCurrency = (number, country = "en-NG") => {
	const formatter = new Intl.NumberFormat(country, {
		style: "currency",
		currency: country === "en-NG" ? "NGN" : "GBP",
	});

	return formatter.format(number).split(".00")[0];
};

export const useResetScrollPosition = () => {
	const location = useLocation();

	useEffect(() => {
		// Reset the scroll position to the top of the page
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return null;
};

export const decodeToken = (token) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};
