-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2023 at 12:13 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maf_all_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_users`
--

CREATE TABLE `all_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comandlalID` int(11) NOT NULL,
  `unitID` int(11) DEFAULT NULL,
  `unitSubID` int(11) DEFAULT NULL,
  `rankParentID` int(11) NOT NULL,
  `rankTypeID` int(11) NOT NULL,
  `rankID` int(11) NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rd` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` int(11) NOT NULL,
  `age` int(3) DEFAULT NULL,
  `position` varchar(250) CHARACTER SET utf8mb4 DEFAULT NULL,
  `image` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `foreignPass` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foreignFinishDate` date NOT NULL DEFAULT '2010-01-01',
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `dundiinTulv` int(2) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `all_users`
--

INSERT INTO `all_users` (`id`, `comandlalID`, `unitID`, `unitSubID`, `rankParentID`, `rankTypeID`, `rankID`, `firstName`, `lastName`, `rd`, `gender`, `age`, `position`, `image`, `foreignPass`, `foreignFinishDate`, `phone`, `email`, `created_at`, `updated_at`, `dundiinTulv`) VALUES
(1, 1, 23, NULL, 1, 4, 6, 'ЭДЦХАХ', 'ЭДЦХАХ', 'ТЗ85101317', 11, 38, 'ЭДЦХАХ-ийн мэргэжилтэн', '0', NULL, '2010-01-01', '99119911', '', '2023-05-23 06:44:14', '2023-05-23 06:44:14', 0),
(2, 1, 1, NULL, 1, 4, 8, 'ЗХЖШ', 'ЗХЖШ', 'зх89072113', 11, 34, 'Мэргэжилтэн', '0', NULL, '2010-01-01', '88118811', 'comandlal_gs@gmail.com', '2023-05-23 07:09:36', '2023-06-22 08:24:31', 0),
(3, 3, 3, NULL, 1, 4, 9, 'ХЗЦК', 'ХЗЦК', 'ХЗ82100514', 11, 41, 'Хүний нөөцийн офицер', '0', NULL, '2010-01-01', '88128812', 'comandlal_hz@gmail.com', '2023-05-23 07:11:09', '2023-06-06 08:40:17', 0),
(4, 1, 29, NULL, 1, 4, 7, 'Амарбаясгалан', 'Бадрах', 'ИН91030624', 22, NULL, 'Хүний нөөцийн офицер', '0', NULL, '2010-01-01', '99056158', '', '2023-05-23 07:14:57', '2023-05-23 07:14:57', 0),
(5, 1, 9, NULL, 1, 4, 8, 'Батсүх', 'Ган-эрдэнэ', 'ГБ90082316', 11, NULL, 'Хүний нөөцийн офицер', '0', NULL, '2010-01-01', '99615805', '', '2023-05-23 07:16:20', '2023-05-23 07:16:20', 0),
(6, 1, 29, NULL, 1, 4, 9, 'Чинбат', 'Ганбат', 'ШЗ83070316', 11, 40, 'Холбооны жижүүр', '0', 'E1393115', '2025-10-01', '99895826', 'chinbat@gmail.com', '2023-05-23 07:20:24', '2023-06-23 14:39:49', 0),
(7, 1, 29, NULL, 1, 4, 9, 'Цэвэгдорж', 'Цэрэнбалжир', 'ЖН82092570', 11, NULL, 'Соёл хүмүүжлийн офицер', '0', 'E1393354', '2024-09-10', '88295859', '', '2023-05-23 07:22:00', '2023-05-23 07:47:49', 0),
(8, 1, 29, NULL, 1, 4, 8, 'Волга', 'Ахыт', 'БЛ90090195', 11, NULL, 'Автоматжуулсан хэрэгслийн засварын инженер', '0', 'E1393258', '2025-11-06', '89015592', '', '2023-05-23 07:23:38', '2023-05-23 07:48:16', 0),
(10, 0, 0, NULL, 1, 4, 6, 'Батболор', 'Мөнхнасан', 'ТК99070917', 11, NULL, 'Цэргийн мэдээллийн сангийн инженер, десктоп программ зохиогч', '0', 'E1393247', '2026-12-01', '99727398', '', '2023-05-23 07:26:23', '2023-06-20 10:20:00', 1),
(11, 1, 29, NULL, 1, 4, 6, 'Төгөлдөр', 'Батболд', 'ЙК0011337_', 11, 26, 'ШТМ-орон сууцны офицер', '0', 'E1393654', '2026-10-10', '99965167', 'batboltuguldur@gmail.com', '2023-05-23 07:30:06', '2023-06-08 03:53:23', 0),
(12, 3, 23, NULL, 1, 5, 3, 'Өлзийбаяр', 'Мандах', 'МО91012618', 11, NULL, 'Нярав', '0', 'E1393789', '2025-10-23', '88002628', '', '2023-05-23 07:31:27', '2023-05-23 07:51:31', 0),
(13, 1, 23, NULL, 1, 5, 2, 'Отгонбаатар', 'Баатархүү', 'ПД96072111', 11, NULL, 'Ахлах харуулчин дэлгэцийн хянагч', '0', 'E1339264', '2024-06-10', '80326548', '', '2023-05-23 07:33:16', '2023-05-23 07:51:58', 0),
(14, 1, 23, NULL, 1, 5, 2, 'Амарбаатар', 'Цогтсайхан', 'УЗ92031272', 11, NULL, 'Нярав, жолооч', '0', 'E1362325', '2024-09-26', '92131502', '', '2023-05-23 07:34:19', '2023-05-23 07:52:34', 0),
(15, 3, 23, NULL, 1, 5, 2, 'Мөнгөнсаран', 'Пүрэвдорж', 'МЮ94032029', 22, NULL, 'Телефоны ХНХ-ийн техникч', '0', 'E1363298', '2026-11-24', '89090934', '', '2023-05-23 07:35:47', '2023-06-22 03:46:49', 0),
(16, 1, 23, NULL, 1, 5, 2, 'Ганжаргал', 'Гансүх', 'МЛ90022271', 11, 26, 'Харуулчин, тасгийн пулемётчин', '0', 'E1339681', '2027-10-12', '92136542', 'ganjargal@gmail.com', '2023-05-23 07:36:36', '2023-06-08 07:00:25', 0),
(17, 1, 23, NULL, 1, 5, 2, 'Батнасан', 'Насанжаргал', 'ИР92061517', 11, NULL, 'Тоон радио, радиорелей нягтруулгын техникч', '0', 'E1335613', '2027-10-20', '99603718', '', '2023-05-23 07:37:38', '2023-05-23 07:53:49', 0),
(18, 1, 23, NULL, 1, 5, 2, 'Баянзул', 'Чойриг', 'ОЭ85112670', 11, NULL, 'Тоон радио, радиорелей нягтруулгын техникч', '0', 'E1339481', '2027-09-07', '99765793', '', '2023-05-23 07:38:43', '2023-05-23 07:54:09', 0),
(19, 1, 23, NULL, 1, 5, 2, 'Доржсүрэн', 'Бат-Эрдэнэ', 'ЧД98121455', 11, NULL, 'Тоон радио, радиорелей нягтруулгын техникч', '0', 'E1362125', '2027-07-22', '89661558', '', '2023-05-23 07:39:39', '2023-05-23 07:54:32', 0),
(20, 1, 23, NULL, 1, 5, 1, 'Алтантулга', 'Чулуунбаатар', 'ЖГ00272111', 11, NULL, 'Радио холбооны оператор, техникч', '0', 'E1362489', '2027-05-17', '94656696', '', '2023-05-23 07:40:50', '2023-05-23 07:54:53', 0),
(21, 1, 23, NULL, 1, 5, 1, 'Нямсүм', 'Ганбаатар', 'ЧД98101315', 11, NULL, 'Тусгай холбооны засварын техникч', '0', 'E1316364', '2027-06-10', '95548516', '', '2023-05-23 07:42:15', '2023-05-23 07:55:16', 0),
(22, 1, 23, NULL, 1, 5, 1, 'Золжаргал', 'Хүрэлбаатар', 'ТА95112301', 22, 25, 'Нярав', '0', 'E1352657', '2027-09-05', '89866700', 'zoljargal6@gmail.com', '2023-05-23 07:43:24', '2023-06-08 05:06:52', 0),
(23, 1, 1, NULL, 1, 4, 9, 'Хүний нөөц', 'Хүний нөөц', 'ХН88061819', 11, NULL, 'Хүний нөөцийн офицер', '0', NULL, '2010-01-01', '80118011', '', '2023-05-23 08:07:45', '2023-05-23 08:07:45', 0),
(25, 1, 1, NULL, 1, 4, 10, 'Эмч', 'Эмч', 'ЭМ81090516', 11, NULL, 'Их эмч', '0', NULL, '2010-01-01', '91019101', '', '2023-05-23 11:04:02', '2023-05-23 11:04:02', 0),
(26, 1, 1, NULL, 1, 4, 10, 'Спорт', 'Спорт', 'БТ79051418', 11, NULL, 'Биеийн тамирын офицер', '0', NULL, '2010-01-01', '81018101', '', '2023-05-23 11:05:27', '2023-05-23 11:05:27', 0),
(27, 1, 1, NULL, 1, 4, 9, 'Гадаад хэл', 'Гадаад хэл', 'ГХ80050625', 22, NULL, 'Гадаад хэлний хэлтсийн мэргэжилтэн', '0', NULL, '2010-01-01', '82028202', '', '2023-05-23 11:06:28', '2023-05-23 11:06:28', 0),
(29, 1, 23, NULL, 1, 4, 6, 'Батболор', 'Мөнхнасан', 'Рх65656556', 11, 58, 'Цэргийн мэдээллийн сангийн инженер, десктоп программ зохиогч', '0', NULL, '2010-01-01', '96351586', 'm.batbolorbaagii2@gmail.com', '2023-05-25 02:19:38', '2023-06-23 15:20:39', 0),
(37, 1, 23, NULL, 1, 4, 15, 'sddsdsd', 'sssds', 'ор99956651', 11, 65, 'testshuuuu', '0', NULL, '2010-01-01', '95664323', 'test15@gmail.com', '2023-06-10 09:18:33', '2023-06-11 05:18:07', 0),
(38, 6, 6, NULL, 1, 4, 15, 'dsfsdafsadf', 'sdsfdsaf', 'зб48465566', 11, 54, 'dsfasdfsdaf', '0', NULL, '2010-01-01', '96354896', 'test16@gmail.com', '2023-06-10 09:20:41', '2023-06-10 09:20:41', 0),
(39, 1, 23, NULL, 1, 4, 6, 'sdsds', 'sdsdsd', 'за56556654', 11, 23, 'ыббөбө', '0', NULL, '2010-01-01', '99999999', 'test@gmail.com', '2023-06-13 05:16:01', '2023-06-13 05:16:01', 0),
(40, 8, 52, NULL, 1, 4, 6, 'ХХЕГ', 'ХХЕГ', 'ХХ00000685', 11, 26, 'ХХЕГ', '0', NULL, '2010-01-01', '95159515', 'hil@gmail.com', '2023-06-13 05:59:13', '2023-06-13 05:59:13', 0),
(41, 12, 56, NULL, 1, 4, 6, 'ТТХГ нэр', 'ТТХГ овог', 'ТТ99000005', 11, 26, 'ТТХГ', '0', NULL, '2010-01-01', '85236547', 'tusgai@gmail.com', '2023-06-13 06:30:15', '2023-06-13 06:30:15', 0),
(42, 12, 56, NULL, 1, 4, 6, 'tusgai ner', 'tusgai ovog', 'ТТ95468215', 11, 26, 'tusgai', '0', NULL, '2010-01-01', '98756128', 'tusgaitest1@gmail.com', '2023-06-13 06:35:46', '2023-06-13 06:35:46', 0),
(43, 12, 56, NULL, 1, 4, 6, 'ТТХГ2 нэр', 'ТТХГ2 овог', 'ТТ75362155', 11, 26, 'ТТХГ2', '0', NULL, '2010-01-01', '75412588', 'tusgaitest2@gmail.com', '2023-06-13 07:05:42', '2023-06-13 07:05:42', 0),
(72, 1, 1, NULL, 1, 4, 6, 'быөыбөы', 'бөыбө', 'Сс95120217', 11, 28, NULL, '0', NULL, '2010-01-01', '98456321', 'm.batbolorbaagii5@gmail.com', '2023-06-16 01:05:55', '2023-06-16 01:05:55', 0),
(73, 1, 1, NULL, 1, 4, 7, 'dsfsdfsd', 'dfsdfsdf', 'Аа96321554', 11, 27, NULL, '0', NULL, '2010-01-01', '96325156', 'super12212@gmail.com', '2023-06-20 03:46:02', '2023-06-20 03:46:02', 0),
(74, 1, 8, NULL, 1, 4, 7, 'ыбөыбө', 'бөбыө', 'АХ95123544', 22, 28, NULL, '0', NULL, '2010-01-01', '85214563', 'super666626@gmail.com', '2023-06-20 03:46:30', '2023-06-20 03:46:30', 0),
(75, 3, 23, NULL, 1, 4, 7, 'dsfsdfs', 'dfsdf', 'ыб95132335', 11, 28, NULL, '0', NULL, '2010-01-01', '95323232', 'test18@gmail.com', '2023-06-20 03:48:33', '2023-06-20 03:48:33', 0),
(76, 3, 23, NULL, 1, 4, 6, 'sdsdsd', 'sdsdsd', 'аа55662323', 22, -32, NULL, '0', NULL, '2010-01-01', '74412151', 'test19@gmail.com', '2023-06-20 03:48:57', '2023-06-20 03:48:57', 0),
(77, 3, 23, NULL, 1, 4, 6, 'asasas', 'asasas', 'то95566621', 11, 28, NULL, '0', NULL, '2010-01-01', '96541258', 'super32555@gmail.com', '2023-06-23 16:03:27', '2023-06-23 16:03:27', 0),
(78, 3, 23, NULL, 1, 4, 6, 'sdfsdf', 'dfsdf', 'аа65645456', 11, 58, NULL, '0', NULL, '2010-01-01', '96320121', 'super0222@gmail.com', '2023-06-23 16:07:12', '2023-06-23 16:07:12', 0),
(79, 3, 23, NULL, 1, 4, 6, 'sdfsdfsdf', 'dfsdfsd', 'шш99021217', 11, 24, NULL, '0', NULL, '2010-01-01', '75326589', 'super777@gmail.com', '2023-06-23 16:13:06', '2023-06-23 16:13:06', 0),
(80, 11, 55, NULL, 1, 4, 8, 'ШүүхНэр', 'ШүүхОвог', 'ШШ82101217', 11, 41, NULL, '/profile/68704859_2023-06-26.jpeg', NULL, '2010-01-01', '88552211', 'shvvhtest@gmail.com', '2023-06-26 02:58:33', '2023-06-26 02:58:33', 0),
(81, 12, 56, NULL, 1, 4, 9, 'ТусгайНэр', 'ТусгайОвог', 'ТТ94121317', 11, 29, NULL, '/profile/13343783_2023-06-26.jpeg', NULL, '2010-01-01', '77553322', 'testtusgai@gmail.com', '2023-06-26 03:09:13', '2023-06-26 03:09:13', 0);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_03_27_220716_create_sessions_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pko_admin_type`
--

CREATE TABLE `pko_admin_type` (
  `id` int(11) NOT NULL,
  `adminTypeName` varchar(50) NOT NULL,
  `adminTypeDescription` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_admin_type`
--

INSERT INTO `pko_admin_type` (`id`, `adminTypeName`, `adminTypeDescription`) VALUES
(1, 'superAdmin', 'Программ хангамжийн төв'),
(2, 'pkoAdmin', 'ЭДЦХАХ'),
(3, 'departmentAdmin', 'Эрүүл мэндийн хэлтэс'),
(4, 'hospitalAdmin', 'Цэргийн төв эмнэлгийн админ'),
(5, 'sportAdmin', 'Биеийн тамирын админ'),
(6, 'comandlalAdmin', 'Командлалын хүний нөөц'),
(7, 'unitAdmin', 'Ангийн хүний нөөц'),
(8, 'unitUser', 'Ангийн цэргийн алба хаагч'),
(9, 'bataliionAdmin', 'тухайн цэргийн багт үүрэг гүйцэтгэж байгаа хүний нөөц '),
(10, 'gsmafAdmin', 'Жанжин штабын хүний нөөцийн админ'),
(11, 'pkoDuty', 'ЭДЦХАХ-ийн жижүүр'),
(12, 'languageAdmin', 'Гадаад хэлний хэлтсийн админ'),
(13, 'hilHamgaalah', 'Хил хамгаалах ерөнхий газар'),
(14, 'police', 'Цагдаагийн ерөнхий газар/Дотоодын цэрэг/'),
(15, 'ontsgoi', 'Онцгой байдлын ерөнхий газар'),
(16, 'shvvhiinShiidver', 'Шүүхийн шийдвэр гүйцэтгэх ерөнхий газар'),
(17, 'turiinTusgai', 'Төрийн тусгай хамгаалалтын газар'),
(18, 'assistantAdmin', 'Эрүүл мэндийн хуудас олгох туслах эмч');

-- --------------------------------------------------------

--
-- Table structure for table `pko_airplane_arrived`
--

CREATE TABLE `pko_airplane_arrived` (
  `id` int(11) NOT NULL,
  `arrivedName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_airplane_arrived`
--

INSERT INTO `pko_airplane_arrived` (`id`, `arrivedName`) VALUES
(1, 'Нэгдүгээр ээлж'),
(2, 'Хоёрдугаар ээлж'),
(3, 'Гуравдугаар ээлж'),
(4, 'Дөрөвдүгээр ээлж');

-- --------------------------------------------------------

--
-- Table structure for table `pko_airplane_shift`
--

CREATE TABLE `pko_airplane_shift` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `airplaneDeparturedID` int(11) NOT NULL,
  `airplaneArrivedID` int(11) DEFAULT 0,
  `missionStartDate` datetime DEFAULT NULL,
  `missionFinishDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_airplane_shift`
--

INSERT INTO `pko_airplane_shift` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `airplaneDeparturedID`, `airplaneArrivedID`, `missionStartDate`, `missionFinishDate`) VALUES
(1, 1, 13, 3, 1, 2, '2023-11-30 19:28:00', '2024-10-01 19:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `pko_airplane_shift_item`
--

CREATE TABLE `pko_airplane_shift_item` (
  `id` int(11) NOT NULL,
  `airplaneShiftItemName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_airplane_shift_item`
--

INSERT INTO `pko_airplane_shift_item` (`id`, `airplaneShiftItemName`) VALUES
(1, 'Нэгдүгээр ээлж'),
(2, 'Хоёрдугаар ээлж'),
(3, 'Гуравдугаар ээлж'),
(4, 'Дөрөвдүгээр ээлж');

-- --------------------------------------------------------

--
-- Table structure for table `pko_batalion_oron_too`
--

CREATE TABLE `pko_batalion_oron_too` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `rotID` int(11) DEFAULT 0,
  `salaaID` int(11) DEFAULT 0,
  `tasagID` int(11) DEFAULT 0,
  `positionID` int(11) DEFAULT 0,
  `isNoots` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_batalion_oron_too`
--

INSERT INTO `pko_batalion_oron_too` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `rotID`, `salaaID`, `tasagID`, `positionID`, `isNoots`) VALUES
(1, 1, 13, 1, 1, 1, 1, 1, 0),
(2, 1, 13, 2, 1, NULL, NULL, 1, 0),
(3, 1, 13, 3, 1, NULL, NULL, 1, 1),
(5, 1, 13, 5, 1, 1, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pko_canceled`
--

CREATE TABLE `pko_canceled` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `pkoCanceledTypeID` int(11) NOT NULL,
  `canceledPdf` varchar(250) NOT NULL,
  `canceledDescription` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pko_canceled_type`
--

CREATE TABLE `pko_canceled_type` (
  `id` int(11) NOT NULL,
  `canceledTypeName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_canceled_type`
--

INSERT INTO `pko_canceled_type` (`id`, `canceledTypeName`) VALUES
(1, 'Эрүүл мэнд'),
(2, 'Өөрийн хүсэлтээр'),
(3, 'Сахилга бат'),
(4, 'Бусад');

-- --------------------------------------------------------

--
-- Table structure for table `pko_complaints`
--

CREATE TABLE `pko_complaints` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `complaints` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_complaints`
--

INSERT INTO `pko_complaints` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `complaints`, `created_at`) VALUES
(4, 1, 13, 13, 'bolkuu bna', '2023-06-07 08:25:50'),
(5, 1, 13, 15, 'Baihgui', '2023-06-07 08:38:35'),
(6, 1, 13, 15, 'Bainaa', '2023-06-07 08:51:34'),
(7, 1, 13, 15, 'Zailaaa', '2023-06-07 10:15:04'),
(8, 1, 13, 15, 'Boloooshhhh', '2023-06-07 10:17:53');

-- --------------------------------------------------------

--
-- Table structure for table `pko_control`
--

CREATE TABLE `pko_control` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `isPush` int(11) DEFAULT 0,
  `isRequest` int(11) DEFAULT 0,
  `isDocument` int(11) DEFAULT 0,
  `isSport` int(11) DEFAULT 0,
  `isTomilogdson` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_control`
--

INSERT INTO `pko_control` (`id`, `missionID`, `eeljID`, `isPush`, `isRequest`, `isDocument`, `isSport`, `isTomilogdson`) VALUES
(1, 1, 13, 1, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pko_covot_comandlal`
--

CREATE TABLE `pko_covot_comandlal` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `comandlalID` int(11) NOT NULL,
  `covotOppitser` int(11) DEFAULT NULL,
  `covotAhlagch` int(11) DEFAULT NULL,
  `covotGereet` int(11) DEFAULT NULL,
  `covotComandlalSum` int(11) NOT NULL,
  `covotDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_covot_comandlal`
--

INSERT INTO `pko_covot_comandlal` (`id`, `missionID`, `eeljID`, `comandlalID`, `covotOppitser`, `covotAhlagch`, `covotGereet`, `covotComandlalSum`, `covotDescription`) VALUES
(1, 1, 13, 1, NULL, NULL, NULL, 158, 'АУГ, харьяа анги, байгууллага - 20, ХМТХ, харьяа анги, байгууллага - 30, СБГ, харьяа анги - 25, МТГ-ын харьяа анги - 65, ЭМХ - 18,'),
(2, 1, 13, 3, NULL, NULL, NULL, 250, NULL),
(3, 1, 13, 2, NULL, NULL, NULL, 40, NULL),
(4, 1, 13, 5, NULL, NULL, NULL, 250, NULL),
(5, 1, 13, 4, NULL, NULL, NULL, 100, NULL),
(6, 1, 13, 7, NULL, NULL, NULL, 30, NULL),
(7, 1, 13, 8, NULL, NULL, NULL, 20, NULL),
(8, 1, 13, 9, NULL, NULL, NULL, 10, NULL),
(9, 1, 13, 10, NULL, NULL, NULL, 15, NULL),
(10, 1, 13, 11, NULL, NULL, NULL, 5, NULL),
(11, 1, 13, 12, NULL, NULL, NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_covot_unit`
--

CREATE TABLE `pko_covot_unit` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `comandlalID` int(11) NOT NULL,
  `unitID` int(11) NOT NULL,
  `covotOppitser` int(11) DEFAULT NULL,
  `covotAhlagch` int(11) DEFAULT NULL,
  `covotGereet` int(11) DEFAULT NULL,
  `covotUnitSum` int(11) NOT NULL,
  `covotDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_covot_unit`
--

INSERT INTO `pko_covot_unit` (`id`, `missionID`, `eeljID`, `comandlalID`, `unitID`, `covotOppitser`, `covotAhlagch`, `covotGereet`, `covotUnitSum`, `covotDescription`) VALUES
(1, 1, 13, 1, 23, 6, 9, NULL, 15, '1 программ зохиогч, 1 сүлжээний техникч'),
(2, 1, 13, 1, 22, NULL, NULL, NULL, 30, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_date`
--

CREATE TABLE `pko_date` (
  `id` int(11) NOT NULL,
  `pkoUserID` int(11) NOT NULL,
  `yearID` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_date`
--

INSERT INTO `pko_date` (`id`, `pkoUserID`, `yearID`, `created_at`, `updated_at`) VALUES
(1, 6, 4, '2023-05-26 05:12:23', '2023-05-26 05:12:23'),
(2, 4, 2, '2023-06-08 06:09:36', '2023-06-08 06:09:36'),
(3, 29, 1, '2023-06-11 06:48:58', '2023-06-11 06:48:58'),
(4, 29, 2, '2023-06-20 10:35:50', '2023-06-20 10:35:50');

-- --------------------------------------------------------

--
-- Table structure for table `pko_date_news`
--

CREATE TABLE `pko_date_news` (
  `id` int(11) NOT NULL,
  `title` varchar(250) CHARACTER SET utf8 NOT NULL,
  `body` longtext CHARACTER SET utf8 NOT NULL,
  `featuredImage` varchar(250) CHARACTER SET utf8 NOT NULL,
  `date` datetime DEFAULT NULL,
  `readCount` int(11) DEFAULT NULL,
  `adminID` int(11) NOT NULL,
  `menuID` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pko_date_news`
--

INSERT INTO `pko_date_news` (`id`, `title`, `body`, `featuredImage`, `date`, `readCount`, `adminID`, `menuID`, `created_at`, `updated_at`) VALUES
(1, '<p>asd ad sd fas fsa fsdaf</p>', '<p>ds fasfThe marque was founded in 1994 by Micro Compact Car AG (MCC), a joint venture between&nbsp;<a href=\"https://en.wikipedia.org/wiki/Swatch\" title=\"Swatch\">SMH</a>&nbsp;and Daimler-Benz. MCC became a wholly owned subsidiary of Daimler-Benz in 1998, and was subsequently renamed&nbsp;<em>MCC smart GmbH</em>, then smart GmbH. smart GmbH was then absorbed by DaimlerChrysler (later Daimler AG) in 2006, making smart a marque within the Mercedes-Benz Cars division.<sup><a href=\"https://en.wikipedia.org/wiki/Smart_(marque)#cite_note-5\">[5]</a></sup></p>\r\n', 'http://127.0.0.1:8000/storage/photos/51/2234.jpg', '2023-05-01 00:00:00', 2, 51, 'Сэлэнгэ', '2023-06-01 02:25:39', NULL),
(2, 'test1', 'test2', 'http://127.0.0.1:8000/storage/photos/51/6-30.jpg', '2023-05-01 17:37:21', 3, 51, 'Хоногийн мэдээ', '2023-06-07 02:45:33', NULL),
(4, '12313', '<p>12313</p>', 'http://127.0.0.1:8000/storage/photos/51/2234.jpg', NULL, 1, 51, 'Хоногийн мэдээ', '2023-06-13 16:00:00', '2023-06-05'),
(5, '12', '<p>123</p>', 'http://127.0.0.1:8000/storage/photos/51/2234.jpg', NULL, NULL, 51, 'Хоногийн мэдээ', '2023-06-08 06:29:23', '2023-06-08');

-- --------------------------------------------------------

--
-- Table structure for table `pko_documents`
--

CREATE TABLE `pko_documents` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `documentItemID` int(11) NOT NULL,
  `documentPdf` varchar(250) NOT NULL,
  `approveComandlal` int(2) NOT NULL DEFAULT 0,
  `approveGsmaf` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_documents`
--

INSERT INTO `pko_documents` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `documentItemID`, `documentPdf`, `approveComandlal`, `approveGsmaf`) VALUES
(2, 1, 13, 3, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/Urgudul.pdf', 1, 1),
(3, 1, 13, 3, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/Urgudul.pdf', 1, 1),
(4, 1, 13, 3, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/Urgudul.pdf', 1, 1),
(5, 1, 13, 3, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/photo-1535713875002-d1d0cf377fde.jpeg', 1, 1),
(6, 1, 13, 3, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/Urgudul.pdf', 1, 1),
(7, 1, 13, 3, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/Urgudul.pdf', 1, 1),
(8, 1, 13, 3, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Tuguldur/Urgudul.pdf', 1, 1),
(9, 1, 13, 1, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(10, 1, 13, 1, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(11, 1, 13, 1, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(12, 1, 13, 1, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(14, 1, 13, 1, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(15, 1, 13, 1, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(16, 1, 13, 1, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(17, 1, 13, 1, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Chinbat/Urgudul.pdf', 1, 1),
(18, 1, 13, 2, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(19, 1, 13, 2, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(20, 1, 13, 2, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(21, 1, 13, 2, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(22, 1, 13, 2, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(23, 1, 13, 2, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(24, 1, 13, 2, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(25, 1, 13, 2, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Volga/Urgudul.pdf', 1, 1),
(26, 1, 13, 4, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(27, 1, 13, 4, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(28, 1, 13, 4, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(29, 1, 13, 4, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 2, 0),
(31, 1, 13, 4, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(32, 1, 13, 4, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(33, 1, 13, 4, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(34, 1, 13, 4, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ulziibayr/Urgudul.pdf', 1, 0),
(35, 1, 13, 5, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(36, 1, 13, 5, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(37, 1, 13, 5, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(38, 1, 13, 5, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(39, 1, 13, 5, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(40, 1, 13, 5, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(41, 1, 13, 5, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(42, 1, 13, 5, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Mungunsaran/Urgudul.pdf', 1, 1),
(43, 1, 13, 6, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(44, 1, 13, 6, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(45, 1, 13, 6, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(46, 1, 13, 6, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(47, 1, 13, 6, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(48, 1, 13, 6, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(49, 1, 13, 6, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(50, 1, 13, 6, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Ganjargal/Urgudul.pdf', 1, 1),
(51, 1, 13, 7, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(52, 1, 13, 7, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(53, 1, 13, 7, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(54, 1, 13, 7, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(55, 1, 13, 7, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(56, 1, 13, 7, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(57, 1, 13, 7, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(58, 1, 13, 7, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Batnasan/Urgudul.pdf', 1, 1),
(59, 1, 13, 8, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(60, 1, 13, 8, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(61, 1, 13, 8, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(62, 1, 13, 8, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(63, 1, 13, 8, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(64, 1, 13, 8, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(65, 1, 13, 8, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(66, 1, 13, 8, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Baynzul/Urgudul.pdf', 1, 1),
(67, 1, 13, 9, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 1, 0),
(68, 1, 13, 9, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 2, 0),
(69, 1, 13, 9, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 1, 0),
(70, 1, 13, 9, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 1, 0),
(71, 1, 13, 9, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 1, 0),
(72, 1, 13, 9, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 1, 0),
(73, 1, 13, 9, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 1, 0),
(74, 1, 13, 9, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Dorjsuren/Urgudul.pdf', 0, 0),
(75, 1, 13, 10, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 0, 0),
(76, 1, 13, 10, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(77, 1, 13, 10, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(78, 1, 13, 10, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(79, 1, 13, 10, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(80, 1, 13, 10, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(81, 1, 13, 10, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(82, 1, 13, 10, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Altantulga/Urgudul.pdf', 1, 1),
(83, 1, 13, 11, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 2),
(84, 1, 13, 11, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(85, 1, 13, 11, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(86, 1, 13, 11, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(87, 1, 13, 11, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(88, 1, 13, 11, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(89, 1, 13, 11, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(90, 1, 13, 11, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Nyamsvm/Urgudul.pdf', 1, 0),
(91, 1, 13, 12, 1, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(92, 1, 13, 12, 2, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(93, 1, 13, 12, 3, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(94, 1, 13, 12, 4, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(95, 1, 13, 12, 5, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(96, 1, 13, 12, 6, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(97, 1, 13, 12, 7, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(98, 1, 13, 12, 8, 'https://psod.maf.gov.mn/storage/files/4/189 Documents/Zoljargal/Urgudul.pdf', 1, 1),
(112, 1, 13, 13, 1, '/documents/1/13/4/pdf_4.pdf', 1, 0),
(128, 1, 13, 15, 5, '/documents/1/13/29/pic_29.pdf', 0, 0),
(129, 1, 13, 15, 2, '/documents/1/13/29/todorhoilolt_compressed (1)_29.pdf', 0, 0),
(130, 1, 13, 15, 1, '/documents/1/13/29/todorhoilolt_compressed (1)_29.pdf', 0, 0),
(131, 1, 13, 15, 4, '/documents/1/13/29/todorhoilolt_compressed (1)_29.pdf', 0, 0),
(157, 1, 13, 15, 6, '/documents/1/13/29/pic_29.pdf', 0, 0),
(165, 1, 13, 15, 7, '/documents/1/13/29/1 (1)_29.pdf', 0, 0),
(166, 1, 13, 15, 8, '/documents/1/13/29/1 (1)_29.pdf', 0, 0),
(167, 1, 13, 38, 1, '/documents/1/13/81/1 (1)_81.pdf', 0, 0),
(168, 1, 13, 38, 2, '/documents/1/13/81/1 (1)_81.pdf', 0, 0),
(169, 1, 13, 38, 4, '/documents/1/13/81/1 (1)_81.pdf', 0, 0),
(170, 1, 13, 38, 5, '/documents/1/13/81/1 (1)_81.pdf', 0, 0),
(171, 1, 13, 38, 6, '/documents/1/13/81/1 (1)_81.pdf', 0, 0),
(172, 1, 13, 38, 7, '/documents/1/13/81/1 (1)_81.pdf', 0, 0),
(173, 1, 13, 38, 8, '/documents/1/13/81/1 (1)_81.pdf', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pko_document_items`
--

CREATE TABLE `pko_document_items` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `documentName` varchar(100) NOT NULL,
  `documentShaardlaga` varchar(500) DEFAULT NULL,
  `documentZagvar` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_document_items`
--

INSERT INTO `pko_document_items` (`id`, `missionID`, `eeljID`, `documentName`, `documentShaardlaga`, `documentZagvar`) VALUES
(1, 1, 13, 'Өргөдөл', 'Сайн дурын үндсэн дээр энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэх хүсэлт бүхий гараар бичсэн өргөдөл', NULL),
(2, 1, 13, 'Ажил байдлын тодорхойлолт', 'Ажил байдлын тодорхойлолт', NULL),
(4, 1, 13, 'Офицер || Ахлагчийн үнэмлэхийн хуулбар', 'Офицер || Ахлагчийн үнэмлэхийн хуулбар /цол, албан тушаалд томилогдсон хуудасны хамт/', NULL),
(5, 1, 13, 'Цээж зураг', 'Сүүлийн 3 сард авхуулсан 4х6 см-ийн хэмжээтэй цээж зураг 3 хувь', NULL),
(6, 1, 13, 'Цагдаагийн байгууллагын тодорхойлолт', 'Цагдаагийн байгууллагын тодорхойлолт', NULL),
(7, 1, 13, 'Гадаад паспорт', 'Гадаад паспортын хуулбар /хүчинтэй хугацаа 3-аас дээш жил/', NULL),
(8, 1, 13, 'Ар гэрийн баталгаа', 'Ар гэрийн баталгаа', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_doc_description`
--

CREATE TABLE `pko_doc_description` (
  `id` int(11) NOT NULL,
  `pkoDocumentID` int(11) NOT NULL,
  `docDescription` varchar(500) DEFAULT NULL,
  `comandlalName` varchar(50) NOT NULL,
  `adminName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_doc_description`
--

INSERT INTO `pko_doc_description` (`id`, `pkoDocumentID`, `docDescription`, `comandlalName`, `adminName`) VALUES
(1, 29, 'Цол авсан тушаалын гараагүй байна.', 'ЗХЖШ', 'ЗХЖШ'),
(2, 34, 'Гарын үсэг зурагдаагүй байна.', 'ЗХЖШ', 'ЗХЖШ'),
(3, 68, 'Тодорхойлолт дутуу', 'ЗХЖШ', 'ЗХЖШ'),
(4, 83, 'Гарын үсэг зурагдаагүй байна.', 'ЗХЖШ', 'Хүний нөөц'),
(5, 31, 'dddd', 'ЗХЖШ', 'ЗХЖШ');

-- --------------------------------------------------------

--
-- Table structure for table `pko_foreign_password`
--

CREATE TABLE `pko_foreign_password` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `foreignFinishDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_foreign_password`
--

INSERT INTO `pko_foreign_password` (`id`, `missionID`, `eeljID`, `foreignFinishDate`) VALUES
(1, 1, 13, '2024-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `pko_health`
--

CREATE TABLE `pko_health` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `healthPdf` varchar(250) NOT NULL,
  `healthApprove` int(2) NOT NULL DEFAULT 0,
  `healthDescription` varchar(500) DEFAULT NULL,
  `healthEdit` int(11) DEFAULT NULL,
  `healthEditDes` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_health`
--

INSERT INTO `pko_health` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `healthPdf`, `healthApprove`, `healthDescription`, `healthEdit`, `healthEditDes`) VALUES
(1, 1, 13, 1, 'https://psod.maf.gov.mn/storage/files/25/Health/Chinbat/Uzleg.pdf', 1, NULL, 4, 'Буруу pdf хийсэн байна'),
(2, 1, 13, 2, 'https://psod.maf.gov.mn/storage/files/25/Health/Chinbat/Uzleg.pdf', 1, NULL, 1, 'Алдаатай мэдээлэл оруулсан байна.'),
(3, 1, 13, 3, 'https://psod.maf.gov.mn/storage/files/25/Health/Chinbat/Uzleg.pdf', 1, NULL, 2, 'Буруу мэдээлэл оруулсан байна.'),
(4, 1, 13, 5, 'https://psod.maf.gov.mn/storage/files/25/Health/Chinbat/Uzleg.pdf', 1, NULL, 0, ''),
(5, 1, 13, 6, 'https://psod.maf.gov.mn/storage/files/25/Health/Chinbat/Uzleg.pdf', 1, NULL, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `pko_heltes_decline_description`
--

CREATE TABLE `pko_heltes_decline_description` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `heltesPdf` varchar(250) DEFAULT NULL,
  `heltesDescription` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_heltes_decline_description`
--

INSERT INTO `pko_heltes_decline_description` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `heltesPdf`, `heltesDescription`) VALUES
(7, 1, 13, 10, 'https://psod.maf.gov.mn/storage/files/14/pic.pdf', 'dfdfs');

-- --------------------------------------------------------

--
-- Table structure for table `pko_is_crime`
--

CREATE TABLE `pko_is_crime` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `isCrimeDescription` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pko_language_score`
--

CREATE TABLE `pko_language_score` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `languageTypeID` int(11) NOT NULL,
  `languageScore` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pko_language_type`
--

CREATE TABLE `pko_language_type` (
  `id` int(11) NOT NULL,
  `languageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pko_main_history`
--

CREATE TABLE `pko_main_history` (
  `id` int(11) NOT NULL,
  `pkoUserID` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `documentsMainApprove` int(2) NOT NULL DEFAULT 0,
  `eruulMendHeltesApprove` int(2) NOT NULL DEFAULT 0,
  `healthHuudas` int(11) NOT NULL DEFAULT 0,
  `healthApprove` int(2) NOT NULL DEFAULT 0,
  `sportScore` decimal(10,2) NOT NULL DEFAULT 0.00,
  `isTomilogdson` int(2) NOT NULL DEFAULT 0,
  `isCrime` int(2) NOT NULL DEFAULT 0,
  `isCanceled` int(2) NOT NULL DEFAULT 0,
  `isFlight` int(2) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_main_history`
--

INSERT INTO `pko_main_history` (`id`, `pkoUserID`, `missionID`, `eeljID`, `documentsMainApprove`, `eruulMendHeltesApprove`, `healthHuudas`, `healthApprove`, `sportScore`, `isTomilogdson`, `isCrime`, `isCanceled`, `isFlight`, `created_at`, `updated_at`) VALUES
(1, 6, 1, 13, 1, 1, 0, 1, '77.50', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-23 11:18:09'),
(2, 8, 1, 13, 1, 1, 0, 1, '84.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-23 11:18:30'),
(3, 11, 1, 13, 1, 1, 0, 1, '89.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-06-19 04:33:48'),
(4, 12, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-23 09:51:22'),
(5, 15, 1, 13, 1, 1, 0, 1, '84.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-23 11:19:08'),
(6, 16, 1, 13, 1, 1, 0, 1, '76.50', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-30 06:56:18'),
(7, 17, 1, 13, 1, 1, 0, 0, '80.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-23 11:17:52'),
(8, 18, 1, 13, 1, 1, 1, 1, '0.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-06-20 09:32:19'),
(9, 19, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-25 08:00:19'),
(10, 20, 1, 13, 1, 2, 0, 0, '0.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-06-20 09:22:37'),
(11, 21, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-25 07:52:29'),
(12, 22, 1, 13, 1, 1, 0, 0, '0.00', 0, 0, 0, 0, '2023-05-23 09:51:22', '2023-05-23 11:19:27'),
(13, 4, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-06-05 09:22:12', '2023-06-05 09:22:12'),
(15, 29, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-06-07 08:38:20', '2023-06-07 08:38:20'),
(37, 29, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-06-26 02:03:37', '2023-06-26 02:03:37'),
(38, 81, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-06-26 02:58:34', '2023-06-26 02:58:34'),
(39, 82, 1, 13, 0, 0, 0, 0, '0.00', 0, 0, 0, 0, '2023-06-26 03:09:14', '2023-06-26 03:09:14');

-- --------------------------------------------------------

--
-- Table structure for table `pko_missions`
--

CREATE TABLE `pko_missions` (
  `id` int(11) NOT NULL,
  `missionName` varchar(250) NOT NULL,
  `missionStartDate` datetime DEFAULT NULL,
  `missionFinishDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_missions`
--

INSERT INTO `pko_missions` (`id`, `missionName`, `missionStartDate`, `missionFinishDate`) VALUES
(1, 'БНӨСУ UNMISS', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_mission_eelj`
--

CREATE TABLE `pko_mission_eelj` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljName` varchar(250) NOT NULL,
  `eeljStartDate` datetime DEFAULT NULL,
  `eeljFinishDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_mission_eelj`
--

INSERT INTO `pko_mission_eelj` (`id`, `missionID`, `eeljName`, `eeljStartDate`, `eeljFinishDate`) VALUES
(1, 1, 'MONBATT I', '2011-11-23 16:37:00', '2012-11-23 16:37:00'),
(2, 1, 'MONBATT II', '2012-11-23 16:37:00', '2013-11-23 16:37:00'),
(3, 1, 'MONBATT III', '2013-11-23 16:37:00', '2014-11-23 16:37:00'),
(4, 1, 'MONBATT IV', '2014-11-23 16:36:00', '2015-11-23 16:36:00'),
(5, 1, 'MONBATT V', '2015-11-23 16:36:00', '2016-11-23 16:36:00'),
(6, 1, 'MONBATT VI', '2016-11-23 16:35:00', '2017-11-23 16:36:00'),
(7, 1, 'MONBATT VII', '2017-11-23 16:35:00', '2018-11-23 16:35:00'),
(8, 1, 'MONBATT VIII', '2018-11-23 16:35:00', '2019-11-23 16:35:00'),
(9, 1, 'MONBATT IX', '2019-11-23 16:35:00', '2020-11-23 16:35:00'),
(10, 1, 'MONBATT X', '2020-11-23 16:34:00', '2021-11-23 16:34:00'),
(11, 1, 'MONBATT XI', '2021-11-23 16:34:00', '2022-11-23 16:34:00'),
(12, 1, 'MONBATT XII', '2022-11-23 16:19:00', '2023-11-23 16:19:00'),
(13, 1, 'MONBATT XIII', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_mission_history`
--

CREATE TABLE `pko_mission_history` (
  `id` int(11) NOT NULL,
  `allUserID` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `finishDate` datetime NOT NULL,
  `missionPosition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_mission_history`
--

INSERT INTO `pko_mission_history` (`id`, `allUserID`, `missionID`, `eeljID`, `startDate`, `finishDate`, `missionPosition`) VALUES
(1, 11, 1, 13, '2023-11-30 19:34:37', '2024-10-01 19:34:37', 1),
(2, 6, 1, 13, '2023-11-30 19:34:37', '2024-10-01 19:34:37', 2),
(9, 12, 1, 13, '2023-06-27 16:16:00', '2023-06-27 16:16:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pko_one_page`
--

CREATE TABLE `pko_one_page` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `body` text NOT NULL,
  `adminID` int(11) NOT NULL,
  `menuID` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pko_one_page`
--

INSERT INTO `pko_one_page` (`id`, `title`, `body`, `adminID`, `menuID`) VALUES
(1, 'Анхдагч нар', 'Одоогоор мэдээлэл алга', 51, 'Анхдагч нар'),
(2, 'Бидний бахархал', 'Одоогоор мэдээлэл алга', 51, 'Бидний бахархал'),
(3, 'Эмэгтэйчүүд ', 'Одоогоор мэдээлэл алга', 51, 'Эмэгтэйчүүд'),
(4, 'Идэвхтэй ажиллагаа', '<p>Одоогоор мэдээлэл алга2</p>', 51, 'Идэвхтэй ажиллагаа');

-- --------------------------------------------------------

--
-- Table structure for table `pko_position`
--

CREATE TABLE `pko_position` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `rotID` int(11) NOT NULL,
  `salaaID` int(11) DEFAULT 0,
  `tasagID` int(11) DEFAULT 0,
  `positionName` varchar(150) NOT NULL,
  `positionShortName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_position`
--

INSERT INTO `pko_position` (`id`, `missionID`, `eeljID`, `rotID`, `salaaID`, `tasagID`, `positionName`, `positionShortName`) VALUES
(1, 1, 13, 1, 1, 1, 'Буудагч', NULL),
(2, 1, 13, 1, 1, 1, 'Харуулч', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_rot`
--

CREATE TABLE `pko_rot` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `rotName` varchar(100) NOT NULL,
  `rotShortName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_rot`
--

INSERT INTO `pko_rot` (`id`, `missionID`, `eeljID`, `rotName`, `rotShortName`) VALUES
(1, 1, 13, 'Нэгдүгээр рот', 'I рот');

-- --------------------------------------------------------

--
-- Table structure for table `pko_salaa`
--

CREATE TABLE `pko_salaa` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `rotID` int(11) NOT NULL,
  `salaaName` varchar(100) NOT NULL,
  `salaaShortName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_salaa`
--

INSERT INTO `pko_salaa` (`id`, `missionID`, `eeljID`, `rotID`, `salaaName`, `salaaShortName`) VALUES
(1, 1, 13, 1, 'Нэгдүгээр салаа', 'I салаа');

-- --------------------------------------------------------

--
-- Table structure for table `pko_sport_score`
--

CREATE TABLE `pko_sport_score` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `genderID` int(11) NOT NULL,
  `sportTypeID` int(11) NOT NULL,
  `sportScore` decimal(10,2) NOT NULL DEFAULT 0.00,
  `sportEdit` int(11) DEFAULT 0,
  `sportEditDes` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_sport_score`
--

INSERT INTO `pko_sport_score` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `genderID`, `sportTypeID`, `sportScore`, `sportEdit`, `sportEditDes`) VALUES
(1, 1, 13, 6, 11, 1, '81.00', 4, 'Буруу дүн оруулсан байна'),
(2, 1, 13, 6, 11, 2, '72.00', 4, 'Андуурсан байна'),
(3, 1, 13, 7, 11, 1, '85.00', 0, NULL),
(4, 1, 13, 7, 11, 2, '75.00', 0, NULL),
(5, 1, 13, 1, 11, 1, '90.00', 0, NULL),
(6, 1, 13, 1, 11, 2, '65.00', 0, NULL),
(7, 1, 13, 2, 11, 1, '100.00', 0, NULL),
(8, 1, 13, 2, 11, 2, '68.00', 0, NULL),
(9, 1, 13, 3, 11, 1, '88.00', 0, NULL),
(10, 1, 13, 3, 11, 2, '90.00', 0, NULL),
(11, 1, 13, 5, 22, 3, '82.00', 0, NULL),
(12, 1, 13, 5, 22, 4, '86.00', 0, NULL),
(13, 1, 13, 12, 22, 3, '94.00', 0, NULL),
(14, 1, 13, 12, 22, 4, '81.00', 1, 'Дутуу');

-- --------------------------------------------------------

--
-- Table structure for table `pko_sport_type`
--

CREATE TABLE `pko_sport_type` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `genderID` int(11) NOT NULL,
  `sportTypeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_sport_type`
--

INSERT INTO `pko_sport_type` (`id`, `missionID`, `eeljID`, `genderID`, `sportTypeName`) VALUES
(1, 1, 13, 11, '3км гүйлт'),
(2, 1, 13, 11, 'Гар дээр суниалт'),
(3, 1, 13, 22, '1км гүйлт'),
(4, 1, 13, 22, 'Гэдэс таталт');

-- --------------------------------------------------------

--
-- Table structure for table `pko_tasag`
--

CREATE TABLE `pko_tasag` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `rotID` int(11) NOT NULL,
  `salaaID` int(11) NOT NULL,
  `tasagName` varchar(100) NOT NULL,
  `tasagShortName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_tasag`
--

INSERT INTO `pko_tasag` (`id`, `missionID`, `eeljID`, `rotID`, `salaaID`, `tasagName`, `tasagShortName`) VALUES
(1, 1, 13, 1, 1, 'Нэгдүгээр тасаг', 'I тасаг');

-- --------------------------------------------------------

--
-- Table structure for table `pko_users`
--

CREATE TABLE `pko_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `allUsersID` bigint(20) DEFAULT NULL,
  `permission` int(11) DEFAULT NULL,
  `user_type` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pinCode` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `otp` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otp_created_at` timestamp NULL DEFAULT NULL,
  `otp_tries` tinyint(4) DEFAULT NULL,
  `reset_hash` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pko_users`
--

INSERT INTO `pko_users` (`id`, `allUsersID`, `permission`, `user_type`, `phone`, `email`, `password`, `pinCode`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`, `otp`, `otp_created_at`, `otp_tries`, `reset_hash`) VALUES
(1, 1, NULL, 'superAdmin', '99119911', 'super@gmail.com', '$2y$10$32DhzQgI7/EbqnJzWAL2Z.ETQLKp8JcMdRGe4UnSBYoUToFb6RH9.', NULL, '2023-05-22 16:00:00', 'NTSclgY2Q2hFs4oQecQB14iaPTl0efKRftZt7tVUtTQCpw8bE3mGIL0FWJCh', '2023-05-23 06:49:36', '2023-05-31 11:06:13', '551655', '2023-05-31 11:06:13', 0, NULL),
(2, 2, 1, 'comandlalAdmin', '88118811', 'comandlal_gs@gmail.com', '$2y$10$h..gELjVdbdYM/XLsGyDm.0ucRNjxjyeS3mjSSRKmnZv9sOx1EbZC', '$2y$10$zuWdlkalB36I1EzMeCAzOOzSioxezLoOFkKckrw/MtrASpxJuCM2O', '2023-05-08 07:11:38', '0', '2023-05-23 07:09:36', '2023-06-22 08:24:31', NULL, NULL, NULL, NULL),
(4, 4, 2, 'unitAdmin', '99056158', 'unit189@gmail.com', '$2y$10$gHmoFNOwwLrpbJVfCPzl2eG5M9lGLyhrX2QShkPZVn51zaChWcQfa', '$2y$10$Lk00Httfw/5I94OMkmpjreRlrNhmSvY2OYg/Me4j3kxvqCZ5MuShG', '2023-05-23 07:16:31', '0', '2023-05-23 07:14:57', '2023-05-23 07:14:57', NULL, NULL, NULL, NULL),
(5, 5, 2, 'unitAdmin', '99615805', 'unit013@gmail.com', '$2y$10$d0T1YTJucixJ2tPfobozSuX7PXEg/UrX0ly8pfIKVFtQXFxF40.j6', '$2y$10$jVh7nYI0lSShJuqWVMyFuOqAzQ2aaLmhNl3XtYFxQ909V09j5UnwK', '2023-05-23 07:16:34', '0', '2023-05-23 07:16:20', '2023-05-23 07:16:20', NULL, NULL, NULL, NULL),
(6, 6, 4, 'unitUser', '99895826', 'chinbat@gmail.com', '$2y$10$lGCuIgJ2lJwpKqTSZWAj0.oJR3fNr0HEBHxfLThjftt.pUr3F/JOy', '$2y$10$j7R4wW/F2L31eHY1SqZX9OmQdzaBDUttzXnoBh6bIE5A3F496ZHVy', '2023-05-23 07:55:52', '0', '2023-05-23 07:20:24', '2023-05-23 07:20:24', NULL, NULL, NULL, NULL),
(7, 7, 4, 'unitUser', '88295859', 'tsevegdorj@gmail.com', '$2y$10$aP43Hw7p1LR0H.AWVT.OCejIv9bjKbXT.cW6Z6yFEwMmgApKFMKtq', '$2y$10$KuEPVxHPY/hN5k4lcpNyIu9T9jDhUmcVSlv7ir2rKOb0hq3HQ/BH2', '2023-05-22 16:00:00', '0', '2023-05-23 07:22:00', '2023-05-23 07:22:00', NULL, NULL, NULL, NULL),
(8, 8, 4, 'unitUser', '89015592', 'cap.volga@gmail.com', '$2y$10$EpcdMIXM7oh/l2ZGakhQBOAUKNO/RBhlpUgLEsihrGu9dmJL7YVyC', '$2y$10$PwM28lvmMmvlmP5KLbSXde6a463sARaycCnEeZdAb0LtlPI.whI56', '2023-05-22 07:56:08', '0', '2023-05-23 07:23:38', '2023-05-23 07:23:38', NULL, NULL, NULL, NULL),
(10, 10, 4, 'comissionAdmin', '99727398', 'm.batbolorbaagii3@gmail.com', '$2y$10$gdlMs9ZiTMQKfJyrUVXWk.oTcBDv1uiFvWrjmth5huOLROe/TzHJK', '$2y$10$9ACzfPyICP3Pc1Was8wvGO8AX/xt1Vf7Wgg9mYMGzp1756..c8rCq', '2023-06-19 02:58:47', '0', '2023-05-23 07:26:23', '2023-06-19 02:58:57', NULL, NULL, NULL, NULL),
(11, 11, 4, 'unitUser', '99965167', 'batboltuguldur@gmail.com', '$2y$10$AXgDDUdnXlEKBPz4kWnWEuVjBj48UIfHM5O8rPwUqOcm/bc2ZcnGC', '$2y$10$yihZnzEjSu/x6l9JeMTqeeNd2ddqgHQ88papyPDOLZ01Qy/kajsQK', '2023-05-22 16:00:00', '0', '2023-05-23 07:30:06', '2023-05-23 07:30:06', NULL, NULL, NULL, NULL),
(12, 12, 4, 'unitUser', '88002628', 'ulziibayr777@gmail.com', '$2y$10$sCLNNsiFGN4iVNfuJ0XwKuBO5gN9E1gdp13Wa8s7LnszgGa3GtEgS', '$2y$10$7AwFndm4t91IGTHABenpke/j3ouZgJputjBaELuswh74cdn04xs2u', '2023-05-22 16:00:00', '0', '2023-05-23 07:31:27', '2023-05-23 07:31:27', NULL, NULL, NULL, NULL),
(13, 13, 4, 'unitUser', '80326548', 'otgonbaatar@gmail.com', '$2y$10$EOJtCxJjOt5mREi9j2YyrOOAFSseg.ypCR5t6kI0SIBKPb6Dx.7RK', '$2y$10$sO3gstmv8E98dr7HmmLr0OAxO0/dAiVtMj2nvRb3JgD7ruu5dSslW', '2023-05-22 16:00:00', '0', '2023-05-23 07:33:17', '2023-05-23 07:33:17', NULL, NULL, NULL, NULL),
(14, 14, 4, 'healthDepartmentAdmin', '92131502', 'amarbaatar123@gmail.com', '$2y$10$i19jtmfmVhdxaQgPuBz3HeB./Tmd/KApPKhKA4iL7Be8AVu18wHbq', '$2y$10$ADbrL3V1YpDZFNx2xerp.OmE.fneoBYjvxx3WX9X367G7oZtO47la', '2023-05-22 16:00:00', '0', '2023-05-23 07:34:19', '2023-05-23 07:34:19', NULL, NULL, NULL, NULL),
(15, 15, 4, 'unitUser', '89090934', 'mungunsaran63@gmail.com', '$2y$10$EOj11DImuP7QweH50WGl0uok0dJ8mgpgkPR0QJTxmgxCWisQx/efG', '$2y$10$SAcYZIDzD5bn1SMXSntXIu.QQg/RYT5r8qy5JUtL32yfRPQzoOtTy', '2023-05-22 16:00:00', '0', '2023-05-23 07:35:47', '2023-05-23 07:35:47', NULL, NULL, NULL, NULL),
(16, 16, 4, 'unitUser', '92136542', 'ganjargal@gmail.com', '$2y$10$CyE2cRSDFK1.jOaF6jJ8Ser2f/3eskUmTXGLf6lN/1FkwaAEvvnym', '$2y$10$LrT.ILf4lf.dmBYaMD2TJ.1O/da1quDPSfVLTXKFPKM3TlOW7eoT.', '2023-05-22 16:00:00', '0', '2023-05-23 07:36:36', '2023-05-23 07:36:36', NULL, NULL, NULL, NULL),
(17, 17, 4, 'unitUser', '99603718', 'batnasan44@gmail.com', '$2y$10$2gGfbzZzX3yUo5Q4AT6pkeoxer7lhCuE/qgrmKBBqxc.s/7uPSJBG', '$2y$10$plUnAelGbndQSgSUTwl1W.tcFqt/JWeiYVfAjoVsm8Y8Ax8HvJ.NG', '2023-05-22 16:00:00', '0', '2023-05-23 07:37:38', '2023-05-23 07:37:38', NULL, NULL, NULL, NULL),
(18, 18, 4, 'unitUser', '99765793', 'baynzul93@gmail.com', '$2y$10$y.819l0z9gOHoSZIHAdWz.uKGtZ2gNHghtiAVqi.FkRN3NHb5BfxS', '$2y$10$QPj50hcAeZadq.5.1Mp4FeGy9ZVfCwpnsJ0MXCA6w8a5uOaDB9t7u', '2023-05-22 16:00:00', '0', '2023-05-23 07:38:43', '2023-05-23 07:38:43', NULL, NULL, NULL, NULL),
(19, 19, 4, 'unitUser', '89661558', 'dorjsuren321@gmail.com', '$2y$10$iLR9nQZT7LD2Wups9QffPezx0VhE8oZFjbMfMTGCNDGfCKGNKfPhm', '$2y$10$gRkaHMk3dbDaXNf3cCS.PeCvcEkJXraQmDMADTrLacf8ZuByoqOai', '2023-05-22 16:00:00', '0', '2023-05-23 07:39:39', '2023-05-23 07:39:39', NULL, NULL, NULL, NULL),
(20, 20, 4, 'assistantAdmin', '94656696', 'altantulga@gmail.com', '$2y$10$MTf4NU8td8Pxxekkf93H2e/o2bjPDrSt3cxWxEyqYftTk3P9/akSi', '$2y$10$t80mRO4ajBfVOtTwdkBVTuR7MDk5FS8YGcKxfBEBQsR5YnA65ly9u', '2023-05-22 16:00:00', '0', '2023-05-23 07:40:51', '2023-05-23 07:40:51', NULL, NULL, NULL, NULL),
(21, 21, 4, 'unitUser', '95548516', 'nymaanyamsvm@gmail.com', '$2y$10$5AJ9VGWI796jtFy1GZtiT.ezo2s.r.2xkf2o2cxqrAGk9ScDQw7Iy', '$2y$10$sw2xCSstlowJTrR839LxuONBPcECOEBBxEnT/QL/mUZeuGZOrypvu', '2023-05-22 16:00:00', '0', '2023-05-23 07:42:15', '2023-05-23 07:42:15', NULL, NULL, NULL, NULL),
(23, 23, 1, 'gsmafAdmin', '80118011', 'gsmaf@gmail.com', '$2y$10$nL9Z1TENPfFXoRFc.TVLnujBZoj2ROAa1WkQx1AVvhkFBKeGCPWZe', '$2y$10$n1gy5Bu744oXhTDWuv6OsezSBciTAmhWzVYynYdbFzua8A/RsBo1G', '2023-05-23 08:07:56', '0', '2023-05-23 08:07:46', '2023-05-23 08:07:46', NULL, NULL, NULL, NULL),
(24, 24, 1, 'healthDepartmentAdmin', '90119011', 'division@gmail.com', '$2y$10$/LUYaW/tXejtcn01dzyfs.93WzcyJBasjc8R3M4bVUUKKNyJuYe.S', '$2y$10$tHVPC4w.QGyPmRRzbfwiVOnO/wiVO79plUvJHmzMwnrOz4rrznlsO', '2023-05-23 08:07:56', '0', '2023-05-23 11:02:37', '2023-05-23 11:02:37', NULL, NULL, NULL, NULL),
(25, 25, 1, 'hospitalAdmin', '91019101', 'doctor@gmail.com', '$2y$10$TDL/Th7bVL14d9rwqBSf4uEjjUvIL78t7M0YH25CjUElEiq.NfzxO', '$2y$10$QO/JnthOcGPXOQR0iWy3LOHBFuxmOyoCONa9kh2099tXvOiQMYgCK', '2023-05-23 08:07:56', '0', '2023-05-23 11:04:02', '2023-05-23 11:04:02', NULL, NULL, NULL, NULL),
(26, 26, 1, 'sportAdmin', '81018101', 'sport@gmail.com', '$2y$10$V4KiY.KesnowyGmiqTMhMu9IFzpgobFqRnQ3IxPvimhBy7zttRCZe', '$2y$10$0xCaXcnGKJAwQ34DAadXiuNQc5qOUDsHXn9yQj.Atsl/94LhUbT4a', '2023-05-23 08:07:56', '0', '2023-05-23 11:05:27', '2023-05-23 11:05:27', NULL, NULL, NULL, NULL),
(27, 27, 1, 'languageAdmin', '82028202', 'language@gmail.com', '$2y$10$ijmXJQwCACC.j4/5FIdiT.wPa/vP0EZEgf8srTFNMP6DqrjUVlV3S', '$2y$10$1eYtpaupCMoR1xGrieOf0OfzyU.MMYCbwSxgyeHBl48G9KM4bBfC6', '2023-05-23 08:07:56', '0', '2023-05-23 11:06:28', '2023-05-23 11:06:28', NULL, NULL, NULL, NULL),
(28, 28, 1, 'batalionAdmin', '92029202', 'batalion@gmail.com', '$2y$10$ren4iGGTdo6qoloMpFfGiex70kNyYPNIccJRVz2IkhnU9NIg3NqBS', '$2y$10$KvGL7bwpy/ItXDCVRoct9ufBVKiFG1jxk/0Y70AUTyWF03Gkatf16', '2023-05-23 08:07:56', '0', '2023-05-23 11:07:25', '2023-05-23 11:07:25', NULL, NULL, NULL, NULL),
(29, 29, 4, 'unitUser', '96351586', 'm.batbolorbaagii2@gmail.com', '$2y$10$MC4CHSzddEM41ItYKp97GucVGVlvc9e8veH/TfCDCGspGTL7C7Qq.', '$2y$10$0tQxcBNpJdc1PlACrla99urJ5WbYrDnfX.rgAGGC3aejX6CuwSu7.', '2023-06-19 07:53:31', 'eqeC3aKGrhAT7osnGmX7PMLGJn7OuvK0Nza8w81wzcgVhBAYsieFm6ryunQz', '2023-05-25 02:19:38', '2023-06-22 08:33:19', '395924', '2023-06-22 04:56:23', 0, NULL),
(38, 37, 4, 'unitUser', '95664323', 'test15@gmail.com', '$2y$10$eb.i1bn0j3meRzph4bx8Jec//UCfwnI81ycITFWLmmryYGTmErRfq', '$2y$10$V51IR3KwOYM0Cf1u91ragOME9hsLm29a56W6DPXstb3eegGnvEiLe', NULL, '0', '2023-06-10 09:18:34', '2023-06-10 09:18:34', NULL, NULL, NULL, NULL),
(39, 38, 2, 'unitAdmin', '96354896', 'test16@gmail.com', '$2y$10$RyPhI.G5Bxx8TH/JAf2ht.R/CnffphvNSefd48gyjggTyKLgSDfBa', '$2y$10$54qUM1JjBrY4AkIephGqguGV7KxRbHlDPx2OiFBZXJ5Tt/1A8pCMm', NULL, '0', '2023-06-10 09:20:41', '2023-06-10 09:20:41', NULL, NULL, NULL, NULL),
(40, 39, 4, 'unitUser', '99999999', 'test@gmail.com', '$2y$10$1jqX4jJIOrx3t9fgxooqTutoYJkrh7fE0zfOKYpcfUMqYPTCHy2Ji', '$2y$10$foPKFXVlvgeETUnG/iTY8.tiWjQEVpWkYYjs2QW0JcWFJC9i2ebQe', NULL, '0', '2023-06-13 05:16:01', '2023-06-13 05:16:01', NULL, NULL, NULL, NULL),
(41, 40, 23, 'comandlalAdmin', '95159515', 'hil@gmail.com', '$2y$10$Wnw.W8TfF7MZR1jog25QSe12l1I6Rw/isnp.22ZhZAUDkgrgmpdQS', '$2y$10$wZHCMX1qg0PDwAgHfb1ZHuhjizU6a77dbM/65xWgvVRuIylk/CyQq', '2023-06-13 05:59:26', '0', '2023-06-13 05:59:14', '2023-06-13 05:59:14', NULL, NULL, NULL, NULL),
(42, 41, 23, 'comandlalAdmin', '85236547', 'tusgai@gmail.com', '$2y$10$Wnw.W8TfF7MZR1jog25QSe12l1I6Rw/isnp.22ZhZAUDkgrgmpdQS', '$2y$10$8PE2oibmbSNKr.qNPKIAMOR8hNrYpcamNqiJxzrPdzGRzsft9HucC', '2023-06-13 06:30:36', '0', '2023-06-13 06:30:16', '2023-06-13 06:30:16', NULL, NULL, NULL, NULL),
(43, 42, 42, 'unitUser', '98756128', 'tusgaitest1@gmail.com', '$2y$10$kjmAwl4kRvXqHh9UdATT..BSem0cRx8qvg3knNKuPDqK/FMpyLiH.', '$2y$10$9q/9J2OOB7kZwosq1I37Ru9F/FvC4Dgqsz.Eyy5yvadnx1gAtH.ya', NULL, '0', '2023-06-13 06:35:46', '2023-06-13 06:35:46', NULL, NULL, NULL, NULL),
(44, 43, 42, 'unitUser', '75412588', 'tusgaitest2@gmail.com', '$2y$10$6oQdsafo1mprifYDGllOjeKyi6r49Yx8MsHc/PMK3vk2rRw6nWzk.', '$2y$10$CncE1KhaVMVbN8dvEXPnp.TuzzRL4Z0N2ghj8xMLMYOjnheOLCMie', NULL, '0', '2023-06-13 07:05:42', '2023-06-13 07:05:42', NULL, NULL, NULL, NULL),
(73, 72, 1, 'unitAdmin', '98456321', 'm.batbolorbaagii5@gmail.com', '$2y$10$A0JF6i8C0x24OSqGDG0wpOIebSEnWq9WnSzf9U6cX4QoCbtSpz1wC', '$2y$10$GkdZI2ib60ugUUqhAdNyY.iFS56ThH7Khqxp8stEDX/IqKlq2wYyq', NULL, '0', '2023-06-16 01:05:56', '2023-06-19 02:59:18', '659742', '2023-06-19 02:59:18', 0, NULL),
(74, 73, 2, 'unitAdmin', '96325156', 'super12212@gmail.com', '$2y$10$hZAAbx6Gx8tDuCgJra757.WcCI.HjKjU40B6UTi5PshvAIaAvcJA2', '$2y$10$eNt.facUAJhI76Kf1IF.1eNIML55TPgQqR7DtBG2GOcvi447cqgI6', NULL, '0', '2023-06-20 03:46:02', '2023-06-20 03:46:02', NULL, NULL, NULL, NULL),
(75, 74, 2, 'unitUser', '85214563', 'super666626@gmail.com', '$2y$10$kTvNeOfRtfhOxTT9d3aVTenHfbY/VsWoMjRcXmzHF2mDrLiA8MWBy', '$2y$10$01xsgAkXWZ3W0T2h8pRj1.9MPtp5vodW3Io3Oj8u0t2sI.QOvr5pK', NULL, '0', '2023-06-20 03:46:30', '2023-06-20 03:46:30', NULL, NULL, NULL, NULL),
(76, 75, 4, 'unitUser', '95323232', 'test18@gmail.com', '$2y$10$E7HRt5gFLnHGr6yCoQxzC.5nLAPwn3e866DvUFv..odqg.fEUUF7y', '$2y$10$vFZs6vIsVdC5LrajPm/Dr.zkPoAIv2DtbTWMJYE.NChSuzAYKat.6', NULL, '0', '2023-06-20 03:48:34', '2023-06-20 03:48:34', NULL, NULL, NULL, NULL),
(77, 76, 4, 'unitUser', '74412151', 'test19@gmail.com', '$2y$10$zeJJwemXOBBE.paPeYk16ehA5qGVwpsj6XzLgn0tctQqJQBxtHZue', '$2y$10$sj.3LUIciL1dWDn42r8id.Zfvv7XE185WwYgZ1Cfwjuk2n.6DSMv.', NULL, '0', '2023-06-20 03:48:57', '2023-06-20 03:48:57', NULL, NULL, NULL, NULL),
(78, 77, 4, 'unitUser', '96541258', 'super32555@gmail.com', '$2y$10$qwtg5ckTz2ZvAHALkMmonOidRMMAd3FiFITxZlSAPFN8eZA0JclCS', '$2y$10$2hZKo9O4RwZBJZd/tQ/szOP.ZSyoYJjzJ3sZl5eRAfsBLqLw0xRYO', NULL, '0', '2023-06-23 16:03:28', '2023-06-23 16:03:28', NULL, NULL, NULL, NULL),
(79, 78, 4, 'unitUser', '96320121', 'super0222@gmail.com', '$2y$10$M/6uzUy5MP.A83h4Ph29XOLwUku.MOqSyBov/aRwCD9rhrKt1ePQe', '$2y$10$maenBpmaLGNwUH4ZOgPktuRsyvghL.Hblt4OuAjqdd0xtlHsHlRcW', NULL, '0', '2023-06-23 16:07:12', '2023-06-23 16:07:12', NULL, NULL, NULL, NULL),
(80, 79, 4, 'unitUser', '75326589', 'super777@gmail.com', '$2y$10$ZKl0WaJOJ0uQMmfvX5VDIOKfVyOQOlmzcvPOQ71P6pnjFRAksekPm', '$2y$10$h.GGcr9TlLO2DAsBAzN7juOYJp37uo0LNSgFSyE1UsyRj1gbJTHv2', NULL, '0', '2023-06-23 16:13:06', '2023-06-23 16:13:06', NULL, NULL, NULL, NULL),
(81, 80, 1, 'unitUser', '88552211', 'shvvhtest@gmail.com', '$2y$10$V4KiY.KesnowyGmiqTMhMu9IFzpgobFqRnQ3IxPvimhBy7zttRCZe', '$2y$10$IJ/tgbpMlmESvX7mfnwvLeAgqsqnRIJVzOnid1GhJ8SlWsgtj8xiK', '2023-06-26 02:59:56', '0', '2023-06-26 02:58:34', '2023-06-26 02:58:34', NULL, NULL, NULL, NULL),
(82, 81, 1, 'unitUser', '77553322', 'testtusgai@gmail.com', '$2y$10$V4KiY.KesnowyGmiqTMhMu9IFzpgobFqRnQ3IxPvimhBy7zttRCZe', '$2y$10$kDHGywrGQ8vIPlP8h15Pc.sHjIw3Sqw/BHWw/0QkiTiq0/Gt9BSyC', '2023-06-26 03:10:31', '0', '2023-06-26 03:09:14', '2023-06-26 03:09:14', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pko_user_question`
--

CREATE TABLE `pko_user_question` (
  `id` int(11) NOT NULL,
  `pkoUserID` int(11) NOT NULL,
  `appointedDate` date NOT NULL,
  `rolePlayed` int(2) NOT NULL,
  `missionType` int(2) DEFAULT NULL,
  `missionName` varchar(100) DEFAULT NULL,
  `missionCameDate` date DEFAULT NULL,
  `studying` int(2) NOT NULL,
  `punishment` int(2) NOT NULL,
  `punishmentDate` date DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `comandlalName` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_user_question`
--

INSERT INTO `pko_user_question` (`id`, `pkoUserID`, `appointedDate`, `rolePlayed`, `missionType`, `missionName`, `missionCameDate`, `studying`, `punishment`, `punishmentDate`, `updated_at`, `comandlalName`, `firstName`) VALUES
(63, 29, '2021-09-13', 1, 12, NULL, NULL, 1, 1, NULL, '2023-06-28 12:29:29', 'ЗХЖШ', 'ЭДЦХАХ'),
(64, 11, '2021-09-13', 1, 1, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL),
(65, 81, '2021-09-12', 1, 12, NULL, NULL, 1, 0, '2022-10-27', '2023-06-28 11:21:49', 'ЗХЖШ', 'ЭДЦХАХ'),
(66, 82, '2010-05-05', 0, 12, '0', '2021-05-05', 0, 1, NULL, '2023-06-29 15:02:48', 'ЗХЖШ', 'Хүний нөөц');

-- --------------------------------------------------------

--
-- Table structure for table `pko_user_question_history`
--

CREATE TABLE `pko_user_question_history` (
  `id` int(11) NOT NULL,
  `pkoUserQuestionID` int(11) NOT NULL,
  `appointedDateOld` date DEFAULT NULL,
  `rolePlayedOld` int(2) DEFAULT NULL,
  `missionTypeOld` int(2) DEFAULT NULL,
  `missionNameOld` varchar(100) DEFAULT NULL,
  `missionCameDateOld` date DEFAULT NULL,
  `studyingOld` int(2) DEFAULT NULL,
  `punishmentOld` int(2) DEFAULT NULL,
  `punishmentDateOld` date DEFAULT NULL,
  `appointedDateNew` date DEFAULT NULL,
  `rolePlayedNew` int(2) DEFAULT NULL,
  `missionTypeNew` int(2) DEFAULT NULL,
  `missionNameNew` varchar(100) DEFAULT NULL,
  `missionCameDateNew` date DEFAULT NULL,
  `studyingNew` int(2) DEFAULT NULL,
  `punishmentNew` int(2) DEFAULT NULL,
  `punishmentDateNew` date DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `editorComandlalName` varchar(50) DEFAULT NULL,
  `editorFirstName` varchar(50) DEFAULT NULL,
  `editorRd` varchar(10) DEFAULT NULL,
  `editorPhone` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_user_question_history`
--

INSERT INTO `pko_user_question_history` (`id`, `pkoUserQuestionID`, `appointedDateOld`, `rolePlayedOld`, `missionTypeOld`, `missionNameOld`, `missionCameDateOld`, `studyingOld`, `punishmentOld`, `punishmentDateOld`, `appointedDateNew`, `rolePlayedNew`, `missionTypeNew`, `missionNameNew`, `missionCameDateNew`, `studyingNew`, `punishmentNew`, `punishmentDateNew`, `updated_at`, `editorComandlalName`, `editorFirstName`, `editorRd`, `editorPhone`) VALUES
(21, 66, '2010-02-02', 0, 12, '8', '2022-10-05', 1, 1, NULL, '2010-03-03', 0, 12, '0', '2020-10-10', 1, 1, NULL, '2023-06-29 14:59:55', 'ЗХЖШ', 'ЭДЦХАХ', 'ТЗ85101317', '99119911'),
(22, 66, '2010-03-03', 0, 12, '0', '2020-10-10', 1, 1, NULL, '2010-05-05', 0, 12, '0', '2021-05-05', 0, 1, NULL, '2023-06-29 15:02:48', 'ЗХЖШ', 'Хүний нөөц', 'ХН88061819', '80118011');

-- --------------------------------------------------------

--
-- Table structure for table `pko_user_requirements`
--

CREATE TABLE `pko_user_requirements` (
  `id` int(11) NOT NULL,
  `appointedDate` int(2) NOT NULL,
  `missionTypeHalf` int(2) NOT NULL,
  `missionTypeFull` int(2) NOT NULL,
  `studying` int(2) DEFAULT 0,
  `punishmentDate` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_user_requirements`
--

INSERT INTO `pko_user_requirements` (`id`, `appointedDate`, `missionTypeHalf`, `missionTypeFull`, `studying`, `punishmentDate`) VALUES
(2, 1, 12, 24, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `pko_uureg_applause`
--

CREATE TABLE `pko_uureg_applause` (
  `id` int(11) NOT NULL,
  `isApplauseName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_uureg_applause`
--

INSERT INTO `pko_uureg_applause` (`id`, `isApplauseName`) VALUES
(1, 'Сайшаал'),
(2, 'Шийтгэл');

-- --------------------------------------------------------

--
-- Table structure for table `pko_uureg_applause_sub`
--

CREATE TABLE `pko_uureg_applause_sub` (
  `id` int(11) NOT NULL,
  `applauseID` int(11) NOT NULL,
  `applauseHelber` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_uureg_applause_sub`
--

INSERT INTO `pko_uureg_applause_sub` (`id`, `applauseID`, `applauseHelber`) VALUES
(1, 1, 'Баяр хүргэх'),
(2, 1, 'Үнэ бүхий зүйл, мөнгөн шагналаар шагнах'),
(3, 1, 'Албан тушаалын үндсэн цалинг 3 сар хүртэл хугацаагаар 20 хүртэл хувиар нэмэгдүүлэх'),
(4, 2, 'Өөрт нь ганцаарчилсан хэлбэрээр сануулах'),
(5, 2, 'Нийт бүрэлдэхүүнд зарлах хэлбэрээр нээлттэй сануулах'),
(6, 2, 'Албан тушаалын цалингийн хэмжээг 3 сар хүртэл хугацаагаар 20 хүртэл хувиар бууруулах');

-- --------------------------------------------------------

--
-- Table structure for table `pko_uureg_guitsetgelt`
--

CREATE TABLE `pko_uureg_guitsetgelt` (
  `id` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `pkoMainHistoryID` int(11) NOT NULL,
  `applauseID` int(11) DEFAULT NULL,
  `applauseSubID` int(11) DEFAULT NULL,
  `applauseDescription` varchar(500) DEFAULT NULL,
  `applauseDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_uureg_guitsetgelt`
--

INSERT INTO `pko_uureg_guitsetgelt` (`id`, `missionID`, `eeljID`, `pkoMainHistoryID`, `applauseID`, `applauseSubID`, `applauseDescription`, `applauseDate`) VALUES
(1, 1, 13, 3, 1, 2, NULL, '2023-12-20 19:29:00'),
(2, 1, 13, 1, 1, 2, NULL, '2023-12-20 19:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `pko_wish`
--

CREATE TABLE `pko_wish` (
  `id` int(11) NOT NULL,
  `pkoUserID` int(11) NOT NULL,
  `missionID` int(11) NOT NULL,
  `eeljID` int(11) NOT NULL,
  `insideApprove` int(11) NOT NULL DEFAULT 3,
  `declineDescription` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_wish`
--

INSERT INTO `pko_wish` (`id`, `pkoUserID`, `missionID`, `eeljID`, `insideApprove`, `declineDescription`, `created_at`) VALUES
(1, 6, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(2, 7, 1, 13, 1, NULL, '2023-05-23 09:27:10'),
(3, 8, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(4, 9, 1, 13, 2, 'ЭДА-нд үүрэг гүйцэтгэх жил хүрээгүй байна.', '2023-05-23 09:28:32'),
(5, 11, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(6, 12, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(7, 13, 1, 13, 1, NULL, '2023-05-23 09:47:02'),
(8, 14, 1, 13, 1, NULL, '2023-05-23 09:47:09'),
(9, 15, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(10, 16, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(11, 17, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(12, 18, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(13, 19, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(14, 20, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(15, 21, 1, 13, 3, NULL, '2023-05-23 09:51:22'),
(43, 29, 1, 13, 3, NULL, '2023-06-26 02:03:37'),
(44, 81, 1, 13, 3, NULL, '2023-06-26 02:58:34'),
(45, 82, 1, 13, 3, NULL, '2023-06-26 03:09:14');

-- --------------------------------------------------------

--
-- Table structure for table `pko_year`
--

CREATE TABLE `pko_year` (
  `id` int(11) NOT NULL,
  `year` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_year`
--

INSERT INTO `pko_year` (`id`, `year`) VALUES
(1, '2023'),
(2, '2024'),
(3, '2025'),
(4, '2026'),
(5, '2027');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_about`
--

CREATE TABLE `tb_about` (
  `id` int(11) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `body` longtext NOT NULL,
  `featuredImage` varchar(250) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `readCount` int(11) DEFAULT NULL,
  `adminID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_about`
--

INSERT INTO `tb_about` (`id`, `title`, `body`, `featuredImage`, `date`, `readCount`, `adminID`) VALUES
(1, '<p>ТҮР АЖИЛЛАГААНЫ БААЗЫГ БАЙГУУЛАН ҮҮРЭГ ГҮЙЦЭТГЭЖ БАЙНА</p>', '<p>Бүгд Найрамдах Өмнөд Судан Улсад явагдаж буй &ldquo;UNMISS&rdquo; ажиллагаанд Монгол Улсын Зэвсэгт Хүчний 12 дугаар ээлжийн цэргийн баг &ldquo;Юнити&rdquo; секторын Бентью, Париан, Эко, Жамжан болон Зүүн секторын &ldquo;Бор&rdquo; сууринд үүргээ амжилттай гүйцэтгэж байна.</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; Тус улсын нийт нутаг дэвсгэрт 2021, 2022 оны борооны улирлаас шалтгаалан үерийн аюул тулгарч, хот, аймаг, сумдыг холбосон үндсэн хангалтын замууд усанд автаж, ашиглах боломжгүй болсон тул тус улсын Засгийн газар нийт нутгийн хэмжээнд төв хангалтын замыг засаж сайжруулах ажлыг эрчимтэй гүйцэтгэж байна.</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; Энэхүү бүтээн байгуулалтын ажилд Зүүн секторын &ldquo;Бор&rdquo; сууринаас Их Пибор мужийг холбосон үндсэн хангалтын 202 километр зам засварын ажлыг Бүгд Найрамдах Солонгос Улсын инженерийн рот хариуцан ажиллаж байгаа юм.</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; Тухайн газар нутгийн хувьд үерийн улмаас төв хангалтын зам хаагдсанаас эдийн засгийн хүндрэл үүсэж, орон нутгийн иргэд өлсгөлөнд нэрвэгдэх аюул тулгарсан ба үүний улмаас Засгийн газрын эсрэг хүчнүүд, омог, аймгуудын зэвсэгт бүлэглэлүүд төв хангалтын зам дагуу дээрэм, хулгай хийх болон бусад хууль бус үйлдлүүд ихээр гарч зам засварын ажилд хүндрэл учирч байгаа тул Секторын командлагчийн тушаалаар Солонгосын инженерийн ротыг хамгаалах, аюулгүй байдлыг хангах үүрэгт &ldquo;Бор&rdquo; суурин дахь мотобуудлагын ротоос нэг салаа хүртэлх хүчийг томилон ажиллуулж байна.</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Энэхүү салаа нь өнгөрсөн сарын 16-ны өдрөөс эхлэн үүрэг гүйцэтгэж байгаа бөгөөд Зүүн секторын штаб болон орон нутгийн удирдлага, иргэдийн зүгээс төв хангалтын замын засварын ажлыг тасалдалгүй явуулах, омог, аймгуудын зэвсэгт бүлэглэлүүд хууль бус үйлдэл гаргахаас урьдчилан сэргийлэх, иргэдийн аюулгүй байдлыг хангахын төлөө өдөр, шөнийн аль ч нөхцөлд мэргэжлийн өндөр ур чадвар гарган үүрэг гүйцэтгэж буй Монгол Улсын Зэвсэгт хүчний цэргийн алба хаагчдад талархаж буйгаа илэрхийлж байсан юм.</p>', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_album`
--

CREATE TABLE `tb_album` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_album`
--

INSERT INTO `tb_album` (`id`, `userID`, `image`) VALUES
(1, 1, 'https://psod.maf.gov.mn/storage/photos/1/Zurgiin tsomog/2.jpeg'),
(2, 1, 'https://psod.maf.gov.mn/storage/photos/1/Zurgiin tsomog/6.jpeg'),
(3, 1, 'https://psod.maf.gov.mn/storage/photos/1/Zurgiin tsomog/327970379_1209092650035626_1052823556181631221_n.jpeg'),
(4, 1, 'https://psod.maf.gov.mn/storage/photos/1/Zurgiin tsomog/IMG_7748.jpeg'),
(5, 1, 'https://psod.maf.gov.mn/storage/photos/1/Zurgiin tsomog/329738646_934050281057724_171390006613918812_n.jpeg'),
(6, 1, 'https://psod.maf.gov.mn/storage/photos/1/Zurgiin tsomog/sud1.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_comandlal`
--

CREATE TABLE `tb_comandlal` (
  `id` int(11) NOT NULL,
  `comandlalName` varchar(250) NOT NULL,
  `comandlalShortName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_comandlal`
--

INSERT INTO `tb_comandlal` (`id`, `comandlalName`, `comandlalShortName`) VALUES
(1, 'Зэвсэгт хүчний Жанжин штаб', 'ЗХЖШ'),
(2, 'Батлан хамгаалах яам', 'БХЯ'),
(3, 'Хуурай замын цэргийн командлал', 'ХЗЦК'),
(4, 'Агаарын цэргийн командлал', 'АЦК'),
(5, 'Тусгай хүчний цэргийн командлал', 'ТХЦК'),
(6, 'Кибер аюулгүй байдлын цэргийн командлал', 'КАБЦК'),
(7, 'Барилга-инженерийн цэргийн удирдах газар', 'БИЦУГ'),
(8, 'Хил хамгаалах ерөнхий газар', 'ХХЕГ'),
(9, 'Дотоодын цэрэг(Цагдаагийн ерөнхий газар)', 'ДЦ(ЦЕГ)'),
(10, 'Онцгой байдлын ерөнхий газар', 'ОБЕГ'),
(11, 'Шүүхийн шийдвэр гүйцэтгэх ерөнхий газар', 'ШШГЕГ'),
(12, 'Төрийн тусгай хамгаалалтын газар', 'ТТХГ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_gender`
--

CREATE TABLE `tb_gender` (
  `id` int(11) NOT NULL,
  `genderName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_gender`
--

INSERT INTO `tb_gender` (`id`, `genderName`) VALUES
(11, 'Эр'),
(22, 'Эм');

-- --------------------------------------------------------

--
-- Table structure for table `tb_ranks`
--

CREATE TABLE `tb_ranks` (
  `id` int(11) NOT NULL,
  `rankTypeID` int(11) DEFAULT NULL,
  `shortRank` varchar(15) NOT NULL,
  `rank` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_ranks`
--

INSERT INTO `tb_ranks` (`id`, `rankTypeID`, `shortRank`, `rank`) VALUES
(1, 5, 'д/а', 'Дэд ахлагч'),
(2, 5, 'а/ч', 'Ахлагч'),
(3, 5, 'а/а', 'Ахлах ахлагч'),
(4, 5, 'су/а', 'Сургагч ахлагч'),
(5, 5, 'т/а', 'Тэргүүн ахлагч'),
(6, 4, 'д/ч', 'Дэслэгч'),
(7, 4, 'а/д', 'Ахлах дэслэгч'),
(8, 4, 'а/х', 'Ахмад'),
(9, 4, 'х/ч', 'Хошууч'),
(10, 4, 'д/х', 'Дэд хурандаа'),
(11, 4, 'хур', 'Хурандаа'),
(12, 4, 'б/ген', 'Бригадын генерал'),
(13, 4, 'х/ген', 'Хошууч генерал'),
(14, 4, 'д/ген', 'Дэслэгч генерал'),
(15, 4, 'ген', 'Генерал'),
(16, 6, 'с/ч', 'Сонсогч'),
(17, 6, 'д/т', 'Дэд түрүүч'),
(18, 6, 'т/ч', 'Түрүүч'),
(19, 7, 'д/т', 'Дэд түрүүч'),
(20, 7, 'т/ч', 'Түрүүч'),
(21, 8, 'б/ч', 'Байлдагч'),
(22, 8, 'а/б', 'Ахлах байлдагч'),
(23, 8, 'д/т', 'Дэд түрүүч'),
(24, 8, 'т/ч', 'Түрүүч'),
(25, 9, 'энг', 'Энгийн');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rank_parent`
--

CREATE TABLE `tb_rank_parent` (
  `id` int(11) NOT NULL,
  `rankParentName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_rank_parent`
--

INSERT INTO `tb_rank_parent` (`id`, `rankParentName`) VALUES
(1, 'Байнгийн бүрэлдэхүүн'),
(2, 'Цэргийн алба хаагч'),
(3, 'Ажилчин алба хаагч');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rank_type`
--

CREATE TABLE `tb_rank_type` (
  `id` int(11) NOT NULL,
  `rankParentID` int(11) NOT NULL,
  `rankTypeName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_rank_type`
--

INSERT INTO `tb_rank_type` (`id`, `rankParentID`, `rankTypeName`) VALUES
(4, 1, 'Офицер'),
(5, 1, 'Ахлагч'),
(6, 2, 'Сонсогч'),
(7, 2, 'Гэрээт'),
(8, 2, 'Хугацаат'),
(9, 3, 'ААХ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_recommendation`
--

CREATE TABLE `tb_recommendation` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `RecommendationName` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` text DEFAULT NULL,
  `show` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_unit`
--

CREATE TABLE `tb_unit` (
  `id` int(11) NOT NULL,
  `comandlalID` int(11) NOT NULL,
  `unitShortName` varchar(250) NOT NULL,
  `unitFullName` varchar(250) NOT NULL,
  `unitNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_unit`
--

INSERT INTO `tb_unit` (`id`, `comandlalID`, `unitShortName`, `unitFullName`, `unitNumber`) VALUES
(1, 1, 'ЗХЖШ', 'Зэвсэгт хүчний жанжин штабын газар хэлтэс', 1),
(2, 2, 'БХЯ', 'Батлан хамгаалах яам', 2),
(3, 3, 'ХЗЦК', 'Хуурай замын цэргийн командлал', 3),
(4, 4, 'АЦК', 'Агаарын цэргийн командлал', 4),
(5, 5, 'ТХЦК', 'Тусгай хүчний цэргийн командлал', 5),
(6, 6, 'КАБЦК', 'Кибер аюулгүй байдлын цэргийн командлал', 6),
(7, 7, 'БИЦУГ', 'Барилга-инженерийн цэргийн удирдах газар', 7),
(8, 1, 'ЗХ-ний 011', 'Зэвсэгт хүчний 011 дүгээр анги', 11),
(9, 1, 'ЗХ-ний 013', 'Зэвсэгт хүчний 013 дугаар анги', 13),
(10, 3, 'ЗХ-ний 014', 'Зэвсэгт хүчний 014 дүгээр анги', 14),
(11, 1, 'ЗХ-ний 015', 'Зэвсэгт хүчний 015 дугаар анги', 15),
(12, 3, 'ЗХ-ний 016', 'Зэвсэгт хүчний 016 дугаар анги', 16),
(13, 7, 'ЗХ-ний 017', 'Зэвсэгт хүчний 017 дугаар анги', 17),
(14, 2, 'ЗХ-ний 027', 'Цэргийн төв эмнэлэг', 27),
(15, 2, 'ЗХ-ний 029', 'Үндэсний Батлан Хамгаалахын их сургууль', 29),
(16, 1, 'ЗХ-ний 032', 'Зэвсэгт хүчний 032 дугаар анги', 32),
(17, 4, 'ЗХ-ний 065', 'Зэвсэгт хүчний 065 дугаар анги', 65),
(18, 5, 'ЗХ-ний 084', 'Зэвсэгт хүчний 084 дүгээр анги', 84),
(19, 1, 'ЗХ-ний 089', 'Зэвсэгт хүчний 089 дүгээр анги', 89),
(20, 7, 'ЗХ-ний 110', 'Зэвсэгт хүчний 110 дугаар анги', 110),
(21, 3, 'ЗХ-ний 119', 'Зэвсэгт хүчний 119 дүгээр анги', 119),
(22, 3, 'ЗХ-ний 120', 'Зэвсэгт хүчний 120 дугаар анги', 120),
(23, 3, 'ЗХ-ний 123', 'Зэвсэгт хүчний 123 дугаар анги', 123),
(24, 1, 'ЗХ-ний 124', 'Зэвсэгт хүчний 124 дүгээр анги', 124),
(25, 1, 'ЗХ-ний 142', 'Зэвсэгт хүчний 142 дугаар анги', 142),
(26, 5, 'ЗХ-ний 150', 'Зэвсэгт хүчний 150 дугаар анги', 150),
(27, 3, 'ЗХ-ний 167', 'Зэвсэгт хүчний 167 дугаар анги', 167),
(28, 3, 'ЗХ-ний 186', 'Зэвсэгт хүчний 186 дугаар анги', 186),
(29, 1, 'ЗХ-ний 189', 'Зэвсэгт хүчний 189 дүгээр анги', 189),
(30, 1, 'ЗХ-ний 232', 'Зэвсэгт хүчний 232 дугаар анги', 232),
(31, 3, 'ЗХ-ний 234', 'Зэвсэгт хүчний 234 дүгээр анги', 234),
(32, 3, 'ЗХ-ний 256', 'Зэвсэгт хүчний 256 дугаар анги', 256),
(33, 1, 'ЗХ-ний 284', 'Зэвсэгт хүчний 284 дүгээр анги', 284),
(34, 4, 'ЗХ-ний 303', 'Зэвсэгт хүчний 303 дугаар анги', 303),
(35, 1, 'ЗХ-ний 310', 'Зэвсэгт хүчний 310 дугаар анги', 310),
(36, 1, 'ЗХ-ний 311', 'Зэвсэгт хүчний 311 дүгээр анги', 311),
(37, 1, 'ЗХ-ний 314', 'Зэвсэгт хүчний 314 дүгээр анги', 314),
(38, 4, 'ЗХ-ний 325', 'Зэвсэгт хүчний 325 дугаар анги', 325),
(39, 3, 'ЗХ-ний 326', 'Зэвсэгт хүчний 326 дугаар анги', 326),
(40, 3, 'ЗХ-ний 327', 'Зэвсэгт хүчний 327 дугаар анги', 327),
(41, 5, 'ЗХ-ний 330', 'Зэвсэгт хүчний 330 дугаар анги', 330),
(42, 5, 'ЗХ-ний 331', 'Зэвсэгт хүчний 331 дүгээр анги', 331),
(43, 1, 'ЗХ-ний 334', 'Зэвсэгт хүчний 334 дүгээр анги', 334),
(44, 4, 'ЗХ-ний 337', 'Зэвсэгт хүчний 337 дугаар анги', 337),
(45, 7, 'ЗХ-ний 338', 'Зэвсэгт хүчний 338 дугаар анги', 338),
(46, 7, 'ЗХ-ний 339', 'Зэвсэгт хүчний 339 дүгээр анги', 339),
(47, 7, 'ЗХ-ний 340', 'Зэвсэгт хүчний 340 дүгээр анги', 340),
(48, 5, 'ЗХ-ний 345', 'Зэвсэгт хүчний 345 дугаар анги', 345),
(49, 5, 'ЗХ-ний 350', 'Зэвсэгт хүчний 350 дугаар анги', 350),
(50, 4, 'ЗХ-ний 353', 'Зэвсэгт хүчний 353 дугаар анги', 353),
(51, 3, 'ЗХ-ний 356', 'Зэвсэгт хүчний 356 дугаар анги', 356),
(52, 8, 'ХХЕГ', 'Хил хамгаалах ерөнхий газар', 8),
(53, 9, 'ДЦ(ЦЕГ)', 'Дотоодын цэрэг(Цагдаагийн ерөнхий газар)', 9),
(54, 10, 'ОБЕГ', 'Онцгой байдлын ерөнхий газар', 10),
(55, 11, 'ШШГЕГ', 'Шүүхийн шийдвэр гүйцэтгэх ерөнхий газар', 12),
(56, 12, 'ТТХГ', 'Төрийн тусгай хамгаалалтын газар', 18);

-- --------------------------------------------------------

--
-- Table structure for table `tb_unit_sub`
--

CREATE TABLE `tb_unit_sub` (
  `id` int(11) NOT NULL,
  `comandlalID` int(11) NOT NULL,
  `unitID` int(11) NOT NULL,
  `unitSubShortName` varchar(250) NOT NULL,
  `unitSubFullName` varchar(250) NOT NULL,
  `unitSubNumber` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_users`
--
ALTER TABLE `all_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pko_admin_type`
--
ALTER TABLE `pko_admin_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_airplane_arrived`
--
ALTER TABLE `pko_airplane_arrived`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_airplane_shift`
--
ALTER TABLE `pko_airplane_shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_airplane_shift_item`
--
ALTER TABLE `pko_airplane_shift_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_batalion_oron_too`
--
ALTER TABLE `pko_batalion_oron_too`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_canceled`
--
ALTER TABLE `pko_canceled`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_canceled_type`
--
ALTER TABLE `pko_canceled_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_complaints`
--
ALTER TABLE `pko_complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_control`
--
ALTER TABLE `pko_control`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_covot_comandlal`
--
ALTER TABLE `pko_covot_comandlal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_covot_unit`
--
ALTER TABLE `pko_covot_unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_date`
--
ALTER TABLE `pko_date`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_date_news`
--
ALTER TABLE `pko_date_news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_documents`
--
ALTER TABLE `pko_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_document_items`
--
ALTER TABLE `pko_document_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_doc_description`
--
ALTER TABLE `pko_doc_description`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_foreign_password`
--
ALTER TABLE `pko_foreign_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_health`
--
ALTER TABLE `pko_health`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_heltes_decline_description`
--
ALTER TABLE `pko_heltes_decline_description`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_is_crime`
--
ALTER TABLE `pko_is_crime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_language_score`
--
ALTER TABLE `pko_language_score`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_language_type`
--
ALTER TABLE `pko_language_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_main_history`
--
ALTER TABLE `pko_main_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_missions`
--
ALTER TABLE `pko_missions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_mission_eelj`
--
ALTER TABLE `pko_mission_eelj`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_mission_history`
--
ALTER TABLE `pko_mission_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_one_page`
--
ALTER TABLE `pko_one_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_position`
--
ALTER TABLE `pko_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_rot`
--
ALTER TABLE `pko_rot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_salaa`
--
ALTER TABLE `pko_salaa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_sport_score`
--
ALTER TABLE `pko_sport_score`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_sport_type`
--
ALTER TABLE `pko_sport_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_tasag`
--
ALTER TABLE `pko_tasag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_users`
--
ALTER TABLE `pko_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `pko_user_question`
--
ALTER TABLE `pko_user_question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_user_question_history`
--
ALTER TABLE `pko_user_question_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_user_requirements`
--
ALTER TABLE `pko_user_requirements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_uureg_applause`
--
ALTER TABLE `pko_uureg_applause`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_uureg_applause_sub`
--
ALTER TABLE `pko_uureg_applause_sub`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_uureg_guitsetgelt`
--
ALTER TABLE `pko_uureg_guitsetgelt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_wish`
--
ALTER TABLE `pko_wish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pko_year`
--
ALTER TABLE `pko_year`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tb_about`
--
ALTER TABLE `tb_about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_album`
--
ALTER TABLE `tb_album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_comandlal`
--
ALTER TABLE `tb_comandlal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_gender`
--
ALTER TABLE `tb_gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_ranks`
--
ALTER TABLE `tb_ranks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_rank_parent`
--
ALTER TABLE `tb_rank_parent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_rank_type`
--
ALTER TABLE `tb_rank_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_recommendation`
--
ALTER TABLE `tb_recommendation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_unit`
--
ALTER TABLE `tb_unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_unit_sub`
--
ALTER TABLE `tb_unit_sub`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_users`
--
ALTER TABLE `all_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_admin_type`
--
ALTER TABLE `pko_admin_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pko_airplane_arrived`
--
ALTER TABLE `pko_airplane_arrived`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_airplane_shift`
--
ALTER TABLE `pko_airplane_shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pko_airplane_shift_item`
--
ALTER TABLE `pko_airplane_shift_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_batalion_oron_too`
--
ALTER TABLE `pko_batalion_oron_too`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pko_canceled`
--
ALTER TABLE `pko_canceled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pko_canceled_type`
--
ALTER TABLE `pko_canceled_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_complaints`
--
ALTER TABLE `pko_complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pko_control`
--
ALTER TABLE `pko_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_covot_comandlal`
--
ALTER TABLE `pko_covot_comandlal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pko_covot_unit`
--
ALTER TABLE `pko_covot_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pko_date`
--
ALTER TABLE `pko_date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_date_news`
--
ALTER TABLE `pko_date_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pko_documents`
--
ALTER TABLE `pko_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `pko_document_items`
--
ALTER TABLE `pko_document_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pko_doc_description`
--
ALTER TABLE `pko_doc_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pko_foreign_password`
--
ALTER TABLE `pko_foreign_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_health`
--
ALTER TABLE `pko_health`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `pko_heltes_decline_description`
--
ALTER TABLE `pko_heltes_decline_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pko_is_crime`
--
ALTER TABLE `pko_is_crime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_language_score`
--
ALTER TABLE `pko_language_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_language_type`
--
ALTER TABLE `pko_language_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_main_history`
--
ALTER TABLE `pko_main_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `pko_missions`
--
ALTER TABLE `pko_missions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_mission_eelj`
--
ALTER TABLE `pko_mission_eelj`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pko_mission_history`
--
ALTER TABLE `pko_mission_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pko_one_page`
--
ALTER TABLE `pko_one_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_position`
--
ALTER TABLE `pko_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pko_rot`
--
ALTER TABLE `pko_rot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_salaa`
--
ALTER TABLE `pko_salaa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_sport_score`
--
ALTER TABLE `pko_sport_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pko_sport_type`
--
ALTER TABLE `pko_sport_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_tasag`
--
ALTER TABLE `pko_tasag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_users`
--
ALTER TABLE `pko_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `pko_user_question`
--
ALTER TABLE `pko_user_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `pko_user_question_history`
--
ALTER TABLE `pko_user_question_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `pko_user_requirements`
--
ALTER TABLE `pko_user_requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pko_uureg_applause`
--
ALTER TABLE `pko_uureg_applause`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pko_uureg_applause_sub`
--
ALTER TABLE `pko_uureg_applause_sub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pko_uureg_guitsetgelt`
--
ALTER TABLE `pko_uureg_guitsetgelt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pko_wish`
--
ALTER TABLE `pko_wish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `pko_year`
--
ALTER TABLE `pko_year`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_about`
--
ALTER TABLE `tb_about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_album`
--
ALTER TABLE `tb_album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_comandlal`
--
ALTER TABLE `tb_comandlal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tb_gender`
--
ALTER TABLE `tb_gender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tb_ranks`
--
ALTER TABLE `tb_ranks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `tb_rank_parent`
--
ALTER TABLE `tb_rank_parent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_rank_type`
--
ALTER TABLE `tb_rank_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_recommendation`
--
ALTER TABLE `tb_recommendation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_unit`
--
ALTER TABLE `tb_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `tb_unit_sub`
--
ALTER TABLE `tb_unit_sub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
