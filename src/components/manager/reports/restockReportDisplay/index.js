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
  Input,
  useToast,
} from "@chakra-ui/react";
import Database from "../../../../data";
import InfoButton from "../../../common/infoButton";
import { ComposedChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend, Bar } from "recharts";

/**
 * Returns modal popup for Restock Reports
 */
const RestockReportDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refillItems, setRefillItems] = useState([]);
  const [minimumQty, setMinimumQty] = useState(0);
  const [chartData, setChartData] = useState([]);
  const toast = useToast();
  const handleSubmit = async (e) => {
    const minQty = document.getElementById("minQty-input").value;
    e.preventDefault();
    if (!minQty) {
      toast({
        title: "ERROR",
        description: "No minimum value provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return;
    } else if (minQty <= 0) {
      toast({
        title: "ERROR",
        description: "Minimum quantity must be greater than zero.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    setMinimumQty(minQty);
    const items = await Database.getRestockReport(minQty);
    setRefillItems(items);

    const newChartData = items.map((item) => ({
      name: item.name,
      Quantity: parseInt(item.quantity),
      Minimum: minQty,
    }));
    console.log("newChartData: ")
    console.log(newChartData);

    setChartData(newChartData);

    toast({
      title: "Restock Report Generated",
      description: "Showing inventory items with stock under " + minQty,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  };

  return (
    <Flex flexDirection="column" justify="center" justifyContent="center" alignItems="center" textAlign="center" py="0.5em">
      <Button
        onClick={() => onOpen()}
        size="md" fontSize="md"
        width="75%"
        colorScheme="primary" variant="solid"
        p={3} px="2em"
      >
        Restock Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay/>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">Restock Report</Text>
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <Flex justify="center">
                <GridItem>
                  <Text textStyle="body3">Minimum Quantity:</Text>
                </GridItem>
                <GridItem>
                  <Input
                    type="number"
                    id="minQty-input"
                    placeholder="5000"
                    style={{
                      background: "#f3f3f3",
                      border: "1px solid",
                      padding: "0.5rem",
                      width: "50%",
                    }}
                  />
                </GridItem>
              </Flex>
              <Box my={4}>
                <Grid templateColumns="repeat(3, 1fr)" gap={0}>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
                    <Text textStyle="body3Semi">Item</Text>
                  </GridItem>
                  <GridItem borderBottomWidth="1px" borderColor="gray.300">
                    <Text textStyle="body3Semi">Quantity</Text>
                  </GridItem>
                </Grid>
                {refillItems.length !== 0 ? (
                  refillItems.map((item) => (
                    <Grid
                      key={item.inventory_id}
                      templateColumns="repeat(3, 1fr)"
                      gap={0}
                    >
                      <GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
                        <Text textStyle="body4">{item.name}</Text>
                      </GridItem>
                      <GridItem borderBottomWidth="1px" borderColor="gray.300">
                        <Text textStyle="body4">{item.quantity}</Text>
                      </GridItem>
                    </Grid>
                  ))
                ) : (
                  minimumQty <= 0 ? (
                    <Text/>
                  ) : (
                    <Text>No Items to Restock</Text>
                  )
                )}
              </Box>
              {refillItems.length !== 0 && (
              <ComposedChart 
                width={500} 
                height={500} 
                data={chartData} 
                layout="vertical"
                margin={{top: 25, bottom: 25}}
              >
                <XAxis type ="number"/>
                <YAxis type="category" dataKey="name" hide="true"/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="Quantity" barSize={20} fill="#e51636" />
                <Line type="monotone" dataKey="Minimum" stroke="#e51636" />
              </ComposedChart>
            )}
            </ModalBody>
            <ModalFooter justifyContent="center" gap={1}>
              <Button type="submit" colorScheme="primary">
                Generate Report
              </Button>
              <InfoButton 
                title={"What is a Restock Report?"}
                description={"A restock report is a report of all items that may require restock. The report provides a list of all items' stock that is currently under a specified minimum quantity."}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default RestockReportDisplay;
