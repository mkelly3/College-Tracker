const router = require('express').Router();
const { User, College, Comment } = require('../../models');
const withAuth = require('../../utils/auth');