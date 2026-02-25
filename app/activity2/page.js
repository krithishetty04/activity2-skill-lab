"use client";

import React from "react";

// Reusable BookCard Component
function BookCard({ title, author, image, link }) {
  return (
    <div
      style={styles.card}
      onClick={() => window.open(link, "_blank")}
    >
      <img src={image} alt={title} style={styles.image} />
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.author}>by {author}</p>
    </div>
  );
}

export default function HomePage() {
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
      link: "https://en.wikipedia.org/wiki/The_Great_Gatsby"
    },
    {
      title: "1984",
      author: "George Orwell",
      image: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
      link: "https://www.clarkchargers.org/ourpages/auto/2015/3/10/50720556/1984.pdf"
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
      link: "https://www.britannica.com/topic/To-Kill-a-Mockingbird/Real-life-influences-and-adaptations"
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📚 My Book Collection</h1>

      <div style={styles.grid}>
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            image={book.image}
            link={book.link}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(to right, #93c5d1, #6fbfc3)",
    textAlign: "center"
  },
  heading: {
    color: "white",
    marginBottom: "40px",
    fontSize: "32px"
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    width: "250px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px"
  },
  title: {
    fontSize: "18px",
    marginBottom: "8px",
    color: "#333"
  },
  author: {
    fontSize: "14px",
    color: "#777"
  }
};