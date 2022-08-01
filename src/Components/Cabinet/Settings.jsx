import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import avatarImg from "../../img/avatar.png"
import "./setting.scss";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Settings() {

    const [firstBtn, seFirstBtn] = useState(<button type="button" className="button">Save</button>);


    const handleSubmit = function () {
        seFirstBtn(<button type="button" className="clicked"><CheckCircleIcon style={{ fontSize: "2rem", color: "green" }} /> Sent</button>);

        const handleSetTime = setTimeout(() => {
            seFirstBtn(firstBtn);
        }, 4000);
        return handleSetTime;
    }
    return (
        <section id="settings">
            <div className="title">
                <h2>Setting</h2>
            </div>
            <div className="avatar">
                <img src={avatarImg} alt="" />
            </div>
            <div className="setting-wrap">
                <div className="left">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="name">
                            <TextField
                                required
                                id="outlined-required"
                                label="Change your name"
                            />
                        </div>
                        <div className="e-mail">
                            <TextField
                                required
                                id="outlined-required"
                                label="Change your e-mail"
                            />
                        </div>
                        <div className="e-mail">
                            <TextField
                                required
                                id="outlined-required"
                                label="Change your Phone Number"
                            />
                        </div>
                    </Box>
                </div>
                <div className="right">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="name">
                            <TextField
                                required
                                type="password"
                                id="outlined-required"
                                label="Old Password"
                            />
                        </div>
                        <div className="old-password">
                            <TextField
                                id="outlined-password-input"
                                label="New Pasword"
                                type="password"
                                autoComplete="Confirm Password"
                            />
                        </div>
                        <div className="current-password">
                            <TextField
                                id="outlined-password-input"
                                label="Confirm Pasword"
                                type="password"
                                autoComplete="Confirm Password"
                            />

                        </div>
                    </Box>
                </div>
            </div>
            <div className="save-btn" onClick={handleSubmit}>
                {firstBtn}
            </div>
        </section>
    )
}