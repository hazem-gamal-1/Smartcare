import React from "react";
import { Mail, Phone} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We&apos;re here to help. Reach out to our support team
              for assistance with Smartcare.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 border shadow-lg">
              <h2 className="text-2xl font-bold font-[Plus_Jakarta_Sans] mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                      placeholder="Hazem"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                      placeholder="Gamal"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                    placeholder="hazemgamal223311@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-lg font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-card rounded-3xl p-8 border">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email Support</h4>
                      <p className="text-muted-foreground">
                       hazemgamal223311@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 h-40">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone Support</h4>
                      <p className="text-muted-foreground">+20 100 316 5658</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 border h-80">
                <h3 className="text-xl font-bold mb-6">Business Hours</h3>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-primary font-medium">
                    Emergency support available 24/7 through our AI tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
