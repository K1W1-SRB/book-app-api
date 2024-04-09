import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllReviews = async (req: Request, res: Response) => {
    try {
       const reviews = await prisma.review.findMany()

       res.status(200).json({
            status: "error",
            data: reviews
       })
    } catch (err) { 
        res.status(500).json({
            status: "error",
            message: "unable to find reviews",
          });
    }
};
export const getReview = async (req: Request, res: Response) => {
    try {
        const reviewID = parseInt(req.params.id, 10);

        if(isNaN(reviewID)) {
            res.status(400).json({
                status: "error",
                message: "Invalid review ID"
            })
        }

        const review = await prisma.review.findUnique({
            where: {
                review_id: reviewID
            }as any,
        })

        if (!review) {
            return res.status(404).json({
                status: "error",
                message: "Review not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: review,
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "unable to find review",
          });
    }
};
export const createReview = async (req: Request, res: Response) => {
    try {
        const { star, text, user_id, book_id,} = req.body;

        const newReview = await prisma.review.create({
            data: {
                star,
                text,
                user_id,
                book_id,
            }
        })
        res.status(201).json({
            status: "success",
            data: newReview,
          });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "unable to create review",
          });
    }
};
export const updateReview = async (req: Request, res: Response) => {
    try {
        const reviewID = parseInt(req.params.id, 10);

        if(isNaN(reviewID)) {
            res.status(400).json({
                status: "error",
                message: "Invalid review ID"
            })
        }

        const { star, text, user_id, book_id,} = req.body;

        const newReview = await prisma.review.update({
            where: {
                review_id: reviewID,
            },
            data: {
                star,
                text,
                user_id,
                book_id,
            }
        })
        res.status(201).json({
            status: "success",
            data: newReview,
          });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "unable to create review",
          });
    }
};
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const reviewID = parseInt(req.params.id, 10);

        if(isNaN(reviewID)) {
            res.status(400).json({
                status: "error",
                message: "Invalid review ID"
            })
        }

        const review = await prisma.review.delete({
            where: {
                review_id: reviewID
            }as any,
        })

        if (!review) {
            return res.status(404).json({
                status: "error",
                message: "Review not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: review,
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "unable to find review",
          });
    }
};
