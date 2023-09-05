import jwt from "jsonwebtoken";
import User from "../../models/user";
import Product, { WareHouse } from "../../models/product";
import Order from "../../models/order";
import { getCoordinates } from "../../helper/getCordinatesForLocations";

const updateUserStatus = async (req,res) => {

    const { email = "", status, phone = null, firstName = "" } = req.body;

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

      if(phone) {
        await User.findOneAndUpdate({ phone }, { status })
        res.send("User Status Updated Successfully");
      }

      if(email !== "") {
        await User.findOneAndUpdate({ email }, { status })
        res.send("User Status Updated Successfully");
      }

      if(firstName !== "") {
        await User.findOneAndUpdate({ firstName }, { status })
        res.send("User Status Updated Successfully");
      }
    } catch (error) {
        res.send("error in Home page", error);
    }
}

const orderStatusUpdate = async(req,res) => {
  let token = req.headers.authorization;
  const { status = "", orderNumber } = req.body;
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

      await Order.update({ orderNumber }, { $set: { status }});

      const order = await Order.findOne({ orderNumber });
      const { productName, quantity } = order;
      const actualQuantity = Product.findOne({  productName }, { quantity: 1 });

      if (status === 'accepted') {
        const updatedQuanity = actualQuantity - quantity;
        await Product.update({ productName }, { $set: { quantity: updatedQuanity }});

        if (updatedQuanity === 0) {
          return res.send("After Accepted Order this product is out of stock");
        }
      }
      res.send("order status updated successfully");
    } catch(error) {
        res.send("error in order status updated", error);
    }
}

const productManagment = async(req, res) => {
  let token = req.headers.authorization;
  const { wareHouseName = "", wareHouseLocation, productName = "", quantity = 0, price = 0 } = req.body;
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

      const location = getCoordinates(wareHouseLocation);

      const [longitude, latitude] = location;

      const newWareHouse = new WareHouse({ wareHouseLocation, wareHouseName, longitude, latitude });
      await newWareHouse.save();

      const newProduct = new Product({ wareHouseName, productName, price, quantity });
      await newProduct.save();

    } catch(error) {
        res.send("error in warehouses adding", error);
    }
}

export {
  updateUserStatus,
  orderStatusUpdate,
  productManagment,
}
