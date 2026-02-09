import React from "react";
import { PageHeader, Card, Textarea, Button } from "./ui";

const Contact = ({
  isAdmin,
  messages,
  messageText,
  setMessageText,
  handleSendMessage,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <PageHeader 
        title={isAdmin ? "User" : "Get In"} 
        highlight="Touch"
        description={
          isAdmin 
            ? "Manage all feedback and inquiries from our valued customers." 
            : "Have a question about our menu or want to book a table? We'd love to hear from you."
        }
        showDivider={false}
      />

      <Card>
        {isAdmin ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-spice-forest/10 rounded-full flex items-center justify-center text-spice-forest">
                📧
              </div>
              <h3 className="heading-tertiary">Inbox</h3>
            </div>
            {messages.length === 0 ? (
              <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">Your inbox is empty</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {messages.map((m) => (
                  <div key={m.id} className="list-item-hover">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-700 font-medium leading-relaxed">{m.text}</p>
                      <span className="text-small-caps text-gray-300 group-hover:text-spice-saffron transition-colors">
                        Recent
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-2">
                <h4 className="font-display text-xl font-bold text-spice-forest">Visit Us</h4>
                <p className="text-muted text-sm leading-relaxed">
                  123 Spice Garden,<br />
                  outer ring road, Hosur,<br />
                  Tamil Nadu 635109
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-xl font-bold text-spice-forest">Call Us</h4>
                <p className="text-muted text-sm">+91 98765 43210</p>
              </div>
              <div className="pt-4 flex gap-4">
                <div className="btn-icon bg-spice-saffron/10 text-spice-saffron hover:bg-spice-saffron hover:text-white">
                  𝕏
                </div>
                <div className="btn-icon bg-spice-forest/10 text-spice-forest hover:bg-spice-forest hover:text-white">
                  📸
                </div>
              </div>
            </div>
            <div className="md:col-span-3 space-y-6">
              <Textarea
                label="Your Message"
                placeholder="Tell us what's on your mind..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="min-h-[180px]"
              />
              <Button
                className="w-full md:w-auto px-10 py-4 shadow-lg shadow-spice-forest/20"
                onClick={handleSendMessage}
              >
                Send Message
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Contact;
