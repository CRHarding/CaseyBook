\c users_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE friends (
  user_id INTEGER REFERENCES users,
  friend_id INTEGER REFERENCES users
);

CREATE INDEX ON users (username);
