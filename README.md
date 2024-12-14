# OMDB Movie Search and Favourites App

This is a Node.js application that allows users to search for movies and TV shows via the OMDB API, save their favourite movies to a MySQL database, and view the list of saved favourites on a separate page.

## Features

- **Search**: Users can search for movies/TV shows using the OMDB API.
- **Favourite**: Users can save movies to a favourites list.
- **View Favourites**: Users can view their saved favourites from the database.
- **Responsive Design**: The app is designed to work across different screen sizes.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL
- **API**: OMDB API (https://www.omdbapi.com/)
- **Other Libraries**: Axios, Body-Parser, CORS

---

## Getting Started

Follow the instructions below to get the application up and running on your local machine.

### Prerequisites

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MySQL**: [Download MySQL](https://dev.mysql.com/downloads/installer/)
- **OMDB API Key**: You will need an API key from OMDB. You can get it by signing up at [OMDB API](https://www.omdbapi.com/apikey.aspx).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/omdb-movie-search-app.git
   cd omdb-movie-search-app


## Install dependencies:

- bash
- npm install

### Set up MySQL database:
- Create a new database called omdb_favourites:

- sql

- CREATE DATABASE omdb_favourites;
- Create a table for storing favourites:

- sql

- CREATE TABLE favourites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  omdb_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(50),
  type VARCHAR(50),
  poster TEXT
);


### Configure your MySQL connection:

- Open the index.js file and replace the following values with your MySQL credentials:
js

- const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword', // Replace with your MySQL password
  database: 'omdb_favourites'
});


### Obtain your OMDB API Key:

Sign up at OMDB API and get an API key.
Replace 7b276fd4 with your OMDB API key in index.js.
Running the Application
Start the server:

- bash

- node index.js
