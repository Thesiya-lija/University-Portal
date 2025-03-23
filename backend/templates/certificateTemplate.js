import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import moment from "moment";

export const generateCertificate = async (name, eventTitle, role) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", layout: "landscape" });

      const fileName = `${name.replace(/\s+/g, "_")}_${eventTitle}.pdf`;
      const filePath = path.join("certificates", fileName);
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);
      doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f8f8f8");

      doc.fontSize(30).fillColor("#333").text("Certificate of Achievement", { align: "center" });

      doc.moveDown(1);
      doc.fontSize(20).fillColor("#444").text(`This is awarded to`, { align: "center" });

      doc.moveDown(1);
      doc.fontSize(35).fillColor("#222").text(name, { align: "center" });

      doc.moveDown(0.5);
      doc.fontSize(20).fillColor("#666").text(`For outstanding performance in`, { align: "center" });

      doc.moveDown(0.5);
      doc.fontSize(25).fillColor("#000").text(eventTitle, { align: "center" });

      doc.moveDown(0.5);
      doc.fontSize(18).fillColor("#333").text(`Awarded as: ${role}`, { align: "center" });

      doc.moveDown(1);
      doc.fontSize(16).fillColor("#777").text(`Issued on: ${moment().format("MMMM D, YYYY")}`, { align: "center" });

      doc.moveDown(2);
      doc.fontSize(16).fillColor("#000").text("____________________", { align: "center" });
      doc.fontSize(14).fillColor("#444").text("Committee Head", { align: "center" });

      doc.end();

      writeStream.on("finish", () => resolve(filePath));
      writeStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
