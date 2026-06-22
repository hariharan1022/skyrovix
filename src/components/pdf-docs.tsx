import { Document, Page, Text, View, StyleSheet, Image, pdf, type DocumentProps } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import logo from "@/assets/logo.jpg";
import seal from "@/assets/seal.jpg";
import msme from "@/assets/msme.png";
import sigFounder from "@/assets/sig-founder.jpg";
import sigCofounder from "@/assets/sig-cofounder.jpg";
import { COMPANY } from "@/lib/constants";

const COLOR = { brand: "#7c3aed", ink: "#1e293b", muted: "#64748b", border: "#e2e8f0" };

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: COLOR.ink, fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLOR.border },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  brand: { fontSize: 15, fontWeight: 700, color: COLOR.brand },
  small: { fontSize: 8, color: COLOR.muted, marginTop: 1 },
  refBox: { alignItems: "flex-end" },
  refLabel: { fontSize: 7, color: COLOR.muted },
  refValue: { fontSize: 10, fontWeight: 700 },
  title: { fontSize: 20, fontWeight: 700, color: COLOR.brand, marginBottom: 20 },
  greeting: { fontSize: 12, marginBottom: 12 },
  p: { lineHeight: 1.6, marginBottom: 10, color: "#334155" },
  bold: { fontWeight: 700 },
  table: { marginVertical: 14, borderTopWidth: 1, borderTopColor: COLOR.border },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: COLOR.border, paddingVertical: 6 },
  key: { width: 120, fontSize: 10, color: COLOR.muted },
  val: { fontSize: 10, fontWeight: 700 },
  sigRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  sigBlock: { alignItems: "center", width: 160 },
  sigImg: { height: 36, marginBottom: 2 },
  sigLine: { borderTopWidth: 1, borderTopColor: COLOR.ink, width: "100%", marginBottom: 3 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: COLOR.border, paddingTop: 8 },
  footerText: { fontSize: 7, color: COLOR.muted },
});

export function OfferLetterDoc({ fullName, internId, domain, issuedAt }: { fullName: string; internId: string; domain: string; issuedAt: string }) {
  const date = new Date(issuedAt);
  const dateStr = date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const domainName = domain.charAt(0).toUpperCase() + domain.slice(1);
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Image src={logo} style={{ width: 40, height: 40 }} />
            <View>
              <Text style={s.brand}>{COMPANY.name}</Text>
              <Text style={s.small}>MSME Registered · {COMPANY.website}</Text>
            </View>
          </View>
          <View style={s.refBox}>
            <Text style={s.refLabel}>{internId}</Text>
            <Text style={[s.refValue, { marginTop: 2 }]}>{dateStr}</Text>
          </View>
        </View>

        <Text style={s.title}>Offer Letter</Text>

        <Text style={s.greeting}>Dear <Text style={s.bold}>{fullName}</Text>,</Text>
        <Text style={s.p}>
          We are pleased to offer you a virtual internship at <Text style={s.bold}>{COMPANY.name}</Text>. Your dedication and skills stood out during the selection process, and we look forward to having you on the team.
        </Text>

        <View style={s.table}>
          <View style={s.row}><Text style={s.key}>Full Name</Text><Text style={s.val}>{fullName}</Text></View>
          <View style={s.row}><Text style={s.key}>Intern ID</Text><Text style={s.val}>{internId}</Text></View>
          <View style={s.row}><Text style={s.key}>Domain</Text><Text style={s.val}>{domainName}</Text></View>
          <View style={s.row}><Text style={s.key}>Duration</Text><Text style={s.val}>1 Month</Text></View>
          <View style={s.row}><Text style={s.key}>Start Date</Text><Text style={s.val}>{dateStr}</Text></View>
          <View style={s.row}><Text style={s.key}>Mode</Text><Text style={s.val}>Remote</Text></View>
        </View>

        <Text style={s.p}>
          You will complete <Text style={s.bold}>5 tasks</Text> under your domain. Upon successful completion, you will receive a <Text style={s.bold}>Certificate of Internship</Text> with a unique verification ID.
        </Text>
        <Text style={s.p}>
          Welcome to {COMPANY.shortName}. We are excited to see you build and grow.
        </Text>

        <View style={s.sigRow}>
          <View style={s.sigBlock}>
            <Image src={sigFounder} style={s.sigImg} />
            <View style={s.sigLine} />
            <Text style={s.bold}>{COMPANY.founder.name}</Text>
            <Text style={s.small}>{COMPANY.founder.title}</Text>
          </View>
          <View style={s.sigBlock}>
            <Image src={seal} style={{ width: 70, height: 70, opacity: 0.8 }} />
          </View>
          <View style={s.sigBlock}>
            <Image src={sigCofounder} style={s.sigImg} />
            <View style={s.sigLine} />
            <Text style={s.bold}>{COMPANY.cofounder.name}</Text>
            <Text style={s.small}>{COMPANY.cofounder.title}</Text>
          </View>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>UDYAM-TN-17-0076606</Text>
          <Text style={s.footerText}>{COMPANY.email}</Text>
          <Text style={s.footerText}>{COMPANY.website}</Text>
        </View>
      </Page>
    </Document>
  );
}

export function CertificateDoc({ fullName, internId, domain, certId, issuedAt, verifyUrl }: { fullName: string; internId: string; domain: string; certId: string; issuedAt: string; verifyUrl: string }) {
  const date = new Date(issuedAt);
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ ...s.page, padding: 28 }}>
        <View style={{ borderWidth: 6, borderColor: COLOR.brand, padding: 24, height: "100%" }}>
          <View style={{ borderWidth: 1, borderColor: COLOR.border, padding: 24, height: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Image src={logo} style={{ width: 56, height: 56 }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: COLOR.muted, letterSpacing: 4 }}>SKYROVIX IT SOLUTIONS</Text>
                <Text style={{ fontSize: 10, color: COLOR.muted }}>{COMPANY.tagline}</Text>
              </View>
              <Image src={msme} style={{ height: 40 }} />
            </View>

            <View style={{ alignItems: "center", marginTop: 18 }}>
              <Text style={{ fontSize: 36, fontWeight: 700, color: COLOR.brand, letterSpacing: 4 }}>CERTIFICATE</Text>
              <Text style={{ fontSize: 12, color: COLOR.muted, letterSpacing: 8, marginTop: 2 }}>OF INTERNSHIP COMPLETION</Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 28 }}>
              <Text style={{ fontSize: 11, color: COLOR.muted }}>This certificate is proudly presented to</Text>
              <Text style={{ fontSize: 32, fontWeight: 700, marginTop: 12, marginBottom: 12, color: COLOR.ink }}>{fullName}</Text>
              <Text style={{ fontSize: 11, color: COLOR.muted, textAlign: "center", maxWidth: 600, lineHeight: 1.6 }}>
                for successfully completing the task-based virtual internship program in
                {" "}<Text style={{ fontWeight: 700, color: COLOR.ink }}>{domain}</Text>{" "}
                at Skyrovix IT Solutions, demonstrating dedication, technical skill, and professional excellence throughout the program.
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 40 }}>
              <View style={s.sigBlock}>
                <Image src={sigFounder} style={s.sigImg} />
                <View style={s.sigLine} />
                <Text style={s.bold}>{COMPANY.founder.name}</Text>
                <Text style={s.small}>{COMPANY.founder.title}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image src={seal} style={{ width: 90, height: 90, opacity: 0.9 }} />
              </View>
              <View style={s.sigBlock}>
                <Image src={sigCofounder} style={s.sigImg} />
                <View style={s.sigLine} />
                <Text style={s.bold}>{COMPANY.cofounder.name}</Text>
                <Text style={s.small}>{COMPANY.cofounder.title}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, fontSize: 9, color: COLOR.muted }}>
              <Text>Certificate ID: {certId}</Text>
              <Text>Intern ID: {internId}</Text>
              <Text>Issued: {date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</Text>
            </View>
            <Text style={{ fontSize: 8, color: COLOR.muted, marginTop: 4, textAlign: "center" }}>Verify at: {verifyUrl}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function CourseCertificateDoc({ fullName, courseName, score, total, certId, issuedAt, verifyUrl }: {
  fullName: string; courseName: string; score: number; total: number;
  certId: string; issuedAt: string; verifyUrl: string;
}) {
  const date = new Date(issuedAt);
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ ...s.page, padding: 28 }}>
        <View style={{ borderWidth: 6, borderColor: COLOR.brand, padding: 24, height: "100%" }}>
          <View style={{ borderWidth: 1, borderColor: COLOR.border, padding: 24, height: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Image src={logo} style={{ width: 56, height: 56 }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: COLOR.muted, letterSpacing: 4 }}>SKYROVIX IT SOLUTIONS</Text>
                <Text style={{ fontSize: 10, color: COLOR.muted }}>{COMPANY.tagline}</Text>
              </View>
              <Image src={msme} style={{ height: 40 }} />
            </View>

            <View style={{ alignItems: "center", marginTop: 18 }}>
              <Text style={{ fontSize: 36, fontWeight: 700, color: COLOR.brand, letterSpacing: 4 }}>COURSE CERTIFICATE</Text>
              <Text style={{ fontSize: 12, color: COLOR.muted, letterSpacing: 8, marginTop: 2 }}>OF COMPLETION</Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 28 }}>
              <Text style={{ fontSize: 11, color: COLOR.muted }}>This certificate is awarded to</Text>
              <Text style={{ fontSize: 32, fontWeight: 700, marginTop: 12, marginBottom: 12, color: COLOR.ink }}>{fullName}</Text>
              <Text style={{ fontSize: 11, color: COLOR.muted, textAlign: "center", maxWidth: 600, lineHeight: 1.6 }}>
                for successfully completing the {" "}
                <Text style={{ fontWeight: 700, color: COLOR.ink }}>{courseName}</Text>{" "}
                course with a score of <Text style={{ fontWeight: 700, color: COLOR.ink }}>{score}/{total}</Text>,
                demonstrating proficiency and commitment to learning.
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 40 }}>
              <View style={s.sigBlock}>
                <Image src={sigFounder} style={s.sigImg} />
                <View style={s.sigLine} />
                <Text style={s.bold}>{COMPANY.founder.name}</Text>
                <Text style={s.small}>{COMPANY.founder.title}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image src={seal} style={{ width: 90, height: 90, opacity: 0.9 }} />
              </View>
              <View style={s.sigBlock}>
                <Image src={sigCofounder} style={s.sigImg} />
                <View style={s.sigLine} />
                <Text style={s.bold}>{COMPANY.cofounder.name}</Text>
                <Text style={s.small}>{COMPANY.cofounder.title}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, fontSize: 9, color: COLOR.muted }}>
              <Text>Certificate ID: {certId}</Text>
              <Text>Score: {score}/{total}</Text>
              <Text>Issued: {date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</Text>
            </View>
            <Text style={{ fontSize: 8, color: COLOR.muted, marginTop: 4, textAlign: "center" }}>Verify at: {verifyUrl}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function downloadPdf(doc: ReactElement<DocumentProps>, filename: string) {
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadPdfBlob(doc: ReactElement<DocumentProps>): Promise<Blob> {
  return pdf(doc).toBlob();
}
