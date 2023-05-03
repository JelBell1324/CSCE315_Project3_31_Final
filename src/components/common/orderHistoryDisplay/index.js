import React, { useState, useEffect } from "react";
import { 
  Box, Text, Flex, Button,
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
 * Returns component for order history
 */
const OrderHistoryDisplay = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orders, setOrders] = useState([]);
  const [orderIndex, setOrderIndex] = useState(0);

  useEffect(() => {
    const updateOrders = async () => {
      const recentOrders = await Database.getRecentOrders();
      console.log(recentOrders);
      for (let i = 0; i < recentOrders?.length; i++) {
        const menuItems = await Database.getMenuItemsForOrder(recentOrders[i].order_id);
        recentOrders[i] = {...recentOrders[i], menuItems};
      }
      setOrders(recentOrders);
      setOrderIndex(0);
    }
    if (!orders?.length) {
      updateOrders();
    }

  }, [orders, orderIndex]);

  return (
    <Flex flexDirection="column"
          justify="center"
          py="0.5em"
          border="solid 1px"
          borderColor="grey.100"
          rounded="md"
          boxShadow="lg"
    >
      <Box fontSize="1.2rem" my={2} mx="auto">
        <Button 
          onClick={() => onOpen()}
          size="lg"
          fontSize="md"
          variant="solid"
          colorScheme="primary"
          boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
        >
          View Past Orders
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">Past Orders</Text>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              orders?.length ?
              <>
                {console.log(orders[orderIndex])}
                <Text>Order Id: {orders[orderIndex].order_id}</Text>
                <Text>Date: {new Date(orders[orderIndex].date).toLocaleString()}</Text>
                <Text>Staff: {orders[orderIndex].staff_id}</Text>
                <Text>Customer: {orders[orderIndex].customer_id}</Text>
                <Grid templateColumns='repeat(3, 1fr)' gap={0} pt={5}>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300">
                    <Text textStyle="body3Semi">Item</Text>
                  </GridItem>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300">
                    <Text textStyle="body3Semi">Price</Text>
                  </GridItem>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300">
                    <Text textStyle="body3Semi">Quantity</Text>
                  </GridItem>
                </Grid>
                {
                  orders[orderIndex].menuItems.map(
                    menuItem => 
                    <Grid templateColumns='repeat(3, 1fr)' gap={0}>
                      <GridItem borderBottomWidth="1px" borderColor="gray.300">
                        <Text textStyle="body4">{menuItem.menuItem.name}</Text>
                      </GridItem>
                      <GridItem borderBottomWidth="1px" borderColor="gray.300">
                        <Text textStyle="body4">${menuItem.menuItem.price ? menuItem.menuItem.price.toFixed(2) : "0.00"}</Text>
                      </GridItem>
                      <GridItem borderBottomWidth="1px" borderColor="gray.300">
                        <Text textStyle="body4">{menuItem.quantity}</Text>
                      </GridItem>
                    </Grid>
                  )
                }
                <Text textStyle="body3" my="2.5em"><b>Total Price:</b> ${orders[orderIndex].cost_total ? orders[orderIndex].cost_total.toFixed(2) : "0.00"}</Text>
              </>
              : ""
            }
            <Flex justify='center' gap={1} pt={5}>
              <Button 
                size="md" fontSize="1.5rem" 
                colorScheme='primary' variant='solid'
                onClick={() => setOrderIndex(i => Math.max(0, i-1))}
                p={3} px="2em"
              >{"<"}</Button>
              <Button 
                size="md" fontSize="1.5rem"
                colorScheme='primary' variant='solid'
                onClick={() => setOrderIndex(i => Math.min(i+1, orders?.length))}
                p={3} px="2em"
              >{">"}</Button>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="primary" onClick={onClose}>
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default OrderHistoryDisplay;