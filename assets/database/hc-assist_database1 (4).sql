-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 07:02 AM
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
-- Database: `hc-assist_database1`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail`
--

CREATE TABLE `audit_trail` (
  `audit_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `date_performed` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `child_history`
--

CREATE TABLE `child_history` (
  `child_history_id` int(11) NOT NULL,
  `history_date` date NOT NULL,
  `child_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `child_nutrition`
--

CREATE TABLE `child_nutrition` (
  `child_id` int(11) NOT NULL,
  `child_status` varchar(30) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `blood_pressure` float DEFAULT NULL,
  `heart_rate` float DEFAULT NULL,
  `patient_id` int(11) NOT NULL,
  `vitamins_id` int(11) DEFAULT NULL,
  `temperature` int(11) DEFAULT NULL,
  `guardian` varchar(100) DEFAULT NULL,
  `guardian_contact` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_nutrition`
--

INSERT INTO `child_nutrition` (`child_id`, `child_status`, `weight`, `height`, `blood_pressure`, `heart_rate`, `patient_id`, `vitamins_id`, `temperature`, `guardian`, `guardian_contact`) VALUES
(2, 'ok', 1, 1, 1, 1, 37, NULL, 1, 'you', '091838123'),
(4, 'not okay', 1, 1, 1, 1, 37, NULL, 1, '1', '1'),
(5, 'gg', 1, 1, 1, 1, 37, NULL, 1, '1', '1'),
(6, 'ok', 2, 2, 2, 2, 40, NULL, 2, '2', '2'),
(7, 'Good', 25, 25, 25, 25, 36, NULL, 25, 'Deborah Malinao', '09453323643'),
(8, 'Good', 35, 32, 55, 12, 24, NULL, 23, 'Carlo Macatimpag', '098928483948');

-- --------------------------------------------------------

--
-- Table structure for table `contagious_disease`
--

CREATE TABLE `contagious_disease` (
  `disease_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `disease_name` varchar(100) DEFAULT NULL,
  `diagnosis_date` date DEFAULT NULL,
  `disease_status` varchar(30) DEFAULT NULL,
  `administered_by` varchar(100) DEFAULT NULL,
  `disease_stage` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contagious_disease`
--

INSERT INTO `contagious_disease` (`disease_id`, `patient_id`, `disease_name`, `diagnosis_date`, `disease_status`, `administered_by`, `disease_stage`) VALUES
(1, 1, 'tuber', '2024-09-02', '1', '1', NULL),
(4, 34, 'COVID', NULL, 'Not good', NULL, '3'),
(5, 19, 'Tuberculosis', '2024-10-09', 'Okay', NULL, 'Uh oh'),
(6, 37, 'ad', '2024-10-02', 'ads', NULL, 'ads'),
(7, 29, 'asda', '2024-10-02', 'dasdasd', NULL, 'csc'),
(8, 37, 'dsvsd', '2024-10-10', 'nfsj', NULL, ''),
(9, 37, 'dsvsd', '2024-10-10', 'nfsj', NULL, 'asa'),
(10, 37, 'dsvsd', '2024-10-10', 'nfsj', NULL, 'asa'),
(11, 37, 'asca', '2024-10-09', 'vsdv', NULL, ''),
(12, 39, 'Alcohol Addiction', '2024-10-17', 'Unwell', NULL, '1'),
(13, 37, 'g', '2024-10-16', 'good', NULL, ''),
(14, 39, 'TB', '2024-10-08', 'treated', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `disease_schedule`
--

CREATE TABLE `disease_schedule` (
  `disease_schedule_id` int(11) NOT NULL,
  `activity` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `disease_schedule_date` date NOT NULL,
  `disease_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `immunization`
--

CREATE TABLE `immunization` (
  `immunization_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `immunization_name` varchar(100) DEFAULT NULL,
  `administered_date` date DEFAULT NULL,
  `administered_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `immunization`
--

INSERT INTO `immunization` (`immunization_id`, `patient_id`, `immunization_name`, `administered_date`, `administered_by`) VALUES
(2, 37, 'eew', '2024-10-03', 'weff'),
(4, 37, 'asd', '2024-10-23', 'asd'),
(5, 38, 'Fizer', '2024-10-11', 'Sergio'),
(6, 39, 'Fizer', '2024-10-02', 'Jeremy'),
(7, 40, 'Fizer', '2024-10-08', 'victor'),
(8, 40, 'Phizer', '2024-11-12', 'jose'),
(9, 36, 'Fizer', '2024-11-12', 'Ryan Goden');

-- --------------------------------------------------------

--
-- Table structure for table `immunization_schedule`
--

CREATE TABLE `immunization_schedule` (
  `immunization_schedule_id` int(11) NOT NULL,
  `activity` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `immunization_schedule_date` date NOT NULL,
  `immunization_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `item_name` varchar(50) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `item_name`, `brand`, `category`, `stock`, `price`, `image`) VALUES
(2, 'Cherifer', 'brand', 'MEds', 12, 112, NULL),
(3, 'Omixodiosiln', 'Cherifer', 'Medicine', 12, 123, NULL),
(4, 'Cherifer', 'Cherifer', 'Medicine', 12, 112, NULL),
(5, 'Cherifer', 'brand', 'Medicine', 12, 12, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `purok` varchar(100) DEFAULT NULL,
  `household` varchar(100) DEFAULT NULL,
  `civil_status` varchar(30) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `blood_type` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `first_name`, `middle_name`, `last_name`, `birth_date`, `gender`, `purok`, `household`, `civil_status`, `image`, `age`, `contact_number`, `blood_type`, `password`) VALUES
(19, 'Mark', 'Lapa', 'Cualbar', '2024-08-28', '3443', 'Rosasa', 'House', 'SIngle', NULL, 21, '09872637881', 'B', NULL),
(24, 'Nico', 'Edisan', 'Edisan', '1212-12-12', 'nafnasjndj', 'Bartolome', 'njknjnjk', 'nkjnkj', NULL, 1, '09531088345', 'jnnjk', NULL),
(36, 'Raymonda', 'Bayo', 'Man', '0000-00-00', '1', 'Bartolome', 'Bartolome', 'Single', NULL, 1, '09531088345', '1', NULL),
(42, 'Chengkee', 'Fua', 'Ho', '0000-00-00', 'Female', 'Gumamela', 'Ho', 'Single', NULL, 36, '09531088345', 'B+', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pregnant`
--

CREATE TABLE `pregnant` (
  `pregnant_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `expected_due_date` date DEFAULT NULL,
  `pregnancy_status` varchar(20) DEFAULT NULL,
  `father` varchar(100) DEFAULT NULL,
  `father_contact` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pregnant`
--

INSERT INTO `pregnant` (`pregnant_id`, `patient_id`, `start_date`, `expected_due_date`, `pregnancy_status`, `father`, `father_contact`) VALUES
(4, 37, '2024-10-30', '2024-10-09', 'good', 'owoero', 'fwkef'),
(7, 40, '2024-10-09', '2024-10-15', '1st', 'hh', 'gg'),
(8, 40, '2024-10-08', '2024-10-22', '1st trimester', '', ''),
(11, 42, '2024-11-24', '2025-03-24', '1st trimester', 'Ramon Magsaysay', '098772838593');

-- --------------------------------------------------------

--
-- Table structure for table `pregnant_schedule`
--

CREATE TABLE `pregnant_schedule` (
  `pregnant_schedule_id` int(11) NOT NULL,
  `pregnant_id` int(11) NOT NULL,
  `pregnant_schedule_date` date NOT NULL,
  `activity` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `referral_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `referral_date` date DEFAULT NULL,
  `approval_status` varchar(20) DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `referrals`
--

INSERT INTO `referrals` (`referral_id`, `patient_id`, `staff_id`, `description`, `referral_date`, `approval_status`, `signature`) VALUES
(1, 2, 2, '2', '2024-09-04', NULL, NULL),
(6, 31, 0, 'as', NULL, 'as', NULL),
(7, 31, 0, 'hahah', NULL, 'no thanks', NULL),
(9, 37, 0, 'Lost his leg', '2024-10-16', 'Not Approved', NULL),
(13, 37, 0, 'Lost his leg', '2024-10-10', 'Not Apporved', NULL),
(14, 40, 0, 'asdask', '2024-10-09', 'Not Approved', NULL),
(15, 40, 0, 'heart attack', '2024-10-15', 'Pending', NULL),
(16, 24, 0, 'ascasdas', '2024-11-22', 'Approved', NULL),
(17, 1, 0, 'Hello I am dead', '2024-11-22', 'Pending', NULL),
(18, 1, 0, 'sick', '2024-11-23', 'Pending', NULL),
(19, 24, 0, 'sick', '2024-11-13', 'Approved', NULL),
(20, 24, 0, 'Lost his leg', '2024-11-18', 'Approved', NULL),
(21, 1, 0, 'Covid', '2024-11-24', 'Pending', NULL),
(22, 1, 0, 'I am Sick', '2024-11-25', 'Pending', NULL),
(23, 44, 0, 'Lost his leg', '2024-10-30', 'Approved', NULL),
(24, 1, 0, 'sick', '2024-11-25', 'Pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `purok_assigned` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `civil_status` varchar(30) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `first_name`, `middle_name`, `last_name`, `birth_date`, `gender`, `purok_assigned`, `position`, `civil_status`, `image`, `signature`, `age`, `contact_number`, `password`, `username`) VALUES
(2, 'Lawrenz', 'Capangpangan', 'Carisusa', NULL, 'Male', NULL, 'Admin', 'Not Married', NULL, NULL, 23, '09987889182', '12345', 'Dhaniel Malinao'),
(14, 'Marc', 'Larp', 'Cualbar', NULL, 'Male', 'red', 'Admin', 'Not Married', NULL, NULL, 21, '098881283812', '123', 'Marc Cualbar'),
(21, 'James', 'Mama', 'Catadman', NULL, 'Admin', 'Jasmin', 'Staff', '23', '', '', 11, '09453323643', '12345', 'James Catadman'),
(22, 'Ramon', 'Mag', 'Magsaysay', NULL, 'Admin', 'Jasim', 'Midwife', '23', '', '', 11, '09453323643', '12345', 'Ramon Magsaysay'),
(23, 'Marc Gil', 'Fua', 'Ho', NULL, 'Admin', 'Rosas', 'Admin', 'Single', '', '', 39, '09453323643', '12345', 'Marc Gil Ho'),
(24, 'Elvin', 'Roxas', 'Harap', NULL, 'Admin', 'Petal', 'Admin', '25', '', '', 906347721, '09453323643', '12345', 'Elvin Harap'),
(25, 'elvie', 'Kobe', 'harap', NULL, 'Staff', 'BHW', 'Staff', '23', NULL, NULL, 98765432, '', '', 'elvie harap');

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `steps_id` int(11) NOT NULL,
  `workflow_id` int(11) NOT NULL,
  `step_name` varchar(50) DEFAULT NULL,
  `sequence` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workflow`
--

CREATE TABLE `workflow` (
  `workflow_id` int(11) NOT NULL,
  `staff_Id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workflow`
--

INSERT INTO `workflow` (`workflow_id`, `staff_Id`, `title`, `description`) VALUES
(1, 1, 'title', 'asdnasdnasd'),
(2, 5, 'How to sign up a patient', 'A full guide on how to sign up a patient'),
(3, 5, 'How make  a referral', 'A full guide on how to make a referral\r\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_trail`
--
ALTER TABLE `audit_trail`
  ADD PRIMARY KEY (`audit_id`);

--
-- Indexes for table `child_history`
--
ALTER TABLE `child_history`
  ADD PRIMARY KEY (`child_history_id`);

--
-- Indexes for table `child_nutrition`
--
ALTER TABLE `child_nutrition`
  ADD PRIMARY KEY (`child_id`);

--
-- Indexes for table `contagious_disease`
--
ALTER TABLE `contagious_disease`
  ADD PRIMARY KEY (`disease_id`);

--
-- Indexes for table `immunization`
--
ALTER TABLE `immunization`
  ADD PRIMARY KEY (`immunization_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `pregnant`
--
ALTER TABLE `pregnant`
  ADD PRIMARY KEY (`pregnant_id`);

--
-- Indexes for table `pregnant_schedule`
--
ALTER TABLE `pregnant_schedule`
  ADD PRIMARY KEY (`pregnant_schedule_id`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`referral_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`steps_id`);

--
-- Indexes for table `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`workflow_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_trail`
--
ALTER TABLE `audit_trail`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `child_history`
--
ALTER TABLE `child_history`
  MODIFY `child_history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `child_nutrition`
--
ALTER TABLE `child_nutrition`
  MODIFY `child_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contagious_disease`
--
ALTER TABLE `contagious_disease`
  MODIFY `disease_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `immunization`
--
ALTER TABLE `immunization`
  MODIFY `immunization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `pregnant`
--
ALTER TABLE `pregnant`
  MODIFY `pregnant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `pregnant_schedule`
--
ALTER TABLE `pregnant_schedule`
  MODIFY `pregnant_schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `referral_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `steps_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow`
--
ALTER TABLE `workflow`
  MODIFY `workflow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
