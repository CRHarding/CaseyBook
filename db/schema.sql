\c users_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  fname VARCHAR(255),
  lname VARCHAR(255),
  hash VARCHAR(255),
  salt VARCHAR(255)
);

CREATE INDEX ON users (username);
