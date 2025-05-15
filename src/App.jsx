import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Profile from './pages/Profile';
import QuizHistory from './pages/QuizHistory';
import Test from './pages/Test';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetail from './pages/ExerciseDetail';
import ChatBot from './components/ChatBot';
import ExerciseDetailTest from './pages/ExerciseDetailTest';
import VideoList from './pages/VideoPage';

function App() {
  return (
      <BrowserRouter basename="/python">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Các route cần auth */}
          <Route path="/chat"    element={<PrivateRoute><ChatBot/></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="/quiz-history" element={<PrivateRoute><QuizHistory/></PrivateRoute>} />
          <Route path="/test"    element={<PrivateRoute><Test/></PrivateRoute>} />
          <Route path="/video"    element={<PrivateRoute><VideoList/></PrivateRoute>} />
          <Route path="/exercises"      element={<PrivateRoute><ExercisesPage/></PrivateRoute>} />
          {/* <Route path="/exercises/:id"  element={<PrivateRoute><ExerciseDetail/></PrivateRoute>} /> */}
          <Route path="/exercises/:id"  element={<PrivateRoute><ExerciseDetailTest/></PrivateRoute>} />
          <Route path="/exercises_test/:id"  element={<PrivateRoute><ExerciseDetailTest/></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
}

export default App;
