var express = require('express');
var router = express.Router();
const db = require('../db');
let inventory;
(async () => { inventory = await db.query('SELECT id, name, price, categoryId, imageUrl FROM inventory'); })();
let categories;
(async () => { categories = await db.query('SELECT id, name, description, seasonal FROM categories'); })();
router.get('/', function(req, res, next) {
    res.render('order', {
        title: 'Order',
        inventory: inventory,
        categories: categories,
        linkActive: 'order'
    });
});

module.exports = router;