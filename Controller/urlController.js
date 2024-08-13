const shortID = require("shortid")
const URL = require("../Model/urlShortenerModel")

// function to generate short url for requested url
async function handleGenerateNewUrl(req, res){
    try{
        if(!req.body){
            console.log("NOT VALID")
            return res.status(401).json({"msg": "All fields are mandatory"})
        }
        else{
            const shortid = shortID()
            await URL.create({
                shortId: shortid,
                redirectUrl: req.body.url,
                visitHistory: []
            })
            return res.json({"url": shortid})
        }
    }catch(error){
        return res.status(500).json({"errrorMessage":"Internal Server Error"})
    }
}


// function to search/redirect to original url with the help of shortend url
async function handleGetRedirectUrlByUrlId(req, res){
    try{
        const shortId = req.params.shortId
        const entry = await URL.find({shortId: shortId})
        if(!entry){
            return res.status(400).json({"errorMessage":"URL doesn't exist in the database"})
        }
        else{
            const newInstance = await URL.findOneAndUpdate({shortId: shortId}, {$push: {visitHistory: {timestamp: Date.now()}}})
            res.redirect(entry.redirectUrl)
        }
    }catch(error){
        return res.status(500).json({"errorMessage":"Internal Server Error"})
    }
}


// function to get analytics of our shortend url
async function handleGetAnalytics(req, res){
    try{
        const shortId = req.params.shortId
        const entry = await URL.findOne({shortId})
        if(!entry){
            return res.status(400).json({"errorMessage":"URL doesn't exist in the database"})
        }
        else{
            return res.json({totalVisit: entry.visitHistory.length, detail: entry.visitHistory})
        }
    }catch(error){
        return res.status(500).json({"errorMessage":"Internal Server Error"})
    }
}

// return all urls
async function handleGetAllUrls(req, res){
    try{
        const allUrls = await URL.find()
        if(!allUrls){
            return res.status(400).json({"errorMessage":"No URL's in the database"})
        }
        else{
            return res.status(200).json({"allUrls": allUrls})
        }
    }catch(error){
        return res.status(500).json({"errorMessage":"Internal Server Error"})
    }
}


module.exports = {
    handleGenerateNewUrl,
    handleGetRedirectUrlByUrlId,
    handleGetAnalytics,
    handleGetAllUrls
}