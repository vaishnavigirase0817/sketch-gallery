// ===== LOGIN FUNCTION =====
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Mock authentication
  if (username === "artist" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "gallery.html";
  } else {
    alert("Invalid credentials! Try Username: artist | Password: 1234");
  }
}

// ===== LOGOUT FUNCTION =====
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
}

// ===== CHECK LOGIN STATUS =====
if (window.location.pathname.includes("gallery.html") && !localStorage.getItem("isLoggedIn")) {
  window.location.href = "index.html";
}

// ===== INITIAL GALLERY =====
let drawings = JSON.parse(localStorage.getItem("drawings")) || [
  { title: "Mountain Landscape", image: "Mountain Landscape.webp" },
  { title: "Urban Scenery", image: "Urban Scenery.jpg" },
  { title: "Character Design", image: "Character Design.webp" },
  { title: "Abstract Doodle", image: "Abstract Doodle.webp" }
];

const drawingList = document.getElementById("drawing-list");

function renderGallery() {
  if (!drawingList) return;
  drawingList.innerHTML = "";
  drawings.forEach(drawing => {
    const div = document.createElement("div");
    div.classList.add("art");
    div.innerHTML = `
      <a href="${drawing.image}" data-lightbox="gallery" data-title="${drawing.title}">
        <img src="${drawing.image}" alt="${drawing.title}">
      </a>
      <div class="art-title">${drawing.title}</div>
    `;
    drawingList.appendChild(div);
  });
}

function uploadArt() {
  const fileInput = document.getElementById("uploadInput");
  const titleInput = document.getElementById("titleInput");
  const file = fileInput.files[0];
  const title = titleInput.value;

  if (!file || !title) {
    alert("Please select an image and enter a title.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    drawings.push({ title: title, image: e.target.result });
    localStorage.setItem("drawings", JSON.stringify(drawings));
    renderGallery();
    fileInput.value = "";
    titleInput.value = "";
  };
  reader.readAsDataURL(file);
}

renderGallery();