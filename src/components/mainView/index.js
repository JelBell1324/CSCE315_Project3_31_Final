import React from "react";
import { Link as ReactLink } from "react-router-dom";
import {
	Box,
	Flex,
	HStack,
	Text,
	Link,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Button,
	ModalBody,
	Img,
	Grid,
	useToast,
} from "@chakra-ui/react";
import GoogleTranslate from "../common/googleTranslate";
import { GoogleLogin } from "@react-oauth/google";
import Database from "../../data";

import { useState, useEffect } from "react";
import CustomerPage from "../../pages/CustomerPage";
import ServerPage from "../../pages/ServerPage";
import ManagerPage from "../../pages/ManagerPage";
import MenuPage from "../../pages/MenuPage";
import WeatherDisplay from "../common/weatherDisplay";

/**
 * Login modal popup that shows when user joins and when he/she wishes to swich views.
 * @param userType {string} 
 * @param onEnter {function} 
 * @param loggedIn {boolean} 
 * @param onSwitching {function} 
 */
const LoginPopup = ({ userType, onEnter, loggedIn, onSwitching }) => {
	const toast = useToast();
	const [user, setUser] = useState(userType ? userType : "CUSTOMER");

	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (!loggedIn && !isOpen) {
			onOpen();
		}
	}, [loggedIn]);

	const handleEnter = () => {
		onEnter(user);
		onClose();
	};

	const handleLogin = () => {
		//Login
		onEnter(user);
		onClose();
	};

	return (
		<>
			<Button
				colorScheme="primary"
				p={2}
				width="10em"
				onClick={onSwitching}
			>
				Switch Views
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size="xl"
				closeOnOverlayClick={false}
				closeOnEsc={false}
			>
				<ModalOverlay backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>
						<Flex justify="center" gap="0" align="center">
							<Button
								colorScheme="primary"
								variant={user === "MENU" ? "solid" : "outline"}
								borderRightRadius={0}
								p={1}
								onClick={() => setUser("MENU")}
								width="7em"
							>
								Menu
							</Button>
							<Button
								colorScheme="primary"
								variant={
									user === "CUSTOMER" ? "solid" : "outline"
								}
								borderRadius={0}
								p={1}
								onClick={() => setUser("CUSTOMER")}
								width="7em"
							>
								Customer
							</Button>
							<Button
								colorScheme="primary"
								variant={
									user === "SERVER" ? "solid" : "outline"
								}
								borderRadius={0}
								p={1}
								onClick={() => setUser("SERVER")}
								width="7em"
							>
								Server
							</Button>
							<Button
								colorScheme="primary"
								variant={
									user === "MANAGER" ? "solid" : "outline"
								}
								borderLeftRadius={0}
								p={1}
								onClick={() => setUser("MANAGER")}
								width="7em"
							>
								Manager
							</Button>
						</Flex>
						<Text
							width="fit-content"
							mx="auto"
							textAlign="center"
							textStyle="body1"
							py="1em"
						>
							Welcome to Chick-Fil-A!
						</Text>
					</ModalHeader>
					<ModalBody>
						<Flex justifyContent="center">
							{user === "MANAGER" || user === "SERVER" ? (
								<GoogleLogin
									onSuccess={async (credentialResponse) => {
										let res = await Database.postGoogleAuth(
											credentialResponse
										);
										console.log(res);
										if (res.message === 69) {
											if (
												user === "MANAGER" &&
												res.user.is_manager
											) {
												handleLogin();
											} else if (user === "SERVER") {
												handleLogin();
											} else {
												toast({
													title: "Access Denied",
													description:
														"You don't have the necessary permissions.",
													status: "error",
													duration: 5000,
													isClosable: true,
												});
											}
										}
									}}
									onError={() => {
										toast({
											title: "Login Failed",
											description:
												"An error occurred during login.",
											status: "error",
											duration: 5000,
											isClosable: true,
										});
									}}
									useOneTap
								/>
							) : (
								<Button
									colorScheme="primary"
									width="10em"
									height="3em"
									onClick={() => handleEnter()}
								>
									<Text textStyle="body3Semi">Enter</Text>
								</Button>
							)}
						</Flex>
					</ModalBody>
					<ModalFooter justifyContent="center">
						<Img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/582px-Chick-fil-A_Logo.svg.png"
							width="200px"
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

/**
 * Navbar for navigation of the POS system.
 * @param userType {string} 
 * @param onEnter {function} 
 * @param loggedIn {boolean} 
 * @param onSwitching {function} 
 */
const Navbar = ({ userType, onEnter, loggedIn, onSwitching }) => {
	return (
		<Grid templateColumns="repeat(3, 1fr)">
			<Img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/582px-Chick-fil-A_Logo.svg.png"
				width="200px"
				alignSelf="center"
			/>
			<Flex
				width="100%"
				mt="1"
				justify="center"
				align="center"
				px={2}
				pt={2}
			>
				<HStack
					fontSize="1.5rem"
					fontWeight="800"
					spacing="1.5em"
					width="fit-content"
				>
					<LoginPopup
						userType={userType}
						onEnter={onEnter}
						loggedIn={loggedIn}
						onSwitching={onSwitching}
					/>
					<GoogleTranslate />
				</HStack>
			</Flex>
			<WeatherDisplay />
		</Grid>
	);
};

/**
 * Content container for the main content of app.
 * @param content {Object} 
 */
const ContentContainer = ({ content }) => {
	return <Box mt={2}>{content}</Box>;
};

/**
 * Footer content container for POS.
 */
const Footer = () => {
	return (
		<Flex
			flexDirection="column"
			width="100%"
			justify="center"
			pt={5}
			pb={1}
		>
			<Text fontSize="md" mb={4} align="center" mx="auto">
				Developed by{" "}
				<Text as="span" fontWeight="bold" color="primary.500">
					David Chi
				</Text>
				{", "}
				<Text as="span" fontWeight="bold" color="primary.500">
					Jeffrey Li
				</Text>
				{", "}
				<Text as="span" fontWeight="bold" color="primary.500">
					Art Young
				</Text>
				{", and "}
				<Text as="span" fontWeight="bold" color="primary.500">
					Andrew Mao
				</Text>
				<br />
				a.k.a. Team 31
			</Text>
			<Img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/582px-Chick-fil-A_Logo.svg.png"
				width="100px"
				alignSelf="center"
			/>
		</Flex>
	);
};

/**
 * Overarching content container of POS.
 */
const MainView = () => {
	const [userType, setUserType] = useState("SERVER");
	const [content, setContent] = useState(<ServerPage />);
	const [loggedIn, setLoggedIn] = useState(false);

	const switchViews = (user) => {
		if (user === "SERVER") setContent(<ServerPage />);
		else if (user === "MANAGER") setContent(<ManagerPage />);
		else if (user === "CUSTOMER") setContent(<CustomerPage />);
		else if (user === "MENU") setContent(<MenuPage />);

		setUserType(user);
		setLoggedIn(true);
	};

	const enterLoginPopup = () => {
		setLoggedIn(false);
	};

	return (
		<Flex justifyContent="center" overflowX="hidden" overflowY="hidden">
			<Box width="1150px" m={0} p={0}>
				<Navbar
					userType={userType}
					onEnter={switchViews}
					loggedIn={loggedIn}
					onSwitching={enterLoginPopup}
				/>
				<ContentContainer content={content} />
				<Footer />
			</Box>
		</Flex>
	);
};

export default MainView;
export { Navbar, ContentContainer, Footer };
