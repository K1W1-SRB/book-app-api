import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getBookCases = async (req: Request, res: Response) => {
  try {
    const bookCases = await prisma.bookcase.findMany({
      include: {
        books: true, 
      },
    });

    res.status(200).json({
      status: "success",
      data: bookCases,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "something went wrong",
    });
  }
};

export const getMyBookCase = async (req: Request, res: Response) => {
  try {
    const parts = req.url.split("/")
    const user_id = parts[1];
    const case_id = parseInt(parts[2], 10);
    const user = parseInt(user_id, 10);
    


    const bookCases = await prisma.bookcase.findMany({
      where:{
        user_id: user,
        case_id: case_id,
      },
      include: {
        books: true,
      }
    })
    res.status(200).json({
      status: "success",
      data: bookCases,
    })
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "something went wrong",
    });
  }
}

export const getMyBookCases = async (req: Request, res: Response) => {
  try {
    const parts = req.url.split("/")
    const user_id = parts[1];
    const user = parseInt(user_id, 10);


    const bookCases = await prisma.bookcase.findMany({
      where:{
        user_id: user,
      },
      include: {
        books: true,
      }
    })
    res.status(200).json({
      status: "success",
      data: bookCases,
    })
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "something went wrong",
    });
  }
}

export const createBookCase = async (req: Request, res: Response) => {
  try {
    const { name, category, user_id } = req.body;

    const bookCase = await prisma.bookcase.create({
      data: {
        name: name,
        category: category,
        user_id: user_id
      },
    });

    res.status(200).json({
      status: "success",
      data: bookCase,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "#something went wrong",
    });
  }
};

export const allBooksInCase = async (req: Request, res: Response) => {
  try {
    const bookCaseId = parseInt(req.params.id, 10);

    const bookCases = await prisma.book.findMany({
      where: {
        bookcase_id: bookCaseId,
      },
    });

    res.status(200).json({
      status: "success",
      data: bookCases,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "something went wrong",
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const bookCaseId = parseInt(req.params.id, 10);
    const parts = req.url.split('/');
    const bookId = parts[parts.length - 1];


    const bookInCase = await prisma.book.findUnique({
      where: {
        bookcase_id: bookCaseId,
        book_id: bookId,
      },
    });

    res.status(200).json({
      status: "success",
      data: bookInCase,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "something went wrong",
    });
  }
};


export const removeBook = async (req: Request, res: Response) => {
  try {
    const bookCaseId = parseInt(req.params.id, 10);
    const parts = req.url.split('/');
    const bookId = parts[parts.length - 1];


    const bookInCase = await prisma.book.delete({
      where: {
        bookcase_id: bookCaseId,
        book_id: bookId,
      },
    });

    res.status(200).json({
      status: "success",
      data: bookInCase,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "something went wrong",
    });
  }
};
