import React, { useState, useEffect } from "react";
import {
	Box,
	Text,
	Flex,
	Button,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
	Textarea,
	Input,
	useToast,
} from "@chakra-ui/react";
import Database from "../../../data";

/**
 * Returns component for creating staff
 * @param onSubmit {function}
 */
const AddStaffForm = ({ onSubmit }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const restaurantId = Number(
			document.getElementById("restaurant-id").value
		);
		const isManager = document.getElementById("is-manager").checked;
		const staffName = document.getElementById("staff-name").value;
		const staffEmail = document.getElementById("staff-email").value;

		if (!restaurantId) {
			toast({
				title: "ERROR",
				description: "No restaurant ID provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else if (!staffName) {
			toast({
				title: "ERROR",
				description: "No name for new staff member provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else if (!staffEmail) {
			toast({
				title: "ERROR",
				description: "No email for new staff member provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		if (
			!(await Database.addStaffMember(
				restaurantId,
				isManager,
				staffName,
				staffEmail
			))
		) {
			toast({
				title: "Staff Member Not Added",
				description: "Issues with provided staff member information.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else {
			toast({
				title: "Staff Member Added",
				description: staffName + " added to the staff.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
		onClose();
		onSubmit();
	};

	return (
		<Flex flexDirection="column" justify="center" py="0.5em">
			<Button
				onClick={() => onOpen()}
				size="md"
				fontSize="1.5rem"
				colorScheme="primary"
				variant="solid"
				p={3}
				px="2em"
			>
				Add Staff
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text textStyle="body2Semi">Add New Staff Member</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
							textAlign="center"
						>
							<Box
								style={{
									width: "100%",
								}}
							>
								<Text textStyle="body3">Restaurant ID</Text>
								<Input
									type="number"
									name="restaurant-id"
									id="restaurant-id"
									placeholder="123"
									style={{
										background: "#f3f3f3",
										borderRadius: "0.25rem",
										border: "1px solid",
										padding: "0.5rem",
										width: "50%",
										height: "2.25rem",
										margin: "0 auto",
									}}
								/>
							</Box>
							<Box mt={2} style={{ width: "100%" }}>
								<Text textStyle="body3">Is Manager?</Text>
								<input
									type="checkbox"
									name="is-manager"
									id="is-manager"
									style={{
										margin: "0 auto",
									}}
								/>
							</Box>
							<Box
								mt={2}
								style={{
									width: "100%",
								}}
							>
								<Text textStyle="body3">Name</Text>
								<Input
									type="text"
									name="staff-name"
									id="staff-name"
									placeholder="John Doe"
									style={{
										background: "#f3f3f3",
										borderRadius: "0.25rem",
										border: "1px solid",
										padding: "0.5rem",
										width: "50%",
										height: "2.25rem",
										margin: "0 auto",
									}}
								/>
							</Box>
							<Box
								mt={2}
								style={{
									width: "100%",
								}}
							>
								<Text textStyle="body3">Email</Text>
								<Input
									type="email"
									name="staff-email"
									id="staff-email"
									placeholder="john.doe@example.com"
									style={{
										background: "#f3f3f3",
										borderRadius: "0.25rem",
										border: "1px solid",
										padding: "0.5rem",
										width: "50%",
										height: "2.25rem",
										margin: "0 auto",
									}}
								/>
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter justifyContent="center">
						<Button colorScheme="primary" onClick={handleSubmit}>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default AddStaffForm;
