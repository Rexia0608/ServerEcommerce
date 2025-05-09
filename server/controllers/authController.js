import db from "../config/dataBase.js";
import jwtGenerator from "../utils/jwtGenerator.js"
import dotenv from "dotenv";
import bcrypt from "bcrypt";


dotenv.config();
const saltedRounds = parseInt(process.env.SaltedRound) || 10;


const registerUserController = async (req, res) => {
    try {
        const  { fName, lName, email, password } = req.body;
        

        const user = await db.query("SELECT * FROM users_accounts WHERE email = $1", [email]);
        
        if (user.rows.length !== 0) {
            return res.status(401).json({ error: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, saltedRounds);
            const newUser = await db.query("INSERT INTO users_accounts (email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
            await db.query("INSERT INTO users_details (id, firstname, lastname) VALUES ($1, $2, $3)", [newUser.rows[0].id, fName, lName]);
            const token = jwtGenerator(newUser.rows[0].id);
            res.json({ token });
        }
    } catch (error) {
        console.log(error.message);
    }
}


const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await db.query("SELECT * FROM users_accounts WHERE email = $1", [email]);
        if (user.rows.length === 0 ) {
            return res.status(401).json("Password or email are incorrect");
        } else {
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            console.log(validPassword)
            if (!validPassword) {
                return res.status(401).json("Password or email are incorrect");
            }
            const token = jwtGenerator(user.rows[0].id);
            res.json({ token }); 
        }
    } catch (error) {
        console.log(error.message);
    }
}








export { registerUserController, loginUserController }