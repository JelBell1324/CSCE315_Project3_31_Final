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
  useToast
} from "@chakra-ui/react";
import Database from "../../../../data";

/**
 * Returns component for editing inventory
 * @param onSubmit {function}
 * @param itemName {function}
 * @param itemQuantity {number}
 */
const EditInventoryItemForm = ({ onSubmit, itemName, itemQuantity }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const onUpdate = async (shouldIncrease) => {
    const currVal = parseInt(document.getElementById("item-quantity").value);
    if (shouldIncrease) {
      if (!currVal || currVal === 0) {
        document.getElementById("item-quantity").value = 1;
      } else {
        document.getElementById("item-quantity").value = currVal + 1;
      }
    } else {
      if (!currVal || currVal === 0) {
        document.getElementById("item-quantity").value = 0;
      } else {
        document.getElementById("item-quantity").value = currVal - 1;
      }
    }
    return;
  }

  const handleSubmit = async () => {
    const newQuantity = parseInt(document.getElementById("item-quantity").value);

    if (!newQuantity) {
      toast({
        title: "ERROR",
        description: "No quantity for " + itemName + " provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (newQuantity === itemQuantity) {
      toast({
        title: "Item Cost Not Updated",
        description: "New quantity is same as old quantity.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!(await Database.updateInventoryQuantityByName(itemName, newQuantity))) {
      toast({
        title: "Item Cost Not Updated",
        description: "Issues with item quantity provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return;
    } else {
      toast({
        title: "Item Cost Updated",
        description: itemName + " quantity changed to " + newQuantity + ".",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }

    return;
  }

  return (
    <Flex justify='center' pt={2}>
      <Button 
      size="md" fontSize="1.5rem" 
      colorScheme='primary' variant='solid'
      onClick={() => onOpen()}
      p={3} px="2em"
      >Edit</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">{itemName}</Text>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex"
                 flexDirection="column"
                 justifyContent="center"
                 alignItems="center"
                 textAlign="center"
            >
              <Box style={{
                  width: "50%"
                }}
              >
                <Text textStyle="body3">Edit Quantity</Text>
                <Flex flexDirection="row" justify="center" alignItems="center" gap={2}>
                  <Button 
                    size="sm" fontSize="1rem" 
                    colorScheme='primary' variant='solid'
                    onClick={() => onUpdate(false)}
                  >{"-"}</Button>
                  <Input type="number" name="item-quantity" id="item-quantity"
                        defaultValue={itemQuantity}
                        style={{
                          background: "#f3f3f3",
                          borderRadius: "0.25rem",
                          border: "1px solid",
                          padding: "0.5rem",
                          textAlign: "center",
                          width: "50%",
                          height: "2.25rem",
                          margin: "0 auto"
                        }}
                  />
                  <Button 
                    size="sm" fontSize="1rem"
                    colorScheme='primary' variant='solid'
                    onClick={() => onUpdate(true)}
                  >{"+"}</Button>
                </Flex>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="primary" onClick={handleSubmit}>
              Confirm Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default EditInventoryItemForm;