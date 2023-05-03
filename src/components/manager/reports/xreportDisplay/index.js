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
  useToast
} from "@chakra-ui/react";
import Database from "../../../../data";
import InfoButton from "../../../common/infoButton";

/**
 * Returns modal popup for X Reports
 */
const XReportDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalSales, setTotalSales] = useState(0);
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const report = await Database.getXReport();
      const sales = report.total_sales;
      if (sales < 0) {
        toast({
          title: "X Report Not Generated",
          description: "Issue with generating report.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      } else {
        setTotalSales(sales);
        toast({
          title: "X Report Generated",
          description: "Generated report of sales since last Z Report.",
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
        X Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay/>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">X Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="row" gap={2}>
                <Text textStyle="body3Semi">Sales:</Text>
                <Text textStyle="body3">${totalSales.toFixed(2)}</Text>
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center" gap={1}>
              <Button type="submit" colorScheme="primary">
                Generate Report
              </Button>
              <InfoButton 
                title={"What is an X Report?"}
                description={"An X Report is a historical report of all transaction since the last Z Report. If no previous Z Report exist, then a historical report of the current day's sales will be posted."}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default XReportDisplay;
