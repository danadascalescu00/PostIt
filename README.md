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
* [Running the tests](#running-the-tests)
* [Deployment](#deployment)
* [Built With](#built-with)

## About the project

PostIt app come along to fulfil the needs of organizations, from non-profits and small businesses to big companies, for social media 
monitoring, specialise customer care and taking shortcuts when it comes to post on all of your social channels.

## Running the tests


## Deployment

Add additional notes about how to deploy this on a live system

##### The advantages of deployment and the used of multiple environments in the stages of development the PostIt App.
___

1. **Reducing risk of breaking the live website**

&emsp; One of the main reason for using multiple environments and relying on deployment was to reduce the risk of changes having a negative impact on the website.
While minor changes were easily done directly on the live website, bigger changes had to be done on separate environments without the risk of breaking anything on the live environment. When having multiple contributors working on the same project at the time, it also ensures that no one risks breaking something due to another developer's updates.

2. **Saving time**

&emsp; When working in a local environment it is also the advantage of changes processing faster and not be reliant on any connecrtivity issues



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


##### Presentation video: 
