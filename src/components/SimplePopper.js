import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MDTypography from "./MDTypography";
import MDBox from "./MDBox";

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
                sx={{ minWidth: 0, m: 0, p: 0.5 }}
            >
                <QuestionMarkIcon
                    sx={{ fontSize: 20, minWidth: 0, m: 0, p: -1 }}
                />
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="right">
                <MDBox
                    bgColor="dark"
                    variant="gradient"
                    sx={{ border: 1, p: 1, display: "flex", maxWidth: 450 }}
                >
                    <MDTypography
                        variant="body2"
                        color="white"
                    >
                        {`Emails must be separated by a space, return (separate line), or comma. Can be copy/pasted directly from Excel`}
                    </MDTypography>
                </MDBox>
            </Popper>
        </Box>
    );
};

export default SimplePopper;
