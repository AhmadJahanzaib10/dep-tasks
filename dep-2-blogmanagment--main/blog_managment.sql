-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2024 at 01:01 PM
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
-- Database: `blog_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `userid`, `title`, `description`, `date`) VALUES
(2, 1, 'blog1', 'acdncascansdcmkasdncmas', '2024-08-12 01:27:18'),
(3, 1, 'blog2', 'acsacascascscascascas', '2024-08-12 01:31:04'),
(4, 1, 'bl232', 'sdcascascsad', '2024-08-12 01:34:49'),
(5, 1, 'blog65', 'vvvdddasasdscaeceawcwcdscas', '2024-08-12 01:35:14');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `blogid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `text` varchar(200) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `blogid`, `userid`, `text`, `date`) VALUES
(1, 3, 1, 'Great Post', '2024-08-14 00:17:20'),
(2, 3, 1, 'jcsahkchadkc', '2024-08-14 00:34:37'),
(3, 3, 1, 'cscascasc', '2024-08-14 00:35:10'),
(4, 3, 1, 'hjhdhkjhks', '2024-08-14 00:35:45'),
(5, 3, 1, 'jjkkl', '2024-08-14 00:37:32'),
(6, 3, 1, 'cdacjackas', '2024-08-14 00:40:19'),
(7, 2, 1, 'hekadjakls', '2024-08-14 00:41:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `password`, `email`, `timestamp`) VALUES
(1, 'ahmad', '$2a$10$HC2sWE5kdKiTzYUmIJftOek3FMd1CL0NG1B5pgpGPTHanX.BWf0f.', 'j@gmail.com', '2024-08-11'),
(2, 'mubeen', '$2a$10$hpY3Fp122sC/uT0zR.4i0.9ZUKMxi/.cU1C.7VzhVDjPXnj/luWM6', 'b@gmail.com', '2024-08-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
