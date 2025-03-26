const User = require('../models/User');



//Creating a User


 const createUser =  async(request,h)=>{
    try{
        const user = await User.create(request.payload);
        return h.response(user).code(201); 
    
    }catch(err){
        if(err.name ==='SequelizeUniqueConstraintError'){
         return h.response({
            error : 'Validation Error',
            details :['Email must be unique']
         }).code(409);
        }

        return h.response({
         error:'Validation Error',
         details : err.errors ? err.errors.map(e => e.message):[err.message]
        }).code(400);
      }
 };

 // Querry of getting all Users

 const getUsers = async(request,h)=> {
   try{
    const page = request.query.page;
    const limit = request.query.limit;
    const offset =(page-1)*limit;

    const { count, rows } = await User.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: ['id', 'name', 'email', 'age', 'phoneNo', 'createdAt']
    });

    return h.response({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows
    });
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
 };


 // Querry to fetch a single user from database

 const getUser = async(request, h) => {

    try{
      const user = await User.findByPk(request.params.id,{
      attributes:['id', 'name' , 'email', 'age', 'createdAt', 'updatedAt']
    });
    if(!user)  return h.response({ error : "User not found"}).code(404);
    return h.response(user);

   }catch(err){
     return h.response({error : err.message}).code(500);
   }
 };


 // Querry to update an exixting user

 const updateUser = async(request,h)=> {
   try{
       const [updated] = await User.update(request.payload,{
        where :{ id : request.params.id},
        returning :true,
        individualHooks:true
    });

    if(!updated) return h.response({ error : ' User not found'}).code(404);
    
    const updatedUser = await User.findByPk(request.params.id,{
      attributes: ['id','name','email','age', 'updatedAt']
    });

    return h.response(updatedUser);

   }catch(err){
      if(err.name === 'SequelizeUniqueConstraintError'){
         return h.response({
            error: 'Validation Error',
            details:['Email must be unique']
         }).code(400);
      }
       return h.response({
         error : 'Validation Error',
         details : err.error?err.error.map(e=> e.message):[err.message]
       }).code(400);
   }

 };
// Deleting a User form database 
const deleteUser = async (request, h) => {
  
   try{ 
      const deleted = await User.destroy({ where: { id: request.params.id } });
    if (!deleted) return h.response({ error: 'User not found' }).code(404);
    return h.response({ message: 'User deleted Successfully',
         deletedId: request.params.id
     });
   
   }catch(err){
      return h.response({ error :err.message}).code(500);
   }
  };


    module.exports= { createUser , getUser, getUsers, updateUser, deleteUser};