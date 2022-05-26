import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const SimplePopper = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <Box sx={{ display: "flex", alignItems: "center", p: 0 }}>
            <Button
                aria-describedby={id}
                onClick={handleClick}
                sx={{ minWidth: 0, m:0, p:0.5 }}
            >
                <QuestionMarkIcon sx={{ fontSize: 20, minWidth: 0, m: 0, p: -1}} />
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                    {`Enter email address(es) with no spaces and separated by comma (ex. "Email@Email.com,AnotherEmail@Email.com")`}
                </Box>
            </Popper>
        </Box>
    );
};

export default SimplePopper;
