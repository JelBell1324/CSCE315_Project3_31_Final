import React, { useState, useEffect } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import EditMenuItemForm from "./editMenuItemForm";

/**
 * Returns component for editing items
 * @param info {object}
 * @param onUpdate {function}
 * @param onItemUpdate {function}
 */
const MenuItemCard = ({ info, onUpdate, onItemUpdate }) => {
	const [price, setPrice] = useState(info.price);

	const handleUpdate = (newPrice) => {
		setPrice(newPrice);
		onUpdate(newPrice);
	};

	console.log(info);
	const border = useColorModeValue(
		"solid 1px rgb(0, 0, 0, 0.5)",
		"solid 1px #7d7dff"
	);
	const shadow = useColorModeValue("2xl", "#7d7dff 0 8px 50px");
	const onHover = useColorModeValue(
		{ boxShadow: "0 8px 50px" },
		{ borderColor: "#ffd543", boxShadow: "#ffd543 0 8px 50px" }
	);

	return (
		<Box
			rounded="md"
			border={border}
			boxShadow={shadow}
			width="18em"
			height="100%"
			paddingBottom={5}
			_hover={onHover}
			transition="border-color 0.25s ease, box-shadow 0.25s ease"
		>
			<Box
				mx="auto"
				width="18em"
				height="18em"
				rounded="md"
				overflow="hidden"
				bg="white"
			>
				<img
					src={
						info.image
							? info.image
							: "https://cdn.cookielaw.org/logos/63dc78c7-5612-4181-beae-47dead0569ee/666a8744-979e-4263-b2c2-093036f7ec5f/d5e0c553-41c6-41f7-b91f-be2f73c122c6/Chick-fil-A-Logo.png"
					}
				/>
			</Box>
			<Text
				width="10em"
				mx="auto"
				textAlign="center"
				textStyle="body2Semi"
			>
				{info.name}
			</Text>
			<Text
				width="10em"
				mx="auto"
				textAlign="center"
				textStyle="body2Semi"
			>
				${price}
			</Text>
			<EditMenuItemForm
				itemName={info.name}
				itemCost={info.price}
				onUpdate={handleUpdate}
				onItemUpdate={onItemUpdate}
			/>
		</Box>
	);
};

export default MenuItemCard;
