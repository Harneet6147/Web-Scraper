# Web-Scraper
To read articles from theverge.com
In this project I used nodejs and its library cheerio to scrape data from "theverge.com".
I scraped the data to store it in an array as an array of objects and then used "json2csv library" to convert it to a ".csv" file.
Further I used DB SQLite to make a database out of that csv file.
I used the "datejs" library to rename the csv file as "ddmmyyyy" format whose code I wrote in Date_Formatter.js .

To run the script in your text editor (mine: vscode), type follwoing command:->
                           "npm install"
