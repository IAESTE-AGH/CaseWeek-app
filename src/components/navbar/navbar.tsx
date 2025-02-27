import { AuthContext } from "@/contexts/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Base } from "./base";
import { Box, ButtonBase, Divider, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import user_icon from "@/assets/icons/user_icon.svg";
import logo from "@/assets/img/logo_horizontal.png";
import { useState } from "react";
import { HomeRepairService, AdminPanelSettings, Logout } from "@mui/icons-material";
import { isAdmin } from "@/utils/isAdmin";
import { t } from '../../i18n/i18n';

const NAVLINK_STYLE: React.CSSProperties = {
    color: "inherit",
    textDecoration: "none",
};

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            handleClose();
        } else {
            handleOpen(event);
        }
    };

    return (
        <Base id="navbar">
            <NavLink to="/">
                <img src={logo} alt="Logo image" height={55} />
            </NavLink>

            <Stack direction={"row"} justifyContent={"space-around"} gap={2}>
                <NavLink to="/projekt" style={NAVLINK_STYLE}>
                    {t("menuOptions.aboutProject")} 
                </NavLink>
                <NavLink to="/iaeste" style={NAVLINK_STYLE}>
                    {t("menuOptions.aboutIaeste")} 
                </NavLink>
                <NavLink to="/warsztaty" style={NAVLINK_STYLE}>
                    {t("menuOptions.workshops")} 
                </NavLink>
                <NavLink to="/partnerzy" style={NAVLINK_STYLE}>
                    {t("menuOptions.partners")} 
                </NavLink>
                <NavLink to="/firmy" style={NAVLINK_STYLE}>
                    {t("menuOptions.companies")} 
                </NavLink>
                <NavLink to="/kontakt" style={NAVLINK_STYLE}>
                    {t("menuOptions.contact")} 
                </NavLink>
            </Stack>

            <Stack direction={"row"} justifyContent={"flex-end"}>
                <AuthContext.Consumer>
                    {(state) => (
                        <>
                            <Tooltip title={state.status === "authenticated" ? t("menu") : t("accountOptions.logIn")}>
                                <ButtonBase
                                    onClick={state.status === "authenticated" ? (e) => handleClick(e) : () => navigate("/login")}
                                    sx={{
                                        borderRadius: 1,
                                        fontFamily: "Inter",
                                        fontSize: "1rem",

                                        "& .MuiTouchRipple-root": {
                                            borderRadius: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center",
                                            padding: "8px 16px",
                                        }}
                                    >
                                        <span>{state.status === "authenticated" ? `${state.currentUser.firstName} ${state.currentUser.lastName}` : t("accountOptions.logIn")}</span>
                                        <img src={user_icon} alt="User icon" style={{ width: "40px" }} />
                                    </Box>
                                </ButtonBase>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={isOpen}
                                onClose={handleClose}
                                onClick={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        backgroundColor: "#262626",
                                        color: "white",
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        minWidth: 226,

                                        "& img": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },

                                        "&::before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 30,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "#262626",
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                            >
                                <MenuItem onClick={() => navigate("/user")}>
                                    <img src={user_icon} alt="User icon" style={{ width: "32px" }} /> {t("accountOptions.myAccount")} 
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => navigate("/user/warsztaty")}>
                                    <ListItemIcon>
                                        <HomeRepairService fontSize="small" />
                                    </ListItemIcon>
                                    {t("accountOptions.myWorkshops")} 
                                </MenuItem>
                                {isAdmin(state) ? (
                                    <MenuItem onClick={() => navigate("/admin")}>
                                        <ListItemIcon>
                                            <AdminPanelSettings fontSize="small" />
                                        </ListItemIcon>
                                        {t("accountOptions.adminPanel")} 
                                    </MenuItem>
                                ) : null}
                                <MenuItem onClick={() => navigate("/logout")}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    {t("accountOptions.logOut")} 
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </AuthContext.Consumer>
            </Stack>
        </Base>
    );
}