import './style.css'
import Dashboard from './views/Dashboard.js';
import Saved from './views/Saved.js';
import Four0Four from './views/Four0Four.js';
import Settings from './views/Settings.js';

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
      {path: "/", view: Dashboard},
      {path: "/saved", view: Saved},
      {path: "/settings", view: Settings},
  ];

  const potentialMatches = routes.map((route) => {
      return {
          route: route,
          isMatch: location.pathname === route.path,
      }
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
      match = {
          route: {view: Four0Four},
          isMatch: true,
      };
  };

  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();
  await view.getJs();

};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
      if (event.target.matches("[data-link]")) {
          event.preventDefault();
          navigateTo(event.target.href);
      }
  });

  router();
});

let items = document.querySelectorAll(".item");

items.forEach(item=>{
  item.addEventListener("click", (event)=>{
    items.forEach(item=>{ 
      item.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
  });
});