import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddGroupPage from "./pages/AddGroupPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AddPostPage from "./pages/AddPostPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import MemberProfilePage from "./pages/MemberProfilePage";
import AddProjectPage from "./pages/AddProjectPage";
import InvitationPage from "./pages/InvitationPage";
import ChooseEventPage from "./pages/ChooseEventPage";
import AddEventPage from "./pages/AddEventPage";
import EditProfilePage from "./pages/EditProfilePage";
import EditEventPage from "./pages/EditEventPage";
import SearchPage from "./pages/SearchPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/home"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />
        <Route
          path="/new-group"
          element={
            <IsPrivate>
              <AddGroupPage />
            </IsPrivate>
          }
        />
        <Route
          path="/events/:eventId"
          element={
            <IsPrivate>
              <EventDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              <ProjectDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/post/new/:mediaId"
          element={
            <IsPrivate>
              <AddPostPage />
            </IsPrivate>
          }
        />
        <Route
          path="/notifications"
          element={
            <IsPrivate>
              <NotificationsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/search"
          element={
            <IsPrivate>
              <SearchPage />
            </IsPrivate>
          }
        />

        <Route
          path="/invite"
          element={
            <IsPrivate>
              <InvitationPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/project/new"
          element={
            <IsPrivate>
              <AddProjectPage />
            </IsPrivate>
          }
        />
        <Route
          path="/event/types"
          element={
            <IsPrivate>
              <ChooseEventPage />
            </IsPrivate>
          }
        />
        <Route
          path="/event/new"
          element={
            <IsPrivate>
              <AddEventPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/events/:eventId/edit"
          element={
            <IsPrivate>
              <EditEventPage />
            </IsPrivate>
          }
        />

        <Route
          exact
          path="/profile/:userId"
          element={
            <IsPrivate>
              <MemberProfilePage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
