import { Confirmation } from "@/app/context/ConfirmContext";

export function exportCSV(data: Confirmation[]) {
  const rows = [
    ["Nome", "Vai", "Adultos", "Crianças"],
    ...data.map((c) => [
      c.name,
      c.going ? "Sim" : "Não",
      c.adults,
      c.kids,
    ]),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "confirmacoes.csv";
  a.click();
}
