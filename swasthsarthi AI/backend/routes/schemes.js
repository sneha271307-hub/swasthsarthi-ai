const express = require("express");
const Scheme = require("../models/Scheme");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    res.json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    console.error("Get scheme failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get scheme",
    });
  }
});

module.exports = router;