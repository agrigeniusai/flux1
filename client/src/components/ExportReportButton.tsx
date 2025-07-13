import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { Point } from '../App';

interface Props {
  point: Point;
  start: string;
  end: string;
}

export default function ExportReportButton({ point, start, end }: Props) {
  const handleDownload = async () => {
    const mapEl = document.querySelector('.leaflet-container') as HTMLElement;
    if (!mapEl) return;

    const canvas = await html2canvas(mapEl, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Carbon Flux MRV Report', 14, 22);
    pdf.setFontSize(12);
    pdf.text(`Coordinates: ${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}`, 14, 30);
    pdf.text(`Date range: ${start} – ${end}`, 14, 38);
    pdf.addImage(imgData, 'PNG', 14, 50, 180, 100);
    pdf.save(`MRV-${start}-${end}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-auto flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 rounded px-4 py-2 text-sm"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
} 