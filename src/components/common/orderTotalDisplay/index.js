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
  ModalFooter,
  useDisclosure,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";

/**
 * Returns component for order total display
 * @param order {object}
 * @param onOrderSubmit {function}
 * @param onQuantityUpdate {function}
 */
const OrderTotalDisplay = ({ order, onOrderSubmit, onQuantityUpdate }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const total = order.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("order:", order);
    const menu_items = order.map(item => [item.menu_id, item.quantity]);
    if (menu_items.length === 0) {
      toast({
        title: "Order Failed",
        description: "No items in your order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    const cost_total = total.toFixed(2);
    const timestamp = new Date();
    const customer_id = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
    const staff_id = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
    await onOrderSubmit(e, cost_total, timestamp, customer_id, staff_id, menu_items);
    onClose();
  }

  return (
    <Flex flexDirection="column" justify="center" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="lg">
      <Box mt={2} mx="auto">
        <Text fontSize="1.5rem"><b>Total: </b>${total ? total.toFixed(2) : "0.00"}</Text>
      </Box>
      <Box fontSize="1.2rem" my={2} mx="auto">
        <Button 
          onClick={() => onOpen()}
          size="lg"
          fontSize="lg"
          variant="solid"
          colorScheme="primary"
          boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
        >
          View Order
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">Confirm Your Order</Text>
            </ModalHeader>
          <ModalBody>
            <Grid templateColumns='repeat(5, 1fr)' gap={0}>
              <GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={3}>
                <Text textStyle="body3Semi">Item</Text>
              </GridItem>
              <GridItem borderBottomWidth="1px" borderColor="gray.300">
                <Text textStyle="body3Semi" textAlign="center">
                  Qty
                </Text>
              </GridItem>
              <GridItem borderBottomWidth="1px" borderColor="gray.300">
                <Text textStyle="body3Semi" textAlign="center">
                  Price
                </Text>
              </GridItem>
            </Grid>
            {
              order.map(
                menuItem => 
                <Grid templateColumns='repeat(5, 1fr)' gap={0}>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={3}>
                    <Text textStyle="body4">{menuItem.name}</Text>
                  </GridItem>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300">
                    <Flex flexDirection="row" justify="center" alignItems="center" gap={0}>
                      <Button 
                        size="xs" fontSize="1rem" 
                        colorScheme='primary' variant='ghost'
                        onClick={() => onQuantityUpdate(menuItem, false)}
                      >{"-"}</Button>
                      <Text textStyle="body4" textAlign="center">
                        {menuItem.quantity}
                      </Text>
                      <Button 
                        size="xs" fontSize="1rem" 
                        colorScheme='primary' variant='ghost'
                        onClick={() => onQuantityUpdate(menuItem, true)}
                      >{"+"}</Button>
                    </Flex>
                  </GridItem>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300">
                    <Text textStyle="body4" textAlign="center">
                      ${menuItem.price * menuItem.quantity ? (menuItem.price * menuItem.quantity).toFixed(2) : "0.00"}
                    </Text>
                  </GridItem>
                </Grid>
              )
            }
            <Flex justify='space-between' pt={7}>
              <Text textStyle="body2Semi">Order Total:</Text>
              <Text textStyle="body2">${total ? total.toFixed(2) : "0.00"}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center" gap={3}>
            <Button colorScheme="primary" onClick={handleSubmit}>
              Confirm
            </Button>
            <Button colorScheme="primary" variant='outline' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default OrderTotalDisplay;