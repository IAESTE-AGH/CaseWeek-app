import { AuthContext } from "@/contexts/Auth"
import { NavLink, NavLinkProps, useNavigate } from "react-router-dom"
import { Base } from "./base"
import { Avatar, Box, ButtonBase, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material"
import user_icon from "@/assets/icons/user_icon.svg"
import logo from "@/assets/img/logo_horizontal.png"
import { useState } from "react"
import { PersonAdd, Settings, Logout, HomeRepairService, AdminPanelSettings } from "@mui/icons-material"
import { isAdmin } from "@/utils/isAdmin"

const NAVLINK_STYLE: React.CSSProperties = {
    color: "inherit",
    textDecoration: "none",
}

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpen = Boolean(anchorEl)
    const navigate = useNavigate()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            handleClose()
        } else {
            handleOpen(event)
        }
    }

    return (
        <Base id="navbar">
            <NavLink to="/">
                <img src={logo} alt="Logo image" height={55} />
            </NavLink>

            <Stack direction={"row"} justifyContent={"space-around"} gap={2}>
                <NavLink to="/projekt" style={NAVLINK_STYLE}>
                    O Projekcie
                </NavLink>
                <NavLink to="/iaeste" style={NAVLINK_STYLE}>
                    O IAESTE
                </NavLink>
                <NavLink to="/warsztaty" style={NAVLINK_STYLE}>
                    Warsztaty
                </NavLink>
                <NavLink to="/partnerzy" style={NAVLINK_STYLE}>
                    Partnerzy
                </NavLink>
                <NavLink to="/firmy" style={NAVLINK_STYLE}>
                    Firmy
                </NavLink>
                <NavLink to="/kontakt" style={NAVLINK_STYLE}>
                    Kontakt
                </NavLink>
            </Stack>

            <Stack direction={"row"} justifyContent={"flex-end"}>
                <AuthContext.Consumer>
                    {(state) => (
                        <>
                            <Tooltip title={state.status === "authenticated" ? `Menu` : "Zaloguj się"}>
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
                                        <span>{state.status === "authenticated" ? `${state.currentUser.firstName} ${state.currentUser.lastName}` : "Zaloguj się"}</span>
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
                                    <img src={user_icon} alt="User icon" style={{ width: "32px" }} /> Moje konto
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => navigate("/user/warsztaty")}>
                                    <ListItemIcon>
                                        <HomeRepairService fontSize="small" />
                                    </ListItemIcon>
                                    Moje warsztaty
                                </MenuItem>
                                {isAdmin(state) ? (
                                    <MenuItem onClick={() => navigate("/admin")}>
                                        <ListItemIcon>
                                            <AdminPanelSettings fontSize="small" />
                                        </ListItemIcon>
                                        Panel administracyjny
                                    </MenuItem>
                                ) : null}
                                <MenuItem onClick={() => navigate("/logout")}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Wyloguj się
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </AuthContext.Consumer>
            </Stack>
        </Base>
    )
}
