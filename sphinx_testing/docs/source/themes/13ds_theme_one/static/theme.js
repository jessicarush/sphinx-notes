/**
 * Inserts the current year.
 *
 * This function will find all elements with the class "js-year"
 * and set it's text content to the current year.
 */
function currentYear() {
  const year = new Date().getFullYear();
  const yearEls = document.querySelectorAll('.js-year');
  for (let i = 0; i < yearEls.length; i++) {
    yearEls[i].textContent = year;
  }
}

/**
 * Toggle the sidebar
 */
function toggleSidebar() {
  const sidebar = document.getElementById('js-main-sidebar');
  const sidebar_mask = document.getElementById('js-sidebar-mask');
  sidebar.classList.toggle('main-sidebar--open');
  sidebar_mask.classList.toggle('sidebar-mask--open');

}

window.addEventListener('load', function() {
  if (document.querySelector('.js-year')) {
    currentYear();
  }
}, false);

window.addEventListener('click', function(e) {
  console.log(e.target);
  if (e.target.matches('#js-sidebar-menu-button') ||
      e.target.matches('#js-sidebar-mask') ||
      e.target.matches('#js-main-sidebar li a')) {
    toggleSidebar();
  }
}, false);
