import { hashSync } from "bcrypt";
import { member } from "../models/members";
import jwt from 'jsonwebtoken'
export async function createMember(req,res){
   req.body.password = hashSync(req.body.password,8)
   const newMember = await member.create(req.body)
   const token = jwt.sign({_id:newMember._id, email:newMember.email, firstName:newMember.firstName,lastName:newMember.lastName},"SECRET")
   res.json({message:'member created successfully',token})
}
