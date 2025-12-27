"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/common/components/atoms/button";
import { Check } from "lucide-react";

interface CategoryEditableTitleProps {
  title: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  showSaveButton: boolean;
  onSave: () => void;
}

export const CategoryTitle: React.FC<CategoryEditableTitleProps> = ({
  title,
  onChange,
  onFocus,
  onBlur,
  showSaveButton,
  onSave,
}) => {
  return (
    <div className="flex items-center flex-1 gap-2">
      {/* ==================== INPUT EDITABLE ==================== */}
      <input
        type="text"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex-1 min-w-0 p-1 font-semibold text-slate-700 bg-transparent border-b border-transparent focus:outline-none focus:border-orange-300 transition-colors truncate"
        maxLength={40}
        placeholder="Nombre de categoría"
      />

      {/* ==================== BOTÓN DE GUARDAR ANIMADO ==================== */}
      <AnimatePresence>
        {showSaveButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1], // Curva de animación suave
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition"
              onMouseDown={(e) => {
                e.preventDefault(); // ⚠️ CRÍTICO: Evita que se dispare onBlur del input
                onSave();
              }}
              type="button"
            >
              <Check className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};