import { AuthContext } from "@/contexts/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Base } from "./base";
import { Box, ButtonBase, Divider, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tooltip, Drawer } from "@mui/material";
import user_icon from "@/assets/icons/user_icon.svg";
import logo from "@/assets/img/logo_horizontal.png";
import { useState } from "react";
import { HomeRepairService, AdminPanelSettings, Logout, Login } from "@mui/icons-material";
import { isAdmin } from "@/utils/isAdmin";
import { t } from "../../i18n/i18n";


const NAVLINK_STYLE: React.CSSProperties = {
  color: "inherit",
  textDecoration: "none",
};

const BurgerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.33 5.42c0-1.2.97-2.17 2.17-2.17h13c1.2 0 2.17.97 2.17 2.17v15.17c0 1.2-.97 2.17-2.17 2.17h-13c-1.2 0-2.17-.97-2.17-2.17V5.42z" fill="black" fillOpacity="0.15"/>
    <path d="M4.33 19.5h17.01M4.33 13h17.01M4.33 6.5h17.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <Box
          component="img"
          src={logo}
          alt="Logo image"
          sx={{ height: { xs: 40, md: 55 } }}
        />
      </NavLink>   
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        gap={2}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
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


      <ButtonBase
        sx={{ display: { xs: "block", md: "none" }, p: 1, position: "absolute", right: "20px" }}
        onClick={() => setMobileOpen(true)}
      >
        <BurgerIcon />
      </ButtonBase>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: "250px", backgroundColor: "#2C2C2C", color: "white", padding: "10px" },
        }}
      >
        <List>
          <ListItem button component={NavLink} to="/projekt" onClick={() => setMobileOpen(false)} sx={{ color: "inherit" }}>
            <ListItemText primary={t("menuOptions.aboutProject")} />
          </ListItem>
          <ListItem button component={NavLink} to="/iaeste" onClick={() => setMobileOpen(false)} sx={{ color: "inherit" }}>
            <ListItemText primary={t("menuOptions.aboutIaeste")} />
          </ListItem>
          <ListItem button component={NavLink} to="/warsztaty" onClick={() => setMobileOpen(false)} sx={{ color: "inherit" }}>
            <ListItemText primary={t("menuOptions.workshops")} />
          </ListItem>
          <ListItem button component={NavLink} to="/partnerzy" onClick={() => setMobileOpen(false)} sx={{ color: "inherit" }}>
            <ListItemText primary={t("menuOptions.partners")} />
          </ListItem>
          <ListItem button component={NavLink} to="/firmy" onClick={() => setMobileOpen(false)} sx={{ color: "inherit" }}>
            <ListItemText primary={t("menuOptions.companies")} />
          </ListItem>
          <ListItem button component={NavLink} to="/kontakt" onClick={() => setMobileOpen(false)} sx={{ color: "inherit" }}>
            <ListItemText primary={t("menuOptions.contact")} />
          </ListItem>
          <Divider sx={{ backgroundColor: "#555", my: 1 }} />
          <AuthContext.Consumer>
            {(state) =>
              state.status === "authenticated" ? (
                <>
                  <ListItem button onClick={() => { navigate("/user"); setMobileOpen(false); }} sx={{ color: "inherit" }}>
                    <ListItemIcon>
                      <img src={user_icon} alt="User icon" style={{ width: "32px" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("accountOptions.myAccount")} />
                  </ListItem>
                  <ListItem button onClick={() => { navigate("/user/warsztaty"); setMobileOpen(false); }} sx={{ color: "inherit" }}>
                    <ListItemIcon>
                      <HomeRepairService fontSize="small" sx={{ color: "inherit" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("accountOptions.myWorkshops")} />
                  </ListItem>
                  {isAdmin(state) && (
                    <ListItem button onClick={() => { navigate("/admin"); setMobileOpen(false); }} sx={{ color: "inherit" }}>
                      <ListItemIcon>
                        <AdminPanelSettings fontSize="small" sx={{ color: "inherit" }} />
                      </ListItemIcon>
                      <ListItemText primary={t("accountOptions.adminPanel")} />
                    </ListItem>
                  )}
                  <ListItem button onClick={() => { navigate("/logout"); setMobileOpen(false); }} sx={{ color: "inherit" }}>
                    <ListItemIcon>
                      <Logout fontSize="small" sx={{ color: "inherit" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("accountOptions.logOut")} />
                  </ListItem>
                </>
              ) : (
                <ListItem button onClick={() => { navigate("/login"); setMobileOpen(false); }} sx={{ color: "inherit" }}>
                  <ListItemIcon>
                    <Login fontSize="small" sx={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary={t("accountOptions.logIn")} />
                </ListItem>
              )
            }
          </AuthContext.Consumer>
        </List>
      </Drawer>    
      <Stack direction={"row"} justifyContent={"flex-end"} sx={{ display: { xs: "none", md: "flex" } }}>
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
                    "& .MuiTouchRipple-root": { borderRadius: 1 },
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
                    <span>
                      {state.status === "authenticated"
                        ? `${state.currentUser.firstName} ${state.currentUser.lastName}`
                        : t("accountOptions.logIn")}
                    </span>
                    <img src={user_icon} alt="User icon" style={{ width: "40px" }} />
                  </Box>
                </ButtonBase>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    backgroundColor: "#262626",
                    color: "white",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    minWidth: 226,
                    "& img": { width: 32, height: 32, ml: -0.5, mr: 1 },
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