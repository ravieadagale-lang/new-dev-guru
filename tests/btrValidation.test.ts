import { describe, it, expect } from "vitest";
import {
  validateBirthProfileForBtr,
  isInventedDefaultProfile,
  BtrProfileValidationState
} from "../src/engine/btr/btrProfileValidation";
import { BirthTimeRectificationEngine } from "../src/engine/btr/btrEngine";

describe("BTR Profile Validation & Default Persona Gate", () => {
  const defaultPersona = {
    name: "Aarav Sharma",
    dob: "1995-08-15",
    time: "10:30",
    place: "New Delhi, India",
    latitude: 28.6139,
    longitude: 77.2090,
    timezoneOffsetHours: 5.5
  };

  const genuineProfile = {
    name: "Kavita Patel",
    dob: "1988-11-23",
    time: "14:15",
    place: "Ahmedabad, Gujarat, India",
    latitude: 23.0225,
    longitude: 72.5714,
    timezoneOffsetHours: 5.5
  };

  it("detects invented default persona (Aarav Sharma / 1995-08-15 / 10:30)", () => {
    expect(isInventedDefaultProfile(defaultPersona)).toBe(true);
    expect(isInventedDefaultProfile({ name: "Aarav Sharma" })).toBe(true);
    expect(isInventedDefaultProfile({ dob: "1995-08-15", time: "10:30", place: "New Delhi" })).toBe(true);
    expect(isInventedDefaultProfile({ isDefault: true })).toBe(true);
    expect(isInventedDefaultProfile(genuineProfile)).toBe(false);
  });

  it("blocks BTR calculation if default profile is supplied", () => {
    const res = validateBirthProfileForBtr({
      ...defaultPersona,
      isDefaultProfile: true
    });
    expect(res.isAllowedToRun).toBe(false);
    expect(res.state).toBe("BLOCKED_DEFAULT_PROFILE");
    expect(res.guidanceMessage).toContain("Enter your birth details to begin Birth Time Rectification.");
  });

  it("blocks BTR calculation if DOB is missing or invalid", () => {
    const resNoDob = validateBirthProfileForBtr({
      dob: "",
      place: "Mumbai",
      latitude: 19.076,
      longitude: 72.877
    });
    expect(resNoDob.isAllowedToRun).toBe(false);
    expect(resNoDob.state).toBe("BLOCKED_NO_DOB");
    expect(resNoDob.guidanceMessage).toContain("Date of Birth");

    const resBadDob = validateBirthProfileForBtr({
      dob: "not-a-date",
      place: "Mumbai",
      latitude: 19.076,
      longitude: 72.877
    });
    expect(resBadDob.isAllowedToRun).toBe(false);
    expect(resBadDob.state).toBe("BLOCKED_NO_DOB");
  });

  it("blocks BTR calculation if location or coordinates are missing/NaN", () => {
    const resNoPlace = validateBirthProfileForBtr({
      dob: "1990-05-10",
      place: "",
      latitude: NaN,
      longitude: NaN
    });
    expect(resNoPlace.isAllowedToRun).toBe(false);
    expect(resNoPlace.state).toBe("BLOCKED_NO_LOCATION");
    expect(resNoPlace.guidanceMessage).toContain("birth location");

    const resNanCoords = validateBirthProfileForBtr({
      dob: "1990-05-10",
      place: "Pune",
      latitude: NaN,
      longitude: 73.85
    });
    expect(resNanCoords.isAllowedToRun).toBe(false);
    expect(resNanCoords.state).toBe("BLOCKED_NO_LOCATION");
  });

  it("STATE A: Real DOB + Real Location + Unknown Time is ALLOWED for BTR", () => {
    const resUnknownTime = validateBirthProfileForBtr({
      dob: "1990-05-10",
      time: undefined,
      place: "Pune, Maharashtra",
      latitude: 18.5204,
      longitude: 73.8567,
      timezoneOffsetHours: 5.5,
      reliability: "completely_unknown"
    });
    expect(resUnknownTime.isAllowedToRun).toBe(true);
    expect(resUnknownTime.state).toBe("VALID_UNKNOWN_TIME");
    expect(resUnknownTime.isUnknownTime).toBe(true);
    expect(resUnknownTime.guidanceMessage).toContain("Birth time is unknown");
  });

  it("STATE D: Real DOB + Real Location + Known Time is ALLOWED for BTR", () => {
    const resKnownTime = validateBirthProfileForBtr({
      dob: "1990-05-10",
      time: "08:45",
      place: "Pune, Maharashtra",
      latitude: 18.5204,
      longitude: 73.8567,
      timezoneOffsetHours: 5.5,
      reliability: "approximate"
    });
    expect(resKnownTime.isAllowedToRun).toBe(true);
    expect(resKnownTime.state).toBe("VALID_KNOWN_TIME");
    expect(resKnownTime.isUnknownTime).toBe(false);
  });

  it("validates leap day dates correctly (2024-02-29 valid, 2023-02-29 invalid)", () => {
    const leapYearValid = validateBirthProfileForBtr({
      dob: "2024-02-29",
      place: "Delhi",
      latitude: 28.61,
      longitude: 77.20
    });
    expect(leapYearValid.isAllowedToRun).toBe(true);

    const nonLeapYearInvalid = validateBirthProfileForBtr({
      dob: "2023-02-29",
      place: "Delhi",
      latitude: 28.61,
      longitude: 77.20
    });
    expect(nonLeapYearInvalid.isAllowedToRun).toBe(false);
    expect(nonLeapYearInvalid.state).toBe("BLOCKED_NO_DOB");
  });

  it("Hard-Coded Profile Regression: Engine throws if Aarav Sharma profile is passed", () => {
    expect(() => {
      BirthTimeRectificationEngine.rectifyBirthTime({
        dob: "1995-08-15",
        recordedTime: "10:30",
        latitude: 28.6139,
        longitude: 77.2090,
        timezoneOffsetHours: 5.5,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: [],
        personName: "Aarav Sharma",
        place: "New Delhi, India",
        isDefaultProfile: true
      });
    }).toThrow(/BTR calculation blocked/);
  });
});
