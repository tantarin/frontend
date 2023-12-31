import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/Login";
import Register from "./components/Register";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import AddNews from "./components/News/AddNews";
import AdsPage from "./components/Ads/AdsPage";
import {AboutPage} from "./components/About/About";
import {Button} from "@mui/material";

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  console.log("showModeratorBoard", showModeratorBoard)
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
        <Link to={"/"} className="navbar-brand">
          EdTech Startup Club
        </Link>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/about"} className="nav-link">
              О клубе
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Мероприятия
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/ads"} className="nav-link">
              Поиск команды
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/ads"} className="nav-link">
              Акселератор
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/ads"} className="nav-link">
              Дайджест
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/ads"} className="nav-link">
              Банк знаний
            </Link>
          </li>

          {/*{currentUser && (*/}
          {/*  <li className="nav-item">*/}
          {/*    <Link to={"/user"} className="nav-link">*/}
          {/*      User*/}
          {/*    </Link>*/}
          {/*  </li>*/}
          {/*)}*/}
        </div>

        {currentUser ? (
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Выход
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <Button variant="outlined">Вход</Button>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <Button variant="outlined">Регистрация</Button>
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/home" element={<News />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/addNews" element={<AddNews />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
