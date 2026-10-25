"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart, type CartItem } from "@/lib/cart-context";
import { useContactSheet } from "@/lib/contact-sheet-context";
import { MAX_QTY, formatPrice, rawRooibos } from "@/lib/products";
import { announce, useDialog } from "@/lib/ui";
import { Icon } from "./Icons";

export function CartDrawer() {
  const { items, isOpen, subtotal, closeCart, updateQuantity, removeItem, addItem } = useCart();
  const { openContactSheet } = useContactSheet();
  const [removed, setRemoved] = useState<CartItem | null>(null);
  const undoTimer = useRef<number | undefined>(undefined);
  const undoRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useDialog(isOpen, closeCart, () => document.querySelector<HTMLElement>(".cart-btn"));

  useEffect(() => {
    if (!isOpen) setRemoved(null);
  }, [isOpen]);
  useEffect(() => () => window.clearTimeout(undoTimer.current), []);

  function change(item: CartItem, delta: number) {
    const next = item.quantity + delta;
    if (next < 1) {
      announce("Minimum is 1. Use Remove to take it out");
      return;
    }
    if (next > MAX_QTY) {
      announce("Need more? Ask about bulk");
      return;
    }
    updateQuantity(item.sizeId, next);
  }

  function remove(item: CartItem) {
    removeItem(item.sizeId);
    setRemoved(item);
    announce(`Removed ${item.label}.`);
    window.clearTimeout(undoTimer.current);
    undoTimer.current = window.setTimeout(() => setRemoved(null), 5000);
    window.setTimeout(() => undoRef.current?.focus(), 0);
  }

  function undo() {
    if (!removed) return;
    const size = rawRooibos.sizes.find((s) => s.id === removed.sizeId);
    if (size) addItem(size, removed.quantity);
    announce(`${removed.label} is back in your cart`);
    setRemoved(null);
  }

  // Close the cart first so dialogs never stack; focus then returns to the cart button.
  function askAboutBulk() {
    closeCart();
    window.setTimeout(openContactSheet, 200);
  }

  return (
    <dialog ref={dialogRef} className="drawer" aria-labelledby="cart-title">
      <div className="dlg">
        <div className="dlg-head">
          <h2 className="t-title" id="cart-title">Your cart</h2>
          <button type="button" className="close-btn" onClick={closeCart} aria-label="Close cart" autoFocus>
            <Icon name="close" />
          </button>
        </div>
        <div className="dlg-body">
          {items.length > 0 ? (
            <ul className="cart-lines">
              {items.map((item) => (
                <li className="line" key={item.sizeId}>
                  <div>
                    <p className="line-name">Raw Rooibos, {item.label}</p>
                    <p className="line-unit">{formatPrice(item.price)} each</p>
                  </div>
                  <p className="line-total">{formatPrice(item.price * item.quantity)}</p>
                  <div className="line-actions">
                    <div className="stepper stepper-md" role="group" aria-label={`Quantity of ${item.label}`}>
                      <button type="button" onClick={() => change(item, -1)} aria-label={`Decrease quantity of ${item.label}`}>−</button>
                      <output aria-live="polite">{item.quantity}</output>
                      <button type="button" onClick={() => change(item, 1)} aria-label={`Increase quantity of ${item.label}`}>+</button>
                    </div>
                    <button type="button" className="text-btn" onClick={() => remove(item)}>Remove</button>
                  </div>
                  {item.quantity >= MAX_QTY && (
                    <p className="limit line-limit">
                      <span>Need more?</span>
                      <button
                        type="button"
                        className="link link-sm"
                        data-event="bulk_open"
                        data-source="cart_limit"
                        onClick={askAboutBulk}
                      >
                        Ask about bulk<Icon name="arrow" />
                      </button>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <a className="btn btn-primary" href="/#shop">
                Shop the rooibos<Icon name="arrow" />
              </a>
            </div>
          )}
          {removed && (
            <div className="undo">
              <span>Removed {removed.label}.</span>
              <button ref={undoRef} type="button" className="text-btn" onClick={undo}>Undo</button>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="dlg-foot">
            <p className="subtotal"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
            <p className="note">Delivery cost confirmed by email before you pay.</p>
            <Link className="btn btn-primary btn-lg" href="/checkout" onClick={closeCart} data-event="checkout_click">
              Go to checkout<Icon name="arrow" />
            </Link>
          </div>
        )}
      </div>
    </dialog>
  );
}
