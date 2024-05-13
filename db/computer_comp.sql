-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Apr 22, 2024 alle 21:08
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `computer_comp`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `builds`
--

CREATE TABLE `builds` (
  `id` int(11) NOT NULL,
  `casepc` int(11) NOT NULL,
  `cpu` int(11) NOT NULL,
  `motherboard` int(11) NOT NULL,
  `ram` int(11) NOT NULL,
  `psu` int(11) NOT NULL,
  `storage` int(11) NOT NULL,
  `gpu` int(11) NOT NULL,
  `cpu_cooler` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `builds`
--

INSERT INTO `builds` (`id`, `casepc`, `cpu`, `motherboard`, `ram`, `psu`, `storage`, `gpu`, `cpu_cooler`) VALUES
(15, 2, 4, 2, 4, 2, 3, 2, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `model` char(15) NOT NULL,
  `brand` char(10) NOT NULL,
  `length` int(4) NOT NULL,
  `height` int(4) NOT NULL,
  `width` int(4) NOT NULL,
  `name` char(32) NOT NULL,
  `max_gpu_length` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `cases`
--

INSERT INTO `cases` (`id`, `model`, `brand`, `length`, `height`, `width`, `name`, `max_gpu_length`) VALUES
(2, '4000X', 'CORSAIR', 453, 466, 230, 'ICUE 4000X', 360),
(3, '5000X', 'CORSAIR', 520, 520, 245, 'ICUE 5000X', 400);

-- --------------------------------------------------------

--
-- Struttura della tabella `chipsets`
--

CREATE TABLE `chipsets` (
  `chipset` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `chipsets`
--

INSERT INTO `chipsets` (`chipset`) VALUES
('am3'),
('am4'),
('am5'),
('lga1200'),
('lga1700');

-- --------------------------------------------------------

--
-- Struttura della tabella `cpus`
--

CREATE TABLE `cpus` (
  `id` int(11) NOT NULL,
  `ncore` int(11) NOT NULL,
  `nthreads` int(11) NOT NULL,
  `models` char(32) NOT NULL,
  `architecture` char(32) NOT NULL,
  `chipset` char(10) NOT NULL,
  `name` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `cpus`
--

INSERT INTO `cpus` (`id`, `ncore`, `nthreads`, `models`, `architecture`, `chipset`, `name`) VALUES
(4, 12, 24, '5900X', 'Zen 3', 'am4', 'AMD Ryzen 9 5900x'),
(5, 8, 16, '5800X', 'Zen 3', 'am4', 'AMD Ryzen 7 5800x'),
(6, 6, 12, '5600x', 'Zen 3', 'am4', 'AMD Ryzen 5 5600x'),
(7, 24, 32, '13900k', 'Intel Raptor Lake', 'lga1700', 'Intel Core i9 13900k'),
(8, 16, 24, '13700k', 'Intel Raptor Lake', 'lga1700', 'Intel Core i7 13700k'),
(9, 14, 20, '13600k', 'Intel Raptor Lake', 'lga1700', 'Intel Core i5 13600k');

-- --------------------------------------------------------

--
-- Struttura della tabella `cpu_coolers`
--

CREATE TABLE `cpu_coolers` (
  `id` int(11) NOT NULL,
  `watt` int(11) NOT NULL,
  `brand` char(15) NOT NULL,
  `model` char(10) NOT NULL,
  `tipo` char(7) NOT NULL,
  `length` int(4) NOT NULL,
  `name` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `cpu_coolers`
--

INSERT INTO `cpu_coolers` (`id`, `watt`, `brand`, `model`, `tipo`, `length`, `name`) VALUES
(2, 250, 'CORSAIR', 'H115i', '1', 280, 'H115i Elite Cappelix');

-- --------------------------------------------------------

--
-- Struttura della tabella `gpus`
--

CREATE TABLE `gpus` (
  `id` int(11) NOT NULL,
  `brand` varchar(10) NOT NULL,
  `models` varchar(15) NOT NULL,
  `watt` int(4) NOT NULL,
  `length` int(4) NOT NULL COMMENT 'mm',
  `architecture` char(32) NOT NULL,
  `name` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `gpus`
--

INSERT INTO `gpus` (`id`, `brand`, `models`, `watt`, `length`, `architecture`, `name`) VALUES
(2, 'NVIDIA', 'RTX3070', 220, 242, 'Ampere', 'RTX 3070'),
(3, 'NVIDIA', 'RTX3080', 320, 285, 'Ampere', 'RTX 3080'),
(4, 'NVIDIA', 'RTX3090', 350, 336, 'Ampere', 'RTX 3090'),
(5, 'NVIDIA', 'RTX4070', 200, 240, 'Ada Lovelace', 'RTX 4070'),
(6, 'NVIDIA', 'RTX4080', 320, 310, 'Ada Lovelace', 'RTX 4080');

-- --------------------------------------------------------

--
-- Struttura della tabella `motherboard`
--

CREATE TABLE `motherboard` (
  `id` int(11) NOT NULL,
  `brand` char(15) NOT NULL,
  `name` char(30) NOT NULL,
  `models` char(10) NOT NULL,
  `chipsets` char(10) NOT NULL,
  `types_ram` char(4) NOT NULL,
  `description` varchar(64) NOT NULL,
  `ssd_length` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `motherboard`
--

INSERT INTO `motherboard` (`id`, `brand`, `name`, `models`, `chipsets`, `types_ram`, `description`, `ssd_length`) VALUES
(2, 'ASUS', 'ROG Strix X570-E Gaming', 'x570E', 'am4', 'ddr4', 'AMD X570 ATX motherboard with high overclock performance', 110),
(3, 'ASUS', 'ASUS ROG Strix Z790-E', 'Z790-E', 'lga1700', 'ddr5', 'The ASUS ROG Strix Z790-E has DDR5 Memory and PCI Express 5.0', 110);

-- --------------------------------------------------------

--
-- Struttura della tabella `psu`
--

CREATE TABLE `psu` (
  `id` int(11) NOT NULL,
  `watt` int(4) NOT NULL,
  `models` varchar(32) NOT NULL,
  `brand` varchar(32) NOT NULL,
  `efficency` varchar(10) NOT NULL,
  `name` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `psu`
--

INSERT INTO `psu` (`id`, `watt`, `models`, `brand`, `efficency`, `name`) VALUES
(2, 650, 'CX650', 'CORSAIR', '80+ Bronze', 'Corsair CX650 80+ Bronze'),
(3, 750, 'CX750', 'CORSAIR', '80+ Bronze', 'Corsair CX750 80+ Bronze'),
(4, 850, 'C850', 'NZXT', '80+ Gold', 'NZXT C850 80+ Gold');

-- --------------------------------------------------------

--
-- Struttura della tabella `QVL`
--

CREATE TABLE `QVL` (
  `id` int(11) NOT NULL,
  `motherboard` int(11) NOT NULL,
  `ram` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `QVL`
--

INSERT INTO `QVL` (`id`, `motherboard`, `ram`) VALUES
(6, 2, 4),
(7, 3, 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `ram`
--

CREATE TABLE `ram` (
  `id` int(11) NOT NULL,
  `brand` varchar(64) NOT NULL,
  `models` varchar(64) NOT NULL,
  `storage` int(11) NOT NULL COMMENT 'gb',
  `latency` int(11) NOT NULL COMMENT 'ns',
  `frequency` int(11) NOT NULL COMMENT 'mhz',
  `numbers` int(11) NOT NULL COMMENT 'numbers of rams module',
  `types_ram` char(4) NOT NULL,
  `name` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ram`
--

INSERT INTO `ram` (`id`, `brand`, `models`, `storage`, `latency`, `frequency`, `numbers`, `types_ram`, `name`) VALUES
(3, 'G.Skill', 'F5-6400J3239G16GX2-TZ5S', 32, 32, 6400, 2, 'ddr5', 'Trident Z5'),
(4, 'G.Skill', 'F4-3200C14D-16GTZN', 16, 14, 3200, 2, 'ddr4', 'Trident Z 16GTZN NEO');

-- --------------------------------------------------------

--
-- Struttura della tabella `storage`
--

CREATE TABLE `storage` (
  `id` int(11) NOT NULL,
  `models` char(32) NOT NULL,
  `name` char(32) NOT NULL,
  `brand` char(32) NOT NULL,
  `storage` int(11) NOT NULL,
  `storage_length` int(11) NOT NULL,
  `tipo` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `storage`
--

INSERT INTO `storage` (`id`, `models`, `name`, `brand`, `storage`, `storage_length`, `tipo`) VALUES
(2, '980 PRO', '980 PRO NVMe M.2', 'SAMSUNG', 1000, 80, 'null'),
(3, 'ST8000DMZ04/004', 'Segate Barracuda', 'Segate', 8000, 0, '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `storage_lengths`
--

CREATE TABLE `storage_lengths` (
  `length` int(4) NOT NULL COMMENT 'mm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `storage_lengths`
--

INSERT INTO `storage_lengths` (`length`) VALUES
(0),
(20),
(30),
(80),
(110);

-- --------------------------------------------------------

--
-- Struttura della tabella `types_ram`
--

CREATE TABLE `types_ram` (
  `type_ram` char(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `types_ram`
--

INSERT INTO `types_ram` (`type_ram`) VALUES
('ddr3'),
('ddr4'),
('ddr5');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `email` varchar(64) NOT NULL,
  `name` char(32) NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`email`, `name`, `image`) VALUES
('ghilardi.giovanni.studente@itispaleocapa.it', 'Giovanni Ghilardi', 'https://lh3.googleusercontent.com/a/ACg8ocJCUQE49llMgcOZN8-QsrjIyARXtS45qNPqAlwLtxhn=s96-c'),
('magri.marco.studente@itispaleocapa.it', 'Marco Magri', 'https://lh3.googleusercontent.com/a/ACg8ocIiUvns7SZdLELl-4wxxm8UWubQ_0KXLDTa54KcA4jsXQ=s96-c'),
('magri.marco.useful@gmail.com', 'Marco Magri', 'https://lh3.googleusercontent.com/a/ACg8ocLnEgkftkp0mN5viDN8MfWSZZwMmjKcWWlpvIbcXpTk-7HEZg=s96-c'),
('marchino.magri@gmail.com', 'Marco magri', 'https://lh3.googleusercontent.com/a/ACg8ocKQ7RkBefzpcG4OAt6UDThVRKHK-l8gAp3bqtug24ChgeYK=s96-c');

-- --------------------------------------------------------

--
-- Struttura della tabella `user_builds`
--

CREATE TABLE `user_builds` (
  `id` int(11) NOT NULL,
  `builds` int(11) NOT NULL,
  `user` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `builds`
--
ALTER TABLE `builds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case` (`casepc`),
  ADD KEY `cpu` (`cpu`),
  ADD KEY `cpu_cooler` (`cpu_cooler`),
  ADD KEY `gpu` (`gpu`),
  ADD KEY `motherboard` (`motherboard`),
  ADD KEY `psu` (`psu`),
  ADD KEY `ram` (`ram`),
  ADD KEY `storage` (`storage`);

--
-- Indici per le tabelle `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `chipsets`
--
ALTER TABLE `chipsets`
  ADD PRIMARY KEY (`chipset`);

--
-- Indici per le tabelle `cpus`
--
ALTER TABLE `cpus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chipsets_cpus` (`chipset`);

--
-- Indici per le tabelle `cpu_coolers`
--
ALTER TABLE `cpu_coolers`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `gpus`
--
ALTER TABLE `gpus`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `motherboard`
--
ALTER TABLE `motherboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `types_ram` (`types_ram`),
  ADD KEY `ssd_length` (`ssd_length`),
  ADD KEY `chipsets` (`chipsets`);

--
-- Indici per le tabelle `psu`
--
ALTER TABLE `psu`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `QVL`
--
ALTER TABLE `QVL`
  ADD PRIMARY KEY (`id`),
  ADD KEY `motherboard` (`motherboard`),
  ADD KEY `ram` (`ram`);

--
-- Indici per le tabelle `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`id`),
  ADD KEY `types_ram` (`types_ram`);

--
-- Indici per le tabelle `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storage_length` (`storage_length`);

--
-- Indici per le tabelle `storage_lengths`
--
ALTER TABLE `storage_lengths`
  ADD PRIMARY KEY (`length`);

--
-- Indici per le tabelle `types_ram`
--
ALTER TABLE `types_ram`
  ADD PRIMARY KEY (`type_ram`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Indici per le tabelle `user_builds`
--
ALTER TABLE `user_builds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`user`),
  ADD KEY `builds` (`builds`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `builds`
--
ALTER TABLE `builds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la tabella `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `cpus`
--
ALTER TABLE `cpus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `cpu_coolers`
--
ALTER TABLE `cpu_coolers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `gpus`
--
ALTER TABLE `gpus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `motherboard`
--
ALTER TABLE `motherboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `psu`
--
ALTER TABLE `psu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `QVL`
--
ALTER TABLE `QVL`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `ram`
--
ALTER TABLE `ram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `storage`
--
ALTER TABLE `storage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `user_builds`
--
ALTER TABLE `user_builds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `builds`
--
ALTER TABLE `builds`
  ADD CONSTRAINT `builds_ibfk_1` FOREIGN KEY (`casepc`) REFERENCES `cases` (`id`),
  ADD CONSTRAINT `builds_ibfk_2` FOREIGN KEY (`cpu`) REFERENCES `cpus` (`id`),
  ADD CONSTRAINT `builds_ibfk_3` FOREIGN KEY (`cpu_cooler`) REFERENCES `cpu_coolers` (`id`),
  ADD CONSTRAINT `builds_ibfk_4` FOREIGN KEY (`gpu`) REFERENCES `gpus` (`id`),
  ADD CONSTRAINT `builds_ibfk_5` FOREIGN KEY (`motherboard`) REFERENCES `motherboard` (`id`),
  ADD CONSTRAINT `builds_ibfk_6` FOREIGN KEY (`psu`) REFERENCES `psu` (`id`),
  ADD CONSTRAINT `builds_ibfk_7` FOREIGN KEY (`ram`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `builds_ibfk_8` FOREIGN KEY (`storage`) REFERENCES `storage` (`id`);

--
-- Limiti per la tabella `cpus`
--
ALTER TABLE `cpus`
  ADD CONSTRAINT `chipsets_cpus` FOREIGN KEY (`chipset`) REFERENCES `chipsets` (`chipset`);

--
-- Limiti per la tabella `motherboard`
--
ALTER TABLE `motherboard`
  ADD CONSTRAINT `motherboard_ibfk_2` FOREIGN KEY (`types_ram`) REFERENCES `types_ram` (`type_ram`),
  ADD CONSTRAINT `motherboard_ibfk_3` FOREIGN KEY (`ssd_length`) REFERENCES `storage_lengths` (`length`),
  ADD CONSTRAINT `motherboard_ibfk_4` FOREIGN KEY (`chipsets`) REFERENCES `chipsets` (`chipset`);

--
-- Limiti per la tabella `QVL`
--
ALTER TABLE `QVL`
  ADD CONSTRAINT `qvl_ibfk_1` FOREIGN KEY (`motherboard`) REFERENCES `motherboard` (`id`),
  ADD CONSTRAINT `qvl_ibfk_2` FOREIGN KEY (`ram`) REFERENCES `ram` (`id`);

--
-- Limiti per la tabella `ram`
--
ALTER TABLE `ram`
  ADD CONSTRAINT `types_ram` FOREIGN KEY (`types_ram`) REFERENCES `types_ram` (`type_ram`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `storage`
--
ALTER TABLE `storage`
  ADD CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`storage_length`) REFERENCES `storage_lengths` (`length`);

--
-- Limiti per la tabella `user_builds`
--
ALTER TABLE `user_builds`
  ADD CONSTRAINT `user_builds_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`EMAIL`),
  ADD CONSTRAINT `user_builds_ibfk_2` FOREIGN KEY (`builds`) REFERENCES `builds` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
