DROP TABLE IF EXISTS quotes;
CREATE TABLE quotes (
  id         INT AUTO_INCREMENT NOT NULL,
  quote      VARCHAR(300) NOT NULL,
  person      VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO quotes 
  (quote,
  person) 
VALUES
  ('The greatest glory in living lies not in never falling, but in rising every time we fall.', 'Nelson Mandela'),
  ('The way to get started is to quit talking and begin doing.', 'Walt Disney'),
  ("Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.", 'Steve Jobs'),
  ('If life were predictable it would cease to be life, and be without flavor.', 'Eleanor Roosevelt'),
  ("If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", 'Oprah Winfrey'),
  ("If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", 'James Cameron')







--------------------------------------------------------------------------------------------------------------------







DROP TABLE IF EXISTS actions;
CREATE TABLE actions (
  id         INT AUTO_INCREMENT NOT NULL,
  title      VARCHAR(128) NOT NULL,
  command     VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO actions 
  (title, command) 
VALUES 
  ('Example action 1', '!dosomething'),
  ('Example action 2', '!dosomethingelse');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id    INT AUTO_INCREMENT NOT NULL,
  username  VARCHAR(128) NOT NULL,
  usertype  FOREIGN KEY REFERENCES users(id),
  PRIMARY KEY (`id`)
);

INSERT INTO users 
  (username, usertype) 
VALUES
  ('Example user 1', ''),
  ('Example user 2', '!dosomethingelse');