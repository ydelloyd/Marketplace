import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Modal
} from "@mui/material";
import jobService from "../../services/jobService";
import { Bid } from "src/app/models/bidModel";
import { useAlert } from "../../contexts/alertContext";
import { useLoader } from "../../contexts/loaderContext";
import Joi from "joi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const BidModal: React.FC<{
  id: string;
  open: boolean;
  handleClose: () => void;
}> = ({ id, open, handleClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [amountError, setAmountError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const { setOpen, setMessage, setSeverity } = useAlert();
  const { setLoading } = useLoader();

  const triggerAlert = (
    severity: "success" | "info" | "warning" | "error",
    message: string
  ) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const validate = () => {
    const schema = Joi.object({
      amount: Joi.number().positive().required().messages({
        "number.base": "Amount must be a number",
        "number.positive": "Amount must be a positive number",
        "any.required": "Amount is required"
      }),
      contactEmail: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Invalid email address",
        "any.required": "Email is required"
      })
    });

    const { error } = schema.validate({ amount, contactEmail });
    return error ? error.details : null;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (validationErrors) {
      // Clear previous errors
      setAmountError("");
      setEmailError("");

      validationErrors.forEach((err) => {
        if (err.context && err.context.key === "amount") {
          setAmountError(err.message);
        } else if (err.context && err.context.key === "contactEmail") {
          setEmailError(err.message);
        }
      });
      return;
    }

    // Handle form submission logic here
    setLoading(true);
    await jobService
      .placeBid(id, { amount, contact_email: contactEmail } as Bid)
      .then((response) => {
        if (response.status === 201) {
          triggerAlert("success", "Bid placed successfully");
        } else {
          triggerAlert("error", "Failed to place bid. Please try again.");
          return;
        }
      })
      .catch((error) => {
        triggerAlert("error", "Failed to place bid. Please try again.");
        setAmountError("Failed to place bid.");
      });
    setLoading(false);
    // Optionally clear the fields after submission
    setAmount(0);
    setContactEmail("");
    setAmountError(""); // Clear any previous errors
    setEmailError("");
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="bid-modal-title"
      aria-describedby="bid-modal-description"
    >
      <Box sx={style}>
        <Typography id="bid-modal-title" variant="h6" component="h2">
          Place a Bid
        </Typography>
        <TextField
          label="Amount ($)"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
            setAmountError(""); // Clear error on change
          }}
          error={!!amountError} // Set error state
        />
        <FormHelperText error>{amountError}</FormHelperText>
        <TextField
          label="Contact Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          value={contactEmail}
          onChange={(e) => {
            setContactEmail(e.target.value);
            setEmailError("");
          }}
          error={!!emailError}
        />
        <FormHelperText error>{emailError}</FormHelperText>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default BidModal;
