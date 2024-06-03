// import "./App.css";
// import LoginButton from "./components/Auth/login";
// import { useAuth0 } from "@auth0/auth0-react";
// import Homepage from "./components/Home/homepage";

// function App() {
//   const { isAuthenticated } = useAuth0();

//   return <>{isAuthenticated ? <Homepage /> : <LoginButton />}</>;
// }

// export default App;

import "./App.css";
import LoginButton from "./components/Auth/login";
import { useAuth0 } from "@auth0/auth0-react";
import Homepage from "./components/Home/homepage";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return <>{isAuthenticated ? <Homepage /> : <LoginButton />}</>;
}

export default App;
