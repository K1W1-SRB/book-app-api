import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Console } from "console";

const prisma = new PrismaClient();

export const getBooksBySearch = async (req: Request, res: Response) => {
  try {
    const q = req.url
  
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: q, // Replace with your desired search query
          key: "AIzaSyDEUzOQLfWXJpc4NtBRGDvLT9OtZK2ZP5E",
          maxResults: 10, // Adjust as needed
        },
      }
    );

    const bookResults = response.data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
    }));

    res.status(200).json({
      status: "Success",
      data: bookResults,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "error",
    });
  }
};

export const saveBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyDEUzOQLfWXJpc4NtBRGDvLT9OtZK2ZP5E`
    );
    
    const { id, volumeInfo } = response.data;

    const book = await prisma.book.create({
      data: {
        book_id: id,
        name: volumeInfo.title,
        category: volumeInfo.categories ? volumeInfo.categories[0] : null,
        author: volumeInfo.authors ? volumeInfo.authors[0] : null,
        description: volumeInfo.description,
        pageCount: volumeInfo.pageCount,
        thumbnail: volumeInfo.thumbnail || 'default_thumbnail_url', // Provide a default value or handle it accordingly
        bookcase: {
          connect: { case_id: 1 },
        },
      },
    });
    

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    console.log(err)
    res.status(200).json({
      status: "Failure",
      message: "Book doest exist",
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyDEUzOQLfWXJpc4NtBRGDvLT9OtZK2ZP5E`
    );
    console.log(response);
    // Assuming you want to store specific information about each book
    const bookInfo = {
      bookId,
      title: response.data.volumeInfo.title,
      authors: response.data.volumeInfo.authors,
      // Add more fields as needed
    };

    res.status(200).json({
      status: "Success",
      data: bookInfo,
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: "not built",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await prisma.book.delete({
      where: { book_id: bookId },
    });

    if (!deletedBook) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: deletedBook,
    });

  } catch (err) {
    res.status(404).json({
      status: "OK",
      message: "not built",
    });
  }
};
