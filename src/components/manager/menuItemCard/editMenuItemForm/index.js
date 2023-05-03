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
import Database from "../../../../data";
import DeleteMenuItemConfirm from "./deleteMenuItemConfirm";


/**
 * Returns component for editing items
 * @param onSubmit {function}
 * @param itemName {string}
 * @param onUpdate {function}
 * @param onItemUpdate {function}
 */
const EditMenuItemForm = ({ onSubmit, itemName, onUpdate, onItemUpdate }) => {
	const [itemCost, setItemCost] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [submitCount, setSubmitCount] = useState(0);

	const toast = useToast();

	useEffect(() => {
		const fetchItemCost = async () => {
			const menuItem = await Database.getMenuItemByName(itemName);
			setItemCost(menuItem.price);
		};

		fetchItemCost();
	}, [submitCount]);

	const handleSubmit = async () => {
		const newPrice = document.querySelector("#item-cost").value;

		if (!newPrice) {
			toast({
				title: "ERROR",
				description: "No cost for new menu item provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else if (newPrice === itemCost) {
			toast({
				title: "Item Cost Not Updated",
				description: "New cost is same as old price.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		if (!(await Database.updateMenuPriceByName(itemName, newPrice))) {
			toast({
				title: "Item Cost Not Updated",
				description: "Issues with new cost provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else {
			toast({
				title: "Item Cost Updated",
				description: itemName + " cost changed to $" + newPrice + ".",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			onUpdate(newPrice);
			setSubmitCount(submitCount + 1);
		}

		return;
	};

	const handleConfirmDelete = async () => {
		onClose();
		return;
	}

	return (
		<Flex justify="center" pt={2}>
			<Button
				size="md"
				fontSize="1.5rem"
				colorScheme="primary"
				variant="solid"
				onClick={() => onOpen()}
				p={3}
				px="2em"
			>
				Edit
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text textStyle="body2Semi">{itemName}</Text>
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
									width: "40%",
								}}
							>
								<Text
									textStyle="body3"
									textDecoration="underline"
								>
									Current Cost:{" "}
								</Text>
								<Text textStyle="body3">${itemCost}</Text>
							</Box>
							<Box
								mt={5}
								style={{
									width: "40%",
								}}
							>
								<Text textStyle="body3">New Cost</Text>
								<Flex flexDirection="row" justify="center">
									<Text textStyle="body3">$</Text>
									<Input
										type="number"
										name="item-cost"
										id="item-cost"
										placeholder="00.00"
										style={{
											background: "#f3f3f3",
											borderRadius: "0.25rem",
											border: "1px solid",
											padding: "0.5rem",
											width: "75%",
											height: "2.25rem",
											margin: "0 auto",
										}}
									/>
								</Flex>
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter justifyContent="center" gap={2}>
						<Button colorScheme="primary" onClick={handleSubmit}>
							Confirm Change
						</Button>
						<DeleteMenuItemConfirm itemName={itemName} onConfirmDelete={handleConfirmDelete} onItemUpdate={onItemUpdate}/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default EditMenuItemForm;
