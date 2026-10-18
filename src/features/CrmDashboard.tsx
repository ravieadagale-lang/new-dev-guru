import React, { useState } from "react";
import { AstroPractitionerWorkspace } from "../components/astronext/AstroPractitionerWorkspace";
import { UserProfile } from "../types";
import { 
  Briefcase, 
  Users, 
  PhoneCall, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  MessageSquare 
} from "lucide-react";

export const CrmDashboard: React.FC = () => {
  const [activeQueueTab, setActiveQueueTab] = useState<"inquiries" | "workspace">("workspace");

  const sampleProfile: UserProfile = {
    id: "client-101",
    name: "Rohit Verma",
    email: "rohit.v@example.com",
    role: "customer",
    gender: "male",
    dob: "1991-04-12",
    time: "08:15",
    place: "Mumbai, India",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: "Asia/Kolkata",
    rashi: "Pisces",
    nakshatra: "Uttara Bhadrapada",
    nakshatraPada: 3,
    lagna: "Taurus",
    sunSign: "Aries",
    walletBalance: 1200,
    spiritualPoints: 200,
    referralCode: "ROHIT101",
    totalReferralsCount: 1,
    totalPointsEarned: 150
  };

  const clientQueue = [
    { id: "q-1", name: "Rohit Verma", service: "Kundli + Gemstone Remedy", time: "10:30 AM Today", status: "In Progress" },
    { id: "q-2", name: "Priya Sundaram", service: "36 Guna Milan Marriage Match", time: "11:45 AM Today", status: "Upcoming" },
    { id: "q-3", name: "Anil Kapoor", service: "Career Sade Sati Transit Analysis", time: "02:00 PM Today", status: "Scheduled" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-600" />
            <h1 className="font-serif text-2xl font-bold text-slate-900">Astrologer &amp; Practitioner CRM Suite</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Client consultation queue, high-precision KP cusps, Dasha analysis, and prescription writer
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveQueueTab("workspace")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeQueueTab === "workspace" ? "bg-slate-900 text-amber-300 shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Clinical Astro Workspace
          </button>
          <button
            onClick={() => setActiveQueueTab("inquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeQueueTab === "inquiries" ? "bg-slate-900 text-amber-300 shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Client Queue ({clientQueue.length})
          </button>
        </div>
      </div>

      {activeQueueTab === "inquiries" ? (
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <span>Today's Client Consultations</span>
          </h2>
          <div className="divide-y divide-slate-100">
            {clientQueue.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.service} • Scheduled for {item.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === "In Progress" ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"
                  }`}>
                    {item.status}
                  </span>
                  <button
                    onClick={() => setActiveQueueTab("workspace")}
                    className="px-3 py-1.5 bg-slate-900 text-amber-300 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Open Chart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AstroPractitionerWorkspace
          userProfile={sampleProfile}
          onSelectTab={() => {}}
        />
      )}
    </div>
  );
};
