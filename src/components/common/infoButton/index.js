import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  ModalFooter,
} from "@chakra-ui/react";
import {
  InfoIcon
} from "@chakra-ui/icons";

/**
	 * Returns button for info
	 * @param title {string} 
	 * @param description {string} 
	 */
const InfoButton = ({ title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <IconButton 
        aria-label="Info"
        icon={<InfoIcon color="blue.500"/>}
        size="lg"
        variant="ghost"
        _hover={{ bg: "transparent" }}
        onClick={() => onOpen()}
      ></IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay/>
        <ModalContent p={2}>
          <ModalHeader>
            <Text textStyle="body2Semi">{title}</Text>
          </ModalHeader>
          <ModalBody>
            <Text>{description}</Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button type="submit" colorScheme="primary" onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default InfoButton;
