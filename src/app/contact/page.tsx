import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Card from "@/components/UI/Card";
import ContactForm from "@/components/Sections/ContactForm";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@example.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", url: "https://github.com/username" },
  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/username" },
  { icon: Twitter, label: "Twitter", url: "https://twitter.com/username" },
];

export default function ContactPage() {
  return (
    <div id="contact" className="mx-auto max-w-6xl space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Have a project in mind? Want to collaborate? Feel free to reach out.
          You can also ask the Assistant for my contact details.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-8">
          <Card>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="mt-6 space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-100 p-3 text-primary dark:bg-blue-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold">Connect With Me</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center rounded-lg border border-gray-200 px-4 py-5 text-center transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <Icon className="mb-2 h-5 w-5" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </Card>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            <p className="font-semibold">Assistant Can Help</p>
            <ul className="mt-3 space-y-1">
              <li>Say: &quot;What&apos;s your email?&quot;</li>
              <li>Say: &quot;How can I reach you?&quot;</li>
              <li>Say: &quot;Share your LinkedIn profile&quot;</li>
              <li>Say: &quot;Take me to the contact form&quot;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
