 "use client";

import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Contact request failed.");
      }

      setSubmitMessage("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-3 text-primary dark:bg-blue-900">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Send a Message</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Let me know how I can help with your next project.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-field">
          <label htmlFor="name" className="contact-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="email" className="contact-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-input"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="message" className="contact-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-textarea"
          />
        </div>
        <Button type="submit" className="contact-submit" disabled={isSubmitting}>
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {submitMessage && (
          <div className="contact-success">
            {submitMessage}
          </div>
        )}
      </form>
    </Card>
  );
}
