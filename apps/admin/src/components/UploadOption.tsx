import React, { useState } from "react";
import { ArrowRight, ArrowDown, LucideIcon } from "lucide-react";
import useUploadFile from "../hooks/useUploadFile.tsx";

type TUploadOptionProps = {
  icon: LucideIcon;
  label: "FILE" | "LINK";
};

const labelMap: { [key: string]: string } = {
  FILE: "upload local file (PDF or DOCX)",
  LINK: "upload web link",
};

const UploadOption = ({
  icon: Icon,
  label,
}: TUploadOptionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"PDF" | "DOCX" | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { uploadFile, uploadLink, isLoading, error } = useUploadFile();

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFileName(selectedFile.name);
        setFileType("PDF");
        setFile(selectedFile);
      } else if (selectedFile.type === "application/haansoftdocx") {
        setFileName(selectedFile.name);
        setFileType("DOCX");
        setFile(selectedFile);
      } else {
        alert("Only PDF and DOCX files are allowed.");
        event.target.value = "";
        setFileName(null);
        setFileType(null);
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (label === "FILE" && file) {
      const success = await uploadFile(file);
      if (success) {
        console.log("File uploaded and embedded successfully");
        // 추가적인 성공 처리 로직
      } else {
        console.log("File upload or embedding failed");
        // 추가적인 실패 처리 로직
      }
    } else if (label === "LINK" && linkUrl) {
      const success = await uploadLink(linkUrl);
      if (success) {
        console.log("Link embedded successfully");
        // 추가적인 성공 처리 로직
      } else {
        console.log("Link embedding failed");
        // 추가적인 실패 처리 로직
      }
    }
  };

  const renderInput = () => {
    if (label === "FILE") {
      return (
        <div className="mt-2">
          {fileType && (
            <img
              src={`/file/${fileType}.svg`}
              alt={`${fileType} icon`}
              className="w-12 h-12 mb-2"
            />
          )}
          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".pdf,.docx,application/pdf,application/haansoftdocx"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition duration-300"
          >
            {fileName ? "Change File" : "Choose File"}
          </label>
          {fileName && <p className="mt-2 text-sm text-gray-600">{fileName}</p>}
          <p className="mt-2 text-xs text-gray-500">
            Allowed file types: PDF, DOCX
          </p>
        </div>
      );
    } else if (label === "LINK") {
      return (
        <input
          type="text"
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Enter URL"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-2 shadow-sm">
      <div
        className="flex items-center gap-4 px-4 min-h-14 justify-between cursor-pointer hover:bg-gray-50"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-4">
          <div className="text-gray-600 flex items-center justify-center rounded-lg bg-gray-100 shrink-0 w-10 h-10">
            <Icon size={24} />
          </div>
          <p className="text-gray-700 text-base font-normal leading-normal flex-1 truncate">
            {labelMap[label]}
          </p>
        </div>
        <div className="shrink-0">
          {isOpen ? (
            <ArrowDown className="text-gray-600 w-7 h-7" />
          ) : (
            <ArrowRight className="text-gray-600 w-7 h-7" />
          )}
        </div>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          {renderInput()}
          <button
            type="submit"
            className="mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition duration-300 border border-gray-300"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default UploadOption;
