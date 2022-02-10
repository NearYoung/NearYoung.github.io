window.onload = () => {
  // add `transitionend` listeners for updating classes and starting next move
  var layerDivs = document.querySelectorAll(".cube-layer");
  for (var i = 0; i < layerDivs.length; ++i) {
    layerDivs[i].addEventListener("transitionend", updateCubie, true);
    layerDivs[i].addEventListener("transitionend", nextMove, true);
  }
  // nextMove();
  drag();
};
