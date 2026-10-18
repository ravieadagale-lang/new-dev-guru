import React, { useState, useMemo } from "react";
import { 
  Calendar, 
  Download, 
  ExternalLink, 
  Check, 
  Sparkles, 
  X, 
  Clock, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  Heart, 
  Coins, 
  Car, 
  Compass 
} from "lucide-react";
import { UserProfile, PanchangInfo } from "../types";

interface MuhuratCalendarSyncModalProps {
  userProfile?: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

interface MuhuratEvent {
  id: string;
  title: string;
  category: "Business" | "Finance" | "Relationship" | "Vehicle" | "Spiritual";
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  significance: string;
  planetSupport: string;
  quality: "Auspicious (Abhijit)" | "Sarvartha Siddhi" | "Amrit Siddhi" | "Shubh Choghadiya";
}

export const MuhuratCalendarSyncModal: React.FC<MuhuratCalendarSyncModalProps> = ({
  userProfile,
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isExported, setIsExported] = useState<boolean>(false);

  // Generate 6 upcoming personalized auspicious Muhurats for next 14 days
  const muhuratEvents: MuhuratEvent[] = useMemo(() => {
    const today = new Date();
    
    const formatDate = (offsetDays: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offsetDays);
      return d.toISOString().split("T")[0];
    };

    return [
      {
        id: "m-1",
        title: "Abhijit Muhurat — High-Value Business Deal Signing",
        category: "Business",
        date: formatDate(1),
        startTime: "11:48",
        endTime: "12:36",
        significance: "Destroys 100,000 doshas. Ideal for launch, contracts, agreement signings & new ventures.",
        planetSupport: "Jupiter & Sun Alignment",
        quality: "Auspicious (Abhijit)"
      },
      {
        id: "m-2",
        title: "Sarvartha Siddhi Yoga — Real Estate & Property Purchase",
        category: "Finance",
        date: formatDate(3),
        startTime: "06:15",
        endTime: "14:20",
        significance: "Fulfills all desires. Favorable for financial investments, property registry & gold buying.",
        planetSupport: "Pushya Nakshatra + Moon",
        quality: "Sarvartha Siddhi"
      },
      {
        id: "m-3",
        title: "Amrit Siddhi Muhurat — Wedding Proposal & Engagement",
        category: "Relationship",
        date: formatDate(5),
        startTime: "09:30",
        endTime: "13:00",
        significance: "Bestows immortal sweetness and lifelong matrimonial harmony.",
        planetSupport: "Venus Exaltation Aspect",
        quality: "Amrit Siddhi"
      },
      {
        id: "m-4",
        title: "Shubh Choghadiya — New Vehicle Purchase & Delivery",
        category: "Vehicle",
        date: formatDate(7),
        startTime: "07:45",
        endTime: "09:15",
        significance: "Protects against travel afflictions, accidents & technical defects.",
        planetSupport: "Mercury & Mars Balance",
        quality: "Shubh Choghadiya"
      },
      {
        id: "m-5",
        title: "Brahma Muhurat — Spiritual Initiation & Tapasya",
        category: "Spiritual",
        date: formatDate(8),
        startTime: "04:30",
        endTime: "05:18",
        significance: "Peak cosmic sattva energy for mantra deeksha, meditation & inner clarity.",
        planetSupport: "Saturn & Jupiter Blessing",
        quality: "Auspicious (Abhijit)"
      },
      {
        id: "m-6",
        title: "Amrit Siddhi Yoga — Strategic Investment & Trading",
        category: "Finance",
        date: formatDate(11),
        startTime: "10:15",
        endTime: "15:45",
        significance: "Enhances asset liquidity and protects against sudden financial volatility.",
        planetSupport: "Mercury & Sun Conjunction",
        quality: "Amrit Siddhi"
      }
    ];
  }, []);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return muhuratEvents;
    return muhuratEvents.filter(e => e.category === selectedCategory);
  }, [muhuratEvents, selectedCategory]);

  // Generate RFC-5545 `.ics` file blob for selected or all events
  const generateICSFile = (eventsToExport: MuhuratEvent[]) => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dev-Guru Enterprise//Vedic Muhurat Engine//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    eventsToExport.forEach((ev) => {
      const startClean = `${ev.date.replace(/-/g, "")}T${ev.startTime.replace(":", "")}00`;
      const endClean = `${ev.date.replace(/-/g, "")}T${ev.endTime.replace(":", "")}00`;

      icsContent += `BEGIN:VEVENT
UID:muhurat-${ev.id}-${Date.now()}@dev-guru.ai
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=Asia/Kolkata:${startClean}
DTEND;TZID=Asia/Kolkata:${endClean}
SUMMARY:🔮 [Dev-Guru] ${ev.title}
DESCRIPTION:${ev.significance} (Planetary Alignment: ${ev.planetSupport})
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: Auspicious Muhurat starts in 15 minutes!
END:VALARM
END:VEVENT
`;
    });

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Vedic_Muhurat_Calendar_${userProfile?.name?.replace(/\s+/g, "_") || "User"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExported(true);
    setTimeout(() => setIsExported(false), 3000);
  };

  // Generate Direct 1-Click Google Calendar Web Link
  const getGoogleCalendarUrl = (ev: MuhuratEvent) => {
    const startClean = `${ev.date.replace(/-/g, "")}T${ev.startTime.replace(":", "")}00Z`;
    const endClean = `${ev.date.replace(/-/g, "")}T${ev.endTime.replace(":", "")}00Z`;
    const title = encodeURIComponent(`🔮 [Dev-Guru] ${ev.title}`);
    const details = encodeURIComponent(`${ev.significance}\n\nPlanetary Support: ${ev.planetSupport}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startClean}/${endClean}&details=${details}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-amber-900/10 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Google Calendar & iCal Export Engine
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Personalized Muhurat Calendar Sync
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
          {["All", "Business", "Finance", "Relationship", "Vehicle", "Spiritual"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-950 text-amber-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "All" && "✨ All Muhurats"}
              {cat === "Business" && "💼 Business & Launch"}
              {cat === "Finance" && "💰 Property & Investments"}
              {cat === "Relationship" && "❤️ Matrimony & Dates"}
              {cat === "Vehicle" && "🚗 Vehicle Purchase"}
              {cat === "Spiritual" && "📿 Spiritual Rituals"}
            </button>
          ))}
        </div>

        {/* MUHURAT EVENT LIST */}
        <div className="space-y-3">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 text-[10px] font-bold uppercase">
                    {ev.quality}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {ev.date} ({ev.startTime} - {ev.endTime})
                  </span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">
                  {ev.title}
                </h4>
                <p className="text-xs text-slate-600 leading-snug">
                  {ev.significance}
                </p>
                <div className="text-[11px] text-amber-700 font-medium">
                  Support: {ev.planetSupport}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={getGoogleCalendarUrl(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                  <span>Google Cal</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BULK ACTION FOOTER */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Includes custom 15-minute alarm reminders for Apple iCal, Outlook & Google Calendar.
          </div>

          <button
            onClick={() => generateICSFile(filteredEvents)}
            className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExported ? "Downloaded .ICS File! " : `Download All ${filteredEvents.length} Muhurats (.ics)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
