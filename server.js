const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const systemEngine = require('./src/engine/systemEngine');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints
app.post('/ask', async (req, res) => {
    try {
        const userQuery = req.body.query;
        if (!userQuery) {
            return res.status(400).json({ error: "Query is required." });
        }

        const result = await systemEngine.processRequest(userQuery);
        res.json(result);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.get('/steps', (req, res) => {
    res.json(systemEngine.knowledgeBase);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Election Process Guide running on port ${PORT}`);
});
