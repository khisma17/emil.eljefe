// Карта

var map = document.querySelector(".main__map");

if (map !== null) {
  ymaps.ready(init);
  function init() {
  var myMap = new ymaps.Map("yandex-map", {
    center: [59.938635, 30.323118],
    zoom: 17
  })
}
}
