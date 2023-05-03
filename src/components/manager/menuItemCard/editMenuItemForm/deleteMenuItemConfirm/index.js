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
	Input,
	useToast,
} from "@chakra-ui/react";
import Database from "../../../../../data";

/**
 * Returns component for confirming the deletion of a menu item
 * @param itemName {string}
 * @param onConfirmDelete {function}
 * @param onItemUpdate {function}
 */
const DeleteMenuItemConfirm = ({ itemName, onConfirmDelete, onItemUpdate }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();

	const handleConfirm = async (e) => {
    e.preventDefault();
    const menuItem = await Database.getMenuItemByName(itemName);
    if (!(await Database.removeMenuItem(menuItem.menu_id))) {
      toast({
				title: "ERROR",
				description: "Issue with deleting " + itemName + " from the menu.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
    } else {
      toast({
				title: "Item Deleted",
				description: itemName + " was deleted from the menu.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
    }
    onItemUpdate();
    onConfirmDelete();
    onClose();
		return;
	};

	return (
    <Flex>
      <Button
        colorScheme="primary"
        onClick={() => onOpen()}
        border="2px solid darkred"
      >
        Delete Item
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
				closeOnOverlayClick={false}
				closeOnEsc={false}
        size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textStyle="body2Semi">Confirm to delete</Text>
            <Text>"{itemName}"</Text>
          </ModalHeader>
          <ModalFooter justifyContent="center" gap={2}>
            <Button colorScheme="primary" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button
              colorScheme="primary"
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
	);
};

export default DeleteMenuItemConfirm;
