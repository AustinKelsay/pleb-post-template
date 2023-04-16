import React, { useState } from "react";
import { createInvoice, payInvoice } from "@/lightning/lnBits";
import { useSession } from "next-auth/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Box,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const CreateInvoiceModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [generatedInvoice, setGeneratedInvoice] = useState("");
  const { status, data: session } = useSession();
  const { hasCopied, onCopy } = useClipboard(generatedInvoice);

  const handleSubmit = async () => {
    if (status === "authenticated") {
      try {
        console.log("Creating invoice...", session);
        const invoice = await createInvoice({
          user: session.user,
          amount,
          memo,
        });
        console.log("Invoice created:", invoice);
        setGeneratedInvoice(invoice);
      } catch (error) {
        console.error("Error creating invoice:", error);
      }
    } else {
      console.error("User session is not available.");
    }
  };

  const closeModal = () => {
    setGeneratedInvoice("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {generatedInvoice ? (
            <Box>
              <Text>Your invoice:</Text>
              <Input
                value={generatedInvoice}
                isReadOnly
                my={2}
                placeholder="Generated invoice"
              />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied!" : "Copy"}
              </Button>
            </Box>
          ) : (
            <>
              <FormControl id="amount" marginBottom="1rem">
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormControl id="memo" marginBottom="1rem">
                <FormLabel>Memo</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter memo"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {generatedInvoice ? (
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const PayInvoiceModal = ({ isOpen, onClose }) => {
  const [invoice, setInvoice] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { status, data: session } = useSession();

  const handleSubmit = async () => {
    if (status === "authenticated") {
      try {
        const payment = await payInvoice(invoice, session);
        console.log("Payment successful:", payment);
        setPaymentSuccess(true);
        setTimeout(() => {
          setPaymentSuccess(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Error paying invoice:", error);
      }
    } else {
      console.error("User session is not available.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pay Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {paymentSuccess ? (
              <>
                <CheckCircleIcon boxSize="40px" color="green.500" />
                <Text>Payment successful!</Text>
              </>
            ) : (
              <FormControl id="invoice" marginBottom="1rem">
                <FormLabel>Invoice</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter invoice"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                />
              </FormControl>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            disabled={paymentSuccess}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
