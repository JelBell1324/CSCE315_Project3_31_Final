import React, { useState, useEffect } from "react";
import {
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
  useToast,
} from "@chakra-ui/react";
import Database from "../../../../data";
import InfoButton from "../../../common/infoButton";

/**
 * Returns modal popup for Z Reports
 */
const ZReportDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalSales, setTotalSales] = useState(0);
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const report = await Database.getZReport();
      console.log("REPORT: ", report);
      console.log("TOTAL SALES: ", report.totalSales);
      const sales = report.total_sales;
      if (sales < 0) {
        toast({
          title: "Z Report Not Generated",
          description: "Issue with saving report.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      } else {
        setTotalSales(sales);
        toast({
          title: "Z Report Generated",
          description: "Generated end of day Z Report.",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (err) {
      console.error(err);
    }
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
        Z Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">Z Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="row" gap={2}>
                <Text textStyle="body3Semi">Total Sales:</Text>
                <Text textStyle="body3">${totalSales.toFixed(2)}</Text>
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center" gap={1}>
              <Button type="submit" colorScheme="primary">
                Generate Report
              </Button>
              <InfoButton 
                title={"What is a Z Report?"}
                description={"A Z Report is a historical report of all transactions for the current day. The reported number will be a reflection of all sales for today."}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ZReportDisplay;
