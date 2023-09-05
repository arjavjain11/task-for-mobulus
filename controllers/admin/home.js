import jwt from "jsonwebtoken";
import User from "../../models/user";
import Product from "../../models/product";

const home = async (req,res) => {

    const { email, status } = req.body;

    let token = req.headers.authorization;
    try{
      if (!token) {
        return res.status(401).send("Unauthorized request");
      }
  
      let verifiedUser = jwt.verify(token, "asdfghjkl");
  
      if (!verifiedUser) {
        return res.status(401).send('Unauthorized request');
      }
      const { role } = verifiedUser;

      if (role !== "admin") {
        return res.status(401).send('You are not authorized person');
      }

      await User.findOneAndUpdate({ email }, { status });

      res.send("User Status Updated Successfully");
    } catch (error) {
        res.send("error in Home page", error);
    }
}

export {
    home
}
