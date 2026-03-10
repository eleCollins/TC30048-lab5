//Crea la tabla country
CREATE TABLE country
( id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
capital VARCHAR(255),
currency VARCHAR(255) );
//Opcionalmente, inserta algunos datos de prueba
INSERT INTO country (name, capital, currency) VALUES
('España', 'Madrid', 'Euro'),
('México', 'Ciudad de México', 'Peso Mexicano’),
('Argentina', 'Buenos Aires', 'Peso Argentino');
//Verifica que la tabla se haya creado correctamente
SELECT * FROM country;