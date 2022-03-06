import { FetchWrapper } from "./utils/FetchWrapper.js";
import { StorageWrapper } from "./utils/StorageWrapper.js";

const jsonAPI = new FetchWrapper("https://jsonplaceholder.typicode.com"); // instance with base url
const storage = new StorageWrapper("local"); // localStorage
// const storage = new StorageWrapper("session"); // sesssionStorage

function getPosts() {
  if (storage.isSupported && !storage.get("posts")) {
    jsonAPI.get("/posts?&_limit=6").then((posts) => {
      storage.set("posts", posts);
      displayPosts(storage.get("posts"));
      console.log("Got posts from network");
    });
  } else {
    displayPosts(storage.get("posts"));
    console.log("Got posts from storage");
  }
}

function displayPosts(data) {
  const posts = document.getElementById("posts");
  posts.innerHTML = JSON.stringify(data, null, 3);
}

getPosts();
