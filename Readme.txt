Description: An application built on node.js which is nothing but a game. This game interacts with the wordnik api.

Instructions: 

node server.js to run the code. Below are the uses.

1. Word Definitions
	Displays definitions of a word. 
	./dict def <word>

2. Word Synonyms
	Displays synonyms of a word. 
	./dict syn <word>
3. Word Antonyms
	Displays antonyms of a word
	./dic ant <word>

4. Word Examples
	Displays examples of a word
	./dict ex <word>

5. Word Full Dict
	Displays all above details for a word
	./dict <word> or ./dict dict <word>

6. Word of the Day Full Dict
	Displays all above details of word of the day
	./dict

7. Word Game
	./dict play
	Displays a definition, synonym, or antonym
	And ask the user to enter the word

	If correct word is entered, program will tell that the word is correct
	If incorrect word is entered, program will ask for
		- 1. try again
			Lets user enter word again

		- 2. hint
			Displays a hint, and let user enter word again
			Hint can be
      Displays the word randomly jumbled (cat -> atc)
      OR Displays another definition of the word
      OR Displays another antonym of the word
      OR Displays another synonym of the word
		-3 quit
			Displays the word, its full dict, and quit
