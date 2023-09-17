const express= require("express")
const Student=require("../models/students")


// 1: create new router
const router=new express.Router()

// create a new students
// using promise

// router.post("/students",(req,res)=>{
//     const user = new Student(req.body)

//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e.message)
//     })
    
// })



// create a new students
// using async await

router.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
    
        const result = await user.save()
        res.status(201).send(result)
    }catch(e){
        res.status(400).send(e.message)
    }
    
})



router.get("/students",async (req,res)=>{
    try{
       const result= await Student.find()
       res.send(result)
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.get("/students/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const result = await Student.findById(_id)

        if(!result){
            return res.status(404).send()
        }
        else{
            res.send(result)
        }
        
     }catch(e){
         res.status(500).send(e.message)
     }
})


// update the student
router.patch("/students/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        console.log(_id);
        const updateStudent=await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        console.log(updateStudent);
        res.status(200).send(updateStudent)
    }catch(e){
        res.status(400).send(e.message)
    }
})


// delete the student
router.delete("/students/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const result = await Student.findByIdAndDelete(_id)
        
        if(!_id){
            return res.status(400).send()
        }
        res.send(result)

    }catch(e){
        res.send(e.message)
    }
})
module.exports=router