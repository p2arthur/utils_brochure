import { EditableField } from "./CodeTutorial";

interface EditableFieldsProps {
  fields: EditableField[];
  fieldValues: Record<string, string>;
  onFieldChange: (fieldId: string, value: string) => void;
}

export default function EditableFields(props: EditableFieldsProps) {
  const { fields, fieldValues, onFieldChange } = props;
  const containerClasses =
    "bg-brand-blue-secondary text-brand-blue-primary rounded mb-4 p-1";
  const titleClasses = "font-semibold text-sm mb-3 text-brand-blue-primary";
  const labelClasses = "text-xs font-medium text-brand-blue-primary mb-1";
  const descriptionClasses = "text-xs text-brand-blue-primary/70 mb-1";
  const inputClasses =
    "px-2 py-1 text-sm border border-white rounded bg-brand-blue-primary text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-white/60";
  const checkboxClasses =
    "rounded border-white text-brand-blue-primary focus:ring-white focus:ring-1";
  const checkboxTextClasses = "text-brand-blue-primary";
  const title = "Customize Code Values:";

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
                      className="flex items-center gap-2 text-sm"
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
