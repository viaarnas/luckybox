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

function tambahUser() {
  let list = JSON.parse(localStorage.getItem("listUser") || "[]");
  const u = username.value.trim();
  if (tambah.disabled) return;
  if (u.length < 6 || u.length > 16) {
    showNotif("User " + u + " tidak valid.");
    return;
  }
  if (/[^a-zA-Z0-9]/.test(u)) {
    showNotif("User " + u + " tidak valid.");
    return;
  }
  if (list.includes(u.toLowerCase())) {
    showNotif("User " + u + " sudah pernah ditambahkan.");
    return;
  }
  else {
    list.push(u.toLowerCase());
    localStorage.setItem("listUser", JSON.stringify(list));
    showNotif("Berhasil tambah user " + u + ".")
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











