import React from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import './bootstrap.min.css';
import './App.css';

import Workflow from './Workflow';
import FishyIcon from './FishyIcon';

function App() {
    return (
        <div className="d-flex flex-column m-0 p-0"
            style={{
                width:"100vw",
                height:"100vh",
                background:
                    "linear-gradient(" +
                        "to bottom, #ffffff 0%, " +
                        "#f0f0f0 75%, #f7f7f7 100%" +
                    ")"
            }}>
            <Navbar
                className="m-0 p-0 pl-2"
                expand="lg"
                bg="dark"
                variant="dark"
                style={{
                    width:"100vw",
                    height:"55px",
                    background:
                        "linear-gradient(" +
                            "to bottom, #900060 0%, " +
                            "#500020 75%, #600030 100%" +
                        ")"
                }}>
                <Navbar.Brand
                    href="#home"
                    className="d-flex flex-row align-items-center"
                >
                    <FishyIcon/>
                    <span
                        style={{ fontSize:"1.2em", fontWeight:900 }}
                        className="d-flex flex-row align-items-center">
                        FISHY
                    </span>
                    <span
                        style={{ fontSize:"1.2em", fontWeight:200 }}
                        className="d-flex flex-row align-items-center">
                        COORDINATES
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                </Navbar.Collapse>
            </Navbar>
            <Workflow/>
        </div>
    );
}

export default App;
