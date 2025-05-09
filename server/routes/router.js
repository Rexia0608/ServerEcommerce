import express from "express";
import { registerUserController, loginUserController } from "../controllers/authController.js";
import productController from "../controllers/productController.js"
import validation from "../middlewares/validation.js";
import authorization from "../middlewares/authorization.js";



const router = express.Router();

//**********/ register and login router POST //**********/
// 
router.post("/register", validation, registerUserController);
router.post("/login", validation, loginUserController);

//**********/ product router  GET //**********/
router.get("/products", authorization, productController);
router.get("/products/:id", authorization, productController);

//**********/ checking if the're auth prev  GET //**********/
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// router.get("/products", productController);
// router.get("/products/:id", productController);







export default router;