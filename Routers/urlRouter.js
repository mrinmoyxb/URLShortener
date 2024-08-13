const express = require("express")
const {handleGenerateNewUrl, handleGetRedirectUrlByUrlId, handleGetAnalytics, handleGetAllUrls} = require("../Controller/urlController")

const router = express.Router()

// POST
router.post("/", handleGenerateNewUrl)

// GET: redirect to original webpage
router.get("/:shortId", handleGetRedirectUrlByUrlId)

// GET: Analytics
router.get("/analytics/:shortId", handleGetAnalytics)

// GET: all urls
router.get("/", handleGetAllUrls)

module.exports = router