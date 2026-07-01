import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { QRCodeSVG } from "qrcode.react";
import { renderToString } from "react-dom/server";
import { COMPANY } from "@/lib/constants";
import logo from "@/assets/logo.png";
import seal from "@/assets/seal.jpg";
import sigFounder from "@/assets/sig-founder.jpg";

const C = { brand: "#07284a", ink: "#1e293b", muted: "#64748b", border: "#e2e8f0", light: "#f8fafc" };

const s = StyleSheet.create({
  page: { padding: 24, fontSize: 9, color: C.ink, fontFamily: "Helvetica", position: "relative" },
  frameOuter: { position: "absolute", top: 6, left: 6, right: 6, bottom: 6, borderWidth: 1.5, borderColor: C.brand, borderRadius: 4 },
  frameInner: { position: "absolute", top: 10, left: 10, right: 10, bottom: 10, borderWidth: 0.5, borderColor: C.brand, opacity: 0.1 },
  topBand: { position: "absolute", top: 0, left: 0, right: 0, height: 4, backgroundColor: C.brand },
  bottomBand: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: C.brand, opacity: 0.6 },

  brandLine: { fontSize: 14, letterSpacing: 6, color: C.brand, textAlign: "center", fontFamily: "Helvetica-Bold", marginBottom: 2 },
  subtitle: { fontSize: 7, color: C.muted, textAlign: "center", marginBottom: 16 },

  logoContainer: { alignItems: "center", marginBottom: 8 },
  logo: { width: 48, height: 48 },

  title: { fontSize: 13, fontFamily: "Helvetica-Bold", textAlign: "center", color: C.brand, marginBottom: 4 },
  certText: { fontSize: 8, textAlign: "center", color: C.ink, lineHeight: 1.6, marginBottom: 8 },
  name: { fontSize: 16, fontFamily: "Helvetica-Bold", textAlign: "center", color: C.brand, marginVertical: 6 },
  detailRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 3 },
  detailLabel: { fontSize: 7, color: C.muted },
  detailValue: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.ink },

  scoreBadge: { alignItems: "center", marginVertical: 8 },
  scoreCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.brand, alignItems: "center", justifyContent: "center" },
  scoreText: { fontSize: 12, fontFamily: "Helvetica-Bold", color: "#fff" },
  scoreLabel: { fontSize: 5, color: "#fff", marginTop: -1 },

  footer: { position: "absolute", bottom: 20, left: 24, right: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  signatureArea: { alignItems: "center" },
  signature: { width: 60, height: 20, objectFit: "contain" },
  signLabel: { fontSize: 6, color: C.muted, marginTop: 2 },
  certId: { fontSize: 5, color: C.muted },

  qrContainer: { alignItems: "center", marginTop: 10 },
  qrLabel: { fontSize: 5, color: C.muted, marginBottom: 2 },
});

// ─── Completion Certificate ───
export function ProjectCompletionCert({
  participantName, projectId, projectTitle, industry, technologies,
  finalScore, certId, completionDate, evaluationUrl,
}: {
  participantName: string; projectId: string; projectTitle: string; industry: string;
  technologies: string[]; finalScore: number; certId: string; completionDate: string; evaluationUrl: string;
}) {
  const qrSvg = renderToString(<QRCodeSVG value={evaluationUrl} size={64} />);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.frameOuter} />
        <View style={s.frameInner} />
        <View style={s.topBand} />
        <View style={s.bottomBand} />

        <View style={s.logoContainer}>
          <Image src={logo} style={s.logo} />
        </View>
        <Text style={s.brandLine}>{COMPANY.name.toUpperCase()}</Text>
        <Text style={s.subtitle}>{COMPANY.tagline}</Text>

        <View style={{ borderTopWidth: 0.5, borderColor: C.border, marginHorizontal: 40, marginBottom: 12 }} />

        <Text style={s.title}>Real-World Project Challenge</Text>
        <Text style={{ ...s.title, fontSize: 10, color: C.ink, marginBottom: 8 }}>Certificate of Completion</Text>

        <Text style={s.certText}>This is to certify that</Text>
        <Text style={s.name}>{participantName}</Text>
        <Text style={s.certText}>has successfully completed the real-world project challenge</Text>
        <Text style={{ ...s.name, fontSize: 13 }}>{projectTitle}</Text>

        <View style={s.detailRow}>
          <Text style={s.detailLabel}>Project ID:</Text>
          <Text style={s.detailValue}>{projectId}</Text>
        </View>
        <View style={s.detailRow}>
          <Text style={s.detailLabel}>Industry:</Text>
          <Text style={s.detailValue}>{industry}</Text>
        </View>
        {technologies.length > 0 && (
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Technologies:</Text>
            <Text style={s.detailValue}>{technologies.join(", ")}</Text>
          </View>
        )}

        <View style={s.scoreBadge}>
          <View style={s.scoreCircle}>
            <Text style={s.scoreText}>{finalScore}</Text>
            <Text style={s.scoreLabel}>/100</Text>
          </View>
        </View>

        <View style={s.footer}>
          <View style={s.signatureArea}>
            <Image src={seal} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 5, color: C.muted, marginTop: 2 }}>Digital Seal</Text>
          </View>
          <View style={s.signatureArea}>
            <Image src={sigFounder} style={s.signature} />
            <Text style={s.signLabel}>{COMPANY.founder.name}</Text>
            <Text style={{ ...s.signLabel, fontSize: 5 }}>{COMPANY.founder.title}</Text>
          </View>
        </View>

        <View style={{ position: "absolute", bottom: 48, left: 24, right: 24, flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 5, color: C.muted }}>Completion Date: {completionDate}</Text>
        </View>

        <View style={{ position: "absolute", bottom: 8, left: 24, right: 24, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={s.certId}>Cert. ID: {certId}</Text>
          <Image source={{ data: `data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}` }} style={{ width: 28, height: 28 }} />
        </View>
      </Page>
    </Document>
  );
}

// ─── Best Performer Award ───
export function ProjectAwardCert({
  participantName, projectTitle, rank, finalScore, awardCategory, certId, issueDate, evaluationUrl,
}: {
  participantName: string; projectTitle: string; rank: string; finalScore: number;
  awardCategory: string; certId: string; issueDate: string; evaluationUrl: string;
}) {
  const qrSvg = renderToString(<QRCodeSVG value={evaluationUrl} size={64} />);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.frameOuter} />
        <View style={s.frameInner} />
        <View style={s.topBand} />
        <View style={s.bottomBand} />

        <View style={s.logoContainer}>
          <Image src={logo} style={s.logo} />
        </View>
        <Text style={s.brandLine}>{COMPANY.name.toUpperCase()}</Text>
        <Text style={s.subtitle}>{COMPANY.tagline}</Text>

        <View style={{ borderTopWidth: 0.5, borderColor: C.border, marginHorizontal: 40, marginBottom: 12 }} />

        <Text style={s.title}>Best Performer Award</Text>
        <Text style={{ ...s.title, fontSize: 9, color: "#f59e0b", marginBottom: 8 }}>Skyrovix Real-World Project Challenge</Text>

        <Text style={s.certText}>Awarded to</Text>
        <Text style={s.name}>{participantName}</Text>
        <Text style={s.certText}>for outstanding performance in</Text>
        <Text style={{ ...s.name, fontSize: 13 }}>{projectTitle}</Text>

        <View style={s.detailRow}>
          <Text style={s.detailLabel}>Rank:</Text>
          <Text style={s.detailValue}>{rank}</Text>
        </View>
        <View style={s.detailRow}>
          <Text style={s.detailLabel}>Category:</Text>
          <Text style={s.detailValue}>{awardCategory}</Text>
        </View>
        <View style={s.detailRow}>
          <Text style={s.detailLabel}>Final Score:</Text>
          <Text style={s.detailValue}>{finalScore}/100</Text>
        </View>

        <View style={s.footer}>
          <View style={s.signatureArea}>
            <Image src={seal} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 5, color: C.muted, marginTop: 2 }}>Digital Seal</Text>
          </View>
          <View style={s.signatureArea}>
            <Image src={sigFounder} style={s.signature} />
            <Text style={s.signLabel}>{COMPANY.founder.name}</Text>
            <Text style={{ ...s.signLabel, fontSize: 5 }}>{COMPANY.founder.title}</Text>
          </View>
        </View>

        <View style={{ position: "absolute", bottom: 48, left: 24, right: 24, flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 5, color: C.muted }}>Issue Date: {issueDate}</Text>
        </View>

        <View style={{ position: "absolute", bottom: 8, left: 24, right: 24, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={s.certId}>Award ID: {certId}</Text>
          <Image source={{ data: `data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}` }} style={{ width: 28, height: 28 }} />
        </View>
      </Page>
    </Document>
  );
}

export async function downloadPdfBlob(doc: React.ReactElement) {
  return pdf(doc).toBlob();
}

export async function downloadPdf(doc: React.ReactElement, filename: string) {
  const blob = await downloadPdfBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
