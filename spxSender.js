const axios = require('axios');
require('dotenv').config();

const sendUpdate = async (np2data) => {
  const baseUrl = `http://${process.env.SPX_HOST}:${process.env.SPX_PORT}`;
  
  // Method 1: Update rundown item data without triggering playout
  const payload = {
    casparServer: process.env.SPX_CASPAR_SERVER || "OVERLAY",
    casparChannel: process.env.SPX_CASPAR_CHANNEL || "1", 
    casparLayer: "999", // Use a hidden layer for data updates
    webplayoutLayer: "999", // Use a hidden layer for data updates
    relativeTemplatePath: process.env.SPX_TEMPLATE_PATH || "/vendor/pack/NP2_Lowerthird.html",
    out: "manual",
    command: "stop",
    DataFields: [
      { field: "f0", value: np2data.songTitle },
      { field: "f1", value: np2data.artistName },
      { field: "f2", value: np2data.labelName },
      { field: "f3", value: np2data.artworkUrl }
    ],
    updateRundownItem: {
      updateUI: true,
      itemID: process.env.SPX_ITEMID,
      persist: true,
      project: process.env.SPX_PROJECT,
      rundown: process.env.SPX_RUNDOWN
    }
  };

  try {
    const response = await axios.post(`${baseUrl}/api/v1/directplayout`, payload);
    console.log("SPX data updated (not played):", response.data);
  } catch (err) {
    console.error("SPX update failed:", err.response?.data || err.message);
  }
};

module.exports = { sendUpdate };