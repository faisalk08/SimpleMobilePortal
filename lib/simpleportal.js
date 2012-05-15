/*!
 * Simple Node Mobile Portal
 * Copyright(c) 2012 Faisal Kottarathil
 * MIT Licensed
 */

var simpleportal = module.exports = {};

simpleportal.version = '0.1.0';

//server wrapper modules
simpleportal.configuration = require("./configuration");
simpleportal.server = require("./server");

simpleportal.router = require("./router");
simpleportal.oauth = require("./oauth");

//db wrapper module
simpleportal.db= require("./db");

//templating and util wrapper
simpleportal.template = require("./template");
simpleportal.util= require("./util");

//logger
simpleportal.logger = require("./logger");