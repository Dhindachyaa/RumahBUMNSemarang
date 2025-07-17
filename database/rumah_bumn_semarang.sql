-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2025 at 06:39 AM
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
-- Database: `rumah_bumn_semarang`
--

-- --------------------------------------------------------

--
-- Table structure for table `umkm`
--

CREATE TABLE `umkm` (
  `id` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `pemilik` varchar(100) DEFAULT NULL,
  `kategori` varchar(100) DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `umkm`
--

INSERT INTO `umkm` (`id`, `nama`, `pemilik`, `kategori`, `telepon`, `instagram`, `image_path`) VALUES
('batik-amel', 'Rumah Batik Amel', 'Rizqi Amaliya', 'Perdagangan', '085879851421', '@rumah_batik_amel', 'rumah batik amel', 'images/batik-amel.jpg'),
('laudya-hijab', 'Laudya Hijab', 'Laudya Sari', 'Fashion/Busana', '081234000000', '@laudya_hijab', 'Laudya Hijab', 'images/laudya-hijab.jpg'),
('puzo-gallery', 'Puzo’s Art Gallery', 'Puzo Mahendra', 'Craft/Kerajinan Tangan', '082112345678', '@puzo_gallery', 'puzo art gallery', 'images/puzo-gallery.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `umkm`
--
ALTER TABLE `umkm`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
