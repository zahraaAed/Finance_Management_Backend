const User = require("../Models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1 - Add user (admin/superadmin)
exports.createUser = async (req, res) => {
  const { email, userName,password, role = "admin" } = req.body;

  try {
    const newAdmin = await User.create({
      email,
      password: await bcrypt.hash(password, 15),
      userName,
      role,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2 - Get all users (admin, superadmin)
exports.getAllAdmins = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 3 - Get single admin
exports.getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id: id, role: "admin" } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4 - Delete user (admin role)


exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    // Extract token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the requester is a superadmin
    if (decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Only superadmins can delete admins." });
    }

    // Find and delete the admin user
    const result = await User.destroy({ where: { id: id, role: "admin" } });

    if (result === 0) {
      return res.status(404).json({ message: "Admin not found or cannot be deleted." });
    }

    res.status(200).json({ message: "Admin deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};


// 5 - Get all admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: "admin" } });
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




// ----------------<><><><><></></></></>----------

// 8 - Sign in user
exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Authenticate user with JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Debugging line


    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign in error" });
  }
};
