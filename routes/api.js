import { Router } from "express";
import axios from "axios";

const router = Router();

// API URL for accessing routes
const jokeapi = "https://v2.jokeapi.dev/joke/Programming?type=single";
const adviceapi = "https://api.adviceslip.com/advice";
const coinapi = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

//normal index route
router.get('/', (req,res) => {
    res.redirect("/dashboard");
});

// dashboard routes
router.get("/dashboard", async (req, res) => {
    try {
        const jokeresponse = await axios.get(jokeapi);
        const jokeData = jokeresponse.data.joke;
        
        const coinresponse = await axios.get(coinapi);
        const bitcoinData = coinresponse.data.bitcoin.usd;
        const ethereumData = coinresponse.data.ethereum.usd;

        const adviceresponse = await axios.get(adviceapi);
        const adviceData = adviceresponse.data.slip.advice;
        
        console.log("Joke data:", jokeData);
        console.log("Bitcoin data:", bitcoinData);
        console.log("Ethereum data:", ethereumData);
        console.log("Advice data:", adviceData);

        res.render("index",
            { 
            Joke: jokeData,
            advices: adviceData, 
            cryptobitcoin: bitcoinData, 
            cryptoethereum: ethereumData
        });
        
        } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

// Route for the refresh button
router.get("/refresh", async (req, res) => {
    try {
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error fetching joke:", error);
        res.status(500).send("Error fetching data");
    }
});


export default router;