import { FetchWrapper } from "./utils/FetchWrapper.js";
import { StorageWrapper } from "./utils/StorageWrapper.js";

const jsonAPI = new FetchWrapper("https://jsonplaceholder.typicode.com"); // instance with base url
const storage = new StorageWrapper("local"); // localStorage
// const storage = new StorageWrapper("session"); // sesssionStorage

if (storage.isSupported) {
  getPosts();
} else {
  alert("Storage is not supported");
}

function getPosts() {
  const posts = storage.get("posts");
  if (posts) {
    displayPosts(posts);
    console.log("Got posts from storage");
  } else {
    jsonAPI.get("/posts?&_limit=6").then((data) => {
      storage.set("posts", data);
      displayPosts(data);
      console.log("Got posts from network");
    });
  }
}

function displayPosts(data) {
  const posts = document.getElementById("posts");
  posts.innerHTML = JSON.stringify(data, null, 3);
}
