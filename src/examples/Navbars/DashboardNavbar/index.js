/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { toast } from "react-toastify";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [isTelevic, setIsTelevic] = useState(false)
  const [devices, setDevices] = useState();
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

  const checkCamera = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let url = `${process.env.REACT_APP_SERVICE_URL}/camera/ping`;
    let data;
    try {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
      setIsCamera(data.success)
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  const checkTelevic = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let url = `${process.env.REACT_APP_SERVICE_URL}/microphones/ping`;
    let data;
    try {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
      console.log(data)
      setIsTelevic(data.success)
    } catch (e) {
      console.log(e)
    }
  }
    // const checkDevicesStatus = async () => {
    //   await checkCamera()
    //   await checkTelevic();
    // };

    // let interval = setInterval(() => checkDevicesStatus(), (1000*5))

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleTransparentNavbar)
      // clearInterval(interval)
    };
  }, [dispatch, fixedNavbar]);

  const checkCamera = async () => {
    setIsCamera(true)
    await new Promise(resolve => setTimeout(resolve, 500));
    let url = `${process.env.REACT_APP_SERVICE_URL}/camera/ping`;
    let data;
    try {
      let response = await fetch(url, {
        method: "GET",
      });
      let status = response.status
      data = await response.json();
      if (status >= 300) {
        throw new Error(data.error)
      }
      if (!data) {
        throw new Error("Không thể kết nối đến server")
      }
      if (data.success) {
        toast.success("Camera đang bật")
      } else {
        toast.warning("Camera đang tắt")
      }
    } catch (e) {
      console.log(e)
      toast.error("Không thể kiểm tra trạng thái Camera")
    } finally {
      setIsCamera(false)
    }
  }

  const checkDevices = async () => {
    setIsTelevic(true)
    await new Promise(resolve => setTimeout(resolve, 500));
    let url = `${process.env.REACT_APP_SERVICE_URL}/ping`;
    let data;
    try {
      let response = await fetch(url, {
        method: "GET",
      });
      let status = response.status
      data = await response.json();
      if (status >= 300) {
        throw new Error(data.error)
      }
      if (!data) {
        throw new Error("Không thể kết nối đến server")
      }
      if (data.mic_ping && data.cam_pings && data.cam_pings.every(e => e.ping)) {
        toast.success("Kết nối thành công")
      }
      else if (!data.mic_ping && (!data.cam_pings || data.cam_pings.every(e => !e.ping))) {
        toast.warning("Không thể kết nối đến các thiết bị")
      } else {
        if (!data.cam_pings || data.cam_pings.some(e => !e.ping)){
          data.cam_pings.forEach(cam => {
            if (!cam.ping) {
              toast.warning(`Camera ${cam.ip} đang tắt`)
            }
          })
        }
        if (!data.mic_ping) {
          toast.warning("Microphone đang tắt")
        }
      }
    } catch (e) {
      console.log(e)
      toast.error("Không thể kết nối đến các thiết bị")
    } finally {
      setIsTelevic(false)
    }
  }

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <MDButton
                variant="contained"
                size="medium"
                color="info"
                // color={isTelevic ? "success" : "secondary"}
                sx={{
                  mx: 2,
                }}
                disabled={isTelevic}
                onClick={checkDevices}
              >
                Kiểm tra kết nối
              </MDButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
