# PostIt 

&emsp;A web application which features simultaneously post content to multiple social media sites. It gives you analytic and social media monitoring tools. It supports social network integration for Twitter, Facebook and Reddit.

![First page application](https://github.com/danadascalescu00/PostIt/blob/master/Design/Asset%201.png)

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.

### Prerequisites

##### What things you need to install in order to run the application on rour machine and how to install them.

You have to get the lastest version(or above v12.16.2) of [NodeJs](https://www.npmjs.com/get-npm), and you also need to have [Docker](https://hub.docker.com/search?q=&type=edition&offering=community&sort=updated_at&order=desc) and [Docker-compose](https://docs.docker.com/compose/install/) installed.

### Installing

To run it on your machine, you have to open two terminals and type as follows:

#### First Terminal
```
$ cd DockerIntegration
$ docker-compose down && docker-compose build && docker-compose up -d && docker attach docker-node-mongo
```

#### Second terminal

```
$ cd ClientSide/client/
$ npm install
$ npm start
```

## Table of contents
* [About the project](#about-the-project)
* [Features](#features)
* [Running the tests](#running-the-tests)
* [Deployment](#deployment)
* [Built With](#built-with)

## About the project

PostIt app come along to fulfil the needs of organizations, from non-profits and small businesses to big companies, for social media 
monitoring, specialise customer care and taking shortcuts when it comes to post on all of your social channels.

In PostIt1.0v the platform allows you to post text content on multiple social channels at your choice using only one account. In the future versions, 

## Features

 1. **Simplicity**
 &emsp; Isometric design — the latest design trend - was our first choice when it come to make a visual interpretation of our vision because it has a more realistic look while still using flat layers. Another reasons for using this technique was the fact that many people have short attention spans and making a difficult to navigate app will make them to lose interest fast. Clear, uncluttered screens with obvious leads to the next step in the app process and eye-catching design encourage our users to continue to use it.
 
 2. **Speed** 
 
 &emsp; Fast loading screens are vital. No one likes waiting particularly when all they have to look at is a screen-loading symbol which
 soon gives way to boredom resulting in a decision to seek something better. Speed means an appropriate set of graphics and not fetching
 large tables and dataabases. We keep it simple and kee it quick.
 
 3. **Good image resolution**
 
 &emps; We balanced app speed against functionality and resolution, we also ensured that what is on screen is sufficiently detailed to make the user experience worthwhile.
 
 
 4. **Security**
 
 &emps; Internet security is becoming an ever-incresing issue and the same applies for every application. With many applications storing 
 personal and sensitive information or credit and debit card details, security is an absolute must. What diffentiate PostIt App from all 
 other applications 
 
 
 5.

## Running the tests


## Deployment

Add additional notes about how to deploy this on a live system

##### The advantages of deployment and the used of multiple environments in the stages of development the PostIt App.
___

1. **Reducing risk of breaking the live website**

&emsp; One of the main reason for using multiple environments and relying on deployment was to reduce the risk of changes having a negative impact on the website.
While minor changes were easily done directly on the live website, bigger changes had to be done on separate environments without the risk of breaking anything on the live environment. When having multiple contributors working on the same project at the time, it also ensures that no one risks breaking something due to another developer's updates.

2. **Testing new features**

&emsp;Testing new features is crucial in the development stage to ensure that no bugs make it into the final productiion environment. Once we tested all the new features on the local or development environment, we deployed the changes to the new environment in line. Once the  QA testing were done and everything was working in an environment resembling the live one we deployed on the live server. If bugs were discovered along the QA testing a bug report was forwarded. Any changes that did not passed the testing phase were sent back to the local or development environment and once they were fixed they continued to work their way up throug the environments plan.

3. **Saving time**

&emsp; When working in a local environment it is also the advantage of changes processing faster and not be reliant on any connectivity issues.

4. **Time sensitivity content is easier to manage**





## Built With
* **Adobe Illustrator** - The vector graphics editor developed used for the creation of Isometric design.
* **[ReactJs](https://github.com/facebook/react)** - The open-source JavaScript library used for building the user interface.
* **React Bootstrap** - The front-end framework used for building the user interface.
* **Material UI** -  One of the most popular React UI component used for frontend development.
* **Docker CLI** - The plugins used for building, testing, and sharing the containerized application. Docker was used for loading a 
full OS on top of our host system and having certain essential resources emulated.
* **MongoDB** - A NoSQL database used for transactionals store. It is great to used when the perfomnace is a concern and the data  structure evolves over time.

## Authors

* **Ungureanu Liviu Andrei**
* **Stern Cristian David**
* **Gălățan Alex Cristian**
* **Dăscălescu Dana**

See also the list of [contributors](https://github.com/danadascalescu00/PostIt) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


##### Video presentation: 
