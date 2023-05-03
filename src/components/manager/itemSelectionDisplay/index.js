import { Grid, GridItem } from '@chakra-ui/react';
import MenuItemCard from '../menuItemCard';
import InventoryItemCard from '../inventoryItemCard';

/**
 * Returns component for selecting items
 * @param isMenu {function}
 * @param items {array}
 * @param category {string}
 * @param onUpdate {function}
 * @param onItemUpdate {function}
 */
const ItemSelectionDisplay = ({ isMenu, items, category, onUpdate, onItemUpdate }) => {
    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={2}>
            {
                items?.length ? (
                    isMenu ?
                        items.map(
                            menuItem =>
                            menuItem.type === category ?
                                <GridItem>
                                    <MenuItemCard 
                                        info={menuItem}
                                        onUpdate={onUpdate}
                                        onItemUpdate={onItemUpdate}
                                    />
                                </GridItem>
                                : ""
                        ) : items.map(
                            inventoryItem =>
                            <GridItem>
                                <InventoryItemCard 
                                    info={inventoryItem}
                                    onUpdate={onUpdate}
                                />
                            </GridItem>
                        )
                ) : ""
            }
        </Grid>
    );
}

export default ItemSelectionDisplay;