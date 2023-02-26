# UCL 2023 Hackathon - FoodCycler Application
Application that helps local communities to eliminate food waste in multiple ways!

This project uses NPM, React.js and MySQL, so you will need these technologies up and running on your computer.

To setup, you need to run 'npm install' in both foodcycler-frontend and foodcycler-backend.

Then, you will need to run 'npm start' in the foodcycler-frontend directory and 'npm run dev' in the foodcycler-backend directory. 

Unfortunately, we were not able to host the backend. To work, we used a MySQL Database which you can recreate with the following commands:
CREATE DATABASE `foodcyclerdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `fridge_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `item_name` varchar(45) DEFAULT NULL,
  `item_qty` int DEFAULT NULL,
  `item_weight` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_name_idx` (`user_name`),
  CONSTRAINT `user_name` FOREIGN KEY (`user_name`) REFERENCES `user_table` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_table` (
  `user_password` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`user_name`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

Then, in foodcycler-backend/server.js , update this statement with your own MySQL username, password etc:
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'foodcyclerdb'
})

You can also populate the database with your own sample fridge data. You can create a user and login via the backend.
