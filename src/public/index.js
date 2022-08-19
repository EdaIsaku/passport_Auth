const buttons = document.querySelectorAll(".btn_container");

for (let [key, val] of Object.entries(buttons)) {
  val.addEventListener("click", (ev) => ev.preventDefault());
}
