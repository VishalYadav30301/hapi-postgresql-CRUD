const Joi = require('@hapi/joi');
const userController = require ('../controllers/userController');
const { userSchema, userIdSchema } = require('../schemas/userSchema');
const { validate } = require('@hapi/joi/lib/base');
const { limit } = require('@hapi/joi/lib/common');



const routes=[

    {
        method : 'POST',
        path: '/users',
        handler: userController.createUser,
        options: {
            validate:{
                payload: userSchema,
                failAction: (request , h, err)=> {
                    throw err;
                }
            }
        }
    },

    
    {
        method : 'GET',
        path:'/users',
        handler: userController.getUsers,
        options:{
            validate:{
                query: Joi.object({
                    page: Joi.number().integer().min(1).default(10),
                    limit: Joi.number().integer().min(1).max(100).default(10)
                })
            }
        }
    },

    {
        method: 'GET',
        path:'/user/{id}',
        handler: userController.getUser,
        options:{
            validate:{
                params: userIdSchema,
                failAction: (request, h , err)=> {
                    throw err;
                }
            }
        }
    },

    {
        method:'PUT',
        path:'/users/{id}',
        handler: userController.updateUser,
        options:{
            validate:{
                params: userIdSchema,
                payload: userSchema,
                failAction: (request , h , err)=>{
                    throw err;
                }
            }
        }
    },

    {
        method:'DELETE',
        path: '/users/{id}',
        handler: userController.deleteUser,
        options:{
            validate:{
            params: userIdSchema,
            failAction:(request, h , err) =>{
                throw err;
            }
        }
     }
  }

];
module.exports= routes;



