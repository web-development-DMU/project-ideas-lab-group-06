import { maxLength, required } from "../validation.js";

export const transactionSchema = {
  journal_entry: {
    displayName: "Journal Entry",
    validators: [required, maxLength(255)],
  },
  amount: {
    displayName: "Amount",
    validators: [required],
  },
  category: {
    displayName: "Category",
    validators: [required],
  },
  type: {
    displayName: "Type",
    validators: [required],
  },
  description: {
    displayName: "Description",
    validators: [required, maxLength(100)],
  },
  transaction_date: {
    displayName: "Transaction Date",
    validators: [required],
  },
  mood: {
    displayName: "Mood",
    validators: [],
  },
};
