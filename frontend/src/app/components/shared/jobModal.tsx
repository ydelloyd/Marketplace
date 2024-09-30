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
import { useAlert } from "../../contexts/alertContext";
import { useLoader } from "../../contexts/loaderContext";
import jobService from "../../services/jobService";

// Initial Job Form State
const initialJobState: Job = {
  title: "",
  description: "",
  owner: { name: "", contactInfo: "" },
  expiration: "",
  requirements: ""
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setOpen, setMessage, setSeverity } = useAlert();
  const { setLoading } = useLoader();

  const triggerAlert = (severity: string, message: string) => {
    setSeverity("severity");
    setMessage(message);
    setOpen(true);
  };

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
  const handleSubmit = async () => {
    const validationResult = jobSchema.validate(state, { abortEarly: false });
    if (validationResult.error) {
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.details.forEach((err) => {
        fieldErrors[err.context?.key || ""] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setLoading(true);
      await jobService.createJob(state)
        .then(response => {
          if(response.status === 201) {
            triggerAlert("success", "Job created Sucessfully");
          } else {
            triggerAlert("error", "Failed to create Job. Please try again.");
            return;
          }
        })
        .catch(error => {
          console.error("Error creating Job:", error);
          triggerAlert("error", "Failed to create job. Please try again.");
          setErrors({ title: "Failed to create job." });
        });
      setLoading(false);


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
            value={state.requirements}
            error={!!errors.requirements}
            helperText={errors.requirements}
            onChange={(e) => {
                dispatch({
                    type: "SET_FIELD",
                    field: "requirements",
                    value: e.target.value
                });
                validateField("requirements", e.target.value);
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
