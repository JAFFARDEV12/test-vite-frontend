import React, { useState } from "react";
import {
  FaFolder,
  FaPlus,
  FaChevronDown,
  FaFolderOpen,
  FaFileAlt,
} from "react-icons/fa";

const initialFolders = [
  {
    name: "Financial Reports",
    subfolders: ["Q1 2025", "Q4 2024"],
    files: {},
    addingSub: false,
  },
  {
    name: "Project Documents",
    subfolders: ["Proposal", "Contract"],
    files: {},
    addingSub: false,
  },
  { name: "Research Papers", subfolders: [], files: {}, addingSub: false },
  { name: "AI Generated", subfolders: [], files: {}, addingSub: false },
  { name: "Legal Documents", subfolders: [], files: {}, addingSub: false },
];

const Folder = ({ onSelect, documents }) => {
  const [folders, setFolders] = useState(initialFolders);
  const [newFolderName, setNewFolderName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [openFolders, setOpenFolders] = useState({});
  const [isFolderListVisible, setIsFolderListVisible] = useState(false);
  const [addingFileInfo, setAddingFileInfo] = useState({
    folderIndex: null,
    subfolder: "",
    name: "",
  });
  const [subfolderInput, setSubfolderInput] = useState("");
  const [selected, setSelected] = useState({ folder: null, subfolder: null });
  const [openSubfolders, setOpenSubfolders] = useState({});

  const handleAddFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolders([
        ...folders,
        {
          name: newFolderName.trim(),
          subfolders: [],
          files: {},
          addingSub: false,
        },
      ]);
      setNewFolderName("");
      setShowInput(false);
    }
  };

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };
  const toggleSubfolder = (key) => {
    setOpenSubfolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const startAddingFile = (folderIndex, subfolderName) => {
    setAddingFileInfo({ folderIndex, subfolder: subfolderName, name: "" });
  };

  const saveFileToSubfolder = () => {
    const { folderIndex, subfolder, name } = addingFileInfo;
    if (!name.trim()) return;
    const updatedFolders = [...folders];
    if (!updatedFolders[folderIndex].files[subfolder]) {
      updatedFolders[folderIndex].files[subfolder] = [];
    }
    updatedFolders[folderIndex].files[subfolder].push(name.trim());
    setFolders(updatedFolders);
    setAddingFileInfo({ folderIndex: null, subfolder: "", name: "" });
  };

  const showSubfolderInput = (folderIndex) => {
    const updated = folders.map((f, i) =>
      i === folderIndex ? { ...f, addingSub: true } : { ...f, addingSub: false }
    );
    setFolders(updated);
    setSubfolderInput("");
  };

  const addSubfolder = (folderIndex) => {
    if (!subfolderInput.trim()) return;
    const updated = [...folders];
    updated[folderIndex].subfolders.push(subfolderInput.trim());
    updated[folderIndex].addingSub = false;
    setFolders(updated);
    setSubfolderInput("");
  };

  return (
    <div>
      <button
        className="lg:hidden p-2 text-gray-700"
        onClick={() => setIsFolderListVisible((prev) => !prev)}
      >
        <FaFolderOpen className="text-xl text-yellow-500" />
      </button>

      <div
        className={`${
          isFolderListVisible ? "block" : "hidden"
        } lg:block fixed lg:relative top-0 left-0 bg-white z-50 p-4 border border-gray-200 shadow-md rounded-2xl`}
        style={{ width: 270, height: "750px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#222222]">Folders</h3>
          <FaPlus
            className="text-gray-600 cursor-pointer hover:text-black"
            onClick={() => setShowInput(!showInput)}
          />
        </div>

        {showInput && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Folder Name"
              className="w-full p-2 border rounded mb-2 text-sm border-gray-400 text-gray-800"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button
              onClick={handleAddFolder}
              className="w-full bg-[#363636] text-white text-sm py-1 rounded"
            >
              Add Folder
            </button>
          </div>
        )}

        <ul className="text-sm text-gray-700 space-y-2">
          <li
            className={`flex items-center gap-2 text-black font-medium px-2 py-1 rounded cursor-pointer ${
              selected.folder === null ? "bg-yellow-100" : ""
            }`}
            onClick={() => {
              setSelected({ folder: null, subfolder: null });
              onSelect({ folder: null, subfolder: null });
            }}
          >
            <FaFolder className="text-yellow-500" /> All Documents
          </li>

          {folders.map((folder, idx) => (
            <li key={idx}>
              <div className="flex items-center justify-between mt-3">
                <div
                  className={`flex items-center gap-2 text-black font-medium cursor-pointer px-2 py-1 rounded ${
                    selected.folder === folder.name &&
                    selected.subfolder === null
                      ? "bg-yellow-100"
                      : ""
                  }`}
                  onClick={() => {
                    toggleFolder(folder.name);
                    setSelected({ folder: folder.name, subfolder: null });
                    onSelect({ folder: folder.name, subfolder: null });
                  }}
                >
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                      openFolders[folder.name] ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                  <FaFolder className="text-yellow-500" />
                  {folder.name}
                </div>
                <FaPlus
                  className="text-xs text-gray-500 cursor-pointer"
                  onClick={() => showSubfolderInput(idx)}
                />
              </div>

              {folder.addingSub && (
                <div className="ml-6 mt-2">
                  <input
                    type="text"
                    placeholder="Subfolder name"
                    className="w-full text-xs border border-gray-300 px-2 py-1 rounded mb-1"
                    value={subfolderInput}
                    onChange={(e) => setSubfolderInput(e.target.value)}
                  />
                  <button
                    className="bg-[#363636] text-white text-xs px-3 py-1 rounded w-full"
                    onClick={() => addSubfolder(idx)}
                  >
                    Add Subfolder
                  </button>
                </div>
              )}

              {openFolders[folder.name] &&
                documents
                  ?.filter(
                    (doc) => doc.folder === folder.name && !doc.subfolder
                  )
                  .map((doc, i) => (
                    <div
                      key={`folder-doc-${i}`}
                      className="ml-6 flex items-center gap-2 text-xs mt-1 cursor-pointer hover:underline"
                      onClick={() => window.open(doc.url, "_blank")}
                    >
                      <FaFileAlt className="text-gray-600" />
                      {doc.name}
                    </div>
                  ))}

              {openFolders[folder.name] && (
                <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                  {folder.subfolders.map((sub, i) => (
                    <li key={i}>
                      {/* <div
                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                          selected.folder === folder.name &&
                          selected.subfolder === sub
                            ? "bg-yellow-100"
                            : ""
                        }`}
                        onClick={() => {
                          setSelected({ folder: folder.name, subfolder: sub });
                          onSelect({ folder: folder.name, subfolder: sub });
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <FaFolder className="text-yellow-500" /> {sub}
                        </div>
                        <FaPlus
                          className="text-xs text-gray-500"
                          onClick={() => startAddingFile(idx, sub)}
                        />
                      </div> */}

                      <div
                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                          selected.folder === folder.name &&
                          selected.subfolder === sub
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      >
                        <div
                          className="flex items-center gap-2 w-full"
                          onClick={() => {
                            toggleSubfolder(`${folder.name}/${sub}`);
                          }}
                        >
                          <FaChevronDown
                            className={`text-xs transition-transform duration-200 ${
                              openSubfolders[`${folder.name}/${sub}`]
                                ? "rotate-0"
                                : "-rotate-90"
                            }`}
                          />
                          <FaFolder className="text-yellow-500" />
                          <span
                            onClick={() => {
                              setSelected({
                                folder: folder.name,
                                subfolder: sub,
                              });
                              onSelect({ folder: folder.name, subfolder: sub });
                            }}
                          >
                            {sub}
                          </span>
                        </div>
                        <FaPlus
                          className="text-xs text-gray-500"
                          onClick={() => startAddingFile(idx, sub)}
                        />
                      </div>

                      {openSubfolders[`${folder.name}/${sub}`] && (
                        <>
                          {addingFileInfo.folderIndex === idx &&
                            addingFileInfo.subfolder === sub && (
                              <div className="ml-5 mt-1">
                                <input
                                  type="text"
                                  placeholder="File Name"
                                  className="text-xs border border-gray-300 px-2 py-1 rounded w-full mt-1"
                                  value={addingFileInfo.name}
                                  onChange={(e) =>
                                    setAddingFileInfo({
                                      ...addingFileInfo,
                                      name: e.target.value,
                                    })
                                  }
                                />
                                <button
                                  onClick={saveFileToSubfolder}
                                  className="bg-[#363636] text-white text-xs px-3 py-1 rounded mt-1 w-full"
                                >
                                  Save File
                                </button>
                              </div>
                            )}

                          {folder.files?.[sub]?.map((file, fIdx) => (
                            <div
                              key={fIdx}
                              className="ml-5 flex items-center gap-2 text-gray-500 text-xs mt-1"
                            >
                              <FaFileAlt className="text-blue-400" />
                              {file}
                            </div>
                          ))}

                          {documents
                            .filter(
                              (doc) =>
                                doc.folder === folder.name &&
                                doc.subfolder === sub
                            )
                            .map((doc, i) => (
                              <div
                                key={`uploaded-${i}`}
                                className="ml-5 flex items-center gap-2 text-xs mt-1 cursor-pointer hover:underline"
                                onClick={() => window.open(doc.url, "_blank")}
                              >
                                <FaFileAlt className="text-gray-600" />
                                {doc.name}
                              </div>
                            ))}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isFolderListVisible && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsFolderListVisible(false)}
        />
      )}
    </div>
  );
};

export default Folder;
