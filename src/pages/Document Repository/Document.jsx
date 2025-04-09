// ✅ DocumentRepository.jsx (upload button fully functional with open in new tab)
import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Folder from "../../components/Folders/Folder";
import pdf from "../../assets/pdf.svg";
import doc from "../../assets/doc.svg";
import xls from "../../assets/xls.svg";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import ToggleSwitch from "../../components/Toggle/ToggleSwitch";

const DocumentCardGrid = ({ doc }) => (
  <div
    onClick={() => window.open(doc.url || "#", "_blank")}
    className="relative bg-[#FFFFFF] shadow-md border-[1px] border-gray-400 flex flex-col items-center justify-center cursor-pointer"
    style={{ width: "175px", height: "150px", borderRadius: "14px" }}
  >
    <div className="bg-[#FAFAFA] w-[172px] rounded-xl mt-2 flex justify-center">
      <FiMoreVertical className="absolute top-2 right-2 text-gray-500" />
      <img src={doc.img} alt={doc.type} className="w-8 h-8 mb-8 mt-7" />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
      <p className="text-xs text-gray-400">{doc.type} • {doc.date}</p>
    </div>
  </div>
);

const DocumentCardList = ({ doc }) => (
  <div
    onClick={() => window.open(doc.url || "#", "_blank")}
    className="relative bg-[#FFFFFF] shadow-md border p-4 flex flex-row items-center gap-4 cursor-pointer"
    style={{ width: "100%", borderRadius: "14px" }}
  >
    <div className="bg-[#f1f1f1] h-[60px] w-[50px] flex justify-center items-center rounded-md">
      <FiMoreVertical className="absolute top-2 right-2 text-gray-500" />
      <img src={doc.img} alt={doc.type} className="w-6 h-6" />
    </div>
    <div className="flex flex-col">
      <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
      <p className="text-xs text-gray-400">{doc.type} • {doc.date}</p>
    </div>
  </div>
);

const DocumentRepository = () => {
  const { searchQuery } = useOutletContext();
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("Date (Newest)");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);

  const [selectedFolder, setSelectedFolder] = useState({ folder: null, subfolder: null });


  useEffect(() => {
    const storedDocs = localStorage.getItem("documents");
    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    } else {
      const initialDocs = [
        { name: "Revenue Project.xlsx", type: "xls", date: "Mar 12, 2025", img: xls, url: "#" },
        { name: "Expense Analysis.docx", type: "doc", date: "Mar 12, 2025", img: doc, url: "#" },
        { name: "Growth Strategy.pdf", type: "pdf", date: "Mar 12, 2025", img: pdf, url: "#" }
      ];
      setDocuments(initialDocs);
      localStorage.setItem("documents", JSON.stringify(initialDocs));
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();
    const today = new Date().toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });

    let type = "other", img = pdf;
    if (extension === "pdf") { type = "pdf"; img = pdf; }
    else if (["doc", "docx"].includes(extension)) { type = "doc"; img = doc; }
    else if (["xls", "xlsx"].includes(extension)) { type = "xls"; img = xls; }

    // const newDoc = {
    //   name: file.name,
    //   type,
    //   date: today,
    //   img,
    //   url: URL.createObjectURL(file)
    // };

    // const updatedDocs = [newDoc, ...documents];
    // setDocuments(updatedDocs);
    // localStorage.setItem("documents", JSON.stringify(updatedDocs));

    const newDoc = {
      name: file.name,
      type,
      date: today,
      img,
      url: URL.createObjectURL(file),
      folder: selectedFolder.folder,
      subfolder: selectedFolder.subfolder,
    };
    
    const updatedDocs = [newDoc, ...documents];
    setDocuments(updatedDocs);
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
    
  };

  // const filteredDocs = documents.filter((doc) =>
  //   doc.name.toLowerCase().includes(search.toLowerCase()) &&
  //   doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  // ).sort((a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);
  //   if (sortOption === "Date (Newest)") return dateB - dateA;
  //   if (sortOption === "Date (Oldest)") return dateA - dateB;
  //   if (sortOption === "A–Z") return a.name.localeCompare(b.name);
  //   if (sortOption === "Z–A") return b.name.localeCompare(a.name);
  //   return 0;
  // });

  const filteredDocs = documents
  .filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) &&
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFolder =
      !selectedFolder.folder || doc.folder === selectedFolder.folder;

    const matchesSubfolder =
      !selectedFolder.subfolder || doc.subfolder === selectedFolder.subfolder;

    return matchesSearch && matchesFolder && matchesSubfolder;
  })
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOption === "Date (Newest)") return dateB - dateA;
    if (sortOption === "Date (Oldest)") return dateA - dateB;
    if (sortOption === "A–Z") return a.name.localeCompare(b.name);
    if (sortOption === "Z–A") return b.name.localeCompare(a.name);
    return 0;
  });


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleOptionClick = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  return (
    <div className="p-1">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-[#363636]">Document Repository</p>
          <>
            <button
              className="bg-[#363636] text-white px-4 py-2 rounded-full cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Document
            </button>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
          </>
        </div>

        <div className="flex gap-6 mt-8">
          {/* <Folder /> */}
          <Folder onSelect={(folderInfo) => setSelectedFolder(folderInfo)} documents={documents} />


          <div className="bg-[#FAFAFA] shadow-xl flex-1 rounded-3xl p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
              <div className="relative border rounded-3xl w-full lg:max-w-md">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Documents"
                  className="w-full pl-10 pr-4 py-2 rounded-3xl bg-gray-50 outline-gray-400 text-gray-600 border-[1px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <ToggleSwitch view={view} setView={setView} />
                <p className="mt-2 p-2 text-gray-500 text-sm">Sort By:</p>
                <div className="relative inline-block">
                  <button
                    className="flex justify-between items-center bg-white border border-gray-300 rounded-full px-4 py-2 cursor-pointer focus:outline-none"
                    style={{ width: '160px', height: '40px' }}
                    onClick={toggleDropdown}
                  >
                    <span className="text-sm font-medium text-[#363636]">{sortOption}</span>
                    <svg
                      className={`w-4 h-4 ml-2 text-gray-600 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 bg-white shadow-lg border border-gray-200 rounded-md w-full">
                      {["Date (Newest)", "Date (Oldest)", "A–Z", "Z–A"].map((option) => (
                        <div
                          key={option}
                          className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${sortOption === option ? "bg-[#363636] font-medium text-white" : "text-gray-700"}`}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="w-full mb-5 border-[#DADADA]" />

            {view === "grid" ? (
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                {filteredDocs.map((doc, index) => (
                  <DocumentCardGrid key={index} doc={doc} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredDocs.map((doc, index) => (
                  <DocumentCardList key={index} doc={doc} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentRepository;
