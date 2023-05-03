import { Box, Text } from "@chakra-ui/react"

/**
 * Returns component for menu catagory selection
 * @param selectedCategory {string} 
 * @param onSelectCategory {function} 
 */
const MenuCategorySelectionDisplay = ({ selectedCategory, onSelectCategory }) => {
    const categories = [
        "Sandwiches",
        "Sides",
        "Desserts",
        "Drinks",
        "Other"
    ];

    const handleClick = (categoryName) => {
        if (selectedCategory !== categoryName) {
            onSelectCategory(categoryName);
        }
    }

    return (
        <Box
            width="15em" height="fit-content" 
            pt="0.5em" border="solid 1px" 
            borderColor="grey.100" rounded="md" boxShadow="lg"
        >   
            <Box mx="auto" borderBottom="solid 1px" borderColor="grey.900">
                <Text textAlign="center" textStyle="body2Semi">Menu Category</Text>
            </Box>
            <Box width="100%" height="100%" overlowY="scroll">
                {
                    categories.map(
                        categoryName => 
                        <Box onClick={
                            () => handleClick(categoryName)
                        }
                        bg={
                            selectedCategory === categoryName ?
                                "primary.300" : ""
                        }
                        cursor="pointer"
                        >
                            <Text
                                textAlign="center"
                                textStyle="body3"
                            >
                                {categoryName}
                            </Text>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default MenuCategorySelectionDisplay;