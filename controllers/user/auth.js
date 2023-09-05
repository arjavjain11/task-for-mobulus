import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signUp = async (req, res) => {
    const { email, phoneNumber, firstName, lastName, password, city } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const isVerified = false;
      const newUser = new User({ email, phoneNumber, firstName, lastName, isVerified, city, password: hash });
      await newUser.save();
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
}


const login = async (req, res) => {
    const { email="", password, phoneNumber=null } = req.body;
    try {
      if(!email || !phoneNumber) {
         return res.status(400).json({ message: 'Bad Request' });
      }

      const user = phoneNumber ? (await User.findOne({ email })) : (await User.findOne({ phoneNumber }));

      const { status = "" } = user;

      if (status !== "approved") {
        return res.status(401).json({ message: 'User cannot be approved by admin' });
      }
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
    login,
    signUp
}
