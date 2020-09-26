-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 25, 2020 at 06:13 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28
USE springsession;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `springSession`
--

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` bigint(20) NOT NULL,
  `answer` text DEFAULT NULL,
  `question` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `answer`, `question`) VALUES
(1, 'First check the computer\'s power cord to make sure it is completely plugged into the wall socket. If you are using a plug strip, make sure it is completely plugged into the wall socket and that the power switch on the plug strip is turned on. Some plug strips also have a built in circuit breaker which usually looks like a black or red button near the power switch. Press the button to reset it and see if that solves the problem.', 'My computer does not turn on, what do I do now?'),
(2, 'There are many reasons why a computer may just stop working or \'freeze\'. Most of the time there isn not much we can do about it, it is a fact of life that computer programs have become so complex that occasionally users will experience problems even when performing common tasks. When your computer no longer responds to keyboard commands your best bet is to restart the computer.', 'What do I do when my computer crashes?'),
(3, 'As with most computer errors, your first step is to shut down your computer and restart it. This will help you determine whether or not you actually have a hard disk problem. If the disk is severely damaged then your computer will probably fail to restart properly. If this is the case then contact MCWare IT Solutions, this is a job for the professionals.', 'What do I do if my hard disk fails to work?'),
(4, 'Make sure the monitor is on. If no power light (green or orange light) is seen on the monitor display try pressing the power button until it comes on. If your computer monitor was on and you stepped away from the computer and upon returning it was black, it\'s likely that the computer is asleep. Try moving your mouse, clicking the mouse buttons, and/or pressing any key (space bar) on the keyboard to wake it up. Make sure that the monitor is connected properly to the back of the computer.', 'There is no display on the monitor, what do I do now?'),
(5, 'You may receive a distorted image when the cable is loose or defective. Disconnect the video cable going from the back of the computer and verify that no pins are bent, burnt or broken. Once verified re-connect the monitor cable. If the refresh rate is not properly set the monitor may have a wavy or an appearance that lines are going down or across the monitor slowly or fast, this may also cause a flickering affect. A distorted image can be caused by magnetic or other types of interference. Verify no speakers, fans or other magnetic devices are close to the monitor.', 'What do I do if the image on my monitor is distorted or skewed?'),
(6, 'Verify that the monitor is properly connected in the back of the monitor as well as to the back of the computer. If the monitor appears to be connected properly, verify that a cable is not loose by disconnecting all cables that can be disconnected in the back of the monitor (generally the data cable cannot be disconnected). Next, disconnect the data cable connected to the back of the computer and then reconnect the cable. When connecting the cable in the back of the computer ensure the cable connection is tight. Most Computers will also have screw ends that can be screwed in to hold the connector in place.', 'I get a \'no signal input\' message on my monitor, what do I do?'),
(7, 'If the resolution was recently changed it is possible for the monitor to not auto adjust or shift to the correct size. If this occurs, the resolution can be changed back to the original setting or you can manually adjust the monitor. If a black border exists on the monitor it can generally be resolved by manually adjusting the horizontal or vertical width. Because each monitor is different, the method of adjusting this setting will vary; consult your monitor documentation.', 'There are black borders on my monitors screen, what do I do?'),
(8, 'Users who have an optical mechanical mouse (most common mouse for desktop computers) are likely experiencing erratic behaviour because the mouse is not clean or is dirty. If you\'ve cleaned the mouse and continue to encounter issues and this mouse has worked in the past fine unfortunately your mouse is likely defective. One additional test that can be done to help determine if this is the case or not is to connect the mouse to another computer. Otherwise we suggest replacing the mouse.', 'Why is my computer mouse acting erratically?'),
(9, 'If you\'re running any version of Microsoft Windows and are encountering issues with the mouse wheel, first attempt to adjust the mouse settings through the Mouse Properties window. This window can be accessed by opening the Control Panel and double-clicking the Mouse icon.', 'The wheel on my mouse isn\'t working properly, what do I do?'),
(10, 'The keys on a keyboard are only clipped on, with a knife or other thin object, carefully pop the keys off, this will allow you to clean under the keys as well as cleaning the keys themselves (make sure you remember where they went!).', 'How can I clean my keyboard?'),
(11, 'To get into the Windows 7 / 10 Safe mode, as the computer is starting up press and hold your \'F8 Key\' which should bring up the \'Windows Advanced Options Menu\'. Use your arrow keys to move to \'Safe Mode\' and press your Enter key.', 'How do I get into my computers safe mode?'),
(12, 'Close all programs running on the computer and try again. If after closing all programs running on the computer you are still encountering the same issue when attempting to delete files, load the computer into Safe Mode and delete the files.', 'I can\'t delete a file because it is being used by Windows, what do I do?'),
(13, 'If you are running Microsoft Windows 7, Windows 10, or a later version of Microsoft Windows, you are eligible to update Microsoft Windows, and in some cases, your computer hardware with the latest drivers through Microsoft\'s update site, visit http://windowsupdate.microsoft.com. In most cases your computer should be set to automatically update when a new update becomes available.', 'How can I update my Microsoft Windows computer?'),
(14, 'Users should not simply press the power button or restart the computer while Windows is still running unless there is an issue with the computer. Microsoft has included the shut down feature because it enables a computer to go through all the necessary steps that are required before turning off the computer. In fact many versions of Microsoft Windows will check the computer for any problems if the computer is not shut down properly.', 'Is it safe to turn off a Windows computer without doing a shut down?'),
(15, 'Double click the recycle bin icon on your desktop, here you will see all of the files within your bin. Select the files you wish to recover, right click and choose restore.', 'How can I recover a file from the recycle bin?'),
(16, 'Verify that your computer is able to see the Internet and/or other computers to ensure that your computer is not encountering a connection issue, which would be causing your e-mail issue. Ensure that your Internet e-mail server or your Network e-mail server is not encountering issues by contacting either your Internet Service Provider or your Network administrator.', 'I am unable to send or receive email?'),
(17, 'If the e-mail box is full of other e-mail messages, and/or your storage space is only a few megabytes, it\'s possible that the attachment being sent cannot be received. Often if this problem is occurring the person sending the e-mail should get a response back from your e-mail server indicating that your mailbox is full and/or has exceeded its allocated size. Because computer viruses and other malware are best distributed through e-mail, many e-mail service providers, companies, and e-mail programs prevent certain types of file extensions from being distributed or received through e-mail. For example, Microsoft Outlook protect its users by automatically disabling certain file extension types from being received in e-mail.', 'I can\'t receive any email attachments?'),
(18, 'Just like an Internet URL no spaces are allowed in an e-mail address. However, names can be broken up using a period; for example, John Smith may have an e-mail address: john.smith@example.com or john.s@example.com because no spaces are allowed in the e-mail address.', 'Are spaces allowed in email addresses?'),
(19, 'When printing on untraditional paper your printer may experience smudges, un-even or crooked text, and/or text that runs off the edges of the paper. Your printer may be printing fuzzy, blurry, and/or other faint text because of dirty print heads. All modern printers have some type of printer cleaning, self-test, and/or diagnose mode that can be performed to check and clean the printers print heads and other internal equipment used to print.', 'My printer is printing smudged/distorted pages, what can I do?'),
(20, 'Make sure the monitor is on. If no power light (green or orange light) is seen on the monitor display try pressing the power button until it comes on. If your computer monitor was on and you stepped away from the computer and upon returning it was black, it\'s likely that the computer is asleep. Try moving your mouse, clicking the mouse buttons, and/or pressing any key (space bar) on the keyboard to wake it up. Make sure that the monitor is connected properly to the back of the computer.', 'There is no display on the monitor, what do I do now?'),
(21, 'Turn off the printer. Inspect the location or tray the printed paper ejects to. If the stuck paper is visible manually remove it. Remove all paper trays and any paper that may be stuck between the tray and the printer. If the stuck paper is visible manually remove it. Open the printer door that allows you access to the printer ink cartridges or toner and look for any stuck paper. If the stuck paper is visible manually remove it. Turn the printer back on.', 'How do I fix a paper jam?'),
(22, 'Thankfully a missing printer installation disk is not the end of the world and will not require you to wait until a new disk can be sent to you. Today all printer and other hardware manufacturers are providing downloads on the Internet to their software programs and drivers that are included with their products.', 'I lost my printer installation disk, how can I install my printer?'),
(23, 'Verify that the network cable is properly connected to the back of the computer. In addition, when checking the connection of the network cable, ensure that the LED\'s on the network are properly illuminated. For example, a network card with a solid green LED or light usually indicates that the card is either connected or receiving a signal. Note: generally, when the green light is flashing, this is an indication of data being sent or received.', 'I can\'t connect to my network drive anymore, what can I do?'),
(24, 'Open Microsoft Explorer. From Explorer, click the Tools drop down menu and click the option \'Map Network Drive.\' Specify the network drive or network computer as the folder. If the computer\'s name was hope, to map to that computer, type \\hope If you wished to map to a shared folder on the hope computer such as a mp3 folder, you would type hope mp3. If a different username or login is required to connect to this computer or drive it must be specified in this window before clicking the finish.', 'How do I map a network drive?'),
(25, 'Right-click My Computer. Click Properties. In the Properties window, click the Computer Name tab. Within this tab you\'ll be able to see the full computer name, workgroup and also a description. If you wish to change the name or workgroup, click the Change button.', 'How do I determine my computer\'s name?'),
(26, 'A computer virus is a software program that has been intentionally created to cause a user grief, spread to other computers, or destroy data on an individual\'s computer. To help prevent a computer from becoming infected by a virus, software developers have developed anti virus programs that stay active on the computer helping to protect it. It is important to realize that many computers do not come pre-loaded with these already installed and that if computers do come with these programs, the programs may expire within 90 days.', 'What is a computer virus?'),
(27, 'All versions of Microsoft Windows do not come pre-installed with a virus protection program. This includes: Microsoft Windows 7 and Windows 10.', 'Does Windows come with a virus protection program?'),
(28, 'No. Computer viruses are software code designed to spread to computer files and other computers, delete files, and cause other problems with the data on the computer. So if you\'re experiencing an issue with a hardware device such as your printer, video card, sound card, etc. it is not due to a virus.', 'Can a virus damage computer hardware?'),
(29, 'If your computer is infected with a virus formatting or erasing the hard disk drive and starting over will almost always remove any type of virus. However, keep in mind if backups have been made that contain the virus, other media or drives connected to the computer have a virus, your computer is connected to another computer on a network with a virus, and/or the virus is stored on some other type of software you use with your computer it can become re-infected if not properly protected.', 'If I format or erase my hard drive will it remove a virus?'),
(30, 'Microsoft Internet Explorer users can go to \'Tools\' (or the little cog icon in the top left), then go to \'Safety\' and choose \'Delete browsing history...\', you can then choose to delete your Internet cookies. In Google Chrome, go to \'More Tools\' and choose \'Clear browsing data...\'. Firefox users can go to \'History\', then choose \'Clear recent history...\'', 'How do I delete Internet cookies?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
