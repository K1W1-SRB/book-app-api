import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const getTopBooks = async (req: Request, res: Response) => {
  try {
    // Get top 10 books from New York Times API
    const topBooksResponse = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=6ad84e249d054efeaefe1abb8f89df5b"
    );

    const topBooks = topBooksResponse.data.results;

    const bookDetailsPromises = topBooks.map(async (book: any) => {

      const googleBooksResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          book.book_details[0].title
        )}`,
        {
          params: {
            key: "AIzaSyDEUzOQLfWXJpc4NtBRGDvLT9OtZK2ZP5E",
            maxResults: 1, 
          },
        }
      );
      const googleBook = googleBooksResponse.data.items[0].volumeInfo;
      return {
        title: googleBook.title,
        author: googleBook.authors ? googleBook.authors[0] : "Unknown",
        description: googleBook.description || "No description available",
        rating: googleBook.averageRating || "Not rated",
        // Add more details as needed
      };
    });

    // Wait for all details to be fetched
    const bookDetails = await Promise.all(bookDetailsPromises);

    res.status(200).json({
      status: "Success",
      books: bookDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "error",
    });
  }
};

export const getBooksBySearch = async (req: Request, res: Response) => {
  try {
    const q = req.url;

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
        thumbnail: volumeInfo.thumbnail || "default_thumbnail_url", // Provide a default value or handle it accordingly
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
    console.log(err);
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
