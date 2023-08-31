const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const UserSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        image:{
            type:String,
            default:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1235167379.1662527213&semt=ais"
        },
        tokens:[{
            token:{
                type:String,
                required:true,
            }
        }], 
      
    },
    {timestamps:true}
);
UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
})
UserSchema.methods.generateAuthToken=async function(){
    try{
const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
this.tokens=this.tokens.concat({token:token})
await this.save();
return token
    }catch(error){
console.log(error)
    }
}
module.exports=mongoose.model("user",UserSchema);
