import { EditableField } from "./CodeTutorial";

interface EditableFieldsProps {
  fields: EditableField[];
  fieldValues: Record<string, string>;
  onFieldChange: (fieldId: string, value: string) => void;
  variant?: "global" | "step";
}

export default function EditableFields({
  fields,
  fieldValues,
  onFieldChange,
  variant = "global",
}: EditableFieldsProps) {
  const isStepVariant = variant === "step";
  const containerClasses = isStepVariant
    ? "mt-3 p-3 bg-blue-50 border border-blue-200 rounded"
    : "mb-4 p-3 bg-gray-50 border border-gray-300 rounded";
  const titleClasses = isStepVariant
    ? "font-semibold text-xs mb-2 text-blue-800"
    : "font-semibold text-sm mb-3 text-gray-700";
  const labelClasses = isStepVariant
    ? "text-xs font-medium text-blue-700 mb-1"
    : "text-xs font-medium text-gray-600 mb-1";
  const descriptionClasses = isStepVariant
    ? "text-xs text-blue-600 mb-1"
    : "text-xs text-gray-500 mb-1";
  const inputClasses = isStepVariant
    ? "px-2 py-1 text-xs border border-blue-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    : "px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const checkboxClasses = isStepVariant
    ? "rounded border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-1"
    : "rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-1";
  const checkboxTextClasses = isStepVariant ? "text-blue-700" : "text-gray-700";

  const title = isStepVariant
    ? "Configure this step:"
    : "Customize Code Values:";

  return (
    <div className={containerClasses}>
      <h4 className={titleClasses}>{title}</h4>
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label className={labelClasses}>{field.label}</label>
            {field.description && (
              <p className={descriptionClasses}>{field.description}</p>
            )}
            {field.type === "dropdown" ? (
              <select
                value={fieldValues[field.id] || field.defaultValue}
                onChange={(e) => onFieldChange(field.id, e.target.value)}
                className={inputClasses}
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div className="space-y-1">
                {field.options?.map((option) => {
                  const selectedOptions = (
                    fieldValues[field.id] ||
                    field.defaultValue ||
                    ""
                  )
                    .split(",")
                    .filter(Boolean);
                  const isChecked = selectedOptions.includes(option);

                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-2 ${
                        isStepVariant ? "text-xs" : "text-sm"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const currentSelected = (
                            fieldValues[field.id] ||
                            field.defaultValue ||
                            ""
                          )
                            .split(",")
                            .filter(Boolean);
                          let newSelected;

                          if (e.target.checked) {
                            newSelected = [...currentSelected, option];
                          } else {
                            newSelected = currentSelected.filter(
                              (item) => item !== option
                            );
                          }

                          onFieldChange(field.id, newSelected.join(","));
                        }}
                        className={checkboxClasses}
                      />
                      <span className={checkboxTextClasses}>{option}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <input
                type="text"
                value={fieldValues[field.id] || field.defaultValue}
                onChange={(e) => onFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={inputClasses}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
