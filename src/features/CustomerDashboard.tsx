import React, { useState } from "react";
import { UserProfile } from "../types";
import { ProfilePhotoUploader } from "../components/consultation/ProfilePhotoUploader";
import { useSuperAdminAuth } from "../services/auth/SuperAdminAuthContext";
import { 
  User, 
  Sparkles, 
  Compass, 
  ShoppingBag, 
  Video, 
  Gift, 
  Edit3, 
  Save, 
  Calendar, 
  Clock, 
  Lock,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  LogOut
} from "lucide-react";

interface CustomerDashboardProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onSelectTab: (tab: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  userProfile,
  onUpdateProfile,
  onSelectTab
}) => {
  const { user, logout } = useSuperAdminAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  React.useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handlePhotoUpdated = (photoUrl: string | null) => {
    const updated = {
      ...formData,
      avatarUrl: photoUrl || undefined,
    };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner with Profile Greeting */}
      <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-serif font-bold text-2xl shadow-xs shrink-0">
            {userProfile.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name || "Seeker"}
                className="w-full h-full object-cover"
              />
            ) : (
              userProfile.name?.charAt(0) || "U"
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-slate-900">{userProfile.name || "Seeker"}</h1>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Seeker
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>{userProfile.email || "No email on record"}</span>
              {userProfile.createdAt && (
                <>
                  <span>•</span>
                  <span>Member since {new Date(userProfile.createdAt).getFullYear()}</span>
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-amber-900 mt-2">
              {!userProfile.dob && !userProfile.time && !userProfile.place ? (
                <span className="bg-amber-50 px-2.5 py-0.5 rounded-md font-semibold text-amber-800">
                  Birth details not added yet
                </span>
              ) : (
                <>
                  {userProfile.dob && (
                    <span className="bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-amber-800">
                      DOB: {userProfile.dob}
                    </span>
                  )}
                  {userProfile.time && (
                    <span className="bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-amber-800">
                      Time: {userProfile.time}
                    </span>
                  )}
                  {userProfile.place && (
                    <span className="bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-amber-800">
                      Place: {userProfile.place}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Cancel Editing" : "Manage Profile"}</span>
          </button>
          {user && (
            <button
              onClick={async () => {
                await logout();
                onSelectTab("home");
              }}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Photo Uploader Section */}
      <ProfilePhotoUploader
        currentPhotoUrl={userProfile.avatarUrl}
        userName={userProfile.name}
        userRole="CUSTOMER"
        onPhotoUpdated={handlePhotoUpdated}
      />

      {/* Profile Edit Form */}
      {isEditing && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Manage Seeker Profile &amp; Birth Parameters
            </h3>
            <span className="text-[11px] text-slate-500">Truthful data persistence contract</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
            {/* Display Name */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                Full Name / Display Name
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Email (Read-only from Firebase Auth) */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>Email Address</span>
                <Lock className="w-3 h-3 text-slate-400" />
              </label>
              <input
                type="email"
                value={userProfile.email || ""}
                readOnly
                disabled
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                title="Email is authoritatively managed by Firebase Authentication."
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Managed via Firebase Authentication.
              </span>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                <span>Contact Phone</span>
              </label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 / International"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>Date of Birth</span>
              </label>
              <input
                type="date"
                value={formData.dob || ""}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Birth Time */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>Birth Time</span>
              </label>
              <input
                type="time"
                value={formData.time || ""}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Birth Place */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>Birth Place (City, Country)</span>
              </label>
              <input
                type="text"
                value={formData.place || ""}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                placeholder="City, Country"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-500" />
                <span>Timezone</span>
              </label>
              <select
                value={formData.timezone || "Asia/Kolkata"}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST +05:30)</option>
                <option value="UTC">UTC (GMT +00:00)</option>
                <option value="America/New_York">America/New_York (EST/EDT)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                <option value="Europe/London">Europe/London (GMT/BST)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST +04:00)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT +08:00)</option>
                <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Information</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Action Portals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Consultations Workspace Quick Link */}
        <div
          onClick={() => onSelectTab("consultation")}
          className="bg-white p-5 rounded-3xl border border-amber-900/10 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900">Live Consultations</h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Book 1-on-1 sessions, track appointment dates, and view client astrological summaries.
          </p>
        </div>

        {/* 2. Vedic Kundli */}
        <div
          onClick={() => onSelectTab("astrology")}
          className="bg-white p-5 rounded-3xl border border-amber-900/10 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">Vedic Kundli</h3>
          <p className="text-xs text-slate-500">View 16 Divisional charts, Vimshottari dasha, and Gochar transits</p>
        </div>

        {/* 3. Sacred Marketplace */}
        <div
          onClick={() => onSelectTab("marketplace")}
          className="bg-white p-5 rounded-3xl border border-amber-900/10 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">Sacred Marketplace</h3>
          <p className="text-xs text-slate-500">Certified unheated Blue Sapphires, Rudraksha, and Meru Yantras</p>
        </div>

        {/* 4. Spiritual Rewards */}
        <div
          onClick={() => onSelectTab("referrals")}
          className="bg-white p-5 rounded-3xl border border-amber-900/10 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">Spiritual Rewards</h3>
          <p className="text-xs text-slate-500">Redeem your {userProfile.spiritualPoints ?? 0} Karma Points for reports &amp; discounts</p>
        </div>
      </div>
    </div>
  );
};
