import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("applications.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    experience TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/apply", (req, res) => {
    const { name, email, phone, experience, message } = req.body;
    
    try {
      const stmt = db.prepare(`
        INSERT INTO applications (name, email, phone, experience, message)
        VALUES (?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, phone, experience, message);

      // --- NOTIFICATION LOGIC ---
      // In a production environment, you would use a service like Nodemailer, SendGrid, or Mailgun.
      // For now, we are logging the notification to the server console as requested.
      console.log("==================================================");
      console.log(`NEW APPLICATION NOTIFICATION`);
      console.log(`RECIPIENT: Jamal.khann228836@gmail.com`);
      console.log(`SUBJECT: [Next Trade LLC] New Broker Application - ${name}`);
      console.log(`--------------------------------------------------`);
      console.log(`Candidate Details:`);
      console.log(`- Name: ${name}`);
      console.log(`- Email: ${email}`);
      console.log(`- Phone: ${phone}`);
      console.log(`- Experience: ${experience}`);
      console.log(`- Message: ${message}`);
      console.log("==================================================");
      // ---------------------------

      res.status(200).json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
