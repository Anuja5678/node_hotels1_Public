const express = require('express');
const router = express.Router();
const Person1 = require('../models1/person1');

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newPerson1 = new Person1(data);
        const response = await newPerson1.save();
        console.log('newPerson1 data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in newPerson1'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await Person1.find();
        console.log("newPerson1 data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error in newPerson1"});
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person1.find({work:workType});
            console.log('response fetched of ur workType');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work Type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error in WorkType"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person1.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({error:"Person1 not found"});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error of Person1 Id"});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;

        const response = await Person1.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"Person1 not found"});
        }
        console.log("Person1 data deleted");
        res.status(200).json({message:"Person1 deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server Error of PersonId"})
    }
})

module.exports = router;