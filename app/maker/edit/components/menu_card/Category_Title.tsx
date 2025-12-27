"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/common/components/atoms/button";
import { Check, AlertCircle } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CategoryFormData } from "../../utils/validate_category_form";

interface CategoryTitleProps {
  register: UseFormRegister<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  showSaveButton: boolean;
  onSave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isSubmitting: boolean;
}

export const CategoryTitle: React.FC<CategoryTitleProps> = ({
  register,
  errors,
  showSaveButton,
  onSave,
  onFocus,
  onBlur,
  isSubmitting,
}) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center flex-1 gap-2">
        {/* ==================== INPUT EDITABLE CON VALIDACIÓN ==================== */}
        <input
          type="text"
          {...register("title")}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`flex-1 min-w-0 p-1 font-semibold text-slate-700 bg-transparent border-b transition-colors truncate focus:outline-none ${
            errors.title
              ? "border-red-400 focus:border-red-500"
              : "border-transparent focus:border-orange-300"
          }`}
          maxLength={50}
          placeholder="Nombre de categoría"
          disabled={isSubmitting}
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
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition"
                onMouseDown={(e) => {
                  e.preventDefault(); // ⚠️ CRÍTICO: Evita que se dispare onBlur
                  onSave();
                }}
                type="button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== MENSAJE DE ERROR ==================== */}
      <AnimatePresence>
        {errors.title && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 mt-1 text-xs text-red-500"
          >
            <AlertCircle className="h-3 w-3" />
            <span>{errors.title.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};