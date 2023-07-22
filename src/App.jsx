import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddGroupPage from "./pages/AddGroupPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/ProfilePage";
import AddProjectPage from "./pages/AddProjectPage";
import InvitationPage from "./pages/InvitationPage";
import ChooseEventPage from "./pages/ChooseEventPage";
import AddEventPage from "./pages/AddEventPage";
import EditProfilePage from "./pages/EditProfilePage";
import EditEventPage from "./pages/EditEventPage";
import EditProjectPage from "./pages/EditProjectPage";
import SearchPage from "./pages/SearchPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-group" element={<AddGroupPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/posts/:postId" element={<PostDetailsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:groupId" element={<MembersPage />} />
        <Route path="/invite" element={<InvitationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/project/new" element={<AddProjectPage />} />
        <Route path="/event/types" element={<ChooseEventPage />} />
        <Route path="/event/new" element={<AddEventPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/events/:eventId/edit" element={<EditEventPage />} />
        <Route path="/projects/:projectId/edit" element={<EditProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
