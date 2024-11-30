const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require("dotenv").config();

const app = express();
const PORT = 5000;



console.log("API Key Loaded:", process.env.API_KEY);


// Use CORS middleware to allow requests from your frontend
app.use(cors());
app.use(express.json()); // Still needed for JSON data

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Temporary folder for uploaded files

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

app.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    // Get file details from the upload
    const uploadedFile = req.file; // Contains information about the uploaded file
    const displayName = uploadedFile.originalname; // Original file name
    const filePath = uploadedFile.path; // Path to the file on the server

    // Upload the file to Google Generative AI
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: uploadedFile.mimetype,
      displayName,
    });

    // Generate content using the uploaded file's URI
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: "write Result in Hinglish Alright, let’s roast this resume like it’s a marshmallow over a campfire—crispy, golden, and a little burnt! Highlight every cringe-worthy buzzword, overinflated achievement, and formatting disaster. Keep it light, witty, and brutally honest—because if this resume were a superhero, its power would be invisibility to recruiters!"






 },
    ]);

    res.status(200).json({ summary: result.response.text() });
  } catch (error) {
    console.error("Error in /upload-file:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
