import db from "../config/dataBase.js";
import dotenv from "dotenv";

dotenv.config();

const productController = async (req, res) => {
    try {
        const userDataFind = await db.query("SELECT firstname, lastname, user_wallet FROM users_details WHERE id = $1", [req.user]);
        const { id } = req.params;
        let product;
        switch (id) {
            case "Fruits":
                product = await db.query("SELECT itemname, price, img, description, sold, category FROM product_list WHERE category = $1", [id]);
                break;
            case "Vegetables":
                product = await db.query("SELECT itemname, price, img, description, sold, category FROM product_list WHERE category = $1", [id]);
                break;
            case "Dairy":
                product = await db.query("SELECT itemname, price, img, description, sold, category FROM product_list WHERE category = $1", [id]);
                break;
            case "Bakery":
                product = await db.query("SELECT itemname, price, img, description, sold, category FROM product_list WHERE category = $1", [id]);
                break;
            default:
                product = await db.query("SELECT itemname, price, img, description, sold, category FROM product_list");
                break;
        }
        const dataSend = {
            userData: userDataFind.rows[0],
            productData: product.rows
        }
        res.status(201).json(dataSend);        

    } catch (error) {
        console.log(error.message);
    }
}



export default productController;