import { useState } from "react";
import CodeDisplay from "./CodeDisplay";
import EditableFields from "./EditableFields";
import TutorialSteps from "./TutorialSteps";
import PackagesInfo from "./PackagesInfo";
import SubTabSelector from "./SubTabSelector";
import CodeTabs from "./CodeTabs";

export interface TutorialStep {
  stepName: string;
  stepDescription: string;
  editableFields?: EditableField[]; // Step-specific editable fields
  lineRange?: LineRange; // Line range for this step
}

export interface LineRange {
  start: number;
  end: number;
}

export interface PackageInfo {
  name: string;
  description: string;
  version: string;
  purpose: string;
  installation: string;
  documentation: string;
}

export interface SubTabData {
  id: string;
  label: string;
  tutorialSteps: TutorialStep[];
  codeExample: string;
  codeTabs?: CodeTabData[]; // Optional code tabs for showing different files
}

export interface CodeTabData {
  id: string;
  label: string;
  language: string;
  filename: string;
  content: string;
}

export interface EditableField {
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  targetPattern: string; // Regex pattern to find the text to replace
  lineRange?: LineRange; // Optional: specific line range where this field applies
  description?: string; // Optional: description of what this field does
  type?: "text" | "dropdown" | "checkbox"; // Input type - defaults to 'text'
  options?: string[]; // Options for dropdown or checkbox type
  defaultSelectedOptions?: string[]; // For checkbox type - which options are selected by default
}

interface CodeTutorialProps {
  title: string;
  description: string;
  codeExample: string;
  tutorialSteps: TutorialStep[];
  demoSection?: React.ReactNode;
  packagesInfo?: PackageInfo[];
  subTabs?: SubTabData[];
  editableFields?: EditableField[];
  codeTabs?: CodeTabData[]; // Optional code tabs for showing different files
}

export default function CodeTutorial({
  title,
  description,
  codeExample,
  tutorialSteps,
  demoSection,
  packagesInfo,
  subTabs,
  editableFields,
  codeTabs,
}: CodeTutorialProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [clickedStep, setClickedStep] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"steps" | "packages">("steps");
  const [activeSubTab, setActiveSubTab] = useState<string>(
    subTabs?.[0]?.id || ""
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};

    // Add global editable fields
    editableFields?.forEach((field) => {
      if (field.type === "checkbox" && field.defaultSelectedOptions) {
        initialValues[field.id] = field.defaultSelectedOptions.join(",");
      } else {
        initialValues[field.id] = field.defaultValue;
      }
    });

    // Add step-specific editable fields
    tutorialSteps?.forEach((step) => {
      step.editableFields?.forEach((field) => {
        if (field.type === "checkbox" && field.defaultSelectedOptions) {
          initialValues[field.id] = field.defaultSelectedOptions.join(",");
        } else {
          initialValues[field.id] = field.defaultValue;
        }
      });
    });

    // Add sub-tab step-specific editable fields
    subTabs?.forEach((subTab) => {
      subTab.tutorialSteps?.forEach((step) => {
        step.editableFields?.forEach((field) => {
          if (field.type === "checkbox" && field.defaultSelectedOptions) {
            initialValues[field.id] = field.defaultSelectedOptions.join(",");
          } else {
            initialValues[field.id] = field.defaultValue;
          }
        });
      });
    });

    return initialValues;
  });

  // Function to apply field values to code
  const applyFieldValues = (code: string, steps: TutorialStep[]) => {
    let updatedCode = code;

    // Apply global editable fields
    editableFields?.forEach((field) => {
      let value = fieldValues[field.id] || field.defaultValue;

      // Format checkbox values for wallet IDs
      if (field.type === "checkbox" && field.id === "wallets") {
        const selectedOptions = value.split(",").filter(Boolean);
        value = selectedOptions.join(",\n    ");
      }

      const regex = new RegExp(field.targetPattern, "g");
      updatedCode = updatedCode.replace(regex, value);
    });

    // Apply step-specific editable fields
    steps?.forEach((step) => {
      step.editableFields?.forEach((field) => {
        let value = fieldValues[field.id] || field.defaultValue;

        // Format checkbox values for wallet IDs
        if (field.type === "checkbox" && field.id === "wallets") {
          const selectedOptions = value.split(",").filter(Boolean);
          value = selectedOptions.join(",\n    ");
        }

        const regex = new RegExp(field.targetPattern, "g");
        updatedCode = updatedCode.replace(regex, value);
      });
    });

    return updatedCode;
  };

  // Get current data based on active sub-tab
  const getCurrentData = () => {
    if (subTabs && activeSubTab) {
      const subTab = subTabs.find((tab) => tab.id === activeSubTab);
      if (subTab) {
        const ranges = subTab.tutorialSteps.map(
          (step) => step.lineRange || { start: 1, end: 1 }
        );
        return {
          steps: subTab.tutorialSteps,
          code: applyFieldValues(subTab.codeExample, subTab.tutorialSteps),
          ranges: ranges,
          codeTabs: subTab.codeTabs,
        };
      }
    }
    const ranges = tutorialSteps.map(
      (step) => step.lineRange || { start: 1, end: 1 }
    );
    return {
      steps: tutorialSteps,
      code: applyFieldValues(codeExample, tutorialSteps),
      ranges: ranges,
      codeTabs: codeTabs,
    };
  };

  const currentData = getCurrentData();

  // Get all editable fields from steps
  const getAllStepFields = () => {
    const stepFields: EditableField[] = [];

    // Add fields from current steps
    currentData.steps.forEach((step) => {
      if (step.editableFields) {
        stepFields.push(...step.editableFields);
      }
    });

    return stepFields;
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleStepClick = (stepIndex: number) => {
    if (clickedStep === stepIndex) {
      // If clicking the same step, toggle it off
      setClickedStep(null);
    } else {
      // Otherwise, set the new clicked step
      setClickedStep(stepIndex);
    }
    // Reset copy success message when switching steps
    setCopySuccess(false);
  };

  // Function to extract selected lines from code
  const getSelectedCode = () => {
    if (clickedStep === null) return "";

    const range = currentData.ranges[clickedStep];
    if (!range) return "";

    const lines = currentData.code.split("\n");
    const selectedLines = lines.slice(range.start - 1, range.end);
    return selectedLines.join("\n");
  };

  // Function to copy selected code to clipboard
  const handleCopyCode = async () => {
    const selectedCode = getSelectedCode();
    if (!selectedCode) return;

    try {
      await navigator.clipboard.writeText(selectedCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl text-brand-blue-primary font-bold my-5">
          {title}
        </h2>
        <p className="text-brand-blue-primary/60">{description}</p>
      </div>

      {/* Demo Section (optional) */}
      {demoSection && demoSection}

      {/* Code Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-2 border-brand-blue-primary rounded-md bg-brand-blue-secondary">
        {/* Explanation */}
        <div className="h-screen overflow-scroll rounded-md">
          <div className="bg-brand-blue-secondary  text-white border-b-2 border-brand-blue-primary">
            <div className="flex">
              <button
                onClick={() => setActiveTab("steps")}
                className={`px-4 py-3 font-bold transition-colors ${
                  activeTab === "steps"
                    ? "bg-brand-blue-primary text-white"
                    : "bg-brand-blue-secondary text-brand-blue-primary hover:bg-brand-blue-primary/80 hover:text-white"
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => setActiveTab("packages")}
                className={`px-4 py-3 font-bold transition-colors ${
                  activeTab === "packages"
                    ? "bg-brand-blue-primary text-white"
                    : "bg-brand-blue-secondary text-brand-blue-primary hover:bg-brand-blue-primary/80 hover:text-white"
                }`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Steps Tab Content */}
          {activeTab === "steps" && (
            <div className="p-4 bg-brand-blue-secondary/50">
              {/* Sub-tabs for ARC standards if available */}
              <SubTabSelector
                subTabs={subTabs || []}
                activeSubTab={activeSubTab}
                onSubTabChange={setActiveSubTab}
              />

              {/* Editable Fields */}
              {editableFields && editableFields.length > 0 && (
                <EditableFields
                  fields={editableFields}
                  fieldValues={fieldValues}
                  onFieldChange={handleFieldChange}
                  variant="global"
                />
              )}

              <TutorialSteps
                steps={currentData.steps}
                hoveredStep={hoveredStep}
                clickedStep={clickedStep}
                stepLineRanges={currentData.ranges}
                fieldValues={fieldValues}
                onStepHover={setHoveredStep}
                onStepClick={handleStepClick}
                onFieldChange={handleFieldChange}
              />
            </div>
          )}

          {/* Packages Tab Content */}
          {activeTab === "packages" && (
            <PackagesInfo packagesInfo={packagesInfo} />
          )}
        </div>

        {/* Code Snippet */}
        <div className="col-span-2">
          {currentData.codeTabs && currentData.codeTabs.length > 0 ? (
            <CodeTabs
              tabs={currentData.codeTabs}
              fieldValues={fieldValues}
              editableFields={[
                ...(editableFields || []),
                ...getAllStepFields(),
              ]}
              hoveredStep={hoveredStep}
              clickedStep={clickedStep}
              stepLineRanges={currentData.ranges}
              onCopyCode={handleCopyCode}
              copySuccess={copySuccess}
            />
          ) : (
            <CodeDisplay
              code={currentData.code}
              hoveredStep={hoveredStep}
              clickedStep={clickedStep}
              stepLineRanges={currentData.ranges}
              copySuccess={copySuccess}
              onCopyCode={handleCopyCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
