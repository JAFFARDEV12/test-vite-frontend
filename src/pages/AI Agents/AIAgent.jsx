import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FiMoreVertical, FiX, FiUpload } from "react-icons/fi";
import img1 from "../../assets/1.svg";
import img2 from "../../assets/2.svg";
import img3 from "../../assets/3.svg";
import Loader from "../../components/loader/Loader";

const getImageByCategory = (category) => {
  if (category === "Data Analyzer") return img1;
  if (category === "Document Writer") return img2;
  if (category === "Research Assistant") return img3;
  return null;
};

const AgentCard = ({
  name,
  image,
  description,
  createdDate,
  usedItems,
  onEdit,
  onDelete,
  onChat,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm flex flex-col justify-between">
      {/* Icon + Title Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            {image ? (
              <img src={image} alt={name} className="w-12 h-12" />
            ) : (
              <div className="w-12 h-12" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-black">{name}</h3>
        </div>
        <div className="relative">
          <FiMoreVertical
            className="text-gray-500 cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          />
          {openDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow rounded-md w-32 z-10">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  onClick={onDelete}
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-300 mb-4" />
      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{description}</p>
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>Created: {createdDate}</span>
        <span>Used: {usedItems} Items</span>
      </div>

      <div className="flex gap-4 mt-auto">
        <button
          className="flex-1 h-[45px] bg-[#363636] text-white rounded-full cursor-pointer"
          onClick={onChat}
        >
          Chat
        </button>
        <button
          className="flex-1 h-[45px] border border-[#363636] text-[#363636] rounded-full cursor-pointer"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const AIAgent = () => {
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();

  const currentFormattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newAgentTitle, setNewAgentTitle] = useState("");
  const [newAgentPrompt, setNewAgentPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const [showRepoModal, setShowRepoModal] = useState(false);
  const [repoFiles, setRepoFiles] = useState([]);
  const [uploadSource, setUploadSource] = useState(null); // 'local' or 'repo'

  useEffect(() => {
    const storedAgents = localStorage.getItem("agents");
    if (storedAgents) setAgents(JSON.parse(storedAgents));
  }, []);

  const saveAgentsToLocalStorage = (agents) => {
    localStorage.setItem("agents", JSON.stringify(agents));
  };

  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);

  //   const totalFiles = [...files, ...selectedFiles];

  //   if (totalFiles.length > 5) {
  //     alert("You can only upload a maximum of 5 files.");
  //     return;
  //   }

  //   setFiles(totalFiles);
  //   setFilePreviews(totalFiles.map((file) => file.name));
  // };

  const handleFileChange = (event) => {
    const selected = Array.from(event.target.files);

    if (uploadSource && uploadSource !== "local") return;

    const total = [...files, ...selected];

    if (total.length > 3) {
      alert("You can only upload up to 3 files.");
      return;
    }

    setFiles(total);
    setFilePreviews(total.map((f) => f.name));
    setUploadSource("local");
  };

  const handleEdit = (index) => {
    const agent = agents[index];
    setEditIndex(index);
    setNewAgentTitle(agent.name);
    setNewAgentPrompt(agent.description);
    setSelectedCategory(agent.category || "");
    setFiles([]);
    setFilePreviews([]);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = agents.filter((_, i) => i !== index);
    setAgents(updated);
    saveAgentsToLocalStorage(updated);
  };

  // const handleSubmit = async () => {
  //   if (!newAgentTitle || !newAgentPrompt || !selectedCategory) return;
  //   setIsCreating(true);

  //   const newAgent = {
  //     name: newAgentTitle,
  //     image: getImageByCategory(selectedCategory),
  //     description: newAgentPrompt,
  //     createdDate: currentFormattedDate,
  //     usedItems: files.length,
  //     category: selectedCategory,
  //   };

  //   let updatedAgents = [...agents];
  //   if (editIndex !== null) {
  //     newAgent.usedItems = agents[editIndex].usedItems + files.length;
  //     updatedAgents[editIndex] = newAgent;
  //   } else {
  //     updatedAgents.push(newAgent);
  //   }

  //   setAgents(updatedAgents);
  //   saveAgentsToLocalStorage(updatedAgents);

  //   setShowModal(false);
  //   setEditIndex(null);
  //   setNewAgentTitle("");
  //   setNewAgentPrompt("");
  //   setSelectedCategory("");
  //   setFiles([]);
  //   setFilePreviews([]);
  // };

  const handleSubmit = async () => {
    if (!newAgentTitle || !newAgentPrompt || !selectedCategory) return;

    setIsCreating(true);

    try {
      const newAgent = {
        name: newAgentTitle,
        image: getImageByCategory(selectedCategory),
        description: newAgentPrompt,
        createdDate: currentFormattedDate,
        usedItems: files.length,
        category: selectedCategory,
      };

      let updatedAgents = [...agents];
      if (editIndex !== null) {
        newAgent.usedItems = agents[editIndex].usedItems + files.length;
        updatedAgents[editIndex] = newAgent;
      } else {
        updatedAgents.push(newAgent);
      }

      setAgents(updatedAgents);
      saveAgentsToLocalStorage(updatedAgents);

      setShowModal(false);
      setEditIndex(null);
      setNewAgentTitle("");
      setNewAgentPrompt("");
      setSelectedCategory("");
      setFiles([]);
      setFilePreviews([]);
    } catch (err) {
      console.error("Error creating agent:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChat = () => navigate("/chat");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const toggleRepoFile = (doc) => {
  //   const exists = repoFiles.find((f) => f.url === doc.url);
  //   if (exists) {
  //     setRepoFiles((prev) => prev.filter((f) => f.url !== doc.url));
  //   } else {
  //     setRepoFiles((prev) => [...prev, doc]);
  //   }
  // };

  const toggleRepoFile = (doc) => {
    const isSelected = repoFiles.some(
      (f) => f.name === doc.name && f.url === doc.url
    );

    if (isSelected) {
      setRepoFiles((prev) => prev.filter((f) => f.url !== doc.url));
    } else {
      const totalIfAdded = files.length + repoFiles.length + 1;
      if (totalIfAdded > 3) {
        alert("You can only upload up to 3 files.");
        return;
      }
      setRepoFiles((prev) => [...prev, doc]);
    }
  };

  return (
    <div className="mt-2 md:p-6 p-4">
      <div className="flex items-center justify-between md:mx-7 mx-2 mb-4">
        <h2 className="text-xl font-semibold text-[#363636]">AI Agents</h2>
        <button
          className="bg-[#363636] text-white md:w-[200px] w-[140px] h-[45px] rounded-full cursor-pointer"
          onClick={() => {
            setShowModal(true);
            setEditIndex(null);
            setNewAgentTitle("");
            setNewAgentPrompt("");
            setSelectedCategory("");
            setFiles([]);
            setFilePreviews([]);
          }}
        >
          Create New Agent
        </button>
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
        {filteredAgents.map((agent, index) => (
          <AgentCard
            key={index}
            {...agent}
            onChat={handleChat}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-lg flex items-center justify-center">
          <div className="relative bg-gray-200 border-2 border-gray-800 rounded-lg p-6 w-[846px] ml-36">
            <button
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <FiX size={20} />
            </button>
            <h3 className="text-center text-lg font-semibold text-black">
              {editIndex !== null ? "Edit Agent" : "Create New Agent"}
            </h3>

            <input
              type="text"
              placeholder="Title"
              className="border border-gray-300 rounded px-3 py-2 mt-3 w-full text-black cursor-pointer"
              value={newAgentTitle}
              onChange={(e) => setNewAgentTitle(e.target.value)}
            />
            <textarea
              placeholder="Enter prompt here"
              className="border border-gray-300 rounded px-3 py-2 mt-2 w-full text-black cursor-pointer"
              value={newAgentPrompt}
              onChange={(e) => setNewAgentPrompt(e.target.value)}
            ></textarea>

            {/* <div className="mt-3 text-black">
              <p className="font-medium mb-2">Select Agent Type:</p>
              <div className="flex gap-6">
                {["file_search", "web_search", "computer_use"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={type}
                      checked={selectedCategory === type}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="accent-[#363636] w-4 h-4"
                    />
                    <span className="capitalize">{type.replace("_", " ")}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-1 flex items-start gap-2 flex-col">
              <div className="flex items-center gap-2">
                <FiUpload size={20} className="text-gray-600 cursor-pointer" />
                <label
                  htmlFor="file-upload"
                  className="text-gray-600 cursor-pointer"
                >
                  Choose up to 5 files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {filePreviews.length > 0 && (
                <ul className="text-xs text-gray-700 list-disc ml-6">
                  {filePreviews.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              )}
            </div> */}

            {editIndex === null && (
              <>
                <div className="mt-3 text-black">
                  <p className="font-medium mb-2">Select Agent Type:</p>
                  <div className="flex gap-6">
                    {["file_search", "web_search", "computer_use"].map(
                      (type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={type}
                            checked={selectedCategory === type}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                            className="accent-[#363636] w-4 h-4"
                          />
                          <span className="capitalize">
                            {type.replace("_", " ")}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-around">
                  <div className="mt-1 flex items-start gap-2 flex-col">
                    <div className="flex items-center gap-2">
                      <FiUpload
                        size={20}
                        className="text-gray-600 cursor-pointer"
                      />
                      <label
                        htmlFor="file-upload"
                        className={`cursor-pointer ${
                          uploadSource === "repo"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-600"
                        }`}
                      >
                        Choose 3 files
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        disabled={uploadSource === "repo"}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    {/* {filePreviews.length > 0 && (
                      <ul className="text-xs text-gray-700 list-disc ml-6">
                        {filePreviews.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    )} */}
                  </div>

                  <div className="mt-2">
                    <button
                      disabled={uploadSource === "local"}
                      className={`flex items-center gap-2 cursor-pointer ${
                        uploadSource === "local"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600"
                      }`}
                      onClick={() => setShowRepoModal(true)}
                    >
                      <FiUpload size={20} className="text-gray-600" />
                      <span>Pick 3 files from Document Repository</span>
                    </button>
                  </div>
                </div>
                {filePreviews.length > 0 && (
                  <ul className="text-xs text-gray-700 list-disc ml-6 flex flex-col items-center">
                    {filePreviews.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* <button
              className="bg-black text-white w-full py-2 rounded-full cursor-pointer mt-6"
              onClick={handleSubmit}
            >
              {editIndex === null ? "Create Agent" : "Save Changes"}
            </button> */}
            <button
              className="bg-black text-white w-full py-2 rounded-full cursor-pointer mt-6 flex justify-center items-center"
              onClick={handleSubmit}
              disabled={isCreating}
            >
              {isCreating ? <Loader size={20} /> : "Create Agent"}
            </button>
          </div>
        </div>
      )}

      {showRepoModal && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowRepoModal(false)}
            >
              <FiX />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center">
              Select Files
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {JSON.parse(localStorage.getItem("documents") || "[]").map(
                (doc, i) => {
                  const isSelected = repoFiles.some(
                    (f) => f.name === doc.name && f.url === doc.url
                  );

                  return (
                    <div
                      key={i}
                      onClick={() => toggleRepoFile(doc)}
                      className={`border rounded-md p-4 cursor-pointer shadow-sm flex flex-col items-center justify-center text-center ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={doc.img}
                        alt={doc.name}
                        className="w-8 h-8 mb-2"
                      />
                      <p className="text-sm font-semibold truncate w-full">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.type} • {doc.date}
                      </p>
                    </div>
                  );
                }
              )}
            </div>

            <button
              className="mt-6 bg-black text-white px-6 py-2 rounded-full"
              // onClick={() => {
              //   // Append to existing file previews
              //   setFilePreviews((prev) => [
              //     ...prev,
              //     ...repoFiles.map((f) => f.name),
              //   ]);
              //   setFiles((prev) => [...prev, ...repoFiles]); // Save to file list
              //   setShowRepoModal(false);
              // }}

              onClick={() => {
                const total = files.length + repoFiles.length;
                if (total > 3) {
                  alert("You can only upload up to 3 files.");
                  return;
                }
                setFiles([...files, ...repoFiles]);
                setFilePreviews([
                  ...filePreviews,
                  ...repoFiles.map((f) => f.name),
                ]);
                setUploadSource("repo");
                setShowRepoModal(false);
              }}
            >
              Add Selected File(s)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAgent;
