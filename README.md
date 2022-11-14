# Gaming Shelf - Social Media for Video Game Photography Enthusiasts 

This is a social media, similar to instagram, for video game photography. The platform, using the IGDB API, allows you to follow games that interest you, and see posts from users who post on that games page. You can like, comment and view other users' posts and profiles. The goal was to give people a place to share their photography to other enthusiasts and find a platform away from curated content, in favor of chronological content, similar to a message board. 

**Link to project:** https://gamingshelf.cyclic.app/

![](https://i.imgur.com/QKmv1Ej.gif)

## How It's Made:

**Tech used:** igdb.com API, HTML & EJS, CSS, JavaScript, Axios, MongoDB, Express, Node.js, Passport, Cloudinary, and Bcrypt

This started as a way for me to have an excuse to showcase some of my digital photography with my friends, but I wanted to make a service that people could dig into and make a community out of. Using Node.js, Express, MongoDB, and Cloudinary, the backend of the service uses cloudinary to save the user's photos with MongoDB to store the post information and picture paths. Axios was what was used to make calls to the igdb api, as they had requirements for how you made requests to their API. Passport is used to authenticate user information and Bcrypt is used to keep user's accounts safe from prying eyes. I used a mix of materialize and flex-box to get the layout of the website, but most of the actual code for the pages was EJS and HTML. 

## Optimizations

Aside from the mobile versions hidden sliding menu, there is zero client side javascript! While materialize was used for the fancier animations, the majority of the website uses standardized local CSS coding. When the server communicates with MongoDB and cloudinary, everything is stored inside of a javascript object or an array.

## Lessons Learned:

Check your paths, there was a numerous amount of times when calling to the IGDB API that I was using the right path calls to their API. Reading documentation further would have helped get this project going faster, so reading all the documentation for a software before starting it is a huge boon to production time. Additionally, reusing code across your website, instead of making it from scratch for every page helps with troubleshooting. I revised pages several times to make them all use the same code, because I kept running into issues with troubleshooting.
