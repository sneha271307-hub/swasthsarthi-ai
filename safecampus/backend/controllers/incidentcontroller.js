const Incident = require("../models/Incident");
const IncidentEvent = require("../models/IncidentEvent");
const User = require("../models/User");
// Create a new incident report
exports.createIncident = async (req, res) => {
  try {
    const { category, description, location, urgency } = req.body;

    if (!category || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Category, description, and location are required"
      });
    }

    const allowedCategories = [
      "medical",
      "fire",
      "security",
      "hazard",
      "other"
    ];

    const allowedUrgencies = ["low", "medium", "high", "urgent"];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident category"
      });
    }

    if (
      typeof description !== "string" ||
      typeof location !== "string" ||
      !description.trim() ||
      !location.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Description and location must be valid text"
      });
    }

    if (urgency && !allowedUrgencies.includes(urgency)) {
      return res.status(400).json({
        success: false,
        message: "Invalid urgency level"
      });
    }

    const incident = await Incident.create({
      reporterId: req.user.id,
      category,
      description: description.trim(),
      location: location.trim(),
      urgency: urgency || "medium"
    });

    await IncidentEvent.create({
      incidentId: incident._id,
      actorId: req.user.id,
      eventType: "incident_reported",
      details: "Incident report created"
    });
    const io = req.app.get("io");

if (io) {
  io.to(`incident_${incident._id}`).emit("incidentAssigned", {
    incidentId: incident._id,
    responderId: responder._id,
    responderName: responder.name,
    status: incident.status,
    message: "A responder has been assigned to this incident"
  });
}
if (io) {
  io.to(`user_${responder._id}`).emit("newIncidentAssignment", {
    incidentId: incident._id,
    category: incident.category,
    description: incident.description,
    location: incident.location,
    urgency: incident.urgency,
    status: incident.status,
    message: "A new incident has been assigned to you"
  });
}
  
    return res.status(201).json({
      success: true,
      message: "Incident reported successfully",
      incident
    });
  } catch (error) {
    console.error("Create incident error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create incident"
    });
  }
};

// Get incidents reported by the logged-in user
exports.getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      reporterId: req.user.id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: incidents.length,
      incidents
    });
  } catch (error) {
    console.error("Get incidents error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve incidents"
    });
  }
};
// Update incident status
exports.updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = [
      "reported",
      "assessed",
      "assigned",
      "acknowledged",
      "resolved"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident status"
      });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    incident.status = status;
    await incident.save();
    const io = req.app.get("io");

if (io) {
  io.to(`incident_${incident._id}`).emit("incidentStatusUpdated", {
    incidentId: incident._id,
    status: incident.status,
    message: `Incident status updated to ${incident.status}`
  });
}

    await IncidentEvent.create({
      incidentId: incident._id,
      actorId: req.user.id,
      eventType: "status_updated",
      details: `Incident status changed to ${status}`
    });

    return res.status(200).json({
      success: true,
      message: "Incident status updated successfully",
      incident
    });
  } catch (error) {
    console.error("Update incident status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update incident status"
    });
  }
};
// Get the event history of an incident
exports.getIncidentHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    const events = await IncidentEvent.find({
      incidentId: incident._id
    })
      .sort({ createdAt: 1 })
      .populate("actorId", "name role");

    return res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error("Get incident history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve incident history"
    });
  }
};
// Assign an incident to a responder (admin only)
exports.assignIncident = async (req, res) => {
  try {
    const { responderId } = req.body;
    const { id } = req.params;

    if (!responderId) {
      return res.status(400).json({
        success: false,
        message: "Responder ID is required"
      });
    }

    const responder = await User.findById(responderId);

    if (!responder || responder.role !== "responder") {
      return res.status(404).json({
        success: false,
        message: "Responder not found"
      });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    incident.assignedResponder = responder._id;
    incident.status = "assigned";
    await incident.save();

    await IncidentEvent.create({
      incidentId: incident._id,
      actorId: req.user.id,
      eventType: "responder_assigned",
      details: `Incident assigned to ${responder.name}`
    });

    return res.status(200).json({
      success: true,
      message: "Responder assigned successfully",
      incident
    });
  } catch (error) {
    console.error("Assign incident error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign responder"
    });
  }
};

