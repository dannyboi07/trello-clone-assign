// import { useEffect } from "react";
// import {  }
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Workspace from "./components/Workspace/Workspace";
import "./App.css";
import Boards from "./components/Boards/Boards";
import Board from "./components/Board/Board";
import Modal from "./components/Modal/Modal";

function App() {
	return (
		<>
			<Navbar />
            <Modal />
			<div className="app">
				<Routes>
					<Route path="/workspace">
						<Route path=":workspaceId">
							<Route
								path="/workspace/:workspaceId/board/:boardId"
								element={<Board />}
							/>
							<Route path="" element={<Boards />} />
						</Route>
						<Route path="" element={<Workspace />} />
					</Route>
					{/* <Route path="*" element={<Navigate to="workspace" replace/>}/> */}
				</Routes>
			</div>
		</>
	);
}

export default App;
