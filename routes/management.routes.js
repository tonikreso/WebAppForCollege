var express = require('express');
var router = express.Router();
const db = require('../db');
let categories;
(async () => { categories = await db.query('SELECT id, name, description, seasonal FROM categories'); })();
const {
    check,
    body,
    validationResult
} = require('express-validator');


router.get('/', function(req, res, next) {
    res.render('management', {
        title: 'Management',
        categories: categories,
        linkActive: 'management'
    });
});
router.get('/updatecategory', function(req, res, next) {
    res.render('updatecategory', {
        title: 'Update Category',
        categories: categories,
        linkActive: 'management'
        
    });
});
router.post('/updatecategory', [
    body('newname').trim().isLength({
        min:3,
        max:18
    }),
    body('description').trim().isLength({
        min:5,
        max:35
    }),
    body('seasonal').notEmpty()

], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('error', {
            title:'Update Category (error)',
            linkActive: 'management',
            errors:JSON.stringify(errors.array())
        });
    } else {
        console.log(req.body);
        try {
            db.query('UPDATE categories SET name = $1, description = $2, seasonal = $3 WHERE name = $4');
            res.redirect('/management');
        }
        catch(err) {
            res.render('error', {
                title:'Error Update Category',
                linkActive: 'management',
                errors:JSON.stringify(err)
            });
        }
    }
});

module.exports = router;