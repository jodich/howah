DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  question TEXT NOT NULL,
  question_image TEXT,
  author_id INTEGER,
  category_id INTEGER,
  created_at TIMESTAMP(0) DEFAULT current_timestamp,
  deadline TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS options (
  id SERIAL PRIMARY KEY,
  post_id INTEGER,
  option TEXT NOT NULL,
  option_image TEXT,
  points INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author_id INTEGER,
  post_id INTEGER,
  created_at TIMESTAMP(0) DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  post_id INTEGER
);

CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  post_id INTEGER,
  option_id INTEGER
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL
);

INSERT INTO categories (category_name) VALUES
  ('Shopping'),
  ('Lifestyle'),
  ('Relationship'),
  ('Fun and Games'),
  ('Miscellaneous');