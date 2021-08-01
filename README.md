<h1 align="center">
<br><img  src="https://github.com/Yuri-stack/Foodfy/blob/master/public/assets/chef.png?raw=true"  alt="Chef Foodfy" width="240"><br><br>
Foodfy</h1>

<div>
<p align="center">
	<a href="https://www.linkedin.com/in/yuri-silva99/" target="_blank"><img src="https://img.shields.io/static/v1?label=Author&message=Yuri&color=00ba6d&style=for-the-badge&logo=LinkedIn" alt="Author: Yuri"></a>
	<a href="#"><img src="https://img.shields.io/static/v1?label=Language&message=Javascript&color=yellow&style=for-the-badge&logo=JavaScript" alt="Language: Javascript"></a>
	<a href="#"><img src="https://img.shields.io/static/v1?label=Language&message=CSS&color=blue&style=for-the-badge&logo=CSS3" alt="Language: CSS"></a><br>
	<a href="#"><img src="https://img.shields.io/static/v1?label=Template&message=Nunjucks&color=green&style=for-the-badge&logo=Ghost" alt="Template: Nunjucks"></a>
	<a href="#"><img src="https://img.shields.io/static/v1?label=Template&message=Express&color=yellow&style=for-the-badge&logo=Ghost"  alt="Template: Express"></a>
</p>
</div>

## Table of Contents

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#revised-concepts">Revised Concepts</a> • 
 <a href="#installation">Installation</a> • 
 <a href="#getting-started">Getting Started</a> • 
 <a href="#technologies">Technologies</a> • 
 <a href="#license">License</a>
</p>

## 📌About

<div>
  <p align="center">
      FoodFy is a project developed to create an application to manage mouth-watering recipes and find amazing chefs, with administration of the recipes and chefs registration areas. Made with Express, Nunjucks, CSS and PostGres.
  </p>
</div>

## 🚀Features

- 👩‍🍳 Find amazing chefs and mouth-watering recipes 🍤
- 💻 Through an administrative platform, manage chefs and their recipes 🍴
- 👨‍💻 Admin Area and User Area 👩‍💻

## 👓Revised Concepts

- MVC Model
- Creation and connection to the database
- Relationships between tables
- Applying CRUD for users. chefs and recipes
- Individual pages for each recipe and chef
- Search filters
- Pagination
- Image Manager
- Routes Contol

## 📕Installation

**You must have already installed**
- <a href="https://nodejs.org/en/download/">Node.JS</a>
- <a href="https://www.npmjs.com/">NPM</a>
- <a href="https://www.postgresql.org/">Postgresql</a>

**Recommendations**
-   It is recommended that you have installed Google Chrome or Edge
-   I recommend using [VSCode](https://code.visualstudio.com/) as development IDE

**Let's divide it into 4 steps.**
1. Clone this repository
2. Install dependencies
3. Create database
4. Feed the database
---

### 1. Clone this repository
```
$ git clone https://github.com/Yuri-stack/Foodfy
```
---

### 2. Install the dependencies
1. Run the code below
```
npm install
```
*Make sure your internet is stable, as this may take a while*

---

### 3. Create the database

1. Create the Database through the **Diagram.sql** file

2. Create the connection between the project and the database by editing the **db.js** file in the src/config folder with your Postgres Username and Password

### 4. Feed the database

1. Populate the database through the **seed.js** file, executing the code below:
```
node seed.js
```
## 🎮Getting Started

1. Run the code below in your project's main directory.
```
npm start
```

2. Now, open your browser and navigate to: http://localhost:5000

## 🌐Technologies

- [Javascript](https://www.javascript.com/)  
- [Express](https://expressjs.com/pt-br/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
## 📝License

Released in 2021.
This project is under the [MIT license](https://github.com/Yuri-stack/Foodfy/blob/master/LICENSE).
Made with love by [Yuri Oliveira](https://www.linkedin.com/in/yuri-silva99/) 🚀.