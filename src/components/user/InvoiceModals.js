import React, { useState } from "react";
import { createInvoice, payInvoice } from "@/lightning/lnBits";
import { useSession } from "next-auth/react";
import QRCode from "qrcode.react";
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
  Flex,
  Center,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const CreateInvoiceModal = ({ isOpen, onClose }) => {
  // State for storing the amount, memo, and generated invoice
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [generatedInvoice, setGeneratedInvoice] = useState("");

  // Get the user session using the Next.js `useSession` hook
  const { status, data: session } = useSession();

  // Hook for copying the generated invoice to the clipboard
  const { hasCopied, onCopy } = useClipboard(generatedInvoice);

  // Handle form submission by creating an invoice
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

  // Close the modal and reset the generated invoice state
  const closeModal = () => {
    setGeneratedInvoice("");
    onClose();
  };

  // Render the component
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* If an invoice has been generated, show the QR code and invoice details */}
          {generatedInvoice ? (
            <Box>
              <Center mb={4}>
                <QRCode value={generatedInvoice} size={256} />
              </Center>
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
            // Otherwise, show the form for creating an invoice
            <>
              <FormControl id="amount" mb={4}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormControl id="memo" mb={4}>
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
          {/* Show the submit button if an invoice has not been generated */}
          {generatedInvoice ? null : (
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
  // State for storing the invoice and payment success status
  const [invoice, setInvoice] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get the user session using the Next.js `useSession` hook
  const { status, data: session } = useSession();

  // Handle form submission by paying the invoice
  const handleSubmit = async () => {
    if (status === "authenticated") {
      try {
        const payment = await payInvoice(invoice, session);
        console.log("Payment successful:", payment);
        setPaymentSuccess(true);
        // Reset the payment success status and close the modal after 2 seconds
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

  // Render the component
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pay Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {/* Show the payment success message if the payment was successful */}
            {paymentSuccess ? (
              <>
                <CheckCircleIcon boxSize="40px" color="green.500" />
                <Text>Payment successful!</Text>
              </>
            ) : (
              // Otherwise, show the form for paying an invoice
              <FormControl id="invoice" mb={4}>
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
