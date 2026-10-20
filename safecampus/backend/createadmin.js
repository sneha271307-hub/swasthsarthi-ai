require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = "admin.test@safecampus.com";
    const password = "AdminPass123";

    let admin = await User.findOne({ email });

    if (admin) {
      admin.role = "admin";
      admin.password = await bcrypt.hash(password, 10);
      await admin.save();
      console.log("Existing account updated to admin.");
    } else {
      admin = await User.create({
        name: "SafeCampus Admin",
        email,
        password: await bcrypt.hash(password, 10),
        role: "admin"
      });
      console.log("Admin account created successfully.");
    }

    console.log("Email:", email);
    console.log("Password:", password);
  } catch (error) {
    console.error("Admin setup failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();