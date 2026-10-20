const express = require("express");
const router = express.Router();

const {
  createIncident,
  getMyIncidents,
  updateIncidentStatus,
  getIncidentHistory,
    assignIncident
} = require("../controllers/incidentcontroller");

const { protect,authorize } = require("../middleware/authMiddleware");
router.patch("/:id/assign", protect, authorize("admin"), assignIncident);

// Create an incident
router.post("/", protect, createIncident);

// Get incidents reported by the logged-in user
router.get(
  "/:id/history",
  protect,
  authorize("responder", "admin"),
  getIncidentHistory
);

// Update incident status
router.patch(
  "/:id/status",
  protect,
  authorize("responder", "admin"),
  updateIncidentStatus
);

// Get incident history
router.get("/:id/history", protect, getIncidentHistory);

module.exports = router;