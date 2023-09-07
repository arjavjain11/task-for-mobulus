import bcrypt from "bcryptjs";
import Admin from './../../models/admin.js';
import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
    const { email="", password, phoneNumber=null } = req.body;
    try {
      const user = phoneNumber ? (await Admin.findOne({ phoneNumber })) : (await Admin.findOne({ email }));
      if (!user) {
        return res.status(404).json({ message: 'User not Found' });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ user }, "asdfghjkl");
      res.status(200).json({ token });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error logging in' });
    }
}

export {
    adminLogin
}
