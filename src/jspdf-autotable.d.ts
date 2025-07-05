import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;

    // Add this:
    lastAutoTable?: {
      finalY: number;
    };
  }
}