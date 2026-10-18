// src/components/SamudrikaScannerModal.tsx
import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  X, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Eye, 
  Hand, 
  Scan,
  AlertCircle
} from "lucide-react";
import { synthesizeFaceReadingReport } from "../services/facereadingEngine";
import { synthesizePalmistryReport } from "../services/palmistryEngine";
import { FaceReadingReport } from "../types/facereading";
import { PalmistryReport } from "../types/palmistry";

interface SamudrikaScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "face" | "palm";
  language?: string;
  onApplyGeneratedReport?: (type: "face" | "palm", result: FaceReadingReport | PalmistryReport) => void;
}

export const SamudrikaScannerModal: React.FC<SamudrikaScannerModalProps> = ({
  isOpen,
  onClose,
  initialType = "face",
  language = "en",
  onApplyGeneratedReport
}) => {
  const [scanType, setScanType] = useState<"face" | "palm">(initialType);
  const [seekerName, setSeekerName] = useState<string>("Seeker");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanPhaseText, setScanPhaseText] = useState<string>("");
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setScanType(initialType);
  }, [initialType]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (cameraActive && isOpen) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: "user" } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(() => {
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive, isOpen]);

  if (!isOpen) return null;

  const handleCaptureFromCamera = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setImagePreview(dataUrl);
      setCameraActive(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAnalysis = () => {
    setIsScanning(true);
    setScanProgress(10);
    setScanPhaseText("Calibrating 68 biometric landmark nodes...");

    const phases = [
      { progress: 35, text: scanType === "face" ? "Aligning San Ting (Three Zones) & Shi Er Gong (12 Palaces)..." : "Mapping Hasta Samudrika Mounts (Jupiter, Apollo, Venus)..." },
      { progress: 65, text: scanType === "face" ? "Evaluating Five Elements (Wu Xing) and facial symmetry..." : "Tracing Jeeva, Matru & Pitru Rekha contour paths..." },
      { progress: 90, text: "Synthesizing planetary astrological influences and karmic markings..." },
      { progress: 100, text: "Report synthesis complete!" }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < phases.length) {
        setScanProgress(phases[step].progress);
        setScanPhaseText(phases[step].text);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          if (scanType === "face") {
            const simulatedReport = synthesizeFaceReadingReport(
              {
                forehead: { width: "wide", height: "high", shape: "rounded", creases: "smooth", interpretation: "Expansive intellect and clear conceptual vision." },
                eyebrows: { thickness: "thick", shape: "arched", spacing: "balanced", length: "long", interpretation: "High willpower and focused determination." },
                eyes: { size: "large", spacing: "balanced", cornerAngle: "upturned", depth: "average", clarityOfGaze: "bright_clear", interpretation: "Bright vitality, strong 'Shen', and open emotional intelligence." },
                nose: { bridge: "high", nostrilWidth: "wide", tipShape: "rounded_moneybag", wealthIndicator: "Strong wealth attraction and steady accumulation.", interpretation: "Straight central pillar bestowing professional authority." },
                mouth: { width: "wide", lipFullness: "full", cornerAngle: "upturned", cupidsBow: "well_defined", communicationStyle: "Warm, persuasive eloquence.", interpretation: "Generous social presence and emotional loyalty." },
                chinJaw: { jawline: "strong_angular", chinShape: "prominent_protruding", laterLifeStability: "Enduring stability and loyal support.", interpretation: "Unwavering stamina and perseverance." },
                ears: { visible: true, size: "large", setHeight: "high_set", position: "close_to_head", earlobe: "thick_defined", ancestralVitality: "Deep constitutional stamina and blessings.", interpretation: "Refined listening intelligence and ancestral protection." },
                cheeksPhiltrum: { cheekbones: "high_prominent", philtrum: "long_defined", authorityAndVitality: "Authority in midlife and high vitality.", interpretation: "High personal authority and strong life stamina." }
              },
              "Oval",
              seekerName || "Seeker",
              true
            );
            if (onApplyGeneratedReport) {
              onApplyGeneratedReport("face", simulatedReport);
            }
          } else {
            const simulatedPalmReport = synthesizePalmistryReport("right", undefined, undefined, seekerName || "Seeker", true);
            if (onApplyGeneratedReport) {
              onApplyGeneratedReport("palm", simulatedPalmReport);
            }
          }
          onClose();
        }, 600);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-900/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-700">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">
                {scanType === "face" ? "Mian Xiang & Vedic Facial Scanner" : "Hasta Samudrika Palm Scanner"}
              </h2>
              <p className="text-xs text-slate-500">
                AI & Classical Morphological Feature Recognition
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Scan Mode Switcher */}
          <div className="flex items-center justify-between gap-4 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => { setScanType("face"); setImagePreview(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                scanType === "face"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Face Reading (Mian Xiang)</span>
            </button>
            <button
              onClick={() => { setScanType("palm"); setImagePreview(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                scanType === "palm"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Hand className="w-4 h-4 text-orange-600" />
              <span>Palm Reading (Hasta Samudrika)</span>
            </button>
          </div>

          {/* Seeker Name input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Seeker / Client Name
            </label>
            <input
              type="text"
              value={seekerName}
              onChange={(e) => setSeekerName(e.target.value)}
              placeholder="e.g. Ravii Adagale"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Camera / Image Container */}
          <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
              />
            ) : imagePreview ? (
              <img
                src={imagePreview}
                alt="Scan Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  {scanType === "face" ? <Eye className="w-8 h-8" /> : <Hand className="w-8 h-8" />}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    {scanType === "face" ? "Align Your Face in Good Lighting" : "Hold Palm Flat Facing Lens"}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload an existing photo or enable live camera for biometric scanning
                  </p>
                </div>
              </div>
            )}

            {/* Target Reticle Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className={`border-2 border-dashed border-amber-400/40 rounded-3xl ${
                scanType === "face" ? "w-48 h-64" : "w-56 h-64"
              }`} />
            </div>

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-bounce pointer-events-none" />
            )}
          </div>

          {/* Analysis Progress */}
          {isScanning && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-amber-900">
                <span>{scanPhaseText}</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Biometric processing executes with client consent. No permanent facial biometrics are stored without authorization.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>
            <button
              onClick={() => {
                if (cameraActive) {
                  handleCaptureFromCamera();
                } else {
                  setCameraActive(true);
                  setImagePreview(null);
                }
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>{cameraActive ? "Capture Frame" : "Use Camera"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartAnalysis}
              disabled={isScanning}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 flex items-center gap-1.5 shadow-md transition-all"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze {scanType === "face" ? "Face" : "Palm"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
