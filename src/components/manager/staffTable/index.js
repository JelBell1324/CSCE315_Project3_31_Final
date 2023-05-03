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
	Grid,
	GridItem,
} from "@chakra-ui/react";
import Database from "../../../data";

/**
 * Returns component for showing staff table
 */
const StaffTable = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [staff, setStaff] = useState([]);

	useEffect(() => {
		const fetchStaff = async () => {
			const staffData = await Database.getStaff();
			setStaff(staffData);
		};

		if (!staff?.length) {
			fetchStaff();
		}
	}, [staff]);

	return (
		<Flex flexDirection="column" justify="center" py="0.5em">
			<Box fontSize="1.2rem" my={2} mx="auto">
				<Button
					onClick={() => onOpen()}
					size="md"
					fontSize="1.2rem"
					colorScheme="primary"
					variant="solid"
					p={3}
					px="2em"
				>
					Show Staff Table
				</Button>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} size="6x1">
				<ModalOverlay />
				<ModalContent maxW="80%" w="80%" h="80%">
					<ModalHeader>
						<Text textStyle="body2Semi">Staff Table</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody overflowY="auto" px={8} py={4}>
						<Grid templateColumns="repeat(5, 1fr)" gap={0} pt={5}>
							<GridItem
								borderBottomWidth="1px"
								borderColor="gray.300"
							>
								<Text textStyle="body3Semi">ID</Text>
							</GridItem>
							<GridItem
								borderBottomWidth="1px"
								borderColor="gray.300"
							>
								<Text textStyle="body3Semi">Name</Text>
							</GridItem>
							<GridItem
								borderBottomWidth="1px"
								borderColor="gray.300"
							>
								<Text textStyle="body3Semi">Manager</Text>
							</GridItem>
							<GridItem
								borderBottomWidth="1px"
								borderColor="gray.300"
							>
								<Text textStyle="body3Semi">Restaurant ID</Text>
							</GridItem>
							<GridItem
								borderBottomWidth="1px"
								borderColor="gray.300"
							>
								<Text textStyle="body3Semi">Email</Text>
							</GridItem>
						</Grid>
						{staff.map((staffMember) => (
							<Grid templateColumns="repeat(5, 1fr)" gap={4}>
								<GridItem
									borderBottomWidth="1px"
									borderColor="gray.300"
								>
									<Text textStyle="body4">
										{staffMember.staff_id}
									</Text>
								</GridItem>
								<GridItem
									borderBottomWidth="1px"
									borderColor="gray.300"
								>
									<Text textStyle="body4">
										{staffMember.name}
									</Text>
								</GridItem>
								<GridItem
									borderBottomWidth="1px"
									borderColor="gray.300"
								>
									<Text textStyle="body4">
										{staffMember.is_manager ? "Yes" : "No"}
									</Text>
								</GridItem>
								<GridItem
									borderBottomWidth="1px"
									borderColor="gray.300"
								>
									<Text textStyle="body4">
										{staffMember.restaurant_id}
									</Text>
								</GridItem>
								<GridItem
									borderBottomWidth="1px"
									borderColor="gray.300"
								>
									<Text textStyle="body4">
										{staffMember.email}
									</Text>
								</GridItem>
							</Grid>
						))}
					</ModalBody>
					<ModalFooter justifyContent="center">
						<Button colorScheme="primary" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default StaffTable;
