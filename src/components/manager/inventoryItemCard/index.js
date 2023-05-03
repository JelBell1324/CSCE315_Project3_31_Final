import React from "react";
import {
    Box,
    Flex,
    Button,
    ButtonGroup,
    Text,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import EditInventoryItemForm from "./editInventoryItemForm";
import Database from "../../../data";
  
  /**
   * Returns card component for displaying an inventory item
   * @param info {object}
   * @param onUpdate {function}
   */
  const InventoryItemCard = ({ info, onUpdate }) => {
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
          rounded='md'
          overflow="hidden"
          bg="white"
        >
          {info.image ? <img src={info.image} /> : ""}
        </Box>
        <Text width='10em' mx='auto' textAlign='center' textStyle="body2Semi">
          {info.name}
        </Text>
        <EditInventoryItemForm 
          itemName={info.name} 
          itemQuantity={info.quantity}
        />
      </Box>
    );
  };
  
  export default InventoryItemCard;
  