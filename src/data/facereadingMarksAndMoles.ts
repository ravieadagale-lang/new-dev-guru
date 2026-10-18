export const FACE_READING_MARKS_AND_MOLES = {
  meta: {
    module: "faceReading",
    usage: "Supplementary data file covering moles, scars, and other skin marks on the face -- the layer classical Chinese Mian Xiang treats as fixed, standalone signs layered on top of face shape, zones, elements, and individual features. Same lookup pattern as the main interpretations file: category -> location -> text.",
    version: "1.0"
  },
  moles: {
    generalPrinciple: "In Chinese face reading, a mole is read according to the Palace (see the Twelve Palaces section of the main interpretations file) it falls within, intensifying or complicating that Palace's theme. Classical practice also weighs color and form: a small, dark, round, clearly-raised mole is generally read as favorable for its location, while a pale, flat, irregular, or reddish mole softens the reading toward 'mixed' or cautionary. Recommend the engine capture facial location as the primary signal, with color/form as an optional refinement layer.",
    byLocation: {
      forehead: {
        text: "A mole on the forehead, within the Fortune or Career palaces, is traditionally read as adding intensity to inherited luck or professional drive -- in some traditions a favorable sign of recognition, in others a caution toward obstacles requiring extra effort in that same domain.",
        palace: "Career / Fortune Palace",
        traitClusters: ["ambition/drive", "intellect/analysis"]
      },
      betweenEyebrows: {
        text: "A mole between the eyebrows (the Life Palace / glabella) is one of the most closely watched mole locations in Chinese face reading -- traditionally read as significant for overall life direction, sometimes favorable and sometimes cautionary depending on color and form, and generally worth flagging prominently in a report.",
        palace: "Life Palace (Ming Gong)",
        traitClusters: ["ambition/drive", "intuition"]
      },
      eyebrow: {
        text: "A mole within the eyebrow itself, in the Siblings Palace, is traditionally linked to notable dynamics with siblings or close peers -- read as adding weight to relationships in that category.",
        palace: "Siblings Palace",
        traitClusters: ["emotion/relationships", "communication"]
      },
      eyeCorner: {
        text: "A mole near the outer corner of the eye, in the Marriage Palace, is traditionally read as adding intensity to romantic relationship themes -- frequently cautioned in classical texts as a marker of a more eventful or complicated romantic history.",
        palace: "Marriage Palace",
        traitClusters: ["emotion/relationships", "caution/stability"]
      },
      underEye: {
        text: "A mole beneath the eye, in the Children Palace, is traditionally linked to the relationship with children or one's legacy -- read gently and without literal predictive weight regarding number of children.",
        palace: "Children Palace",
        traitClusters: ["emotion/relationships", "resilience/vitality"]
      },
      noseBridge: {
        text: "A mole on the bridge of the nose, in the Health Palace, is traditionally read as a marker worth noting for general vitality themes -- present this in non-medical, symbolic terms only.",
        palace: "Health Palace",
        traitClusters: ["resilience/vitality", "caution/stability"]
      },
      noseTip: {
        text: "A mole on the tip of the nose, in the Wealth Palace, is one of the more commonly discussed mole placements in Chinese face reading -- traditionally linked to financial matters, though classical opinion is genuinely split on whether it's favorable or cautionary, so it should be presented as a traditional talking point rather than a firm prediction either way.",
        palace: "Wealth Palace",
        traitClusters: ["ambition/drive", "caution/stability"]
      },
      cheek: {
        text: "A mole on the cheek, generally within the Support or Property palaces depending on exact placement, is traditionally linked to themes of social network strength or material stability.",
        palace: "Support / Property Palace",
        traitClusters: ["communication", "caution/stability"]
      },
      aboveLip: {
        text: "A mole above the upper lip is traditionally linked to expressiveness and social charm -- often read as a favorable marker for communication and likability.",
        palace: "Expression & Charm",
        traitClusters: ["communication", "creativity/expression"]
      },
      belowLip: {
        text: "A mole below the lower lip or near the chin is traditionally linked to later-life themes, tying into the Lower Zone's general focus on stability and legacy.",
        palace: "Legacy & Lower Zone",
        traitClusters: ["caution/stability", "resilience/vitality"]
      },
      chin: {
        text: "A mole on the chin, within the Property or general Lower Zone themes, is traditionally read as adding weight -- favorable or cautionary depending on color and form -- to later-life stability and material security.",
        palace: "Property Palace / Lower Zone",
        traitClusters: ["caution/stability", "ambition/drive"]
      },
      ear: {
        text: "A mole on or near the ear is traditionally linked to inherited fortune and early-life themes, reinforcing whatever the Upper Zone and ear-size reading already suggest.",
        palace: "Ancestral Fortune",
        traitClusters: ["intuition", "resilience/vitality"]
      }
    },
    colorNote: "Where color can be reasonably assessed: a small, dark, well-defined, slightly raised mole is generally read as the most favorable presentation for its Palace; a pale, flat, or irregular mole softens the reading toward neutral or mixed; a reddish mole is traditionally read as adding friction or intensity to that Palace's theme."
  },
  scars: {
    generalPrinciple: "A scar within a given facial zone or Palace is traditionally read as an externally-caused disruption to that zone's theme -- distinct from a mole (which is read as an innate, fixed marker) in that a scar points to an event or circumstance that intervened from outside.",
    byZone: {
      Upper: {
        text: "A scar within the Upper Zone points to an early-life disruption or challenge; read this as a note on resilience and early character-building rather than an ongoing obstacle.",
        traitClusters: ["resilience/vitality", "intellect/analysis"]
      },
      Middle: {
        text: "A scar within the Middle Zone points to a midlife disruption tied to career or personal effort; read this alongside your overall willpower as a testament to resilience under external pressure.",
        traitClusters: ["ambition/drive", "resilience/vitality"]
      },
      Lower: {
        text: "A scar within the Lower Zone points to a later-life or stability-related disruption; read this as an incentive for deliberate, proactive grounding and long-term planning.",
        traitClusters: ["caution/stability", "resilience/vitality"]
      }
    }
  },
  otherMarks: {
    birthmark: "A birthmark is traditionally read similarly to a mole but with slightly more weight, since it has been present from birth rather than developing later -- treat it as an innate, foundational marker for whichever Palace or zone it falls within.",
    freckles: "Scattered freckles, as opposed to a single defined mole, are generally treated as a minor textural detail rather than a distinct predictive marker in classical face reading -- worth a brief observational mention at most, not folded into the core interpretation layer.",
    birthmarkVsMoleNote: "If the analysis pipeline cannot reliably distinguish a birthmark from a later-developing mole from a single photo, default to the mole interpretation for that location -- the practical difference in report language is minor."
  },
  combinationGuidance: "When a mole or mark coincides with a Palace that the main features/zones analysis already reads as prominent or recessed, treat the two as reinforcing one another rather than as separate, independently-weighted points -- state that the location carries a compounded version of that theme, rather than listing the mole and the Palace reading as two disconnected observations."
};
