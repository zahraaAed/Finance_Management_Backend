const superAdmin = require('../Models/superadminModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// 6 - Get all superadmins
exports.getAllSuperAdmins = async (req, res) => {
  try {
    const admins = await superAdmin.findAll({ where: { role: "superadmin" } });
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 7 - Get superadmin by ID
exports.getSuperAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await superAdmin.findOne({ where: { id: id, role: "superadmin" } });
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Superadmin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ----------------<><><><><></></></></>----------

// 8 - Sign in superAdmin
exports.signInsuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await superAdmin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, admin.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Authenticate superAdmin with JWT
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET);

    res.status(200).json({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign in error" });
  }
};

//9- create super admin
exports.createsuperAdmin = async (req, res) => {
  const { email, password, role="superadmin" } = req.body;

  try {
    const newAdmin = await superAdmin.create({
      email,
      password: await bcrypt.hash(password, 15),

      role,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

