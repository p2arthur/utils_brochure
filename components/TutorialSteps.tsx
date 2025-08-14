import { TutorialStep, LineRange } from "./CodeTutorial";
import EditableFields from "./EditableFields";

interface TutorialStepsProps {
  steps: TutorialStep[];
  hoveredStep: number | null;
  clickedStep: number | null;
  stepLineRanges: LineRange[];
  fieldValues: Record<string, string>;
  onStepHover: (stepIndex: number | null) => void;
  onStepClick: (stepIndex: number) => void;
  onFieldChange: (fieldId: string, value: string) => void;
}

export default function TutorialSteps({
  steps,
  hoveredStep,
  clickedStep,
  stepLineRanges,
  fieldValues,
  onStepHover,
  onStepClick,
  onFieldChange,
}: TutorialStepsProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-600 mb-4">
        Hover or Click to highlight code sections
      </p>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg transition-all duration-200 cursor-pointer border-2 ${
            clickedStep === index
              ? "bg-orange-100 border-orange-300"
              : "hover:bg-yellow-50 hover:border-yellow-200 border-transparent"
          }`}
          onMouseEnter={() => onStepHover(index)}
          onMouseLeave={() => onStepHover(null)}
          onClick={() => onStepClick(index)}
        >
          <h4 className="font-bold mb-2 flex items-center gap-2">
            {index + 1} - {step.stepName}
            {clickedStep === index && (
              <span className="text-orange-600 text-sm">(Active)</span>
            )}
          </h4>
          <p className="text-sm text-gray-700">{step.stepDescription}</p>

          {/* Step-specific editable fields */}
          {step.editableFields && step.editableFields.length > 0 && (
            <EditableFields
              fields={step.editableFields}
              fieldValues={fieldValues}
              onFieldChange={onFieldChange}
              variant="step"
            />
          )}

          <p className="text-xs text-gray-500 mt-2">
            {clickedStep === index
              ? "Copy button appears next to the highlighted code"
              : "Click to pin this highlight"}
          </p>
          {clickedStep === index && (
            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
              <p className="font-medium text-orange-800">
                Lines {stepLineRanges[index].start}-{stepLineRanges[index].end}{" "}
                will be copied
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
