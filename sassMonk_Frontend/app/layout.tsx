"use client";
import localFont from "next/font/local";
import "./globals.css";
import { MovieContextProvider } from "./components/MovieContextProvider";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AddMovieForm from "./components/AddMovieForm";
import AddReviewForm from "./components/AddReviewForm";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MovieContextProvider>
          <Navbar
            onAddMovieClick={() => setShowAddMovieForm(true)}
            onAddReviewClick={() => setShowAddReviewForm(true)}
          />

          {showAddMovieForm && (
            <AddMovieForm onClose={() => setShowAddMovieForm(false)} />
          )}

          {showAddReviewForm && (
            <AddReviewForm onClose={() => setShowAddReviewForm(false)} />
          )}

          {children}
        </MovieContextProvider>
      </body>
    </html>
  );
}
