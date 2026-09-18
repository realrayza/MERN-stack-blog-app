const {getCategory,addCategory,updateCategory} = require('../controller/blogCategoryController')
const express = require('express')
const router = express.Router()

router.get('/',getCategory)
router.post('/',addCategory)
router.patch('/:id',updateCategory)

module.exports = router