***Casey Harding / February 26, 2018***

# Casey Book
## A facebook clone
### Brief Description:
This project is a rough clone of the popular social media site, facebook.
The user will have the ability to create a new account, update that account
friend other accounts, and delete their account.

![wireframe1](planning/wireframe1.jpg)
![wireframe2](planning/wireframe2.jpg)

#### Technologies Used
1. Javascript
2. EJS
3. HTML
4. CSS
5. Express
6. PSQL
7. pg-promise
8. Morgan
9. Method Override
10. Body Parser
11. Express-Session
12. https://ipinfo.io/ to log users general location

#### Approach Taken
I started by implementing a simple two database system. One for users, and one for the friendship connections between the users. Once I had those set and arranged I moved into hashing the passwords and adding a salt to make things secure. I gave users the option to write on their friends profile page / comment on their own.

#### How to Use
You start at the index page and either enter your name and password if you are a returning user or you click the register button where you are taken to a registration page to fill out the required information.

#### Unsolved problems
1. Improve the homepage so that you see the newest posts at the top and/or the posts with the most likes
2. Add time posted to posts
3. Add date and time that the user created their profile

#### Links and Resources
* https://www.facebook.com
* [Color scheme for facebook] http://www.color-hex.com/color-palette/185
* [database setup for friendships]
http://www.codedodle.com/2014/12/social-network-friends-database.html
* [possible further work for database setup...]
https://www.usenix.org/conference/atc13/technical-sessions/presentation/bronson
* [this was a great resource for first setting up my friendship db]
https://dba.stackexchange.com/questions/1688/how-to-design-a-relationship-database-table-to-store-friendship-relationship/1731#1731
