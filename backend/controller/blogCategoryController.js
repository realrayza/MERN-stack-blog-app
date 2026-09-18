const Category = require('../model/blogCategoryModel')
const mongoose = require('mongoose')

const getCategory = async (req,res) => {
   try {
    const response = await Category.find()
    res.status(200).json(response)
   } catch (error) {
    res.status(500).json(error)
   } 
}

const addCategory = async (req,res)=>{
   try {
     const {category} = req.body
    const response = await Category.create({category})
    res.status(200).json(response)
   } catch (error) {
    res.status(500).json(error)
   }
}

const updateCategory = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such category'})
    }
    const response = await Category.findOneAndUpdate({_id:id},{...req.body})
    if(!response){
        return res.status(404).json({error: 'no such category'})
    }
    res.status(200).json(response)
}

module.exports = {getCategory,addCategory,updateCategory}