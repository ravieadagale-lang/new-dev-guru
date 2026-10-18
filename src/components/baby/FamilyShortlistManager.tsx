// src/components/baby/FamilyShortlistManager.tsx
// Family Shortlist & Voting Manager

import React from "react";
import { 
  Heart, 
  Trash2, 
  Sparkles, 
  Share2, 
  Printer, 
  Users, 
  Check, 
  ThumbsUp, 
  Award,
  ArrowRight
} from "lucide-react";
import { NameCandidate, BabyBirthInput } from "../../types/babyNameTypes";

interface FamilyShortlistManagerProps {
  shortlist: NameCandidate[];
  babyInput: BabyBirthInput;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onOpenCertificate: (candidate: NameCandidate) => void;
}

export const FamilyShortlistManager: React.FC<FamilyShortlistManagerProps> = ({
  shortlist,
  babyInput,
  onRemove,
  onClearAll,
  onOpenCertificate
}) => {
  if (shortlist.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="font-serif text-xl font-bold text-slate-900">Your Family Shortlist is Empty</h3>
          <p className="text-xs text-slate-500 mt-1">
            Browse suggestions or the Vedic Name Library, then click the heart icon on your favorite names to compare and review them here with your family.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
            Family Decision Center
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Shortlisted Baby Names ({shortlist.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare your top auspicious candidates side-by-side with parents' vibrational harmony and print Namakarana certificates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 font-medium transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Shortlist Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shortlist.map((item) => {
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-serif text-xl font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-xs font-serif text-amber-800 font-medium">
                        {item.sanskrit}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Syllable: <strong className="text-amber-800">"{item.startingSyllable}"</strong> • {item.origin}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20">
                      {item.harmonicScore}%
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {item.meaning}
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-100">
                  <div className="text-[10px] font-bold uppercase text-purple-700">Chaldean</div>
                  <div className="font-bold text-sm">#{item.chaldeanCompound} → #{item.chaldeanSingle}</div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
                  <div className="text-[10px] font-bold uppercase text-emerald-700">Parent Resonance</div>
                  <div className="font-bold text-sm">{item.parentHarmonyScore}%</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {babyInput.surname ? `Full: ${item.name} ${babyInput.surname}` : item.name}
                </span>

                <button
                  type="button"
                  onClick={() => onOpenCertificate(item)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
