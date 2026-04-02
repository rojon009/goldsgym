"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircleCheck, Phone, X } from "lucide-react";

import { contact } from "@/lib/content";
import { CartoonButton } from "@/components/ui/cartoon-button";
import { BrandMark } from "./BrandMark";

type JoinModalProps = {
  open: boolean;
  onClose: () => void;
};

export function JoinModal({ open, onClose }: JoinModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-title"
          onClick={onClose}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="relative w-full max-w-md rounded-xl border border-primary/35 bg-background-elevated p-6 shadow-2xl shadow-primary/10"
            onClick={(e) => e.stopPropagation()}
            initial={
              reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.99 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close join modal"
            >
              <X className="size-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <BrandMark
                iconClassName="size-12"
                titleClassName="text-2xl"
                wrapClassName="gap-2"
                iconWrapClassName="p-0"
              />
              <h3
                id="join-modal-title"
                className="mt-4 text-3xl font-black uppercase tracking-tight text-white"
              >
                Join Us
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Our team is ready to help you get started.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-center">
                <CartoonButton
                  color="bg-primary"
                  onClick={() => {
                    window.location.href = `tel:${contact.phone.replace(/\s+/g, "")}`;
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="size-4" />
                    Call Now
                  </div>
                </CartoonButton>
              </div>
              <div className="flex items-center gap-3 py-1 text-white/45">
                <div className="h-px flex-1 bg-white/15" />
                <span className="text-xs font-bold tracking-[0.3em]">OR</span>
                <div className="h-px flex-1 bg-white/15" />
              </div>
              <div className="flex justify-center">
                <CartoonButton
                  label="Leave a Message"
                  color="bg-primary"
                  onClick={() => {
                    window.open(
                      `https://wa.me/${contact.phone.replace(/[^\d]/g, "")}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircleCheck className="size-4" />
                    Leave a Message
                  </div>
                </CartoonButton>
              </div>
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-white/60">
              Phone: {contact.phone}
              <br />
              Email: {contact.email}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
