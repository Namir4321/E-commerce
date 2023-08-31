const Product=require("../models/Product");
exports.postaddProduct=async(req,res,next)=>{
const newProduct=new Product({
    title:req.body.title,
    description:req.body.description,
    image:req.body.image,
    categories:req.body.categories,
    size:req.body.size,
    color:req.body.color,
    price:req.body.price,
})
try{
const savedProduct=await newProduct.save();
res.status(200).json(savedProduct)
}catch(err){
    res.status(500).json(err)
}
}
exports.putupdateProduct=async(req,res,next)=>{
const {id}=req.params;
console.log(req.body)
console.log(id)
try {
    const updatedProduct=await Product.findByIdAndUpdate(id,
    {
        $set:req.body,
    },{
        new:true}
    );
    res.status(200).json(updatedProduct);

}catch(err){
    res.status(500).json(err);
}
}
exports.deleteProduct=async(req,res,next)=>{
    const {id}=req.params;
    try{
await Product.findByIdAndDelete(id);
    }catch(err){
        res.status(500).json(err);
    }
}
exports.getProduct=async(req,res,next)=>{
    const {id}=req.params;
    try{
const products=await Product.findById(id);
res.status(200).json(products)
    }catch(err){
        res.status(500).json(err);
    }
}
exports.getallProduct=async(req,res,next)=>{
const queryNew=req.query.new;
const queryCategory=req.query.categories;
try{
let products;
if(queryNew){
    products=await Product.find().sort({createdAt:-1}).limit(1)
} else if(queryCategory){
        products=await Product.find({categories:{
            $in:[queryCategory]
        }})
    }else{
        products=await Product.find();
    }
    res.status(200).json(products);
}catch(err){
    res.status(500).json(err);
}
}