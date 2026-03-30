import express from "express";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const app = express();

app.get("/wti", async (req, res) => {
  try {
    const response = await fetch("https://finance.yahoo.com/quote/CL=F");
    const html = await response.text();
    const dom = new JSDOM(html);
    const priceElement = dom.window.document.querySelector("fin-streamer[data-field='regularMarketPrice']");
    const price = priceElement ? priceElement.textContent : null;

    res.json({ price, currency: "USD" });
  } catch (err) {
    res.status(500).json({ error: "Failed to scrape WTI price" });
  }
});

export default app;
