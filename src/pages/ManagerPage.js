import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import BaseLayout from "../components/mainView";
import Database, { getUID } from "../data";
import { useNavigate } from "react-router-dom";
import OrderHistoryDisplay from "../components/common/orderHistoryDisplay";
import MenuCategorySelectionDisplay from "../components/common/menuCategorySelectionDisplay";
import ItemSelectionDisplay from "../components/manager/itemSelectionDisplay";
import RestockReportDisplay from "../components/manager/reports/restockReportDisplay";
import SalesReportDisplay from "../components/manager/reports/salesReportDisplay";
import ExcessReportDisplay from "../components/manager/reports/excessReportDisplay";
import XReportDisplay from "../components/manager/reports/xreportDisplay";
import ZReportDisplay from "../components/manager/reports/zreportDisplay";
import CreateMenuItemForm from "../components/manager/createMenuItemForm";
import nameToUrl from "../imageMapping";
import AddStaffForm from "../components/manager/createStaffForm";
import StaffTable from "../components/manager/staffTable";
import WeatherDisplay from "../components/common/weatherDisplay";

/**
 * Returns main page component for the Manager View
 */
const ManagerPage = () => {
	const [lookingAtMenu, setLookingAtMenu] = useState(true);
	const [category, setCategory] = useState("Sandwiches");
	const [order, setOrder] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [inventoryItems, setInventoryItems] = useState([]);

	useEffect(() => {
		const updateMenu = async () => {
			const menu = await Database.getMenuItems();
			for (let i = 0; i < menu?.length; i++) {
				let imageUrl = nameToUrl[menu[i].name];
				if (imageUrl) menu[i].image = imageUrl;
			}
			setMenuItems(menu);
		};
		const updateInventory = async () => {
			const inventory = await Database.getInventoryItems();
			console.log(inventory);
			setInventoryItems(inventory);
		};
		if (!menuItems?.length) {
			updateMenu();
		}
		if (!inventoryItems?.length) {
			updateInventory();
		}
	}, [menuItems, inventoryItems]);

	const handleUpdate = (menuItemName, price, add) => {
		let new_order;
		for (let i = 0; i < order.length; i++) {
			if (order.at(i).name === menuItemName) {
				new_order = [...order];
				new_order.at(i).quantity += add ? 1 : -1;
				if (new_order.at(i).quantity === 0)
					new_order = new_order.filter((_, index) => index !== i);
				setOrder(new_order);
				return;
			}
		}
		new_order = [
			...order,
			{ name: menuItemName, price: price, quantity: 1 },
		];
		setOrder(new_order);
	};

	const handleItemUpdate = () => {
		const updateMenu = async () => {
			const menu = await Database.getMenuItems();
			for (let i = 0; i < menu?.length; i++) {
				let imageUrl = nameToUrl[menu[i].name];
				if (imageUrl) menu[i].image = imageUrl;
			}
			setMenuItems(menu);
		};
		updateMenu();
		return;
	};

	return (
		<>
			<Box position="fixed" width="15em">
				<Flex
					flexDirection="column"
					justify="center"
					gap={1}
					pt={2}
					mb={2}
				>
					<Button
						size="md"
						fontSize="1.5rem"
						colorScheme="primary"
						onClick={() => setLookingAtMenu(true)}
						variant={lookingAtMenu ? "solid" : "outline"}
						p={3}
						px="2em"
					>
						Menu
					</Button>
					<Button
						size="md"
						fontSize="1.5rem"
						colorScheme="primary"
						onClick={() => setLookingAtMenu(false)}
						variant={!lookingAtMenu ? "solid" : "outline"}
						p={3}
						px="2em"
					>
						Inventory
					</Button>
				</Flex>
				{lookingAtMenu ? (
					<Flex flexDirection="column" justify="center" gap="1em">
						<MenuCategorySelectionDisplay
							selectedCategory={category}
							onSelectCategory={setCategory}
						/>
						<CreateMenuItemForm onSubmit={() => setMenuItems([])} />
					</Flex>
				) : (
					""
				)}
				<Box mt="1em">
					<OrderHistoryDisplay />
				</Box>
			</Box>
			<Flex justify="center">
				<ItemSelectionDisplay
					isMenu={lookingAtMenu}
					items={lookingAtMenu ? menuItems : inventoryItems}
					category={category}
					onUpdate={handleUpdate}
					onItemUpdate={handleItemUpdate}
				/>
			</Flex>

			<Box position="fixed" right="12em" top="10em" width="15em">
				<StaffTable />
				<AddStaffForm />
				<Flex
					flexDirection="column"
					justify="center"
					gap={1}
					pt={2}
					mb={2}
				>
					<XReportDisplay />
					<ZReportDisplay />
					<SalesReportDisplay />
					<ExcessReportDisplay />
					<RestockReportDisplay />
				</Flex>
			</Box>
		</>
	);
};

export default ManagerPage;
