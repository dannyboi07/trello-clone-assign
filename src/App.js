import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Workspace from "./components/Workspace";

function App() {
	return (
		<>
			<Navbar />
			<div className="app">
				<Routes>
					<Route path="/" element={<Workspace />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
