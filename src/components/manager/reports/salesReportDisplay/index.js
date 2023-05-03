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
import { BarChart, Bar, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';

/**
 * Returns modal popup for Sales Reports
 */
const SalesReportDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [saleItems, setSaleItems] = useState([]);
  const [chartData, setChartData] = useState([]);
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sDate = document.getElementById("startDate-input").value;
    
    const eDate = document.getElementById("endDate-input").value;

    const today = new Date();

    if (!sDate) {
      toast({
        title: "ERROR",
        description: "No start date provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (!eDate) {
      toast({
        title: "ERROR",
        description: "No end date provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (new Date(sDate).getTime() > new Date(eDate).getTime()) {
      toast({
        title: "ERROR",
        description: "Start date cannot be ahead of the end date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (new Date(sDate).getTime() > today.getTime() || new Date(eDate).getTime() > today.getTime()) {
      toast({
        title: "ERROR",
        description: "Dates provided can not be in the future.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setStartDate(sDate);
    setEndDate(eDate);
    const sales = await Database.getSalesReport(sDate, eDate);
    setSaleItems(sales);
    toast({
      title: "Sales Report Generated",
      description: "Showing sales from " + sDate + " to " + eDate,
      status: "success",
      duration: 5000,
      isClosable: true,
    })

    const newChartData = sales.map((item) => ({
      name: item.name,
      sales: parseInt(item.total_qty),
    }));
    console.log("newChartData: ")
    console.log(newChartData);

    setChartData(newChartData);

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
        Sales Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">Sales Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justify="center" gap={10}>
                <GridItem>
                  <Text textStyle="body3">Start Date:</Text>
                  <Input
                    type="date"
                    id="startDate-input"
                    style={{
                      background: "#f3f3f3",
                      border: "1px solid",
                      padding: "0.5rem",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Text textStyle="body3">End Date:</Text>
                  <Input
                    type="date"
                    id="endDate-input"
                    style={{
                      background: "#f3f3f3",
                      border: "1px solid",
                      padding: "0.5rem",
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
                    <Text textStyle="body3Semi">Total Sales</Text>
                  </GridItem>
                </Grid>
                {saleItems.length !== 0 ? (
                  saleItems.map((item) => (
                    <Grid
                      key={item.menu_id}
                      templateColumns="repeat(3, 1fr)"
                      gap={0}
                    >
                      <GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
                        <Text textStyle="body4">{item.name}</Text>
                      </GridItem>
                      <GridItem borderBottomWidth="1px" borderColor="gray.300">
                        <Text textStyle="body4">{item.total_qty}</Text>
                      </GridItem>
                    </Grid>
                  ))
                ) : (
                  !startDate || !endDate ? (
                    <Text/>
                  ) : (
                    <Text>No Sales In Time Period</Text>
                  )
                )}
              </Box>
              {saleItems.length !== 0 && (
              <BarChart 
                width={500} 
                height={600} 
                data={chartData}
                layout="vertical"
                margin={{top: 25, bottom: 25}}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number"/>
                <YAxis type="category" dataKey="name" hide="true"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#e51636" />
              </BarChart>
              )}
            </ModalBody>
            <ModalFooter justifyContent="center" gap={1}>
              <Button type="submit" colorScheme="primary">
                Generate Report
              </Button>
              <InfoButton 
                title={"What is a Sales Report?"}
                description={"A sales report provides a historical report of all sales that were processed. Should an item not be found in the report, then the item was never ordered in the time period."}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SalesReportDisplay;
