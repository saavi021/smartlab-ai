import { useRef, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "";

function UploadCard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");
    setReport([]);

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please upload a PDF file only.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);
      setError("File size should be less than 10 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError("");
    setSuccess("");
    setReport([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please choose a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setReport([]);

    try {
      const token = localStorage.getItem("smartlab_token");

      if (!token) {
        setError("Please log in before uploading a report.");
        return;
      }

      const formData = new FormData();
      formData.append("report", selectedFile);

      const response = await fetch(`${API_URL}/api/reports/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log("Upload response:", data);

      if (!response.ok) {
        setError(data.message || "Failed to analyze report.");
        return;
      }

      setSuccess(
        data.message || "Report analyzed successfully."
      );

      setReport(
        Array.isArray(data.report)
          ? data.report
          : []
      );
    } catch (error) {
      console.error("Upload error:", error);

      setError(
        "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="text-center">
          <div className="text-5xl">
            🩺
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Upload Your Blood Report
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Upload a PDF report and SmartLab AI will
            analyze the reported laboratory values.
          </p>
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="mt-8 rounded-2xl bg-blue-50 p-6">

            <p className="font-semibold text-blue-700">
              SELECTED FILE
            </p>

            <p className="mt-3 break-all text-lg font-semibold text-gray-800">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>

            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="mt-5 rounded-xl border border-red-300 px-5 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove File
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 space-y-4">

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Choose PDF
          </button>

          {selectedFile && (
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Analyzing Report..."
                : "Upload Report"}
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center">
            <div className="animate-pulse">
              <p className="text-lg font-semibold text-blue-700">
                Analyzing your report...
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Extracting and processing laboratory values.
              </p>
            </div>
          </div>
        )}

        {/* Success */}
        {success && !loading && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            <p className="text-center text-lg font-semibold text-green-700">
              ✅ {success}
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-center font-semibold text-red-600">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Results */}
        {report.length > 0 && (
          <div className="mt-10">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                  Report Analysis
                </h3>

                <p className="mt-1 text-gray-500">
                  {report.length} laboratory parameters processed
                </p>
              </div>

              <div className="w-fit rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
                {report.filter(
                  (item) => item.status === "Normal"
                ).length}{" "}
                Normal
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {report.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-3xl font-semibold text-gray-700">
                        {item.value}{" "}
                        <span className="text-base font-normal text-gray-500">
                          {item.unit}
                        </span>
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-green-200 bg-green-100 px-4 py-2 font-semibold text-green-700">
                      🟢 {item.status}
                    </span>
                  </div>

                  <div className="mt-5 border-t border-gray-200 pt-5">
                    <p className="text-sm text-gray-500">
                      Reference Range
                    </p>

                    <p className="mt-1 font-medium text-gray-700">
                      {item.min} – {item.max}{" "}
                      {item.unit}
                    </p>
                  </div>

                  {item.explanation && (
                    <div className="mt-5 rounded-xl bg-blue-50 p-5">
                      <p className="font-semibold text-blue-700">
                        💡 Explanation
                      </p>

                      <p className="mt-2 leading-7 text-gray-700">
                        {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default UploadCard;