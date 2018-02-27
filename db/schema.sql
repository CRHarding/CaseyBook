\c users_db;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS friends;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR(255),
  lname VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  aboutme VARCHAR(255)
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  friend_id VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  status integer default 4
);

CREATE INDEX ON users (username);
