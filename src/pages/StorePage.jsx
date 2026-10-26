import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Btn } from '../components/ui';
import { Card } from '../components/ui';
import { Eyebrow } from '../components/ui';
import { Pill } from '../components/ui';
import { money } from '../utils/format';
import { useStore } from '../store/ConferenceContext';
import Modal from '../components/Modal';

export function Store() {
  const { s, u } = useStore();
  const [cart, setCart] = useState(false);
  const [ordersTab, setOrdersTab] = useState(false);
  return (
    <div className="section inner">
      <div className="pagehead">
        <div>
          <Eyebrow>THE CONFERENCE STORE</Eyebrow>
          <h1>
            A little piece of <em>Antalya.</em>
          </h1>
          <p>
            Reserve your conference keepsakes and collect them at the venue.
          </p>
        </div>
        {s.user && (
          <Btn kind="secondary" onClick={() => setOrdersTab(!ordersTab)}>
            {ordersTab ? "Shop products" : "My orders"}
          </Btn>
        )}
      </div>
      {ordersTab ? (
        <Card>
          <h2>My orders</h2>
          {s.orders
            .filter(
              (o) =>
                o.delegate === s.user?.name || s.user?.role === "Organiser",
            )
            .map((o) => (
              <div className="reviewrow" key={o.id}>
                <span>
                  {o.product} · {o.id}
                </span>
                <Pill>{o.status}</Pill>
              </div>
            ))}
        </Card>
      ) : (
        <>
          <div className="storebanner">
            <div>
              <Eyebrow>MADE FOR THE MOMENT</Eyebrow>
              <h2>
                Take the memories <em>with you.</em>
              </h2>
              <p>
                Conference colours and keepsakes from the Mediterranean.
                Reservation only, no online payment.
              </p>
            </div>
            {s.user ? (
              <Btn kind="secondary" onClick={() => setCart(true)}>
                <ShoppingBag /> Cart ({s.cart.length})
              </Btn>
            ) : (
              <Link className="btn outline" to="/login">
                <ShoppingBag /> Sign in to reserve
              </Link>
            )}
          </div>
          <div className="productgrid">
            {s.products.map((p) => (
              <Card key={p.id}>
                <div className="productart" style={{ "--c": p.color }}>
                  <div>
                    {p.name.toLowerCase().includes("shirt")
                      ? "T"
                      : p.name.toLowerCase().includes("tote")
                        ? "E27"
                        : "◉"}
                  </div>
                </div>
                <small>{p.category}</small>
                <h3>{p.name}</h3>
                <p>Collect at the conference venue</p>
                <div className="split">
                  <b>{money(p.price)}</b>
                  {s.user ? (
                    <Btn
                      disabled={p.stock === 0}
                      onClick={() =>
                        u((x) => ({
                          ...x,
                          cart: [
                            ...x.cart,
                            { ...p, cartId: Date.now() + Math.random() },
                          ],
                        }))
                      }
                    >
                      <Plus /> {p.stock === 0 ? "Out of stock" : "Reserve"}
                    </Btn>
                  ) : (
                    <Link className="btn" to="/login">Sign in to reserve</Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
      {cart && (
        <Modal title="Reservation cart" onClose={() => setCart(false)}>
            <p>Items are reserved for venue pickup. No online payment.</p>
            {s.cart.map((p) => (
              <div className="reviewrow" key={p.cartId}>
                <span>{p.name}</span>
                <b>{money(p.price)}</b>
                <button
                  onClick={() =>
                    u((x) => ({
                      ...x,
                      cart: x.cart.filter((y) => y.cartId !== p.cartId),
                    }))
                  }
                >
                  ×
                </button>
              </div>
            ))}
            <h3>Total {money(s.cart.reduce((a, p) => a + p.price, 0))}</h3>
            <Btn
              onClick={() => {
                u((x) => ({
                  ...x,
                  orders: [
                    ...x.orders,
                    ...x.cart.map((p, i) => ({
                      id: "ORD-" + Date.now() + i,
                      delegate: x.user?.name || "Delegate",
                      product: p.name,
                      quantity: 1,
                      total: p.price,
                      status: "Pending",
                    })),
                  ],
                  cart: [],
                }));
                setCart(false);
                setOrdersTab(true);
              }}
            >
              Reserve for venue pickup
            </Btn>
        </Modal>
      )}
    </div>
  );
}
