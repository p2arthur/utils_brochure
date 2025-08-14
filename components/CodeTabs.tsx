import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeTabData, EditableField, LineRange } from "./CodeTutorial";

interface CodeTabsProps {
  tabs: CodeTabData[];
  defaultTab?: string;
  fieldValues?: Record<string, string>;
  editableFields?: EditableField[];
  // Step highlighting props (optional)
  hoveredStep?: number | null;
  clickedStep?: number | null;
  stepLineRanges?: LineRange[];
  onCopyCode?: () => void;
  copySuccess?: boolean;
}

export default function CodeTabs({
  tabs,
  defaultTab,
  fieldValues,
  editableFields,
  hoveredStep,
  clickedStep,
  stepLineRanges,
  onCopyCode,
  copySuccess = false,
}: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");
  const [internalCopySuccess, setInternalCopySuccess] = useState(false);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  // Check if current tab should have step highlighting (main/primary tab)
  const shouldHighlightSteps = (tabId: string) => {
    return tabId === "main" || tabId === "primary" || tabId === tabs[0]?.id;
  };

  // Function for lineProps that works with react-syntax-highlighter (only for main tab)
  const getLineProps = (lineNumber: number) => {
    if (!shouldHighlightSteps(activeTab) || !stepLineRanges) return {};

    // Prioritize clicked step over hovered step
    const activeStep = clickedStep !== null ? clickedStep : hoveredStep;

    if (activeStep === null || activeStep === undefined) return {};

    const range = stepLineRanges[activeStep];
    if (range && lineNumber >= range.start && lineNumber <= range.end) {
      // Use different colors for clicked vs hovered
      const backgroundColor = clickedStep !== null ? "#fbbf24" : "#fef3c7"; // orange for clicked, light yellow for hover

      return {
        style: {
          backgroundColor,
          display: "block",
          margin: "0 -1rem",
          padding: "0 1rem",
          borderRadius: "2px",
          transition: "background-color 0.2s ease",
        },
      };
    }
    return {};
  };

  // Apply field values to the content
  const applyFieldValues = (content: string) => {
    if (!fieldValues || !editableFields) return content;

    let updatedContent = content;

    editableFields.forEach((field) => {
      let value = fieldValues[field.id] || field.defaultValue;

      // Format checkbox values for wallet IDs
      if (field.type === "checkbox" && field.id === "wallets") {
        const selectedOptions = value.split(",").filter(Boolean);
        value = selectedOptions.join(",\n    ");
      }

      const regex = new RegExp(field.targetPattern, "g");
      updatedContent = updatedContent.replace(regex, value);
    });

    return updatedContent;
  };

  const handleCopyCode = async () => {
    if (!activeTabData) return;

    // If external copy handler is provided, use it
    if (onCopyCode) {
      onCopyCode();
      return;
    }

    // Otherwise, handle copy internally
    try {
      const processedContent = applyFieldValues(activeTabData.content);
      await navigator.clipboard.writeText(processedContent);
      setInternalCopySuccess(true);
      setTimeout(() => setInternalCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className="bg-brand-secondary/50">
      {/* Tab Headers */}
      <div className="bg-brand-blue-secondary rounded-t-md overflow-hidden text-white border-b-2 border-brand-blue-primary">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-bold transition-colors border-r border-gray-600 last:border-r-0 ${
                activeTab === tab.id
                  ? "bg-brand-blue-primary text-white" // Use custom color for active tab
                  : "bg-brand-blue-secondary text-black hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.label}</span>
                {tab.filename && (
                  <span className="text-xs opacity-75">({tab.filename})</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTabData && (
        <div className="p-0 bg-gray-50 relative">
          {/* Copy button - show step-specific copy for main tab when step is selected, otherwise show full file copy */}
          {shouldHighlightSteps(activeTab) &&
          clickedStep !== null &&
          clickedStep !== undefined &&
          stepLineRanges &&
          clickedStep < stepLineRanges.length ? (
            <button
              onClick={handleCopyCode}
              className={`absolute top-2 right-2 z-10 px-3 py-2 text-xs font-medium rounded-md shadow-md transition-all duration-200 ${
                copySuccess
                  ? "bg-green-500 text-white"
                  : "bg-white/50 border-2 border-orange-400 text-orange-600 hover:bg-orange-50"
              }`}
              title={`Copy lines ${stepLineRanges[clickedStep]?.start}-${stepLineRanges[clickedStep]?.end}`}
            >
              {copySuccess ? (
                <span className="flex items-center gap-1">
                  <span>✓</span>
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span>📋</span>
                  <span>Copy code snippet</span>
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={handleCopyCode}
              className={`absolute top-2 right-2 z-10 px-3 py-2 text-xs font-medium rounded-md shadow-md transition-all duration-200 ${
                copySuccess || internalCopySuccess
                  ? "bg-green-500 text-white"
                  : "bg-white/50 border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
              }`}
              title={`Copy ${activeTabData.filename || activeTabData.label}`}
            >
              {copySuccess || internalCopySuccess ? (
                <span className="flex items-center gap-1">
                  <span>✓</span>
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span>📋</span>
                  <span>Copy {activeTabData.label}</span>
                </span>
              )}
            </button>
          )}

          <SyntaxHighlighter
            language={activeTabData.language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "#f9fafb",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              maxHeight: "100vh",
            }}
            showLineNumbers={true}
            wrapLines={true}
            lineProps={
              shouldHighlightSteps(activeTab) ? getLineProps : undefined
            }
          >
            {applyFieldValues(activeTabData.content)}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
