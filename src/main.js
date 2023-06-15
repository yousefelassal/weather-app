import './style.css'
import Dashboard from './views/Dashboard.js';
import Service from './views/Service.js';

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
      {path: "/", view: Dashboard},
      {path: "/service", view: Service},
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