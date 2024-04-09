import express from 'express';
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
} from  './../controllers/userController'

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    
    userRouter.route('/login')
    .post(login)
    
    userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

export default userRouter;