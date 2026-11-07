const express = require("express");
const Scheme = require("../models/Scheme");

const router = express.Router();

const STOP_WORDS = new Set([
  "the", "a", "an", "for", "my", "with", "and", "or", "to",
  "of", "in", "on", "is", "are", "i", "me", "this", "that"
]);

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get("/", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
const express = require("express");
const Scheme = require("../models/Scheme");

const router = express.Router();

const STOP_WORDS = new Set([
  "the", "a", "an", "for", "my", "with", "and", "or", "to",
  "of", "in", "on", "is", "are", "i", "me", "this", "that"
]);

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get("/", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();

    console.log("🔍 Search request received:", q);

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Use regex search directly
    const words = q
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[^a-z0-9]/gi, ""))
      .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));

    console.log("📝 Search words:", words);

    let results = [];

    if (words.length > 0) {
      const regexes = words.map(
        (word) => new RegExp(escapeRegex(word), "i")
      );

      results = await Scheme.find({
        $or: regexes.flatMap((regex) => [
          { name: regex },
          { category: regex },
          { purpose: regex },
          { description: regex },
        ]),
      }).limit(10);
    }

    console.log("✅ Results found:", results.length);

    return res.json({
      success: true,
      count: results.length,
      results,
      message:
        results.length === 0
          ? "No matching schemes found"
          : "Matching schemes found",
    });

  } catch (error) {
    console.error("❌ Search failed:", error);

    return res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
});

module.exports = router;
    
      sort({ score: { $meta: "textScore" } })
      .limit(3);

    if (results.length === 0) {
      const words = q
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
        .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));

      if (words.length > 0) {
        const regexes = words.map(
          (word) => new RegExp(escapeRegex(word), "i")
        );

        results = await Scheme.find({
          $or: regexes.flatMap((regex) => [
            { name: regex },
            { category: regex },
            { purpose: regex },
            { description: regex },
          ]),
        }).limit(3);
      }
    }

    // A7: No-match handling
    if (results.length === 0) {
      return res.json({
        success: true,
        count: 0,
        results: [],
        message: "No matching schemes found",
      });
    }

    return res.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Search failed:", error);

    return res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
});

module.exports = router;