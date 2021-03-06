var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var config = require("../config");
var reactWrapper = require("../supporting/reactWrapper");
var serverRender = require("../supporting/rendering").serverRender;

/* GET home page. */


let indexHandler = function(req, res, next) {
  let content = reactWrapper.home(fetch).then(({result, cache}) => { 
    return {domString: serverRender(result), cache};
  });
  content.then(({domString, cache}) => {
    res.render('index', {
      title: "reactpress", 
      content: domString,
      cache: JSON.stringify(cache)
    });
  }).catch((error) => {throw error;});
}

router.get('/', indexHandler);
router.get('', indexHandler);

router.get(config.routes.post, function(req, res, next) {
  let content = reactWrapper.single(req.params.slug, fetch).then(({result, cache}) => { 
    return {domString: serverRender(result), cache};
  });
  content.then(({domString, cache}) => {
    res.render('index', {
      title: "reactpress", 
      content: domString,
      cache: JSON.stringify(cache)
    });
  }).catch((error) => {throw error;});
});

module.exports = router;
