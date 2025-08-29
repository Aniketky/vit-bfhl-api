// index.js

const express = require('express');

const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;


app.post('/bfhl', (req, res) => {
    try {
        
        const data = req.body.data;

       
        const userId = "john_doe_17091999";
        const email = "john@xyz.com";
        const rollNumber = "ABCD123";

       
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let alphabeticalChars = '';

       
        data.forEach(item => {
           
            if (!isNaN(item)) {
                const number = parseInt(item, 10);
                sum += number;
                if (number % 2 === 0) {
                    evenNumbers.push(item.toString());
                } else {
                    oddNumbers.push(item.toString());
                }
            } 
           
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabeticalChars += item;
            } 
           
            else {
                specialCharacters.push(item);
            }
        });

        
        const reversedAlphabets = alphabeticalChars.split('').reverse().join('');
        let concatString = '';
        
        for (let i = 0; i < reversedAlphabets.length; i++) {
    if (i % 2 === 0) { 
        concatString += reversedAlphabets[i].toUpperCase();
    } else { 
        concatString += reversedAlphabets[i].toLowerCase();
    }
}

        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
      
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            error_message: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});