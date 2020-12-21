CREATE DATABASE foodfy;

CREATE TABLE chefs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  avatar_url TEXT NOT NULL ,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  chef_id INTEGER,
  image TEXT NOT NULL,
  title TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  preparation TEXT[] NOT NULL,
  information TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (chef_id) REFERENCES chefs(id)
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL
);

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY
  recipe_id INTEGER REFERENCES recipes(id)
  file_id INTEGER REFERENCES files(id)
);

ALTER TABLE recipes DROP COLUMN image;
ALTER TABLE chefs DROP COLUMN avatar_url;

ALTER TABLE chefs ADD file_id INTEGER REFERENCES files(id);
