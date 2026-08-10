require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// MongoDB connectie
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ Connected to MongoDB");
})
.catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
});

// Testroute
app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working!"
    });
});

// Register
//tijdelijke regel om te testen of de register route werkt, later vervangen door een echte register route
//console.log(">>> Register route loaded");
app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully!"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Wrong password."
            });
        }

        res.json({
            success: true,
            message: "Login successful!",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.post("/analyse", async (req, res) => {

    res.json({
        success: true,
        advice: "Dummy advice for testing."
    });

});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});