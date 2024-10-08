const shortID = require("shortid")
const URL = require("../Model/urlShortenerModel")

// function to generate short url for requested url
async function handleGenerateNewUrl(req, res){
    try{
        if(!req.body){
            return res.status(401).json({"msg": "All fields are mandatory"})
        }
        else{
            const shortid = shortID()
            const noOfDoc = await URL.countDocuments()
            await URL.create({
                urlId: noOfDoc+1,
                shortId: shortid,
                redirectUrl: req.body.url,
                noOfVisits: 0,
                visitHistory: []
            })
            return res.json({"short_url": shortid})
        }
    }catch(error){
        return res.status(500).json({"msg":"Internal Server Error"})
    }
}


// function to search/redirect to original url with the help of shortend url
async function handleGetRedirectUrlByUrlId(req, res){
    try{
        const shortId = req.params.shortId
        const entry = await URL.find({shortId: shortId})
        if(entry.length==0){
            return res.status(400).json({"msg":"URL doesn't exist in the database"})
        }
        else{
            const visitHistoryCount = entry[0].visitHistory.length;
            await URL.findOneAndUpdate({shortId: shortId},
                {
                $push: {visitHistory: {timestamp: Date.now(), docId: entry[0].visitHistory.length+1}},
                $inc: {noOfVisits: 1}
            })
            res.redirect(entry[0].redirectUrl)
        }
    }catch(error){
        return res.status(500).json({"msg":"Internal Server Error"})
    }
}


// function to get analytics of our shortend url
async function handleGetAnalytics(req, res){
    try{
        const shortId = req.params.shortId
        const entry = await URL.findOne({shortId})
        if(!entry){
            return res.status(400).json({"msg":"URL doesn't exist in the database"})
        }
        else{
            return res.status(200).json({originalUrl: entry.redirectUrl, totalVisit: entry.visitHistory.length, detail: entry.visitHistory})
        }
    }catch(error){
        return res.status(500).json({"msg":"Internal Server Error"})
    }
}

// return all urls
async function handleGetAllUrls(req, res){
    try{
        const allUrls = await URL.find()
        if(!allUrls){
            return res.status(400).json({"msg":"No URL's in the database"})
        }
        else{
            return res.status(200).json({"msg": allUrls})
        }
    }catch(error){
        return res.status(500).json({"msg":"Internal Server Error"})
    }
}


module.exports = {
    handleGenerateNewUrl,
    handleGetRedirectUrlByUrlId,
    handleGetAnalytics,
    handleGetAllUrls
}