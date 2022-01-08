var express = require('express');
var router = express.Router();
const ng_data = require("../api/collect")
const hotels_data = require("../api/hotels")
const https = require("https");
const { get } = require('express/lib/request');
const options = {
  hostname : 'api.unsplash.com',
  path : '/photos',
  method: "GET",
  client_id : "ZCE_CQaTlrmhKvqm4xeEfHUMQJ6cXReLXPnetiaxej0",
  per_page : "40",
  order_by : "latest"
}

const mysql = require("mysql2");
const { route } = require('express/lib/application');
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'newspaper'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Victoria, William, and Leke' });
});

router.get("/leke", function(req, res, next) {
  res.render('index', { title: '  Leke ' });
});

router.get("/victoria", function(req, res, next){
  res.render("vico", {name :  "Vicy Vicy"});
})

router.get("/nigeria", function(req, res, next){
  res.render("nigeria", {data : ng_data.module.nigeria});
})

router.get("/nigeria/:state", function(req, res, next){
  const state_name = req.params.state
  const state_data = ng_data.module.nigeria.filter(item => item.state.name.toLowerCase().includes(state_name))
  // res.send(state_data)
  res.render("nigeria_state", {state_name :  state_name, state_data : state_data});
})

router.get("/nigeria/:state/:lga", function(req, res, next){
  const state_name = req.params.state
  const lga_name = req.params.lga
  const state_data = ng_data.module.nigeria.filter(item => item.state.name.toLowerCase().includes(state_name))
  
  // res.send(state_data)
  res.render("nigeria_lga", {state_name :  state_name, lga_name : lga_name});
})

router.post("/hotels", function(req, res, next){
 const review_data = hotels_data.module.hotel_data.Reviews 

 const get_images = https.request(options, amebo => {
   console.log( `statusCode : ${amebo.statusCode}`)

   amebo.on ("data", d => {
      // res.send( data )
      console.log(d)
   })
 })

 get_images.on("error", error => {
   console.log(error)
 })

//  console.log( get_images.on )

  // res.send(hotels_data.module.hotel_data.Reviews)
  res.render("hotels", { reviews : review_data })
})

router.get("/play", function(req, res, next) {

  connection.query(
    'SELECT * FROM `blog`',  function(err, results, fields) {

      if (err){
        
      }
      console.log(results); // results contains rows returned by server
        res.send(results)
      // res.render('play', { play_data : results });
       
      // console.log(fields); // fields contains extra meta data about results, if available
    })

})

router.get("/books", function(req, res, next) {
  res
})

module.exports = router;
