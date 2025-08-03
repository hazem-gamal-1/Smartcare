"use client";
import React from "react";
import { Shield, Award, Clock } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your health data is encrypted and protected with industry-leading
              security measures and HIPAA compliance.
            </p>
          </div>

          <div className="text-center group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Certified Doctors</h3>
            <p className="text-muted-foreground leading-relaxed">
              All our doctors are board-certified and thoroughly vetted
              healthcare professionals with years of experience.
            </p>
          </div>

          <div className="text-center group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">24/7 Available</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access AI health tools anytime and book appointments with flexible
              scheduling that fits your lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
