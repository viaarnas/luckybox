const username = document.getElementById("username");
const tambah = document.getElementById("tambah");
const notif = document.getElementById("notif");

function validUser() {
  username.value = username.value.replace(/[^a-zA-Z0-9]/g, "");
  tambah.disabled = username.value.length < 6 || username.value.length > 16;
}

function showNotif(message) {
  notif.textContent = message;
  setTimeout(function(){
    notif.textContent = "";
  }, 1000);
}

async function tambahUser() {
  let list = JSON.parse(localStorage.getItem("listUser") || "[]");
  const u = username.value.trim();

  try {
    const res = await fetch("api/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u})
    });
  const data = await res.json();
  showNotif(data.message);
  } catch (err) {
    swowNotif("Gagal menghubungi server.");
  }
}

username.addEventListener("input", validUser);
tambah.addEventListener("click", function(e) {
  e.preventDefault();
  tambahUser();
  username.value = "";
  validUser();
});

username.addEventListener("keydown", function(e) {
  if (e.key === "Enter"){
    tambah.click();
    e.preventDefault();
  }
});











