const {getCategory,addCategory,updateCategory,findCategory} = require('../controller/blogCategoryController')
const express = require('express')
const router = express.Router()

router.get('/',getCategory)
router.get('/:category',findCategory)
router.post('/',addCategory)
router.patch('/:id',updateCategory)

module.exports = router