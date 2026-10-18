// Dev-Guru Luxury PDF & Print Generator

export function getGenderAwareText(text: string, gender: string = "other"): string {
  if (gender === "male") {
    return text.replace(/they\/he\/she/g, "he").replace(/his\/her\/their/g, "his");
  } else if (gender === "female") {
    return text.replace(/they\/he\/she/g, "she").replace(/his\/her\/their/g, "her");
  }
  return text;
}

export function generateLuxuryAstroPDF(reportData: any): void {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.print();
    return;
  }

  const title = reportData.title || "Dev-Guru Vedic Astrological Report";
  const userName = reportData.userName || reportData.name || "Seeker";

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - ${userName}</title>
        <style>
          body {
            font-family: 'Cinzel', 'Georgia', serif;
            margin: 40px;
            color: #1e1b4b;
            background-color: #fffdfa;
            line-height: 1.6;
          }
          .header {
            border-bottom: 2px solid #b45309;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #78350f;
            letter-spacing: 2px;
          }
          .subtitle {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
          }
          .section {
            margin-bottom: 25px;
            padding: 20px;
            border: 1px solid #fde68a;
            border-radius: 12px;
            background: #fffbeb;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">DEV-GURU V3</div>
          <div class="subtitle">Parashari Vedic Astronomy & Mathematical Kundli System</div>
          <h2>${title}</h2>
          <p><strong>Prepared for:</strong> ${userName} | <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
          <div class="title">Cosmic Energy & Planetary Forecast</div>
          <p>${reportData.summary || reportData.forecast || "Harmonious cosmic vibrations indicate favorable progress in personal aspirations and spiritual awareness."}</p>
        </div>

        ${reportData.predictions ? `
          <div class="section">
            <div class="title">Life Spheres & Recommendations</div>
            <p>${typeof reportData.predictions === "string" ? reportData.predictions : JSON.stringify(reportData.predictions)}</p>
          </div>
        ` : ""}

        <div class="footer">
          Generated securely by Dev-Guru Parashari Astronomical Suite • Om Tat Sat
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}
