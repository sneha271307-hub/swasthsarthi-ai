const express = require("express");
const Scheme = require("../models/Scheme");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchText = q.trim();

    const results = await Scheme.find(
      {
        $text: {
          $search: searchText,
        },
      },
      {
        score: {
          $meta: "textScore",
        },
      }
    )
      .sort({
        score: {
          $meta: "textScore",
        },
      })
      .limit(3);

    res.json({
      success: true,
      query: searchText,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Search error:", error.message);

    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
});

module.exports = router;