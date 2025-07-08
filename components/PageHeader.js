// components/PageHeader.js
import { cn } from "@/lib/utils"; 

export default function PageHeader({ title, description, className, children }) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      )}
      {children && (
        <div className="mt-4">
          {children} {/* For elements like buttons or additional content */}
        </div>
      )}
    </div>
  );
}