
window.addEventListener("load", main);

function main() {
  function setSizes() {
    console.log(screen.width, screen.height);
    page.style.width = screen.width + "px";
    page.style.height = screen.height + "px";
  }

  const themeBtn = document.getElementById("theme-btn");
  const page = document.getElementById("page");
  const sidebar = document.getElementById("sidebar-wrapper");
  const menuBtn = document.getElementById("menu-btn");
  body = document.getElementsByTagName("body")[0];

  themeBtn.addEventListener("click", ()=>{
    page.classList.toggle('page_dark');
  });

  menuBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle('sidebar-wrapper_hidden');
  });

  // setSizes();

  // window.addEventListener("resize", setSizes);
}
