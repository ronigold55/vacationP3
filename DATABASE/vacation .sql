-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 05:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(5, 4),
(5, 13),
(5, 14);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(128) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `email`, `phoneNumber`, `password`, `roleId`) VALUES
(1, 'Roni', 'Gefen', 'roniG', 'ronigf@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
(2, 'Avi', 'Levi', 'avilevi', 'avilevi@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
(3, 'fred', 'fred', 'fredG', 'fredG@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 1),
(4, 'yehi', 'guir', 'yehiG', 'yehiG@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 1),
(5, 'israel', 'israeli', 'israel', 'israel@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `arrivalDate` date NOT NULL,
  `departureDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `arrivalDate`, `departureDate`, `price`) VALUES
(1, 'Roma', 'The first day in Rome should be devoted to an introductory tour of the historic center of the city.', 'Roma.jpg', '2025-01-02', '2025-01-05', 450.00),
(2, 'Barcelona', 'An excellent choice for those who want to enjoy art, landscapes, food, architecture and shopping.', 'Barcelona.jpg', '2024-12-22', '2024-12-31', 670.00),
(3, 'Alaska', 'Alaska is unique and combines sea and glaciers, mountains, forests and animals.', 'Alaska.jpg', '2025-02-10', '2025-02-20', 850.00),
(4, 'Budapest', 'The capital of Hungary is one of the friendliest destinations for Israelis.', 'Budapest.jpg', '2024-11-29', '2024-12-04', 500.00),
(5, 'Morocco', 'Just sand and mountains? Absolutely not, fascinating culture and landscapes that are out of this world.', 'Morocco.jpg', '2025-04-05', '2025-04-19', 580.00),
(6, 'London', 'Attracts many tourists especially to the Queens Guard and the famous Big Ben.', 'London.jpg', '2024-12-04', '2024-12-12', 680.00),
(7, 'Sinai', 'The Sinai Peninsula enchants the Israeli traveler with great beaches and a lot of peace.', 'Sinai.jpg', '2025-02-10', '2025-03-11', 350.00),
(8, 'Japan', 'In recent years, Japan has become one of the most desirable and popular destinations in the world.', 'Japan.jpg', '2025-02-22', '2025-03-05', 1100.00),
(9, 'Cyprus', 'The relatively cheap price makes Cyprus a popular and sought-after destination for a perfect summer vacation.', 'Cyprus.jpg', '2024-12-25', '2025-01-14', 220.00),
(10, 'Dubai', 'The charm of this place - from a small fishing village, has become in 60 years no less than a powerhouse.', 'Dubai.jpg', '2025-01-02', '2025-01-15', 800.00),
(11, 'Dublin', 'One of the most intriguing destinations in Europe for the Israeli traveler.', 'Dublin.jpg', '2024-12-26', '2025-01-09', 580.00),
(12, 'Paris', 'The city of lights, romantic and chic, beauty and French style.', 'Paris.jpg', '2025-02-05', '2025-02-10', 420.00),
(13, 'Brazil', 'A beautiful tropical land, a land of carnivals, samba, football and a lot of shades and colors.', 'Brazil.jpg', '2025-02-26', '2025-03-10', 880.00),
(14, 'Arizona', 'The Grand Canyon, in northern Arizona, is one of the most impressive natural sites in the world.', 'Arizona.jpg', '2025-01-14', '2025-01-31', 750.00),
(15, 'India', 'You can decide what India is for you after you taste everything it has to offer.', 'India.jpg', '2025-01-01', '2025-01-13', 672.00),
(16, 'Eilat', 'At the south of Israel.the right place to  do : sea sport ,diving  with beautiful hotels and restaurants', 'Eilat.jpg', '2025-02-11', '2025-02-20', 550.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
