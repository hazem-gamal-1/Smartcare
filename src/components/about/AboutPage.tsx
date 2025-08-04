"use client";
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary">
                About AI-Clinic
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
              Revolutionizing Healthcare
              <span className="block text-primary">Through Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge artificial intelligence with experienced
              medical professionals to provide accessible, reliable health
              insights and consultations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-[Plus_Jakarta_Sans] mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We believe everyone deserves access to quality healthcare.
                  AI-Clinic combines cutting-edge artificial intelligence with
                  experienced medical professionals to provide accessible,
                  reliable health insights and consultations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform empowers patients with instant AI health tools
                  while connecting them with certified doctors for comprehensive
                  care, making healthcare more accessible and efficient.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-10">
              <h3 className="text-2xl font-bold mb-6">Platform Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>AI-powered health analysis tools</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Board-certified medical professionals</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>24/7 availability and support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Secure and private consultations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Multi-specialty medical coverage</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Integrated appointment scheduling</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              {
                number: "500+",
                label: "Expert Doctors",
                desc: "Board-certified professionals",
              },
              {
                number: "50k+",
                label: "Patients Served",
                desc: "Across all specialties",
              },
              {
                number: "98%",
                label: "Satisfaction Rate",
                desc: "Patient feedback",
              },
              { number: "24/7", label: "AI Support", desc: "Always available" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
            <h2 className="text-3xl font-bold font-[Plus_Jakarta_Sans] mb-6">
              Ready to Transform Your Healthcare?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust AI-Clinic for their
              healthcare needs. Experience the future of medicine today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {}}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-lg font-medium"
              >
                Try AI Tools
              </button>
              <button
                onClick={() => {}}
                className="px-8 py-4 border-2 border-border rounded-xl hover:bg-muted transition-colors text-lg font-medium"
              >
                Find a Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
