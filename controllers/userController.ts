import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This Route is not available yet",
    });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId   = parseInt(req.params.id, 10);

    if(isNaN(userId)) {
        res.status(400).json({
            status: "error",
            message: "Invalid user Id"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            user_id: userId,
        } as any,
    });

    if (!user) {
        return res.status(404).json({    
            status: 'error',
            message: 'User not found',
        });
    }

    res.status(200).json({
        status: "success",
        data: user,
    })

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This Route is not available yet",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try{
    const user = await prisma.user.findUnique({
      where: {
        name: name,
      },
    })

    if(!user){
      res.status(200).json({
        statusbar: "Failed to find",
        message: "User not found",
       })
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Passwords match, return success
      return res.status(200).json({
        statusbar: "success",
        data: user,
      });
    } else {
      // Passwords do not match, return failure
      return res.status(401).json({
        statusbar: "Failed to authenticate",
        message: "Invalid credentials",
      }); 
    }
    }

    
  } catch (err) {
    res.status(500).json({ status: "error", message: err});
  }
}
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, address, email, DOB, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        address,
        email,
        DOB,
      },
    });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Error creating User",
    });
  }
};

export const updateUser = async(req: Request, res: Response) => {
    try {

        const userId   = parseInt(req.params.id, 10);
        
        const { name, address, email, DOB } = req.body;

        if(isNaN(userId)) {
            res.status(400).json({
                status: "error",
             message: "Invalid user Id"
         })
        }

        const user = await prisma.user.update({
            where: {
                user_id: userId
            },
            data: {
                name,
                address,
                email,
                DOB,
              },
        })

        res.status(201).json({
            status: "success",
            data: user
        })
    } catch (err) {

    res.status(500).json({
        status: "error",
        message: "This Route is not available yet",
    });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId   = parseInt(req.params.id, 10);
    
        if(isNaN(userId)) {
            res.status(400).json({
                status: "error",
                message: "Invalid user Id"
            })
        }
    
        const user = await prisma.user.delete({
            where: {
                user_id: userId,
            } as any,
        });
    
        if (!user) {
            return res.status(404).json({    
                status: 'error',
                message: 'User not found',
            });
        }
    
        res.status(200).json({
            status: "success",
            data: user,
        })
    
      } catch (err) {
        res.status(500).json({
          status: "error",
          message: "This Route is not available yet",
        });
      }
};
