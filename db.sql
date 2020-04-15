CREATE DATABASE covidsms;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE requests
(
    requestID uuid               DEFAULT uuid_generate_v4(),
    userID    TEXT      NOT NULL,
    reason    VARCHAR   NOT NULL,
    created   TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (requestID)
);

CREATE TABLE users
(
    userID        TEXT NOT NULL,
    firstName     TEXT DEFAULT NULL,
    lastName      TEXT DEFAULT NULL,
    birthDay      TEXT DEFAULT NULL,
    lieuNaissance TEXT DEFAULT NULL,
    address       TEXT DEFAULT NULL,
    zipCode       TEXT DEFAULT NULL,
    town          TEXT DEFAULT NULL,
    PRIMARY KEY (userID)
);

CREATE USER covidsms WITH ENCRYPTED PASSWORD 'SECRET';

-- TODO: assign correct rights.
GRANT ALL ON TABLE requests TO covidsms;
GRANT ALL ON TABLE users TO covidsms;

-- userID = md5(phone numer)
INSERT INTO users(userID, firstName, lastName, birthDay, lieuNaissance, address, zipCode, town)
VALUES ('d8bc**',
        'Laurent',
        '***',
        'dd/mm/yyyy',
        '***',
        '***',
        '***',
        '***');

