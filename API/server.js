const express = require("express");
require("dotenv").config();
const { connectToDb } = require("./db");
const { installHandler } = require("./apiHandler");

const app = express();

async function startServer() {
    try {
        await connectToDb();
        
        
        await installHandler(app);

        // Start the server
        const port = process.env.API_SERVER_PORT || 3000;
        app.listen(port, () => {
            console.log(`Api server started on port number ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

// Call the startServer function to initiate the server startup process
startServer();
