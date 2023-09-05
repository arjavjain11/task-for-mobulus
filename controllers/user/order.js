import jwt from "jsonwebtoken";
import User from "../../models/user";
import Product from "../../models/product";

const findData = async (req, res) => {
    let token = req.headers.authorization;
    try{
      if (!token) {
        return res.status(401).send("Unauthorized request");
      }
  
      let verifiedUser = jwt.verify(token, "asdfghjkl");
  
      if (!verifiedUser) {
        return res.status(401).send('Unauthorized request');
      }

      const data = User.aggregate([{
        $lookup: {
            from: "Product",
            localField: "city",
            foreignField: "location",
            as: "data"
        }
    }])
    res.status(200).json({ data });
    } catch (error) {
      res.send("error in find data", error);
    }
}

const createOrder = async (req,res) => {
    let token = req.headers.authorization;
    const { productName, quantity, address } = req.body;
    try{
      if (!token) {
        return res.status(401).send("Unauthorized request");
      }

      let verifiedUser = jwt.verify(token, "asdfghjkl");

      if (!verifiedUser) {
        return res.status(401).send('Unauthorized request');
      }

      const price = await Product.findOne({ productName }, {price: 1});

      const newOrder = new Order({ productName, quantity, address, price });

      await newOrder.save();
      res.send("order Created Successfully");
    }catch (error) {
        res.send("error in creating order", error);
    }       
}

export {
    findData,
    createOrder
}
