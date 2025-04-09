import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Dashboard from "./pages/dashboard/dashboard";
import AIAgent from "./pages/AI Agents/AIAgent";
import DocumentRepository from "./pages/Document Repository/Document";
import ChatScreen from "./pages/chatbox/chat";
import MainLayout from "./components/mainlayout/mainlayout";
import ChatLayout from "./components/chatlayout/chatlayout";
import "./global.css"; // Make sure auth-container is defined here

function App() {
  return (
    <Routes>
      {/* Redirect to login */}
      <Route path="/" element={<Navigate to="/sign-in" />} />

      {/* Clerk auth routes with centering */}
      <Route
        path="/sign-in/*"
        element={
          <div className="auth-container">
            <SignIn redirectUrl="/dashboard" />
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div className="auth-container">
            <SignUp redirectUrl="/dashboard" />
          </div>
        }
      />

      {/* Main layout protected pages */}
      <Route
        element={
          <SignedIn>
            <MainLayout />
          </SignedIn>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-agent" element={<AIAgent />} />
        <Route path="/document-repository" element={<DocumentRepository />} />
      </Route>

      {/* Chat layout route */}
      <Route
        element={
          <SignedIn>
            <ChatLayout />
          </SignedIn>
        }
      >
        <Route path="/chat" element={<ChatScreen />} />
      </Route>

      {/* Catch all if not signed in */}
      <Route
        path="*"
        element={
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        }
      />
    </Routes>
  );
}

export default App;
