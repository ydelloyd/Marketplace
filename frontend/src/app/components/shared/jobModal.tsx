import React, { useReducer, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { Job, jobSchema } from "../../models/jobModel";

// Initial Job Form State
const initialJobState: Job = {
  title: "",
  description: "",
  owner: { name: "", contactInfo: "" },
  expiration: "",
  reqirements: ""
};

// Reducer function to handle form state
type Action =
  | { type: "SET_FIELD"; field: keyof Job; value: string | number | Date }
  | { type: "SET_OWNER_FIELD"; field: keyof Job["owner"]; value: string }
  | { type: "RESET" };

const jobReducer = (state: Job, action: Action): Job => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_OWNER_FIELD":
      return {
        ...state,
        owner: { ...state.owner, [action.field]: action.value }
      };
    case "RESET":
      return initialJobState;
    default:
      return state;
  }
};

export const JobModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose
}) => {
  const [state, dispatch] = useReducer(jobReducer, initialJobState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Validation errors

  // Validate a single field
  const validateField = (field: string, value: string | number | Date) => {
    const fieldSchema = jobSchema.extract(field);
    const result = fieldSchema.validate(value);
    if (result.error) {
      setErrors((prev) => ({ ...prev, [field]: result.error.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    const validationResult = jobSchema.validate(state, { abortEarly: false });
    console.log(validationResult);
    if (validationResult.error) {
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.details.forEach((err) => {
        fieldErrors[err.context?.key || ""] = err.message;
      });
      console.log(fieldErrors)
      console.log(fieldErrors.title)
      console.log(fieldErrors.name)
      setErrors(fieldErrors);
    } else {
      console.log("Job submitted:", state);

      dispatch({ type: "RESET" });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create a Job</DialogTitle>
      <DialogContent>
        {/* Title Input */}
        <TextField
          label="Job Title"
          fullWidth
          margin="normal"
          value={state.title}
          error={!!errors.title}
          helperText={errors.title}
          onChange={(e) => {
            dispatch({
              type: "SET_FIELD",
              field: "title",
              value: e.target.value
            });
            validateField("title", e.target.value);
          }}
        />
        {/* Description Input */}
        <TextField
          label="Job Description"
          fullWidth
          margin="normal"
          value={state.description}
          error={!!errors.description}
          helperText={errors.description}
          onChange={(e) => {
            dispatch({
              type: "SET_FIELD",
              field: "description",
              value: e.target.value
            });
          }}
        />
        {/* Requirements Input */}
        <TextField
            label="Requirements"
            fullWidth
            margin="normal"
            value={state.reqirements}
            error={!!errors.reqirements}
            helperText={errors.reqirements}
            onChange={(e) => {
                dispatch({
                    type: "SET_FIELD",
                    field: "reqirements",
                    value: e.target.value
                });
                validateField("reqirements", e.target.value);
            }}
        />
        {/* Owner Name Input */}
        <TextField
          label="Owner Name"
          fullWidth
          margin="normal"
          value={state.owner.name}
          error={!!errors["name"]}
          helperText={errors["name"]}
          onChange={(e) => {
            dispatch({
              type: "SET_OWNER_FIELD",
              field: "name",
              value: e.target.value
            });
            validateField("owner.name", e.target.value);
          }}
        />
        {/* Owner Contact Info Input */}
        <TextField
          label="Owner Contact Info"
          fullWidth
          margin="normal"
          value={state.owner.contactInfo}
          error={!!errors["contactInfo"]}
          helperText={errors["contactInfo"]}
          onChange={(e) => {
            dispatch({
              type: "SET_OWNER_FIELD",
              field: "contactInfo",
              value: e.target.value
            });
            validateField("owner.contactInfo", e.target.value);
          }}
        />
        {/* Expiration Date Input */}
        <TextField
          label="Expiration Date"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={state.expiration}
          error={!!errors.expiration}
          helperText={errors.expiration}
          onChange={(e) => {
            dispatch({
              type: "SET_FIELD",
              field: "expiration",
              value: e.target.value
            });
            validateField("expiration", e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobModal;
