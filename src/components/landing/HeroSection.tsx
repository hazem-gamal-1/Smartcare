"use client";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import {
  Activity,
  Shield,
  ChevronRight,
  Zap,
  CheckCircle,
  TrendingUp,
  Globe,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 min-h-[90vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Healthcare Platform
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold font-[Plus_Jakarta_Sans] text-foreground leading-tight">
                Your Health,
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI-Powered
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Connect with expert doctors, get instant AI health insights, and
                manage your healthcare journey with confidence and convenience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() =>{router.push("/ai-tools")} }
              >
                Try AI Tools
                <Zap className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
                onClick={() => {router.push("/specialties")}}
              >
                Find a Doctor
                <ChevronRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/50">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Expert Doctors
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  50k+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Patients Served
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  AI Support
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Side */}
          <div className="relative">
            <div className="relative z-10 space-y-6">
              {/* Main Feature Card */}
              <Card className="p-8 shadow-2xl border-0 bg-card/90 backdrop-blur-xl rounded-3xl transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-0">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Activity className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">
                          Real-time Health Monitoring
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Advanced AI insights at your fingertips
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Health Score
                        </span>
                        <span className="text-sm font-bold text-primary">
                          85%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">
                          Vitals Normal
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">
                          Improving
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 shadow-xl border-0 bg-card/80 backdrop-blur-xl rounded-2xl">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 mx-auto flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Secure Data</p>
                      <p className="text-xs text-muted-foreground">
                        HIPAA Compliant
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-xl border-0 bg-card/80 backdrop-blur-xl rounded-2xl">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 mx-auto flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Global Access</p>
                      <p className="text-xs text-muted-foreground">
                        Worldwide Care
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-bounce delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
