# filestack-nodejs-test
This is a semi-simple Node.JS app, which uses Handlebars as a template engine, and also uses Express.JS. In order to use it, one needs to supply an API key.

This is just a demonstration app, but the idea is that using the FileStack API, we can upload five files. If the file is a photo, then the thumbnail is displayed with a link that opens up a new window. If the file is a document that the picker can understand, then it will be converted to a thumbnail, while the real document is stored securely in the cloud. If the file is just a general one, then we will provide a way for you to download it. All filename are clickable, and will open in a new browser tab.

Design is not my strong suit, but I pretty much taught myself how Node.JS works, and how Express can make it easier to serve webpages. I liken this to the way the Spring Boot implimentation of the Spring Framework makes web app creation with Java easier.

I did go a little further, using MongoDB instead of MySQL. To interact with the server and the client, we used Mongoose, which essentially makes it so easy to create documents (or records) in the database.

I learned a lot along the way, and this code might not be the prettiest... but it is functional, and was done ahead of schedule.
