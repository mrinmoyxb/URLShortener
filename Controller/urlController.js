const shortID = require("shortid")
const URL = require("../Model/urlShortenerModel")

// function to generate short url for requested url
async function handleGenerateNewUrl(req, res){
    const body = req.body
    if(!body){
        console.log("NOT VALID")
        return res.status(401).json({"msg": "All fields are mandatory"})
    }
    const shortid = shortID()
    await URL.create({
        shortId: shortid,
        redirectUrl: body.url,
        visitHistory: []
    })
    return res.json({"url": shortid})
}

// function to search/redirect to original url with the help of shortend url
async function handleGetRedirectUrlByUrlId(req, res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({shortId: shortId}, {$push: {visitHistory: {timestamp: Date.now()}}})
    res.redirect(entry.redirectUrl)
}

// function to get analytics of our shortend url
async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId
    const entry = await URL.findOne({shortId})
    return res.json({totalVisit: entry.visitHistory.length, detail: entry.visitHistory})
}

module.exports = {
    handleGenerateNewUrl,
    handleGetRedirectUrlByUrlId,
    handleGetAnalytics
}