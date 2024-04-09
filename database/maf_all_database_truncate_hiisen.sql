-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2023 at 02:48 PM
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
(13, 'comissionAdmin', 'Сонгон шалгаруулалтын комиссын админ'),
(14, 'assistantAdmin', 'Эрүүл мэндийн хуудас өгөх туслах эмчийн админ');

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
  `rotID` int(11) NOT NULL,
  `salaaID` int(11) DEFAULT 0,
  `tasagID` int(11) DEFAULT 0,
  `positionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `isDocument` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pko_control`
--

INSERT INTO `pko_control` (`id`, `missionID`, `eeljID`, `isPush`, `isRequest`, `isDocument`) VALUES
(1, 1, 13, 1, 1, 1);

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
(1, 1, 13, 1, NULL, NULL, NULL, 250, '1 программ зохиогч'),
(2, 1, 13, 3, 50, 100, 20, 170, NULL);

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
(3, 1, 13, 'Захирагчийн зөвлөлийн хурлын тэмдэглэл', 'Нэгтгэл анги салбарын захирагчийн зөвлөлийн хурлын тэмдэглэл', NULL),
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
  `healthEdit` int(11) DEFAULT NULL,
  `healthEditDes` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `isCrime` int(2) NOT NULL DEFAULT 0,
  `isCanceled` int(2) NOT NULL DEFAULT 0,
  `isFlight` int(2) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(4, 'Идэвхтэй ажиллагаа', '<p>Одоогоор мэдээлэл алга</p>', 51, 'Идэвхтэй ажиллагаа');

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
  `punishmentDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(2, 12, 12, 24, 1, 12);

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
(7, 'Барилга-инженерийн цэргийн удирдах газар', 'БИЦУГ');

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
(1, 1, 'ЗХЖШ', 'Зэвсэгт хүчний жанжин штаб', 1),
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
(14, 1, 'ЗХ-ний 032', 'Зэвсэгт хүчний 032 дугаар анги', 32),
(15, 4, 'ЗХ-ний 065', 'Зэвсэгт хүчний 065 дугаар анги', 65),
(16, 5, 'ЗХ-ний 084', 'Зэвсэгт хүчний 084 дүгээр анги', 84),
(17, 1, 'ЗХ-ний 089', 'Зэвсэгт хүчний 089 дүгээр анги', 89),
(18, 1, 'ЗХ-ний 110', 'Зэвсэгт хүчний 110 дугаар анги', 110),
(19, 1, 'ЗХ-ний 119', 'Зэвсэгт хүчний 119 дүгээр анги', 119),
(20, 1, 'ЗХ-ний 120', 'Зэвсэгт хүчний 120 дугаар анги', 120),
(21, 3, 'ЗХ-ний 123', 'Зэвсэгт хүчний 123 дугаар анги', 123),
(22, 1, 'ЗХ-ний 124', 'Зэвсэгт хүчний 124 дүгээр анги', 124),
(23, 1, 'ЗХ-ний 189', 'Зэвсэгт хүчний 189 дүгээр анги', 189);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pko_airplane_arrived`
--
ALTER TABLE `pko_airplane_arrived`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_airplane_shift`
--
ALTER TABLE `pko_airplane_shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_airplane_shift_item`
--
ALTER TABLE `pko_airplane_shift_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_batalion_oron_too`
--
ALTER TABLE `pko_batalion_oron_too`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_canceled`
--
ALTER TABLE `pko_canceled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pko_canceled_type`
--
ALTER TABLE `pko_canceled_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_complaints`
--
ALTER TABLE `pko_complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_control`
--
ALTER TABLE `pko_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_covot_comandlal`
--
ALTER TABLE `pko_covot_comandlal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pko_covot_unit`
--
ALTER TABLE `pko_covot_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_date`
--
ALTER TABLE `pko_date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_date_news`
--
ALTER TABLE `pko_date_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_documents`
--
ALTER TABLE `pko_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_document_items`
--
ALTER TABLE `pko_document_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pko_doc_description`
--
ALTER TABLE `pko_doc_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_foreign_password`
--
ALTER TABLE `pko_foreign_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pko_health`
--
ALTER TABLE `pko_health`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_heltes_decline_description`
--
ALTER TABLE `pko_heltes_decline_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_one_page`
--
ALTER TABLE `pko_one_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pko_position`
--
ALTER TABLE `pko_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_rot`
--
ALTER TABLE `pko_rot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_salaa`
--
ALTER TABLE `pko_salaa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_sport_score`
--
ALTER TABLE `pko_sport_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_sport_type`
--
ALTER TABLE `pko_sport_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_tasag`
--
ALTER TABLE `pko_tasag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_users`
--
ALTER TABLE `pko_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_user_question`
--
ALTER TABLE `pko_user_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pko_wish`
--
ALTER TABLE `pko_wish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tb_unit_sub`
--
ALTER TABLE `tb_unit_sub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
