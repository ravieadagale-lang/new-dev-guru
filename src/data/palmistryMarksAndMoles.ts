export const PALMISTRY_MARKS_AND_MOLES = {
  meta: {
    module: "palmistry",
    usage: "Supplementary data file covering moles, scars, and other skin marks on the palm -- the layer classical Samudrika Shastra / Western palmistry treats as fixed, standalone signs layered on top of hand type, lines, and mounts. Same lookup pattern as the main interpretations file: category -> location -> text.",
    version: "1.0"
  },
  moles: {
    generalPrinciple: "A mole is traditionally read as a fixed, standalone marker tied to the specific mount or line it sits on -- it intensifies or complicates that location's theme, for better or worse depending on the tradition consulted. Classical texts (particularly Samudrika Shastra) also weigh color and raised/flat quality: a small, dark, well-defined mole is generally read more favorably than a pale, irregular, or reddish one. Recommend the engine capture location as the primary signal and treat color/texture as an optional refinement rather than a requirement.",
    onMounts: {
      jupiter: {
        text: "A mole on the Jupiter mount is traditionally linked to strong ambition and leadership drive that runs even deeper than the mount's baseline development would suggest -- though it can also point to a tendency toward pride or overreach if the rest of the hand doesn't temper it.",
        traitClusters: ["ambition/drive", "leadership"]
      },
      saturn: {
        text: "A mole on the Saturn mount is traditionally read as intensifying that mount's serious, disciplined themes -- sometimes toward isolation, sometimes toward an unusually strong sense of duty, depending on the surrounding hand.",
        traitClusters: ["caution/stability", "intellect/analysis"]
      },
      apollo: {
        text: "A mole on the Apollo mount is traditionally linked to a heightened creative or artistic gift, and in many traditions is read as a fortunate marker for recognition -- though it can also intensify a need for external validation.",
        traitClusters: ["creativity/expression", "ambition/drive"]
      },
      mercury: {
        text: "A mole on the Mercury mount is traditionally linked to sharpened communication and business instinct -- in some traditions read as a sign of natural skill in trade or negotiation, in others as a caution toward cunning or overly self-interested dealing.",
        traitClusters: ["communication", "intellect/analysis"]
      },
      venus: {
        text: "A mole on the Venus mount is traditionally linked to heightened passion, magnetism, and family devotion -- classical texts frequently treat this as a fortunate marker for close relationships, though it can also point to susceptibility to over-indulgence.",
        traitClusters: ["emotion/relationships", "resilience/vitality"]
      },
      marsUpper: {
        text: "A mole on the Upper Mars area is traditionally read as intensifying resilience and courage under pressure -- this person tends to hold their ground even more firmly than the mount's baseline development suggests.",
        traitClusters: ["resilience/vitality", "ambition/drive"]
      },
      marsLower: {
        text: "A mole on the Lower Mars area is traditionally read as intensifying boldness and initiative -- in some traditions cautioned as a marker of a quick or hot temper.",
        traitClusters: ["ambition/drive", "resilience/vitality"]
      },
      luna: {
        text: "A mole on the Luna mount is traditionally linked to heightened imagination and intuition -- often read as a marker of vivid inner life, occasionally cautioned as a tendency toward restlessness or overactive worry.",
        traitClusters: ["intuition", "creativity/expression"]
      }
    },
    onLines: {
      life: {
        text: "A mole directly on the Life line is traditionally treated as a marker worth noting around the corresponding age -- generally read as flagging a period requiring extra attention to wellbeing and energy management, rather than as a fixed negative event.",
        traitClusters: ["resilience/vitality", "caution/stability"]
      },
      head: {
        text: "A mole on the Head line is traditionally read as marking a period of significant mental strain or a major shift in thinking around the corresponding age.",
        traitClusters: ["intellect/analysis", "caution/stability"]
      },
      heart: {
        text: "A mole on the Heart line is traditionally read as marking a significant, often difficult emotional turning point around the corresponding age -- classical texts frequently link this to a notable relationship event.",
        traitClusters: ["emotion/relationships", "caution/stability"]
      },
      fate: {
        text: "A mole on the Fate line is traditionally read as marking a significant, often externally-driven turning point in career or life direction around the corresponding age.",
        traitClusters: ["ambition/drive", "caution/stability"]
      },
      sun: {
        text: "A mole on the Sun line is traditionally read as complicating an otherwise favorable line -- some recognition or success theme present, but arriving with more friction or delay than the line alone would suggest.",
        traitClusters: ["creativity/expression", "ambition/drive"]
      }
    },
    colorNote: "Where color can be reasonably assessed from the image: a small, dark, clearly defined mole is generally read as the most favorable presentation of any location's theme; a pale, faint, or irregularly shaped mole softens the reading toward 'mixed' rather than clearly fortunate; a reddish mole is traditionally read as intensifying whatever tension or friction the location already carries."
  },
  scars: {
    generalPrinciple: "A scar crossing a line is traditionally read similarly to a break, but with an added sense of an externally-caused disruption (an event, injury, or circumstance imposed from outside) rather than an internally-driven shift. A scar on a mount is read as a marker that the mount's natural theme was tested or challenged by an outside event at some point.",
    onLines: "A scar crossing any principal or secondary line marks a disruption to that line's theme brought on by an external event rather than an internal choice -- read this alongside the line's overall depth and continuation past the scar; a line that stays strong afterward suggests the disruption was absorbed and moved past.",
    onMounts: "A scar on a mount suggests that mount's theme (ambition, communication, vitality, etc., depending on which mount) was tested by an external circumstance -- the mount's baseline development still governs the core reading; the scar simply adds a note that this area of life required extra resilience at some point."
  },
  otherMarks: {
    wart: "A wart on the palm is traditionally treated similarly to a mole but generally read as a more mixed or cautionary marker for whichever mount or line it sits on -- worth noting but not weighting as heavily as a true mole.",
    callus: "A callus is a practical rather than traditional-symbolic marker -- it reflects repeated physical use of that part of the hand (manual work, a particular grip, an instrument, a sport) and is worth mentioning as an observed practical detail in the report rather than folded into the predictive interpretation layer.",
    discoloration: "Patchy discoloration on the palm, distinct from overall palm color (see main interpretations file), is generally treated as a minor, localized variant of the color note under the mount or line it appears on rather than as its own separate category."
  },
  combinationGuidance: "When a mole, scar, or mark coincides with an already-notable line marking (a break, island, or cross) at the same location, treat them as reinforcing rather than additive in a literal sense -- state that the location carries a compounded or amplified version of that theme, rather than listing both markings as separate, equally-weighted points in the report."
};
