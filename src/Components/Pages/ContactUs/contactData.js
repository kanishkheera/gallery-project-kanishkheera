import {
  FiAlertCircle,
  FiHelpCircle,
  FiMessageCircle,
  FiMessageSquare,
  FiSun,
} from "react-icons/fi";

export const CONTACT_ACCENT = "#8550D3";
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;
export const WEB3FORMS_ACCESS_KEY = "c7a315b5-431a-4f5e-865a-aaa84897d7fe";
export const INITIAL_CONTACT_VALUES = { name: "", email: "", subject: "", message: "" };

export const helpTopics = [
  {
    icon: FiMessageCircle,
    title: "General Questions",
    description: "Have a question about Gallery or how it works? Send us a message.",
  },
  {
    icon: FiSun,
    title: "Feature Suggestions",
    description: "Have an idea that could make Gallery better? We'd love to hear your suggestion.",
  },
  {
    icon: FiAlertCircle,
    title: "Report a Problem",
    description: "Found something that isn't working correctly? Tell us what happened so it can be investigated.",
  },
];

export const quickTopics = [
  { icon: FiHelpCircle, title: "Questions", description: "Ask us about Gallery." },
  { icon: FiSun, title: "Suggestions", description: "Tell us what you'd like to see next." },
  { icon: FiMessageSquare, title: "Feedback", description: "Share your experience with the application." },
];

export const frequentlyAskedQuestions = [
  {
    question: "Where do the photos in Gallery come from?",
    answer: "The photographs displayed in Gallery are retrieved through the Unsplash API.",
  },
  {
    question: "Can I save photographs?",
    answer: "Yes. Gallery provides features such as favorites and albums to help you organize photographs you want to revisit.",
  },
  {
    question: "Can I share a photograph?",
    answer: "Yes. Open a photograph and share its URL to let someone view that photo in Gallery.",
  },
  {
    question: "Can I suggest a feature?",
    answer: "Absolutely. Use the contact form above to share your suggestion.",
  },
];

export function validateContactForm(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  return errors;
}
