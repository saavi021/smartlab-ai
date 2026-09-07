import { useEffect, useState } from "react";

function ReportHistory() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("smartlab_token");

      if (!token) {
        setError("Please log in first.");
        return;
      }

      const response = await fetch("/api/reports", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("History response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to load reports.");
      }

      setReports(Array.isArray(data.reports) ? data.reports : []);
    } catch (error) {
      console.error("History error:", error);
      setError(error.message || "Unable to load report history.");
    } finally {
      setLoading(false);
    }
  }

  async function handleViewReport(reportId) {
    try {
      setViewLoading(true);
      setError("");

      const token = localStorage.getItem("smartlab_token");

      if (!token) {
        setError("Please log in first.");
        return;
      }

      const response = await fetch(`/api/reports/${reportId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Single report response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to load report.");
      }

      /*
        Backend returns:
        {
          report: {
            _id,
            filename,
            size,
            report: [...]
          }
        }
      */

      if (!data.report) {
        throw new Error("No report data was returned.");
      }

      setSelectedReport(data.report);
    } catch (error) {
      console.error("View report error:", error);
      setError(error.message || "Unable to load report.");
      setSelectedReport(null);
    } finally {
      setViewLoading(false);
    }
  }

  function getStatusClasses(status) {
    switch (status?.toLowerCase()) {
      case "normal":
        return "bg-green-100 text-green-700 border-green-200";

      case "high":
        return "bg-red-100 text-red-700 border-red-200";

      case "low":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

  function getStatusIcon(status) {
    switch (status?.toLowerCase()) {
      case "normal":
        return "🟢";

      case "high":
        return "🔴";

      case "low":
        return "🟡";

      default:
        return "⚪";
    }
  }

  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-center text-gray-500">
          Loading report history...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Report History
        </h2>

        <p className="mt-2 text-gray-500">
          View your previously analyzed reports.
        </p>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-600">
            ❌ {error}
          </p>
        </div>
      )}

      {reports.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-gray-50 p-8 text-center">
          <p className="text-lg text-gray-500">
            No saved reports yet.
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Upload a report and it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h3 className="break-all text-lg font-bold text-gray-800">
                    📄 {report.filename}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleString()
                      : "Date unavailable"}
                  </p>

                  <p className="mt-2 text-sm font-medium text-gray-600">
                    {Array.isArray(report.report)
                      ? report.report.length
                      : 0}{" "}
                    tests analyzed
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleViewReport(report._id)}
                  disabled={viewLoading}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {viewLoading ? "Loading..." : "View Report"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Report */}
      {selectedReport && (
        <div className="mt-10 border-t border-gray-200 pt-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Saved Report Analysis
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {selectedReport.filename}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-600 hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          {Array.isArray(selectedReport.report) &&
          selectedReport.report.length > 0 ? (
            <div className="mt-6 space-y-4">
              {selectedReport.report.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-2xl font-semibold text-gray-700">
                        {item.value}{" "}
                        <span className="text-base font-normal text-gray-500">
                          {item.unit}
                        </span>
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-4 py-2 font-semibold ${getStatusClasses(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                  </div>

                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500">
                      Reference Range
                    </p>

                    <p className="mt-1 font-medium text-gray-700">
                      {item.min} – {item.max} {item.unit}
                    </p>
                  </div>

                  {item.explanation && (
                    <div className="mt-5 rounded-xl bg-blue-50 p-4">
                      <p className="font-semibold text-blue-700">
                        💡 Explanation
                      </p>

                      <p className="mt-2 leading-6 text-gray-700">
                        {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center">
              <p className="text-gray-500">
                This saved report does not contain any analyzed results.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReportHistory;