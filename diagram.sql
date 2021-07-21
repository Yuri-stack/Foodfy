DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL
);

CREATE TABLE chefs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  file_id INTEGER REFERENCES files(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  reset_token TEXT,
  reset_token_expires TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT(now()),
  updated_at TIMESTAMP DEFAULT(now())
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  preparation TEXT[] NOT NULL,
  information TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  chef_id INTEGER REFERENCES chefs(id),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
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

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ADMIN
INSERT INTO users (name, email, password, is_admin) VALUES ('Admin', 'foodfy@admin.com', '$2a$08$Gfu1JOtjZzxLMpdkppZB6OAj4jWXooqomeRawzOV0U9YqxpVZnTvy', true) RETURNING id

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

CREATE TRIGGER setTimestampUpdated
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_setTimestampUpdated();

CREATE TRIGGER setTimestampUpdated
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_setTimestampUpdated();