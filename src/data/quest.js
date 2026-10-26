export const stations = Array.from({ length: 12 }, (_, i) => ({
  id: "STN-" + String(i + 1).padStart(3, "0"),
  name: [
    "Welcome Desk",
    "Main Hall",
    "Mediterranean Lounge",
    "Taurus Workshop",
    "Global Village",
    "Turkish Culture Corner",
    "Exchange Hub",
    "LC Growth Lab",
    "Merch Corner",
    "Garden Terrace",
    "Closing Hall",
    "Conference Desk",
  ][i],
  points: 25 + (i % 3) * 25,
}));
export const rewards = [
  ["Sticker Pack", 100],
  ["Conference Bracelet", 250],
  ["EUROXPRO Tote Bag", 500],
  ["Limited Edition Pin", 150],
  ["Coffee Voucher", 200],
  ["Culture Night Keepsake", 350],
].map((x, i) => ({ id: "r" + i, name: x[0], points: x[1] }));
