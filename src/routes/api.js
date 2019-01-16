// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

const User = require('../models/user');
const Location = require('../models/location');

const router = express.Router();
