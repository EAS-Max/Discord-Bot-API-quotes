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
  ("If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", 'James Cameron'),
  ("Life is what happens when you're busy making other plans.", 'John Lennon'),
  ("Spread love everywhere you go. Let no one ever come to you without leaving happier.", 'Mother Teresa'),
  ("Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live", 'John F. Woods'),
  ("When you reach the end of your rope, tie a knot in it and hang on.", 'Franklin D. Roosevelt'),
  ("Don't judge each day by the harvest you reap but by the seeds that you plant.", 'Robert Louis Stevenson'),
  ("Tell me and I forget. Teach me and I remember. Involve me and I learn.", 'Benjamin Franklin'),
  ("In some ways, programming is like painting. You start with a blank canvas and certain basic raw materials. You use a combination of science, art, and craft to determine what to do with them.", ' Andrew Hunt'),
  ("You were the chosen one! It was said that you would destroy the Sith, not join them! Bring balance to the force, not leave it in darkness!", 'Obi-Wan Kenobi'),
  ("The truth is often what we make of it; you heard what you wanted to hear, believed what you wanted to believe.", 'Obi-Wan Kenobi'),
  ("Do you believe that many of the truths we cling to depend greatly on our own point of view?", 'Obi-Wan Kenobi'),
  ("How lucky I am to have something that makes saying goodbye so hard.", 'Winnie the Pooh'),
  ("If you’re going to be bad, be bad with a purpose or else you’re not worth forgiving.", 'bad guy'),
  ("Do not pity the dead, Harry. Pity the living, and, above all those who live without love.", 'Albus Dumbledore'),
  ("It takes a great deal of bravery to stand up to our enemies, but it takes a great deal more to stand up to our friends.", 'Albus Dumbledore'),
  ("The point is, is it one or two", 'Rhys Morgan'),
  ("If you write working code then you don't need to test it", 'Andrew Williams'),
  ("Someone move in with me dammit!", 'Kaine Bent'),
  ("6 hours of debugging can save you 5 minutes of reading documentation", 'Unknown'),
  ("Wow, does that come in man size?", 'Rhys Morgan')









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