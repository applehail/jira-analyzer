// import "@fontsource/inter/cyrillic-400.css";
// import "@fontsource/inter/cyrillic-700.css";

import { consoleWelcome } from "./libs/common";
import "./index.css";

Promise.all([import("@/providers"), import("@/app/app")]).then(([{ default: render }, { default: App }]) => {
  render(App);
});

// welcome in the console
consoleWelcome();
