import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

const API_URL = "http://127https://geovision-ai-f3h3.onrender.com.0.0.1:8000";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/history/`);

      if (!response.ok) {
        throw new Error("Failed to load reports");
      }

      const data = await response.json();

      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Reports loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (filename) => {
    if (!filename) return null;

    const cleanPath = filename
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");

    if (cleanPath.startsWith("uploads/")) {
      return `${API_URL}/${cleanPath}`;
    }

    return `${API_URL}/uploads/${cleanPath}`;
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        String(report.id).includes(searchText) ||
        report.status?.toLowerCase().includes(searchText) ||
        String(report.changed_regions).includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleString();
  };

  const isDetected = (report) => {
    return (
      report.status?.toLowerCase() === "change detected" ||
      report.changed_regions > 0
    );
  };

  return (
    <div className="min-h-screen bg-[#10141a] text-[#dfe2eb]">

      <Sidebar />

      <main className="ml-80 min-h-screen">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#10141a]/90 px-8 backdrop-blur-xl">

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              GeoVision AI
            </p>
          </div>

          <div className="relative w-80">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-full
                border
                border-white/10
                bg-[#181c22]
                py-2.5
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-cyan-400/50
                focus:ring-1
                focus:ring-cyan-400/30
              "
            />

          </div>

        </header>


        {/* CONTENT */}

        <section className="relative px-8 py-10">

          {/* subtle background */}

          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          </div>


          <div className="relative">

            {/* TITLE */}

            <div className="mb-8 flex items-end justify-between">

              <div>

                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Intelligence Archive
                </p>

                <h1 className="font-[Space_Grotesk] text-4xl font-bold">
                  Analysis Reports
                </h1>

                <p className="mt-2 text-slate-400">
                  Review and export previous satellite image comparisons.
                </p>

              </div>


              {/* FILTER */}

              <div className="relative">

                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="
                    appearance-none
                    rounded-md
                    border
                    border-white/10
                    bg-[#181c22]
                    py-3
                    pl-10
                    pr-10
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-200
                    outline-none
                    focus:border-cyan-400
                  "
                >

                  <option value="All">
                    All Statuses
                  </option>

                  <option value="Change Detected">
                    Change Detected
                  </option>

                  <option value="No Change">
                    No Change
                  </option>

                </select>

              </div>

            </div>


            {/* LOADING */}

            {loading && (

              <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

                  <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                    Loading intelligence records...
                  </p>

                </div>

              </div>

            )}


            {/* EMPTY */}

            {!loading && filteredReports.length === 0 && (

              <div className="
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                px-8
                py-20
                text-center
                backdrop-blur-md
              ">

                <FileText
                  size={42}
                  className="mx-auto mb-5 text-slate-600"
                />

                <h2 className="text-xl font-semibold">
                  No reports found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  No analysis records match your current search or filter.
                </p>

              </div>

            )}


            {/* REPORT LIST */}

            {!loading && filteredReports.length > 0 && (

              <div className="space-y-5">

                {filteredReports.map((report) => {

                  const detected = isDetected(report);

                  return (

                    <article
                      key={report.id}
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-xl
                        border
                        bg-[#111827]/80
                        p-5
                        backdrop-blur-md
                        transition-all
                        duration-200
                        ${
                          detected
                            ? "border-white/10 hover:border-red-400/40"
                            : "border-white/10 hover:border-cyan-400/40"
                        }
                      `}
                    >

                      {/* STATUS STRIPE */}

                      <div
                        className={`
                          absolute
                          left-0
                          top-0
                          h-full
                          w-1
                          ${
                            detected
                              ? "bg-red-400"
                              : "bg-emerald-400"
                          }
                        `}
                      />


                      <div className="grid gap-6 lg:grid-cols-[220px_1fr_auto]">

                        {/* IMAGE */}

                        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0a0e14]">

                          <img
                            src={
                              getImageUrl(
                                report.comparison_image
                              )
                            }
                            alt="Comparison result"
                            className="
                              h-40
                              w-full
                              object-cover
                              transition
                              duration-500
                              group-hover:scale-[1.03]
                            "
                          />

                        </div>


                        {/* DETAILS */}

                        <div>

                          <div className="mb-4 flex flex-wrap items-center gap-3">

                            <span className="font-mono text-sm font-bold text-cyan-400">
                              #GV-{String(report.id).padStart(4, "0")}
                            </span>

                            <span className="text-slate-500">
                              /
                            </span>

                            <span className="font-mono text-xs text-slate-400">
                              {formatDate(report.created_at)}
                            </span>

                            <span
                              className={`
                                ml-auto
                                inline-flex
                                items-center
                                gap-2
                                rounded
                                border
                                px-3
                                py-1
                                font-mono
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-wider
                                ${
                                  detected
                                    ? "border-red-400/30 bg-red-400/10 text-red-400"
                                    : "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                                }
                              `}
                            >

                              {detected ? (
                                <AlertTriangle size={13} />
                              ) : (
                                <CheckCircle2 size={13} />
                              )}

                              {report.status}

                            </span>

                          </div>


                          {/* METRICS */}

                          <div className="grid max-w-2xl grid-cols-3 gap-3">

                            <div className="rounded-md bg-[#0a0e14]/80 p-4">

                              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                Changed Area
                              </p>

                              <p className="mt-1 font-mono text-xl font-bold text-cyan-400">
                                {report.changed_area_percentage ?? 0}%
                              </p>

                            </div>


                            <div className="rounded-md bg-[#0a0e14]/80 p-4">

                              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                Confidence
                              </p>

                              <p className="mt-1 font-mono text-xl font-bold text-emerald-400">
                                {report.confidence ?? 0}%
                              </p>

                            </div>


                            <div className="rounded-md bg-[#0a0e14]/80 p-4">

                              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                Regions
                              </p>

                              <p className="mt-1 font-mono text-xl font-bold text-slate-200">
                                {report.changed_regions ?? 0}
                              </p>

                            </div>

                          </div>

                        </div>


                        {/* ACTION */}

                        <div className="flex items-center lg:justify-end">

                          <Link
                            to={`/history/${report.id}`}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-md
                              border
                              border-cyan-400
                              bg-cyan-400
                              px-5
                              py-3
                              font-mono
                              text-xs
                              font-bold
                              uppercase
                              tracking-wider
                              text-[#00363a]
                              transition
                              hover:bg-cyan-300
                            "
                          >

                            <Eye size={16} />

                            View Result

                          </Link>

                        </div>

                      </div>

                    </article>

                  );

                })}

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
};

export default Reports;