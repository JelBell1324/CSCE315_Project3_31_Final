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
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

/**
 * Returns modal popup for Excess Reports
 */
const ExcessReportDisplay = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [excessItems, setExcessItems] = useState([]);
	const [chartData, setChartData] = useState([]);
	const toast = useToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
    const selectedDate = document.getElementById("selectDate-input").value;
    const today = new Date();

		if (!selectedDate) {
			toast({
				title: "ERROR",
				description: "No date provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else if (new Date(selectedDate).getTime() > today.getTime()) {
      toast({
        title: "ERROR",
        description: "Dates provided can not be in the future.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
		const items = await Database.getExcessReport(selectedDate);
		console.log("easdf");
		console.log(items);
		setExcessItems(items);

		const newChartData = items.map((item) => ({
			name: item.name,
			Percentage_Sold: item.percentage_sold.toFixed(4),
			difference: 10 - item.percentage_sold.toFixed(4),
		  }));
		  console.log("newChartData: ")
		  console.log(newChartData);
	  
		  setChartData(newChartData);

		toast({
      title: "Excess Report Generated",
      description: "Showing excess inventory from sales since " + selectedDate,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
	};

	return (
		<Flex
			flexDirection="column"
			justify="center"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
			py="0.5em"
		>
			<Button
				onClick={() => onOpen()}
				size="md"
				fontSize="md"
				width="75%"
				colorScheme="primary"
				variant="solid"
				p={3}
				px="2em"
			>
				Excess Report
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader>
							<Text textStyle="body2Semi">Excess Report</Text>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Flex justify="center">
								<GridItem>
									<Text textStyle="body3">Start Date:</Text>
								</GridItem>
								<GridItem>
									<Input
										type="date"
										id="selectDate-input"
										placeholder="Select date"
										style={{
											background: "#f3f3f3",
											border: "1px solid",
											padding: "0.5rem",
										}}
									/>
								</GridItem>
							</Flex>
							<Box my={4}>
								<Grid
									templateColumns="repeat(3, 1fr)"
									gap={0}
								>
									<GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
										<Text textStyle="body3Semi">
											Item
										</Text>
									</GridItem>
									<GridItem borderBottomWidth="1px" borderColor="gray.300">
										<Text textStyle="body3Semi">
											Amount Sold
										</Text>
									</GridItem>
								</Grid>
								{excessItems ? (
									excessItems.map((item) => (
										<Grid
											key={item.inventory_id}
											templateColumns="repeat(3, 1fr)"
											gap={0}
										>
											<GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
												<Text textStyle="body4">
													{item.name}
												</Text>
											</GridItem>
											<GridItem borderBottomWidth="1px" borderColor="gray.300">
												<Text textStyle="body4">
													{item.percentage_sold.toFixed(4)}%
												</Text>
											</GridItem>
										</Grid>
									))
								) : (
									<Text>No Excess Inventory</Text>
								)}
							</Box>
							{excessItems.length !== 0 && (
								<BarChart
									width={500}
									height={chartData.length * 25}
									data={chartData}
									margin={{ top: 25, bottom: 25}}
									layout="vertical"
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis type="number" domain={[0, 10]} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
									<YAxis type="category" dataKey="name" hide={true} />
									<Tooltip />
									<Legend />
									<Bar dataKey="Percentage_Sold" stackId="a" fill="#e51636" barSize={20}/>
									<Bar dataKey="difference" stackId="a" fill="#ffcccb" barSize={20}/>
							  </BarChart>
							)}
						</ModalBody>
						<ModalFooter justifyContent="center" gap={1}>
							<Button type="submit" colorScheme="primary">
								Generate Report
							</Button>
							<InfoButton 
                title={"What is an Excess Report?"}
                description={"An excess report is a historical report of all inventory items that have an excess quantity remaining or lack of total sales since a specified start date. The threshold for an item to have excess quantity is to have less than 10% sales."}
              />
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default ExcessReportDisplay;
