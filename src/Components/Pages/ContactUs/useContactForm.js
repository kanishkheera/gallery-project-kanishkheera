import { useState } from "react";
import {
  INITIAL_CONTACT_VALUES,
  WEB3FORMS_ACCESS_KEY,
  validateContactForm,
} from "./contactData";

export default function useContactForm() {
  const [values, setValues] = useState(INITIAL_CONTACT_VALUES);
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setSubmissionStatus("");
    if (errors[name]) setErrors(validateContactForm(nextValues));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSending(true);
    setSubmissionStatus("sending");

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("The contact service could not accept your message.");
      }

      setSubmissionStatus("success");
      setValues(INITIAL_CONTACT_VALUES);
      setErrors({});
    } catch {
      setSubmissionStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return { values, errors, submissionStatus, isSending, handleChange, handleSubmit };
}
