const toggleTheme = (theme) => {
  if (theme) {
    document.documentElement.style.setProperty("--bodyColor", "#fff");
    document.documentElement.style.setProperty("--backgroundColor", "#0d1117");
  } else {
    document.documentElement.style.setProperty("--bodyColor", "#0d1117");
    document.documentElement.style.setProperty("--backgroundColor", "#fff");
  }
};

export default toggleTheme;
