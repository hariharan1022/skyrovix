import { Document, Page, Text, View, StyleSheet, Image, pdf, Font } from "@react-pdf/renderer";
import logo from "@/assets/logo.jpg";
import seal from "@/assets/seal.jpg";
import msme from "@/assets/msme.png";
import sigFounder from "@/assets/sig-founder.jpg";
import sigCofounder from "@/assets/sig-cofounder.jpg";
import { COMPANY } from "@/lib/constants";

const COLOR = { brand: "#7c3aed", ink: "#0f172a", muted: "#64748b", border: "#e2e8f0" };

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: COLOR.ink, fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 2, borderBottomColor: COLOR.brand, paddingBottom: 12, marginBottom: 20 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brand: { fontSize: 16, fontWeight: 700, color: COLOR.brand },
  small: { fontSize: 9, color: COLOR.muted },
  h1: { fontSize: 22, fontWeight: 700, marginBottom: 12, color: COLOR.brand, textAlign: "center" },
  p: { lineHeight: 1.6, marginBottom: 10 },
  bold: { fontWeight: 700 },
  sigRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  sigBlock: { width: 180, alignItems: "center" },
  sigImg: { height: 40, marginBottom: 4 },
  sigLine: { borderTopWidth: 1, borderTopColor: COLOR.ink, width: "100%", marginBottom: 4 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: COLOR.border, paddingTop: 8, fontSize: 8, color: COLOR.muted },
});

export function OfferLetterDoc({ fullName, internId, domain, issuedAt }: { fullName: string; internId: string; domain: string; issuedAt: string }) {
  const date = new Date(issuedAt);
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.logoRow}>
            <Image src={logo} style={{ width: 44, height: 44 }} />
            <View>
              <Text style={s.brand}>{COMPANY.shortName}</Text>
              <Text style={s.small}>{COMPANY.tagline}</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={s.small}>Ref: {internId}</Text>
            <Text style={s.small}>Date: {date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</Text>
          </View>
        </View>

        <Text style={s.h1}>INTERNSHIP OFFER LETTER</Text>

        <Text style={s.p}>Dear <Text style={s.bold}>{fullName}</Text>,</Text>
        <Text style={s.p}>
          Congratulations! We are pleased to offer you a virtual internship at <Text style={s.bold}>{COMPANY.name}</Text> in the domain of <Text style={s.bold}>{domain}</Text>.
          Your internship will follow our task-based curriculum, allowing you to build hands-on, portfolio-grade projects under our guidance.
        </Text>
        <Text style={s.p}>
          Your official <Text style={s.bold}>Intern ID</Text> is <Text style={s.bold}>{internId}</Text>. This ID will be referenced on your Digital ID Card,
          all task submissions, and your final certificate of completion.
        </Text>
        <Text style={s.p}>
          During the program you will complete 5 progressive tasks designed to develop real industry skills. Upon successful approval of all tasks and
          completion of formalities, you will be awarded a verifiable Certificate of Internship.
        </Text>
        <Text style={s.p}>We look forward to seeing you build the future with us.</Text>

        <View style={s.sigRow}>
          <View style={s.sigBlock}>
            <Image src={sigFounder} style={s.sigImg} />
            <View style={s.sigLine} />
            <Text style={s.bold}>{COMPANY.founder.name}</Text>
            <Text style={s.small}>{COMPANY.founder.title}</Text>
          </View>
          <View style={s.sigBlock}>
            <Image src={seal} style={{ width: 80, height: 80, opacity: 0.85 }} />
          </View>
          <View style={s.sigBlock}>
            <Image src={sigCofounder} style={s.sigImg} />
            <View style={s.sigLine} />
            <Text style={s.bold}>{COMPANY.cofounder.name}</Text>
            <Text style={s.small}>{COMPANY.cofounder.title}</Text>
          </View>
        </View>

        <View style={s.footer}>
          <Image src={msme} style={{ height: 26 }} />
          <Text>{COMPANY.email} · {COMPANY.website}</Text>
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

export async function downloadPdf(doc: React.ReactElement, filename: string) {
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
