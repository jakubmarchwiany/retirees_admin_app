import { StrictMode } from "react";
import App from "./App";
import validateEnv from "./utils/validate-env";

validateEnv();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
                            <App />
    </StrictMode>,
);
