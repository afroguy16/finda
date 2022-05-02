# Description
A user search displaying users received from [GitHub User Search API](https://api.github.com/search/users?q=foo%20in:login). Refer to the PDF for full description.

## Setup 
Setup is easy, you will be up and running in a couple of steps
1. Clone this repo
2. Open your terminal and navigate to the folder
3. Run `npm i`
4. Run `npm start` and it should open automatically in your browswer. You could also visit [http://localhost:3000](http://localhost:3000) or whatever url shows up in your terminal. It's going to start with `http:localhost`, but could be prefixed by any open port in your local machine.

## Testing
I attempted to build with TDD (Test driven development), and have as much test coverage as quickly as possible. 
To test the application, in your terminal, run `npm test`

## Aditional Features
I used the modern search feature where the request is sent automatically after some delayed typing from the user, as opposed to submit button, it helps the user experience

## Know Issue
Two failing test, one in the Pagination and the Other in the Search component, a branch has been created to address these issues