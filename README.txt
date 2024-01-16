API setup:

Todo app has five routes, which include:
(1) create a new todo item
(2) index all created todo items
(3) get a specific created todo item
(4) update a todo item
(5) delete todoitem

Unit Testing:

You can run the API just by running npm run dev.

To test automatically, you need only run npm run test.

The tests are set up in the todo.test.js file and are meant to check the functionality of each of the five routes.

The tests for (1), (4), and (5) all passed the supertest. However, both (2) and (3) fail because the response body is empty (null).
Weirdly, both routes pass when I check them manually with Postman, so my guess is that something is wrong with the supertest setup itself rather than with the routes.

Load Testing:

I couldn't get this to work, as I kept getting the error "ECONNREFUSED: 1200", so none of the scenarios or requests are completed during the test.  At one point I was able to get some numbers as to the app speed, but it still gave a status of 404.  

I'll continue trying to get it to work, but I may need to attend office hours to find out just what's gone wrong.  I did some trouble shooting based on a few articles online, but nothing fixed it.  