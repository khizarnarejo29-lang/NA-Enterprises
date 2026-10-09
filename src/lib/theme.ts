/** localStorage key for the visitor's explicit theme choice ("light" | "dark"; absent = system). */
export const THEME_KEY = "theme";

/**
 * Runs before first paint (inlined in <head>) so a saved theme never flashes
 * the wrong colours. Kept tiny and dependency-free on purpose.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
