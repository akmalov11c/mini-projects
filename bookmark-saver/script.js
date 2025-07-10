const saveButton = document.getElementById("save-bookmark");
const bookmarkList = document.getElementById("bookmark__list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);
saveButton.addEventListener("click", saveBookmark);

function saveBookmark() {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Please enter both name and URL.");
    return;
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    const bookmark = {
      name: name,
      url: url,
    };
    addBookmarkToList(bookmark);
    saveBookmarkToLocalStorage(bookmark);

    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
}

function addBookmarkToList(bookmark) {
  const listItem = document.createElement("li");
  const linkItem = document.createElement("a");

  linkItem.href = bookmark.url;
  linkItem.textContent = bookmark.name;
  linkItem.target = "_blank"; // Open in new tab

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    bookmarkList.removeChild(listItem);
    removeBookmarkFromLocalStorage(bookmark);
  });

  listItem.appendChild(linkItem);
  listItem.appendChild(deleteButton);
  bookmarkList.appendChild(listItem);
}

function getBookmarksFromLocalStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmarkToLocalStorage(bookmark) {
  const bookmarks = getBookmarksFromLocalStorage();
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromLocalStorage();
  bookmarks.forEach((bookmark) => {
    addBookmarkToList(bookmark);
  });
}

function removeBookmarkFromLocalStorage(bookmark) {
  let bookmarks = getBookmarksFromLocalStorage();
  bookmarks = bookmarks.filter((b) => b.url !== bookmark.url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
