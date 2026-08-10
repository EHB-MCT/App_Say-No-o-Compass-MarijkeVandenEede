require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");

const User = require("./models/User");

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

//Login
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

//Analyse
app.post("/analyse", async (req, res) => {

    try {

        const {
            mood,
            situation,
            whyYes,
            whyNo,
            consequenceYes,
            consequenceNo
        } = req.body;

        const prompt = `
A person is struggling to decide whether to say yes or no.

Mood:
${mood}

Situation:
${situation}

Reasons to say YES:
${whyYes}

Reasons to say NO:
${whyNo}

Consequences of saying YES:
${consequenceYes}

Consequences of saying NO:
${consequenceNo}

Give balanced advice.
Do not make the decision for the user.
Keep your answer under 150 words.
`;

        const response = await openai.chat.completions.create({

            model: "gpt-4o-mini",

            messages: [
                {
                    role: "system",
                    content: "You are a supportive coach helping people reflect before making decisions."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]

        });

        res.json({

            success: true,
            advice: response.choices[0].message.content

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});