const clean = (str) => str.replaceAll(/\/Users\/[^/]+\//g, "~/");
export default clean;