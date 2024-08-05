const userModel = require("../model/userModeel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user)
            return res
                .status(400)
                .json({ message: "User with the email already exists!" });

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Email must be a valid email!" });

        if (!validator.isStrongPassword(password))
            return res.status(400).json({ message: "Password must be a strong password! e.g., Hello@1" });

        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

const loginUser = async (req,res)=>{
    const {email,password}= req.body;
    try {
        let user = await userModel.findOne({ email });
        
        if(!user) return res.status(400).json("invalid email or password !");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json("invalid email or password !"); 

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login user" });

    }

};
const findUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user );
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to find user" });
    }
};
const findUsers = async (req, res) => {
    try {
    
        const users = await userModel.find();
        if (!users) return res.status(404).json({ message: "User not found" });

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to find user" });
    }
};
module.exports = {
    registerUser,
    loginUser,
    findUser,
    findUsers
};