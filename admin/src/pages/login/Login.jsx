import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button style={{ padding: 10, width: 100 }} onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
