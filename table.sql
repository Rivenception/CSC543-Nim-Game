-- Define the database parameters. To be ran once on an sql server to set up the server.
CREATE DATABASE nim;
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0
);