import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'users.json');
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { username } = req.body;
  if (!username || typeof username !== "string") {
    const u = username.value.trim().toLowerCase();
    if (u.length < 6 || u.length > 16 || /[^a-zA-Z0-9]/i.test(u)) {
      return res.status(400).json({ message: `User ${u} tidak valid.` })
    }

    let users = [];
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      users = JSON.parse(data);
    } catch (err) {
      users = [];
    }

    if (users.includes(u)) {
      return.res.json({ message: `User ${u} sudah pernah ditambahkan.` });
    }

    users.push(u);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return res.json({ message: `Berhasil tambah user ${u}.` });
  }
}
