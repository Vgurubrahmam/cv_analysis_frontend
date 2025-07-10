import { useState, useRef } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUpload,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiBarChart2,
  FiList,
  FiTool,
  FiAward,
  FiMessageSquare,
  FiLoader,
  FiStar,
  FiTarget,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";
import confetti from "canvas-confetti";
import { Facebook, Instagram, Linkedin, MailIcon, NotepadText } from "lucide-react";

function App() {
  const links = [
    {
      title: "LinkedIn",
      icon: (
        <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/guru-brahmam-velpula?",
    },
    {
      title: "Fackebook",
      icon: (
        <Facebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Instagram",
      icon: (
        <Instagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "vgurubrahmam338@gmail.com",
      icon: (
        <MailIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "vgurubrahmam338@gmail.com",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Vgurubrahmam",
    },
  ];
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("score");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please upload a PDF file");
    }
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    setIsLoading(true);
    try {
      const res = await fetch("https://cv-analysis-backend.onrender.com/extract-text", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data);
      setError(null);

      if (data.analysis?.ats_score?.total >= 70) {
        triggerConfetti();
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
    if (score >= 60) return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    return "bg-gradient-to-r from-rose-500 to-pink-500 text-white";
  };

  const renderProgressBar = (value, max) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className={`h-2.5 rounded-full ${
            percentage >= 80
              ? "bg-gradient-to-r from-emerald-400 to-teal-500"
              : percentage >= 60
                ? "bg-gradient-to-r from-amber-400 to-orange-500"
                : "bg-gradient-to-r from-rose-400 to-pink-500"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-start mb-10 relative"
          >
            <div className="inline-block mb-4">
              <div className="relative">
                <div className=" inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg blur-xl opacity-50 animate-pulse"></div>
                <h1 className="relative text-5xl max-sm:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 py-2 ">
                  Resume ATS Analyzer
                </h1>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent font-semibold">
                Boost your job applications
              </span>{" "}
              with AI-powered resume analysis
            </p>
            <a className="absolute top-0 right-0 mt-4  px-2 py-2 text-violet-500 font-semibold  flex items-center" href="https://shield-ai-chatbot.vercel.app/">
              <NotepadText className="mx-1 " />
              Help Guide
            </a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
                <h2 className="text-2xl font-semibold text-white mb-1 flex items-center">
                  <FiFileText className="mr-2" /> Upload & Analyze
                </h2>
                <p className="text-blue-100 text-sm">Upload your resume and get instant ATS feedback</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
                    <div
                      onClick={triggerFileInput}
                      className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 text-center ${
                        file
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf"
                      />

                      {file ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mb-2">
                            <FiCheckCircle className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center mb-2">
                            <FiUpload className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">Click to upload your resume</p>
                          <p className="text-xs text-gray-500 mt-1">PDF files only</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Job Description</label>
                    <textarea
                      value={jobDescription}
                      onChange={handleJobDescriptionChange}
                      rows="8"
                      placeholder="Paste the job description here... (Optional - we'll use a default if empty)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" /> Analyzing...
                      </>
                    ) : (
                      <>
                        <FiZap className="mr-2" /> Analyze Resume
                      </>
                    )}
                  </motion.button>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-md bg-rose-50 text-rose-700 flex items-start"
                    >
                      <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            <AnimatePresence>
              {response ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-1">
                    <nav className="flex bg-white rounded-t-lg" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab("score")}
                        className={`px-4 py-3 text-sm font-medium flex items-center rounded-tl-lg transition-all duration-200 ${
                          activeTab === "score"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <FiBarChart2 className="mr-2" /> ATS Score
                      </button>
                      <button
                        onClick={() => setActiveTab("missing")}
                        className={`px-4 py-3 text-sm font-medium flex items-center transition-all duration-200 ${
                          activeTab === "missing"
                            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <FiList className="mr-2" /> Missing Elements
                      </button>
                      <button
                        onClick={() => setActiveTab("suggestions")}
                        className={`px-4 py-3 text-sm font-medium flex items-center rounded-tr-lg transition-all duration-200 ${
                          activeTab === "suggestions"
                            ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <FiMessageSquare className="mr-2" /> Suggestions
                      </button>
                    </nav>
                  </div>

                  <div className="p-6 overflow-y-auto" style={{ maxHeight: "70vh" }}>
                    {activeTab === "score" && response.analysis && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-2">
                            <div
                              className={`text-4xl font-bold rounded-full w-32 h-32 flex items-center justify-center ${getScoreColor(
                                response.analysis.ats_score?.total
                              )}`}
                            >
                              {response.analysis.ats_score?.total ?? "N/A"}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">ATS Compatibility Score</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {response.analysis.ats_score?.total >= 80 ? (
                              <span className="text-emerald-500 font-medium">
                                Excellent! Your resume is highly ATS compatible.
                              </span>
                            ) : response.analysis.ats_score?.total >= 60 ? (
                              <span className="text-amber-500 font-medium">
                                Good. Your resume needs some improvements.
                              </span>
                            ) : (
                              <span className="text-rose-500 font-medium">
                                Needs work. Your resume may not pass ATS systems.
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mr-2">
                                <FiTarget className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-800">Relevance</h4>
                            </div>
                            {renderProgressBar(response.analysis.ats_score?.breakdown?.relevance ?? 0, 40)}
                            <p className="text-sm text-gray-600 flex justify-between">
                              <span>Score: {response.analysis.ats_score?.breakdown?.relevance ?? "N/A"}/40</span>
                              <span className="text-xs text-gray-500">How well your resume matches the job</span>
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mr-2">
                                <FiStar className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-800">Keyword Match</h4>
                            </div>
                            {renderProgressBar(response.analysis.ats_score?.breakdown?.keyword_match ?? 0, 30)}
                            <p className="text-sm text-gray-600 flex justify-between">
                              <span>Score: {response.analysis.ats_score?.breakdown?.keyword_match ?? "N/A"}/30</span>
                              <span className="text-xs text-gray-500">Important keywords found</span>
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-lg border border-amber-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mr-2">
                                <FiFileText className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-800">Formatting</h4>
                            </div>
                            {renderProgressBar(response.analysis.ats_score?.breakdown?.formatting ?? 0, 20)}
                            <p className="text-sm text-gray-600 flex justify-between">
                              <span>Score: {response.analysis.ats_score?.breakdown?.formatting ?? "N/A"}/20</span>
                              <span className="text-xs text-gray-500">Resume structure and readability</span>
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-lg border border-emerald-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mr-2">
                                <FiTrendingUp className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-800">Contact Info</h4>
                            </div>
                            {renderProgressBar(response.analysis.ats_score?.breakdown?.contact_completeness ?? 0, 10)}
                            <p className="text-sm text-gray-600 flex justify-between">
                              <span>
                                Score: {response.analysis.ats_score?.breakdown?.contact_completeness ?? "N/A"}/10
                              </span>
                              <span className="text-xs text-gray-500">Contact details completeness</span>
                            </p>
                          </div>
                        </div>

                        {response.analysis.contact_info && (
                          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mr-2">
                                <FiFileText className="w-3 h-3 text-white" />
                              </div>
                              Contact Information Found
                            </h4>
                            <div className="flex flex-wrap gap-3 text-sm ">
                              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm w-full max-sm:w-full">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-gray-600 mr-2">Email:</span>
                                <span className="font-medium">{response.analysis.contact_info.email || "Not found"}</span>
                              </div>
                              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm w-full">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                                <span className="text-gray-600 mr-2">LinkedIn:</span>
                                <span className="font-medium">
                                  {response.analysis.contact_info.linkedin || "Not found"}
                                </span>
                              </div>
                              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm w-full">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                                <span className="text-gray-600 mr-2">GitHub:</span>
                                <span className="font-medium">
                                  {response.analysis.contact_info.github || "Not found"}
                                </span>
                              </div>
                              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm w-full">
                                <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                                <span className="text-gray-600 mr-2">Portfolio:</span>
                                <span className="font-medium">
                                  {response.analysis.contact_info.portfolio || "Not found"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "missing" && response.analysis && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-2">
                              <FiList className="w-4 h-4 text-white" />
                            </div>
                            Missing Sections
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-rose-50 to-red-50 p-5 rounded-lg border border-rose-100">
                              <h4 className="font-medium text-rose-800 mb-2 flex items-center">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-rose-400 to-red-500 flex items-center justify-center mr-2">
                                  <FiAlertCircle className="w-3 h-3 text-white" />
                                </div>
                                Critical Sections
                              </h4>
                              {response.analysis.missing_sections?.critical?.length > 0 ? (
                                <ul className="space-y-2">
                                  {response.analysis.missing_sections.critical.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center bg-white p-2 rounded-lg shadow-sm text-sm text-rose-700"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg flex items-center">
                                  <FiCheckCircle className="mr-2" /> No critical sections missing!
                                </p>
                              )}
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-lg border border-amber-100">
                              <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center mr-2">
                                  <FiList className="w-3 h-3 text-white" />
                                </div>
                                Recommended Sections
                              </h4>
                              {response.analysis.missing_sections?.recommended?.length > 0 ? (
                                <ul className="space-y-2">
                                  {response.analysis.missing_sections.recommended.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center bg-white p-2 rounded-lg shadow-sm text-sm text-amber-700"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg flex items-center">
                                  <FiCheckCircle className="mr-2" /> No recommended sections missing!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center mr-2">
                              <FiTool className="w-4 h-4 text-white" />
                            </div>
                            Missing Skills
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-lg border border-indigo-100">
                              <h4 className="font-medium text-indigo-800 mb-2 flex items-center">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center justify-center mr-2">
                                  <FiStar className="w-3 h-3 text-white" />
                                </div>
                                Must-Have Skills
                              </h4>
                              {response.analysis.missing_skills?.must_have?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {response.analysis.missing_skills.must_have.map((item, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white text-indigo-700 border border-indigo-200"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg flex items-center">
                                  <FiCheckCircle className="mr-2" /> No must-have skills missing!
                                </p>
                              )}
                            </div>
                            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-lg border border-cyan-100">
                              <h4 className="font-medium text-cyan-800 mb-2 flex items-center">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center mr-2">
                                  <FiTool className="w-3 h-3 text-white" />
                                </div>
                                Nice-to-Have Skills
                              </h4>
                              {response.analysis.missing_skills?.nice_to_have?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {response.analysis.missing_skills.nice_to_have.map((item, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white text-teal-700 border border-teal-200"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg flex items-center">
                                  <FiCheckCircle className="mr-2" /> No nice-to-have skills missing!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-2">
                              <FiAward className="w-4 h-4 text-white" />
                            </div>
                            Missing Achievements
                          </h3>
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-lg border border-amber-100">
                            <p className="text-sm text-gray-600 mb-3">
                              Consider adding these quantifiable achievements to strengthen your resume:
                            </p>
                            {response.analysis.missing_achievements?.length > 0 ? (
                              <ul className="space-y-2">
                                {response.analysis.missing_achievements.map((item, index) => (
                                  <motion
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.1 }}
                                    key={index}
                                    className="flex items-center bg-white p-3 rounded-lg shadow-sm text-sm text-amber-700 border-l-2 border-amber-500"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                                    {item}
                                  </motion>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg flex items-center">
                                <FiCheckCircle className="mr-2" /> No specific achievements suggested!
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "suggestions" && response.analysis && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center mr-2">
                            <FiMessageSquare className="w-4 h-4 text-white" />
                          </div>
                          Improvement Suggestions
                        </h3>

                        {response.analysis.suggestions?.length > 0 ? (
                          <ul className="space-y-3">
                            {response.analysis.suggestions.map((item, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg shadow-sm border-l-4 border-pink-500"
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-pink-50 rounded-lg">
                            <img
                              src="https://illustrations.popsy.co/amber/success.svg"
                              alt="No suggestions"
                              className="w-32 h-32 mx-auto mb-4 opacity-80"
                            />
                            <p className="text-gray-500">No specific suggestions available</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-64 h-64 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <img
                      src="https://www.velvetech.com/wp-content/uploads/2022/07/data-analytics-role.jpg"
                      alt="Resume Analysis"
                      className="relative w-64 h-64 z-10"
                    />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Ready to analyze your resume
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Upload your resume and job description to get detailed ATS compatibility analysis and improvement
                    suggestions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 w-full text-center"
        >
          <BackgroundBeamsWithCollision>
            <div className="flex flex-col justify-around min-h-[10rem] max-sm:h-auto">
              <p className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium">
                For any queries, contact +91-9876543210 or mail us at help@ATSChecker.co.in
              </p>
              <div className="flex items-center justify-center w-full">
                <FloatingDock
                  mobileClassName="translate-y-20"
                  items={links}
                />
              </div>
              <p className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text mb-4 text-transparent font-semibold">
                © 2025 Resume ATS Analyzer. All rights reserved.
              </p>
            </div>
          </BackgroundBeamsWithCollision>
        </motion.div>
      </div>
    </>
  );
}

export default App;