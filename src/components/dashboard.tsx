import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../generic-components/navBar";
import Content from "../generic-components/contentCards";

export default function DashBoard() {
    let navigate = useNavigate();
    useEffect(() => {
        const valToken = JSON.parse(sessionStorage.getItem('userLogin')!);
        if (valToken === null) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <NavBar />
            <Content />
        </div>
    )
}