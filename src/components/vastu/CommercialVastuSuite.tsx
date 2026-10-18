import React, { useState, useMemo } from "react";
import {
  Briefcase,
  Building2,
  Factory,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { CommercialPropertyType } from "../../types/vastuTypes";
import { evaluateCommercialVastu } from "../../engine/vastu/vastuEngine";

export const CommercialVastuSuite: React.FC = () => {
  const [propertyType, setPropertyType] = useState<CommercialPropertyType>("corporate_office");

  // State for sector assignments
  const [officeAssignments, setOfficeAssignments] = useState<Record<string, string>>({
    md_cabin: "SW",
    accounts_finance: "N",
    sales_marketing: "NW",
    conference_room: "ENE",
    server_room: "SE",
    reception_lobby: "E"
  });

  const [retailAssignments, setRetailAssignments] = useState<Record<string, string>>({
    cash_counter: "N",
    entrance_display: "NW",
    heavy_inventory: "SW",
    owner_seat: "SW"
  });

  const [factoryAssignments, setFactoryAssignments] = useState<Record<string, string>>({
    heavy_machinery: "S",
    furnace_boiler: "SE",
    raw_materials: "SW",
    finished_goods: "NW",
    effluent_treatment: "NE"
  });

  const activeAssignments = useMemo(() => {
    if (propertyType === "corporate_office") return officeAssignments;
    if (propertyType === "retail_showroom") return retailAssignments;
    return factoryAssignments;
  }, [propertyType, officeAssignments, retailAssignments, factoryAssignments]);

  const updateAssignment = (id: string, zone: string) => {
    if (propertyType === "corporate_office") {
      setOfficeAssignments((prev) => ({ ...prev, [id]: zone }));
    } else if (propertyType === "retail_showroom") {
      setRetailAssignments((prev) => ({ ...prev, [id]: zone }));
    } else {
      setFactoryAssignments((prev) => ({ ...prev, [id]: zone }));
    }
  };

  const auditReport = useMemo(() => {
    return evaluateCommercialVastu(propertyType, activeAssignments);
  }, [propertyType, activeAssignments]);

  const allZones = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "SSW", "WNW", "ENE"];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Commercial, Corporate &amp; Industrial Vastu</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Workspace Profitability &amp; Operational Flow Analyzer
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Align strategic business sectors—executive cabins, billing desks, server rooms, and production floors—with cardinal cosmic vectors to accelerate cash liquidity and staff retention.
          </p>
        </div>

        {/* Commercial Property Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl shrink-0">
          {[
            { id: "corporate_office", label: "Corporate Office", icon: Building2 },
            { id: "retail_showroom", label: "Retail Showroom", icon: ShoppingBag },
            { id: "manufacturing_factory", label: "Factory & Plant", icon: Factory }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = propertyType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPropertyType(tab.id as CommercialPropertyType)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-amber-300 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Sector Allocations & Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {auditReport.map((item) => {
          const isOptimal = item.compliance === "Optimal";
          const isCritical = item.compliance === "Critical Clash";

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all space-y-4 shadow-xs ${
                isOptimal
                  ? "bg-white border-slate-200 hover:border-emerald-300"
                  : isCritical
                  ? "bg-rose-50/50 border-rose-200"
                  : "bg-white border-slate-200 hover:border-amber-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 leading-tight">
                    {item.sectorName}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Ideal: {item.recommendedZone}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isOptimal
                      ? "bg-emerald-100 text-emerald-900"
                      : isCritical
                      ? "bg-rose-100 text-rose-900"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {item.compliance}
                </span>
              </div>

              {/* Zone Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">
                  Current Assigned Zone in Premise:
                </label>
                <select
                  value={item.actualZone}
                  onChange={(e) => updateAssignment(item.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white cursor-pointer"
                >
                  {allZones.map((z) => (
                    <option key={z} value={z}>
                      {z} Zone {z === item.recommendedZone ? "⭐ (Recommended)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Impact on Business Operations */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Impact on Enterprise:
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {item.impactOnBusiness}
                </p>
              </div>

              {/* Remedial Recommendation */}
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                <strong className="text-amber-900 font-bold flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Commercial Remedy:
                </strong>
                <p className="text-[11px] leading-relaxed">{item.remedy}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
