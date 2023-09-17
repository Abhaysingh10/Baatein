function changeBackground() {
  console.log("Clicked");
}
function enlarger() {
  const hamburgerIcon = document.getElementsByClassName("hamburger-icon");
  console.log("loaded");
  console.log(hamburgerIcon);
  hamburgerIcon[0].addEventListener("click", changeBackground);
}

setTimeout(enlarger, 2000);
