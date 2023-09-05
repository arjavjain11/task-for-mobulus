import bcrypt from "bcryptjs";
import Admin from './../../models/admin';

const adminLogin = async (req, res) => {
    const { email="", password, phoneNumber=null } = req.body;
    try {
      if(!email || !phoneNumber) {
         return res.status(400).json({ message: 'Bad Request' });
      }

      const user = phoneNumber ? (await Admin.findOne({ email })) : (await Admin.findOne({ phoneNumber }));
      if (!user) {
        return res.status(404).json({ message: 'User not Found' });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ email }, "asdfghjkl");
      res.status(200).json({ token });

    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
}

export {
    adminLogin
}
