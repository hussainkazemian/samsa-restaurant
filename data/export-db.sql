-- MariaDB dump 10.19-11.3.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: samsa_restaurant_app
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`productid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `menuid` int(11) NOT NULL AUTO_INCREMENT,
  `menuname` varchar(100) NOT NULL,
  PRIMARY KEY (`menuid`),
  UNIQUE KEY `menuid_UNIQUE` (`menuid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES
(1,'Main Dishes'),
(2,'Kebabs'),
(3,'Vegetarian Dishes'),
(4,'Appetizers'),
(5,'Drinks');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES
(1,5,'a7a79dafd961b553c523ec47bf367747b1ce198538bfc43cd5baea2b0a01519f','2024-12-04 14:00:30','2024-12-04 11:00:30'),
(2,4,'113567574a051332ab25638c6d1bdd4384a447ff8606b77086394dd485d7d2c8','2024-12-04 14:08:39','2024-12-04 11:08:39'),
(3,4,'24faf754f73a0517943c862c629d092b9f22e0f3d3ecec0aadbc5aea18d9fe64','2024-12-04 14:13:01','2024-12-04 11:13:01'),
(4,4,'dab68574f8ad70a15950ba6cf09d6f1cffd0d65439799cb3c3c61db1fdf47586','2024-12-04 14:13:43','2024-12-04 11:13:43');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `productname` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `homepage` tinyint(1) DEFAULT 0,
  `approval` tinyint(1) DEFAULT 0,
  `price` decimal(10,2) DEFAULT NULL,
  `menuid` int(11) NOT NULL,
  PRIMARY KEY (`productid`),
  UNIQUE KEY `productid_UNIQUE` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES
(1,'Big Plate Chicken','Hand-pulled Linguine, Marinated Bone-in Chicken, Potato, Onion, Mix Peppers, Chilli, Soy Sauce.','6.jpeg',0,1,29.55,1),
(2,'Lamb Kebab - xxd','Chunks of lamb marinated in cumin and house spices and served on a skewer.','2.jpg',0,1,7.35,2),
(3,'Stir-fired Veg Spaghetti','Hand-pulled Spaghetti, Onion, Tofu, Celery, Mix Peppers, Chili Oil, Soy Sauce .','5.jpeg',0,1,10.50,3),
(4,'Red Cabbage Salad','Purple Cabbage, Onion, Garlic, Vinegar, Soy Sauce, Mix Sesame Oil.','1.jpeg',1,1,5.25,2),
(5,'Roasted spicy pasta','Uyghur-styled signature fried noodles with chives, onions, red bell peppers shrimp.','4.jpg',1,1,11.75,1),
(6,'Uyghur Laghman','Stir-Fried Green Beans, Dried Chili, Garlic,peppers and Mix Sesame.','3.jpg',0,1,9.50,1),
(7,'Garlicky Green Beans','Stir-Fried Green Beans, Dried Chili, Garlic,peppers and Mix Sesame.','7.png',1,1,8.15,3),
(8,'Lamb Kebab','Chunks of lamb marinated in cumin and house spices and served on a skewer','8.png',1,1,5.95,2),
(9,'Goshnan','Traditional Uyghur-style meat pie stuffed with specially flavored beef and lamb and mixed with onions (10 minutes preparation time)','9.png',1,1,15.25,1),
(10,'Roasted spicy pasta','Uyghur-styled signature fried noodles with chives, onions, red bell peppers shrimp.','10.jpg',1,1,10.55,1),
(11,'Lentil Soup (Veggie)\n','Lentil, wheat flour, onions, potatoes, red chili sauce, and tomato sauce, combined in a veggie broth base and sprinkled with mint','11.jpg',1,1,7.75,4),
(12,'Beef Noodle Soup\n','Beef, Onion, Scallion, Cilantro, Green Radish Noodles, and Spicy Chili Oil.','12.jpeg',1,1,11.50,4);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `num_adults` int(11) NOT NULL DEFAULT 0,
  `num_children` int(11) DEFAULT NULL,
  `reservation_time` datetime NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`reservation_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES
(1,NULL,'mrai','maria@gmail.com',2,2,'2000-12-12 12:00:00','nothing','2024-12-04 09:36:25'),
(2,NULL,'marian','marian@maria.com',2,2,'2024-12-12 21:00:00','sitting on the table :)','2024-12-04 11:48:42'),
(3,6,'marian','marian@maria.com',0,NULL,'2024-12-12 12:00:00','nothings','2024-12-04 12:42:58'),
(4,7,'hussain','hashem@gmail.com',0,NULL,'2024-12-12 12:00:00','onothign','2024-12-04 13:55:15'),
(5,NULL,'james','james@hames.com',0,NULL,'2024-12-12 21:00:00','nothing sitting ','2024-12-04 14:03:25'),
(6,NULL,'huss','nihad@metro.com',0,NULL,'2024-12-12 21:00:00','nothing','2024-12-04 14:18:19'),
(7,NULL,'mari','marian@maria.com',0,NULL,'2024-12-12 21:00:00','jie ensief ','2024-12-04 14:19:55'),
(8,6,'disef','jiefs@mfis.co',0,NULL,'2024-12-12 12:00:00','ieggs','2024-12-04 14:25:17'),
(9,6,'marin','marian@maria.com',0,NULL,'2024-12-12 21:00:00','norugn','2024-12-04 14:35:33'),
(10,NULL,'ijddkrogd1','jisjiefdf@gmsl.com',0,NULL,'2024-12-12 21:00:00','jidjri owke s','2024-12-04 14:36:19'),
(11,NULL,'HASHEM','hashem@gmail.com',0,NULL,'2024-12-12 21:00:00','fokob','2024-12-04 15:00:37'),
(12,NULL,'narida','marian@maria.com',0,NULL,'2024-12-12 21:00:00','fokdorkg','2024-12-04 15:02:19'),
(13,6,'mad','marian@maria.com',0,NULL,'2024-12-12 21:00:00','dslgpoeslf','2024-12-04 15:03:23'),
(14,6,'mname','marian@maria.com',0,NULL,'2025-01-21 21:00:00','öokrokgo s','2024-12-04 15:10:57'),
(15,6,'marian','marian@maria.com',0,NULL,'2025-02-12 15:02:00','kokdr ','2024-12-04 15:25:34'),
(16,6,'marian','marian@maria.com',2,10,'2024-12-12 21:00:00','notihnfsujeif ','2024-12-04 15:45:20'),
(17,6,'mari','marian@maria.com',50,12,'2025-12-12 19:05:00','nothings instaead of thiesif ','2024-12-04 15:56:18');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'urumci','jasiin358@gmail.com','$2b$10$yGatB6LR6Agga5s140eLpOzmif3FbS8UXwtjzctyXQgu4vLni6z.G','2024-11-25 19:51:17'),
(2,'yasin','jasiin@gmail.com','$2b$10$jPxQX3uJjqRHrlMkpEmc4uEltgUTT2ln95yrPYxplYRK8UYkXjSva','2024-11-25 19:54:31'),
(3,'kasimjan','kasim@ksjs.com','$2b$10$RQs90pWnayrIZkVCgZFcPOzfJUNPAJzoMGZQPbnFLkLQl7J8AFFA.','2024-11-25 20:10:01'),
(4,'kamil','kamil@ksj.com','$2b$10$KGkq32mc.Je.Pe93bn5YQ.R4P/A5fnolGRN.yHCOC5C2JZvQT7gYm','2024-11-25 20:19:09'),
(5,'taku','ddd58@gmail.com','$2b$10$n8NTXhSggZv34zYYvSzArOQqDMuPK23sFNRJ/QNuR74wl8DKXBfX.','2024-11-26 10:30:29'),
(6,'marian','marian@maria.com','$2b$10$tkTPMp7ioHyHJoVY8vKpY.LVgyDkQiWEN.VEAqbIFS6NDfsMuMrE.','2024-12-04 09:34:06'),
(7,'hashem','hashem@gmail.com','$2b$10$LAd6KPNQAghsbK49qLxySOFBhnGe8hmvR.2JFEnpamoM5ZiG0CgHe','2024-12-04 12:15:55'),
(8,'Nihad','nihad@metro.com','$2b$10$KIIXzp7ce56rzlKMGUeRv.rnL9nZAdrXo.t8K5wi8A0JdbAGxlk5S','2024-12-04 14:05:48'),
(9,'newuser','newuser@usr.com','$2b$10$xTT9jXAs.63tMO0UmOaoyO0QqkEpSEv.2WNl2.i1KHSmfkQnl4Yry','2024-12-04 14:36:52'),
(10,'musa','musa@gmail.com','$2b$10$Z9F9RMQ4WVJ.wvKAGqrbb.pM/J.55Lj5TGc7Xppf/wUdijs9rJ586','2024-12-04 16:08:05'),
(11,'Ulla','Ulla@metro.com','$2b$10$WO4gbIKoj0z0m./tPzlbUO8rBB5oObg8PkBG8O5NkU5hdn8TGIT7W','2024-12-04 16:16:11'),
(12,'chera','chera@gs.com','$2b$10$Vn8GIpBB12eYJzvXqcIRH.54smqwk2NDQkFZheoHnJ.csbuNnO5le','2024-12-04 16:17:25'),
(13,'javad','javad@metro.com','$2b$10$htCBOKbnhcDhUnSgS0kPBep2F.xD5O5tuSmUwF00v6vgMj.9buPZi','2024-12-04 16:18:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04 18:56:03
