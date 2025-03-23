import PDFDocument from "pdfkit";
import fs from "fs";

export const generateCertificate = (studentName, eventTitle) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    const filePath = `certificates/${studentName}_${eventTitle}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(30).text("Certificate of Participation", { align: "center" });
    doc.moveDown();
    doc.fontSize(20).text(`This certifies that`, { align: "center" });
    doc.fontSize(28).text(studentName, { align: "center" });
    doc.moveDown();
    doc.fontSize(20).text(`has participated in`, { align: "center" });
    doc.fontSize(24).text(eventTitle, { align: "center" });

    doc.end();

    doc.on('finish', () => resolve(filePath));
    doc.on('error', reject);
  });
};