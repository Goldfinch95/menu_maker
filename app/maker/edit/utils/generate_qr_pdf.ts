import jsPDF from 'jspdf';

interface GenerateQrPdfOptions {
  qrImageBase64: string;
  menuName: string;
  menuId: number;
}

export const generateQrPdf = async ({
  qrImageBase64,
  menuName,
  menuId,
}: GenerateQrPdfOptions): Promise<void> => {
  // Crear un nuevo documento PDF (A4)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Configurar título
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(menuName, pageWidth / 2, 30, { align: 'center' });

  // Agregar subtítulo
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Escanea este código QR para ver nuestro menú', pageWidth / 2, 40, {
    align: 'center',
  });

  // Calcular dimensiones del QR (centrado)
  const qrSize = 120; // tamaño en mm
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = 60;

  // Agregar imagen del QR
  pdf.addImage(qrImageBase64, 'PNG', qrX, qrY, qrSize, qrSize);

  // Agregar footer
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `ID del menú: ${menuId}`,
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );

  // Generar nombre del archivo
  const fileName = `menu-qr-${menuId}-${Date.now()}.pdf`;

  // Descargar el PDF
  pdf.save(fileName);
};