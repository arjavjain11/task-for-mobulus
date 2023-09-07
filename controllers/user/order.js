import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import{ Product, WareHouse } from "../../models/product.js";
import { getCoordinates } from "../../helper/getCordinatesForLocations.js";

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

const getProducts = async (req,res) => {
  let token = req.headers.authorization;
  try{
    if (!token) {
      return res.status(401).send("Unauthorized request");
    }

    let verifiedUser = jwt.verify(token, "asdfghjkl");

    if (!verifiedUser) {
      return res.status(401).send('Unauthorized request');
    }

    const { email } = verifiedUser;

    const userData = await User.findOne({ email });

    const { city } = userData;

    const location = getCoordinates(city);

    const { latitude, longitude } = location;
    const radius = 10;

    const wareHouse = await WareHouse.findOne({
      location: {
        $nearSphere: {
           $geometry: {
              type : "Point",
              coordinates : [ latitude, longitude ]
           },
           $maxDistance: radius * 1000
        }
     }
    });

    const { wareHouseName } = wareHouse;

    const products = await Product.find({ wareHouseName });
    
    res.send(products);
  }catch (error) {
      res.send("error in finding the products", error);
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
    createOrder,
    getProducts
}
