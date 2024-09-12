const express = require('express');
const router = express.Router();
const MenuItem1 = require('../models1/MenuItem1');

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenuItem1 = new MenuItem1(data);
        const response = await newMenuItem1.save();
        console.log('newMenuItem1 data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error in newMenuItem1"})
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem1.find();
        console.log('newMenuItem1 data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error in newMenuItem1"})
    }
})

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;

        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await MenuItem1.find({taste:tasteType});
            console.log('tasteType response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid tasteType"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error in tasteType"});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const MenuItemId = req.params.id;
        const updatedMenuItem = req.body;

        const response = await MenuItem1.findByIdAndUpdate(MenuItemId,updatedMenuItem,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({error:"MenuItem1 not Found"});
        }
        console.log("MenuItem data updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error of MenuItemId"});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const MenuItemId = req.params.id;

        const response = await MenuItem1.findByIdAndDelete(MenuItemId);
        if(!response){
            return res.status(404).json({error:"MenuItemId not found"});
        }
        console.log("MenuItem data deleted");
        res.status(200).json({message:"menuitem data deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error of MenuItemId"});
    }
})

module.exports = router;