export const products = [
  ["Wristband — Azure", 4, "#2F5BEA"],
  ["Wristband — Coral", 4, "#F28C38"],
  ["Wristband — Seafoam", 4, "#49B8AC"],
  ["EUROXPRO T-Shirt", 18, "#172033"],
  ["Mediterranean Tote Bag", 12, "#E8DCC7"],
  ["Enamel Pin", 6, "#F28C38"],
  ["Reusable Bottle", 14, "#49B8AC"],
  ["Notebook", 8, "#2F5BEA"],
  ["Bucket Hat", 16, "#F28C38"],
  ["Lanyard", 5, "#4A1C2B"],
].map((p, i) => ({
  id: "p" + i,
  name: p[0],
  price: p[1],
  color: p[2],
  category: i === 3 || i === 8 ? "Apparel" : "Accessories",
  stock: 60 + i * 7,
}));
