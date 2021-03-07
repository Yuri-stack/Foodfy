CREATE DATABASE foodfy;

CREATE TABLE chefs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,

  file_id INTEGER NOT NULL 
  REFERENCES files(id)
  ON UPDATE CASCADE
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  chef_id INTEGER REFERENCES chefs(id),
  title TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  preparation TEXT[] NOT NULL,
  information TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL
);

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY,

  recipe_id INTEGER NOT NULL 
  REFERENCES recipes(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,

  file_id INTEGER NOT NULL 
  REFERENCES files(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

-- FUNCTIONS
CREATE FUNCTION trigger_setTimestampUpdated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGERS
CREATE TRIGGER setTimestampUpdated
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_setTimestampUpdated();
