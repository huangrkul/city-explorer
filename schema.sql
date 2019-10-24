DROP TABLE people;

CREATE TABLE IF NOT EXISTS people(
 id SERIAL PRIMARY KEY,
 first_name VARCHAR(255),
 last_name VARCHAR(255)
);

INSERT INTO people (first_name, last_name) VALUES ('Will', 'Huang');

--psql -f schema.sql -d demo (terminal)
--psql lives on localhost:5432