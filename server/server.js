const Fact = require("../server/models/fact");
const User = require("../server/models/User");
const UserSession = require('../server/models/UserSession');
const express = require("express");
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const mongojs = require("mongojs");
const Topic = require("../server/models/Topic");

const config = require("../config/config");
const webpackConfig = require("../webpack.config");

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

const db =mongojs('mongodb://localhost:27017/factcheck_app', ['facts']);

// Configuration
// ================================================================================================

// Set up Mongoose
// mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.connect(config.db, { useNewUrlParser: true } );
mongoose.connect('mongodb://localhost:27017/factcheck_app', { useNewUrlParser: true });
mongoose.connection
  .once("open", () => {
    console.log(">>> 🖥️  MongoDB: Connection successful");
  })
  .on("error", err => {
    console.log(">>> 🖥️  MongoDB: Error connecting to server\n", err);
  });
mongoose.Promise = global.Promise;

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));



app.get('/factsPath', function(req, res, next){
    db.facts.find(function(err, facts){
        if(err){
            res.send("There has been an error");
        }
        res.json(facts);
    });
});

 
app.get('/tagpath', function(req,res,next){
   db.facts.find({ tabs: req.query.tabs, tags: req.query.tags}, function(err, facts,next) {
      if(err) {
         res.send(err.message);
      }
        res.json(facts);
      });
});

app.get('/tagspath', function(req,res,next){
   db.facts.find({ topicID: req.query.topicID}, function(err, facts,next) {
      if(err) {
         res.send(err.message);
      }
        res.json(facts);
      });
});



app.get('/fact/:id', function(req, res, next){
    db.facts.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, fact){
        if(err){
            res.send("There has been an error");
        }
        res.json(fact);
    });
});


//Save a fact in the db
app.post('/addfact', function(req, res, next){
    var fact = req.body;
    if(!fact.fact){
        res.status(400);
        res.json({
            "error": "Something wrong with the data"
        });
    } else {
        db.facts.save(fact, function(err, fact){
            if(err){
                res.send(err);
            }
            /*res.json(fact);*/
            res.redirect("/");
        });
    }
});

/*app.get("/topics/:id", function(req, res){
    db.topics.findById({_id: mongojs.ObjectId(req.params.id)}, function(err, topic){
        if(err){
            res.send("There has been an error");
        }
        res.send("Vis tiek veikiu");
        res.json(topic);
    });
});*/


/*app.post('/addtopic', function(req, res, next){
    var topic = req.body;
    if(!fact.fact){
        res.status(400);
        res.json({
            "error": "Something wrong with the data"
        });
    } else {
        db.facts.save(topic, function(err, fact){
            if(err){
                res.send(err);
            }
            res.json(fact);
        });
    }
});*/

/*app.post('/addtopic', function(req, res, next){
   var newTopic = req.body.topic;
   res.send("Veikia")
});
*/

/*app.post("/addtopic", (req, res) => {
  var topic = req.body.topic;
  db.topics.save()
    .then(item => {
      res.send("Topic saved to the database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to the database");
    });
});*/

app.post('/addtopic', function(req, res, next){
    var newTopic = req.body;
    if(!newTopic){
        res.status(400);
        res.json({
            "error": "Something wrong with the data"
        });
    } else {
        db.topics.save(newTopic, {upsert:true}, function(err, fact){
            if(err){
                res.send(err);
            }
            /*res.json(newTopic);*/
            res.redirect("/");
        });
    }
});

app.get('/topicsPath', function(req, res, next){
    db.topics.find(function(err, facts){
        if(err){
            res.send("There has been an error");
        }
        res.json(facts);
    });
});

app.get('/tagsabc', function(req,res,next){
   db.topics.find().sort({topic:1}).toArray(function(err, topics) {
      if(err) {
         res.send(err.message);
      }
        res.json(topics);
      });
});

app.post('/addvalue', function(req, res, next){
    var fact = req.body;
    if(!fact.name /*|| !fact.tags*/){
        res.status(400);
        res.json({
            "error": "Something wrong with the data"
        });
    } else {
        db.facts.save(fact, function(err, fact){
            if(err){
                res.send(err);
            }
            res.json(fact);
        });
    }
});
 


app.put('/addfact', function(req, res, next){
    var fact = req.body;
    var updatedFact = {};
 
    if(!fact){
        res.status(400);
        res.json({
            "error":"Wrong data"
        });
    } else {
        db.facts.update({_id: mongojs.ObjectId(req.params.id)},updatedFact, {}, function(err, todo){
            if(err){
                res.send(err);
            }
            /*res.json(fact);*/
            res.redirect("/topic/_id")
        });
    }
});

 
 //sita ka tik uzkomentinau
app.get('/topics/:id', function(req, res, next){
    db.topics.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, fact){
        if(err){
            res.send("There has been an error");
        }
        /*res.send("Hey hey hey");*/
        res.json(fact);
        /*res.redirect("/topics/:_id");*/
        /*res.render();*/
    });
});

//kazkas negerai su skliaustais
/*app.post('/addfact', function(req, res, next){
    var fact = req.body;
    var tagText = req.body.tagText;
    var changed = {};

    var tag : {
      'type': tagText
    }
 
    if(!fact){
        res.status(400);
        res.json({
            "error":"Wrong data"
        });
    } else {
        db.facts.update({_id: mongojs.ObjectId(req.params.id)},{$push:{tags:tag}}), {}, function(err, todo){
            if(err){
                res.send(err);
            }
            res.json(fact);
        });
    }
});*/



//example
/*app.put('/addfact', function(req, res, next){
    var fact = req.body;
    var updatedFact = {};
 
    if(todo.isDone){
        updatedFact.isDone = fact.isDone;
    }
 
    if(fact.tags){
        updtodo.title = todo.title;
    }
 
    if(!updtodo){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.facts.update({_id: mongojs.ObjectId(req.params.id)},updtodo, {}, function(err, todo){
            if(err){
                res.send(err);
            }
            res.json(todo);
        });
    }
});*/

/*app.put('/addfact', (req, res, next) => {  
  var newTag = {
    text: req.body.tag,
  };
  Fact.findByIdAndUpdate(
    {_id: req.body.id}, 
    {$push: {
      tags: newTag}
    },
    function(error,success){
      if (error) {
        console.log (error);
      } else {
        console.log(success);
        console.log('added a tag' + newTag)
    }
  })
});
*/

/*facts.findByIdAndUpdate(id,
    {$push: {tags: tag}},
    {safe: true, upsert: true},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        }
    }
);
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require("./routes")(app);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('../config/passport')(passport);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}


app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }
  console.log("Labas, serveris veikia");
  console.info(">>> 🌎 Open http://localhost:%s/ in your browser.", port);
});

module.exports = app;


