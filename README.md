Database - mongoDB
Framework - NodeJs
deployment - heroku + mongoDB Atlas

environment variable to connect to database:
MONGODB_URI = "mongodb+srv://admin:adminpassword@cluster1.v3kke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

database superuser
username: admin
password: adminpassword

git repo:
https://github.com/Migalvao/whitesmith-coding-challenge

live API:
https://whitesmith-challenge.herokuapp.com/

deployment process:
git push heroku master

Endpoints:
https://www.getpostman.com/collections/79f41c87ca6db1e24289

Create job:

route: /jobs
method: POST
body: {
title (must),
description (must),
regime (must),
department (must),

}
