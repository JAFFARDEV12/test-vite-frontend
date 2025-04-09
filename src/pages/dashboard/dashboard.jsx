// ✅ Updated Dashboard.jsx with Edit/Delete logic and Document Click Functionality
import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import DataAnalyzer from "../../assets/dataAnalyzer.svg";
import pdf from "../../assets/pdf.svg";
import xls from "../../assets/xls.svg";
import Doc from "../../assets/doc.svg";
import { useNavigate, useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expandedDocs, setExpandedDocs] = useState(false);

  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();

  const [agents, setAgents] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const storedAgents = localStorage.getItem("agents");
    const storedDocs = localStorage.getItem("documents");
    if (storedAgents) setAgents(JSON.parse(storedAgents));
    if (storedDocs) setDocuments(JSON.parse(storedDocs));
  }, []);

  const query = searchQuery?.toLowerCase() || "";
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(query) ||
      agent.description?.toLowerCase().includes(query)
  );

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(query)
  );

  const activeAgents = filteredAgents.length;
  const storedDocuments = filteredDocuments.length;
  const generatedPDFs = filteredDocuments.filter(
    (doc) => doc.type.toLowerCase() === "pdf"
  ).length;

  const displayedAgents = expanded ? filteredAgents : filteredAgents.slice(0, 3);
  const displayedDocuments = expandedDocs ? filteredDocuments : filteredDocuments.slice(0, 3);

  const handleCreateAgent = () => {
    navigate("/ai-agent");
  };

  const handleEdit = (agent) => {
    navigate("/ai-agent", { state: { editAgent: agent } });
  };

  const handleDelete = (agentName) => {
    const updatedAgents = agents.filter(agent => agent.name !== agentName);
    setAgents(updatedAgents);
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-[#363636] rounded-lg p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl text-[#FFFF]">Welcome to Document-Reasoning MVP</h2>
          <p className="mt-2 text-sm sm:text-base text-[#E6E6E6]">
            Get started by creating an AI agent or uploading documents to your repository.
          </p>
        </div>
        <button
          className="bg-[#FFFFFF] text-[#212121] border border-[#D3D3D3] px-3 sm:px-4 py-2 rounded-3xl hover:bg-[#D3D3D3] transition text-sm cursor-pointer"
          onClick={handleCreateAgent}
        >
          Create New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 ">
        <div className="bg-white shadow-xl rounded-[14px] w-full h-[104px] flex flex-col items-start justify-center px-6 gap-2 ">
          <span className="text-gray-400 text-sm">Active Agents</span>
          <span className="text-2xl font-semibold text-[#222222]">{activeAgents}</span>
        </div>

        <div className="bg-white shadow-xl rounded-[14px] w-full h-[104px] flex flex-col items-start justify-center px-6 gap-2">
          <span className="text-gray-400 text-sm">Stored Documents</span>
          <span className="text-2xl font-semibold text-[#222222]">{storedDocuments}</span>
        </div>

        <div className="bg-white shadow-xl rounded-[14px] w-full h-[104px] flex flex-col items-start justify-center px-6 gap-2">
          <span className="text-gray-400 text-sm">Generated PDFs</span>
          <span className="text-2xl font-semibold text-[#222222]">{generatedPDFs}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-[#222222] text-lg sm:text-xl">AI Agents</p>
        <button
          className="text-[#3182CE] text-sm sm:text-base mr-2 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "View"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
        {displayedAgents.map((agent, index) => (
          <div key={index} className="relative bg-white p-4 shadow-lg rounded-[10px] flex flex-col items-start">
            <div className="absolute top-3 right-3">
              <button onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
                <FiMoreVertical className="text-gray-500 hover:text-gray-700 text-lg cursor-pointer" />
              </button>
              {openDropdown === index && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-32">
                  <ul className="text-sm text-gray-700">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleEdit(agent)}>Edit</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDelete(agent.name)}>Delete</li>
                  </ul>
                </div>
              )}
            </div>
            <img src={agent.image || DataAnalyzer} alt={agent.name} className="w-8 h-8 mb-2" />
            <h3 className="text-[#222222] text-sm sm:text-[15px] mb-2 font-semibold">{agent.name}</h3>
            <p className="text-[#969696] text-xs sm:text-sm">{agent.description}</p>
            <button className="mt-3 bg-[#E6FBFF] text-[#3182CE] text-xs sm:text-sm px-3 py-1 rounded-2xl">
              Active
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 mb-2">
        <h3 className="text-lg text-[#222222]">Recent Documents</h3>
        <button
          className="text-[#3182CE] text-sm sm:text-base cursor-pointer"
          onClick={() => setExpandedDocs(!expandedDocs)}
        >
          {expandedDocs ? "Collapse" : "View Repository"}
        </button>
      </div>

      <div className="bg-white rounded-lg p-4">
        <ul className="mt-4">
          {displayedDocuments.map((doc, index) => (
            <li
              key={index}
              className="cursor-pointer bg-white mt-2 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
              onClick={() => window.open(doc.url || "#", "_blank")}
            >
              <div className="flex items-center gap-2 mb-4 ">
                {doc.type.toLowerCase() === "pdf" && <img src={pdf} alt="PDF" className="w-8 h-8" />}
                {doc.type.toLowerCase() === "xls" && <img src={xls} alt="XLS" className="w-8 h-8" />}
                {doc.type.toLowerCase() === "doc" && <img src={Doc} alt="DOC" className="w-8 h-8" />}
                <div className="flex flex-col gap-1 ml-2">
                  <span className="text-sm sm:text-base font-medium text-black">{doc.name}</span>
                  <span className="text-[#969696] text-xs sm:text-sm">Proceed with OCR</span>
                  <hr width="100%" color="#808080" />
                </div>
              </div>
              <span className="text-gray-500 text-xs sm:text-sm">{doc.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
