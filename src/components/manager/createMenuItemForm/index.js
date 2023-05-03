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
  useToast
} from "@chakra-ui/react";
import Database from "../../../data";

/**
 * Returns component for creating and submitting a new order
 * @param onSubmit {function}
 */
const CreateMenuItemForm = ({ onSubmit }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemName = document.getElementById("item-name").value;

    const itemCost = document.getElementById("item-cost").value;

    const itemType = document.getElementById("item-type").value;

    const itemIngredients = document.getElementById("item-ingredients").value;
    
    if (!itemName) {
      toast({
        title: "ERROR",
        description: "No name for new menu item provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (!itemCost) {
      toast({
        title: "ERROR",
        description: "No cost for new menu item provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (!itemType) {
      toast({
        title: "ERROR",
        description: "No type for new menu item provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (!itemIngredients) {
      toast({
        title: "ERROR",
        description: "No ingredients for new menu item provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!(await Database.addMenuItem(itemName, itemCost, itemType, itemIngredients))) {
      toast({
        title: "Item Not Created",
        description: "Issues with provided menu item information.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return;
    } else {
      toast({
        title: "Item Created",
        description: itemName + " added to the menu.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    onClose();
    onSubmit();
  };

  return (
    <Flex flexDirection="column" justify="center" py="0.5em">
      <Button 
        onClick={() => onOpen()}
        size="md" fontSize="1.5rem" 
        colorScheme="primary" variant="solid"
        p={3} px="2em"
      >
        New Menu Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">Add New Menu Item</Text>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
              <Box style={{
                  width: "100%"
                }}
              >
                <Text textStyle="body3">Item Name</Text>
                <Input type="text" name="item-name" id="item-name"
                      placeholder="Chicken Sandwich"
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "50%",
                        height: "2.25rem",
                        margin: "0 auto"
                      }}
                />
              </Box>
              <Box mt={2} style={{
                  width: "20%"
                }}
              >
                <Text textStyle="body3">Cost</Text>
                <Flex flexDirection="row" justify="center">
                  <Text textStyle="body3">$</Text>
                  <Input type="number" name="item-cost" id="item-cost"
                        placeholder="00.00"
                        style={{
                          background: "#f3f3f3",
                          borderRadius: "0.25rem",
                          border: "1px solid",
                          padding: "0.5rem",
                          width: "75%",
                          height: "2.25rem",
                          margin: "0 auto"
                        }}
                  />
                </Flex>
              </Box>
              <Box mt={2} style={{
                    width: "70%"
                  }}>
                  <Text textStyle="body3">Item Type</Text>
                  <select type="text" name="type" id="item-type"
                        style={{
                          background: "#f3f3f3",
                          borderRadius: "0.25rem",
                          border: "1px solid",
                          padding: "0.5rem",
                          width: "75%",
                          height: "2.25rem",
                          margin: "0 auto",
                        }}
                  >
                    <option value="">- Select Item Type -</option>
                    <option value="Sandwiches">Sandwiches</option>
                    <option value="Sides">Sides</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Other">Other</option>
                  </select>
              </Box>
              <Box mt={2} 
                style={{
                  width: "100%"
                }}
              >
                <Text textStyle="body3">Ingredients</Text>
                <Textarea type="text" name="item-ingredients" id="item-ingredients"
                      placeholder="Ingredient | QTY&#10;Ingredient | QTY&#10;Ingredient | QTY&#10;..."
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "50%",
                        height: "6.75rem",
                        margin: "0 auto"
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

export default CreateMenuItemForm;