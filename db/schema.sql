-- \c users_db;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS friends cascade;
DROP TABLE IF EXISTS posts cascade;
DROP TABLE IF EXISTS likes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR(255),
  lname VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  aboutme VARCHAR(255),
  dateCreated TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  friend_id VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  status integer default 4,
  dateFriended TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(username),
  content VARCHAR(750),
  rest integer default 1,
  datePosted TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id integer REFERENCES posts(id),
  post_writer VARCHAR(255) REFERENCES users(username),
  friend_id VARCHAR(255) REFERENCES users(username),
  datePosted TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON users (username);
