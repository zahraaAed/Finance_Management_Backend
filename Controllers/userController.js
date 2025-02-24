import User from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


// 1 - add user (admin/superadmin)
export const createUser = async (req, res) => {
  const { email, firstName, lastName, password,role } = req.body;

  try {
    const newAdmin = await User.create({
 
      email,
      username,
      password : await bcrypt.hash(password,15),
      firstName,
      lastName, 
      role,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// 2 - get all users( admin, superadmin)
export const getAllAdmins = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// 3 - get single admin
export const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id: id, role: 'admin' } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  
// 4 - delete user (admin role)
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.destroy({ where: {  id: id, role: 'admin'  } });
    if (result === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};

//5-get admin 
export const getAdmins = async (req, res) => {
    try {
      const admins = await User.findAll({ where: { role: 'admin' } });
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
   };

//6- get all superadmins
export const getAllSuperAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: 'superAdmin' } });
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 };

 //7- get superadmin by id 

 export const getSuperAdminById = async (req, res) => {
  const { id } = req.params;
 
  try {
   const admin = await User.findOne({ where: { id: id, role: 'superadmin' } });
   if (admin) {
     res.json(admin);
   } else {
     res.status(404).json({ error: 'superAdmin not found' });
   }
  } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Internal Server Error' });
  }
 };

 


 


// ----------------<><><><><></></></></>----------

//sign in user 
export async function signInUser(req, res) {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({
          where: {email}
      });
      // Verify password
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid || !user) {
          return res.status(404).json('Incorrect email and password combination');
      }

      // Authenticate user with jwt
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
 
      res.status(200).send({
          id: user.id,
          email: user.username,
          role: user.role, // Add this line
          accessToken: token,
      });
  } catch (err) {
      return res.status(500).send('Sign in error');
  }
}

        