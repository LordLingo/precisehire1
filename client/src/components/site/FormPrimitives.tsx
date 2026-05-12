/*
 * PreciseHire — Form primitives shared by /get-a-quote, /talk-to-an-expert, /contact.
 * Style: Trusted Modernism. Navy text, cream surface, coral focus + submit.
 */
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const inputBase =
  "mt-2 w-full rounded-xl border border-[#0B1F3A]/15 bg-white px-4 py-3 text-[15px] text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus:outline-none focus:border-[#B7232A] focus:ring-2 focus:ring-[#B7232A]/20";

export function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#0B1F3A]/85">
        {label}
        {required && <span className="text-[#B7232A]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className={inputBase}
      />
    </label>
  );
}

export function TextareaField({
  name,
  label,
  required,
  rows = 4,
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#0B1F3A]/85">
        {label}
        {required && <span className="text-[#B7232A]"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputBase}
      />
    </label>
  );
}

export function SelectField({
  name,
  label,
  options,
  required,
  defaultValue = "",
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#0B1F3A]/85">
        {label}
        {required && <span className="text-[#B7232A]"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={inputBase}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxGroup({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-[#0B1F3A]/85">{label}</legend>
      <div className="mt-3 grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
        {options.map((opt) => (
          <label
            key={opt}
            className="inline-flex items-center gap-2.5 text-[14px] text-[#0B1F3A]/80 cursor-pointer"
          >
            <input
              type="checkbox"
              name={name}
              value={opt}
              className="size-4 rounded border-[#0B1F3A]/30 text-[#B7232A] focus:ring-[#B7232A]/30"
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Honeypot() {
  return (
    <input
      type="text"
      name="_gotcha"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-5000px", height: 0, width: 0, opacity: 0 }}
    />
  );
}
