export const pct = (value, total) =>
  total ? Math.min(100, Math.round((value / total) * 100)) : 0;

export const money = (value) =>
  `€${Number(value || 0).toLocaleString("en-US")}`;

export function downloadCsv(filename, rows) {
  const csvContent = rows
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");
  const file = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
