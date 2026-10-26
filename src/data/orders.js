import { delegates } from "./delegates";
import { products } from "./store";

export const orders = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-${String(i + 1).padStart(3, "0")}`,
  delegate: delegates[i].name,
  product: products[i % products.length].name,
  quantity: (i % 3) + 1,
  status: ["Pending", "Ready", "Collected"][i % 3],
  total: products[i % products.length].price * ((i % 3) + 1),
}));
