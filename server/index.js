const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require("dotenv").config();

const app = express();
const PORT = 5000;



console.log("API Key Loaded:", process.env.API_KEY);



app.use(cors());
app.use(express.json());


const upload = multer({ dest: "uploads/" }); 


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

app.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
   
    const uploadedFile = req.file; 
    const displayName = uploadedFile.originalname; 
    const filePath = uploadedFile.path; 

    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: uploadedFile.mimetype,
      displayName,
    });



    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: " Alright, let’s roast this resume like it’s a marshmallow over a campfire—crispy, golden, and a little burnt! Highlight every cringe-worthy buzzword, overinflated achievement, and formatting disaster. Keep it light, witty, and brutally honest—because if this resume were a superhero, its power would be invisibility to recruiters!"






 },
    ]);

    res.status(200).json({ summary: result.response.text() });
  } catch (error) {
    console.error("Error in /upload-file:", error); 
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
