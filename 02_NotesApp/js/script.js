
window.addEventListener("load", main);

function main() {

  const themeBtn = document.getElementById("theme-btn");
  const page = document.getElementById("page");
  const sidebar = document.getElementById("sidebar-wrapper");
  const menuBtn = document.getElementById("menu-btn");
  const subMenuBtn = document.getElementById("submenu-btn");
  const subMenu = document.getElementById("submenu");


  themeBtn.addEventListener("click", ()=>{
    page.classList.toggle('page_dark');
  });

  menuBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle('sidebar-wrapper_hidden');
    menuBtn.classList.toggle('button_active');
  });

  subMenuBtn.addEventListener("click", ()=>{
    subMenu.classList.toggle("main-menu__submenu_visible");
    subMenuBtn.classList.toggle("button_active");
    subMenuBtn.classList.toggle("submenu-btn_active");
  });

}
