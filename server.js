const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/time-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const Log = mongoose.model('Log', new mongoose.Schema({
  url: String,
  duration: Number,
  timestamp: Date
}));

// classification map
const categories = {
  "github.com": "productive",
  "stackoverflow.com": "productive",
  "chat.openai.com": "productive",
  "youtube.com": "unproductive",
  "instagram.com": "unproductive",
  "hotstar.com": "unproductive"
};

app.post('/api/track', async (req, res) => {
  const { url, duration, timestamp } = req.body;
  if (!url || !duration) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const log = new Log({ url, duration, timestamp: new Date(timestamp) });
    await log.save();
    res.status(200).json({ message: "Saved" });
  } catch (err) {
    console.error("❌ Error saving to DB:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const logs = await Log.find({});
    const grouped = {};

    logs.forEach(log => {
      try {
        const domain = new URL(log.url).hostname.replace("www.", "");
        if (!grouped[domain]) grouped[domain] = { totalDuration: 0, type: categories[domain] || "neutral" };
        grouped[domain].totalDuration += log.duration;
      } catch (e) {
        console.warn("⚠️ Skipping invalid URL:", log.url);
      }
    });

    const result = Object.entries(grouped).map(([domain, obj]) => ({
      domain,
      totalDuration: obj.totalDuration,
      type: obj.type
    }));

    res.json(result);
  } catch (err) {
    console.error("❌ Error fetching analytics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
