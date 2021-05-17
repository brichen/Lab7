// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let entryNum = 0;
  setState({name:"home"}, false);
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = entryNum++;
        newPost.addEventListener("click", () => {
          setState({name: "entry", id: newPost.id}, false);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

let settings = document.querySelector("[alt=settings]");
settings.addEventListener("click", () => {
  setState({name:"settings"}, false);
});

let home = document.querySelector("h1");
home.addEventListener("click", () => {
  setState({name:"home"}, false);
});

window.addEventListener("popstate", (event) => { 
  setState(event.state, true);
});