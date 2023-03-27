import './App.css';
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Universities from "./Universities";
import PostalLookUp from "./Postal-lookup";

const App = () => {
	return (
		<>
			<Header />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/universities" element={<Universities />} />
					<Route path="/postal-lookup" element={<PostalLookUp />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
