import {
  Box,
  Flex,
  Button,
  Text,
  useColorModeValue,
  Img
} from "@chakra-ui/react";
import React from "react";

/**
 * Returns component for menu item card
 * @param info {object} 
 * @param readOnly {boolean} 
 * @param menuOnly {boolean} 
 * @param subtract {boolean} 
 * @param onUpdate {function} 
 */
const MenuItemCard = ({ info, readOnly, menuOnly, subtract, onUpdate }) => {
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
    <>
      {
        menuOnly ?
        <Box
          rounded="md"
          border={border}
          boxShadow={shadow}
          width="10em"
          height="100%"
          _hover={onHover}
          transition="border-color 0.25s ease, box-shadow 0.25s ease"
        >
          <Box
            mx="auto"
            width="10em"
            height="10em"
            rounded='md'
            overflow="hidden"
            bg="white"
          >
            <Img src={info.image ? info.image : "https://cdn.cookielaw.org/logos/63dc78c7-5612-4181-beae-47dead0569ee/666a8744-979e-4263-b2c2-093036f7ec5f/d5e0c553-41c6-41f7-b91f-be2f73c122c6/Chick-fil-A-Logo.png"} />
          </Box>
          <Text width='5em' mx='auto' textAlign='center'>
            {info.name}
          </Text>
          <Text
            mx="auto"
            width="fit-content"
          >
            ${info.price.toFixed(2)}
          </Text>
          {
            readOnly ? "" :
            <Flex justify='center' gap={1} pt={2}>
                <Button 
                  size="md" fontSize="1.5rem" 
                  colorScheme='primary' variant='solid'
                  onClick={() => onUpdate(info.name, info.menu_id, info.price, false)} isDisabled={!subtract}
                  p={3} px="2em"
                >{"-"}</Button>
                <Button 
                  size="md" fontSize="1.5rem"
                  colorScheme='primary' variant='solid'
                  onClick={() => onUpdate(info.name, info.menu_id, info.price, true)}
                  p={3} px="2em"
                >{"+"}</Button>
            </Flex>
          }
        </Box> :
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
            <Img src={info.image ? info.image : "https://cdn.cookielaw.org/logos/63dc78c7-5612-4181-beae-47dead0569ee/666a8744-979e-4263-b2c2-093036f7ec5f/d5e0c553-41c6-41f7-b91f-be2f73c122c6/Chick-fil-A-Logo.png"} />
          </Box>
          <Text width='10em' mx='auto' textAlign='center' textStyle="body2Semi">
            {info.name}
          </Text>
          <Text
            mx="auto"
            width="fit-content"
            textStyle="body3"
          >
            Price: ${info.price.toFixed(2)}
          </Text>
          {
            readOnly ? "" :
            <Flex justify='center' gap={1} pt={2}>
                <Button 
                  size="md" fontSize="1.5rem" 
                  colorScheme='primary' variant='solid'
                  onClick={() => onUpdate(info.name, info.menu_id, info.price, false)} isDisabled={!subtract}
                  p={3} px="2em"
                >{"-"}</Button>
                <Button 
                  size="md" fontSize="1.5rem"
                  colorScheme='primary' variant='solid'
                  onClick={() => onUpdate(info.name, info.menu_id, info.price, true)}
                  p={3} px="2em"
                >{"+"}</Button>
            </Flex>
          }
        </Box>
      }
    </>
  );
};

export default MenuItemCard;
