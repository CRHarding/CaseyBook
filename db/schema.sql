\c users_db;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS friends;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE friends (
  friends_id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  friend_id VARCHAR(255) REFERENCES users(username),
  status integer default 2
);

CREATE INDEX ON users (username);
