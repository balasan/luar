var hand, logo, main = null;

hand = document.getElementById("hand");
logo = document.getElementById("logo");
main = document.getElementById("main");

hand.onclick = function() {
  hand.classList.add('hidden');
  logo.classList.remove('hidden');
}

logo.onclick = function() {
  logo.classList.add('hidden');
  main.classList.remove('hidden');
}