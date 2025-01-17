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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MicroDetail from "layouts/dashboard/components/MicroDetail";

// Router
import { Routes, Route } from "react-router-dom";
import MDBadge from "../../../components/MDBadge";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { toast } from 'react-toastify';


function MicroCard({ id, image, status, preset, title, action, ...props }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [cameras, setCameras] = React.useState();
  const [camSelected, setCamSelected] = React.useState('');
  const [microPreset, setMicroPreset] = React.useState(preset)

  const handleChangeCamera = (event) => {
    setCamSelected(event.target.value);
  };

  const handleOpenDialog = () => {
    fetchCameras()
    setOpen(true);
  };

  const removePresets = async (id) => {
    let url = `${process.env.REACT_APP_SERVICE_URL}/microphones/${id}/preset`;
    let data;
    try {
      let response = await fetch(url, {
        method: "DELETE",
      });
      let status = response.status
      data = await response.json();
      if (status >= 300) {
        throw new Error(data.error)
      }
      if (!data) {
        throw new Error("Không thể kết nối đến server")
      }
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  const handlePreset = async () => {
    if (!camSelected) {
      toast.warning("Bạn chưa chọn camera")
      return
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    let url = `${process.env.REACT_APP_SERVICE_URL}/microphones/${id}/preset?camera_ip=${camSelected}`;
    let data;
    try {
      let response = await fetch(url, {
        method: "POST",
      });
      let status = response.status
      data = await response.json();
      if (status >= 300) {
        throw new Error(data.error)
      }
      if (!data) {
        throw new Error("Không thể kết nối đến server")
      }
      setMicroPreset(true)
      toast.success("Gán thành công")
    } catch (e) {
      console.log(e)
      toast.error("Gán thất bại")
    } finally {
      setLoading(false);
    }
    handleClose()
  }

  const handleCall = async () => {
    if (!preset) {
      toast.warning("Chưa cài preset")
      return
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    let url = `${process.env.REACT_APP_SERVICE_URL}/microphones/${id}/call`;
    let data;
    try {
      let response = await fetch(url, {
        method: "POST",
      });
      let status = response.status
      data = await response.json();
      if (status >= 300) {
        throw new Error(data.error)
      }
      if (!data) {
        throw new Error("Không thể kết nối đến server")
      }
      toast.success("Thành công")
    } catch (e) {
      console.log(e)
      toast.error("Thất bại")
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCameras = async () => {
    let url = `${process.env.REACT_APP_SERVICE_URL}/cameras`;
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
      setCameras(data)
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        width="100%"
        shadow="xl"
        borderRadius="xl"
      >
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox px={2} mt={1}>
        <MDBox mb={1}>
          <MDTypography
            component={Link}
            to={action.route}
            variant="h5"
            textTransform="capitalize"
          >
            <MDTypography color="text" mb={-1}>
              Serial Number:
            </MDTypography> {title}
          </MDTypography>
        </MDBox>
        <MDBox px={0} mb={1} lineHeight={0}>
          <MDTypography color="text">
            Trạng thái:
          </MDTypography>
          {status === "1" ? <MDBox ml={-1}>
            <MDBadge badgeContent="Bật mic" color="success" variant="gradient" size="sm" />
          </MDBox> : <MDBox ml={-1}>
            <MDBadge badgeContent="Tắt mic" color="dark" variant="gradient" size="sm" />
          </MDBox>}
        </MDBox>
        <MDBox px={0} mb={1} lineHeight={0}>
          <MDTypography color="text">
            Preset:
          </MDTypography>
          {preset === true ? <MDBox ml={-1}>
            <MDBadge badgeContent="Đã set" color="success" variant="gradient" size="sm" />
          </MDBox> : <MDBox ml={-1}>
            <MDBadge badgeContent="Chưa set" color="dark" variant="gradient" size="sm" />
          </MDBox>}
        </MDBox>
        <MDBox px={0} mb={1} lineHeight={0}>
          <MDTypography color="text">
            Camera đang gán:
          </MDTypography>
          {props.cameraIp ? <MDBox ml={-1}>
            <MDBadge
              badgeContent={props.cameraIp}
              color="info"
              variant="gradient"
              size="md"
              sx={{ "& .MuiBadge-badge": { fontSize: 10 } }}
            />
          </MDBox> : <MDBox ml={-1}>
            <MDBadge badgeContent="Chưa gán" color="dark" variant="gradient" size="sm" />
          </MDBox>}
        </MDBox>

        {/* <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox> */}
        <MDBox py={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDButton
            component={Link}
            to={action.route}
            variant="contained"
            size="medium"
            color={action.color}
            sx={{
              width: "48%"
            }}
            onClick={handleOpenDialog}
            disabled={loading}
          >
            Preset
          </MDButton>
          <MDButton
            component={Link}
            to={action.route}
            variant="contained"
            size="medium"
            color={action.color}
            sx={{
              width: "48%"
            }}
            onClick={handleCall}
            disabled={loading}
          >
            Call
          </MDButton>
        </MDBox>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Chọn camera gán vào microphone ${id}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl>
                <FormLabel color="info">Camera</FormLabel>
                <RadioGroup
                  name="controlled-radio-buttons-group"
                  value={camSelected}
                  onChange={handleChangeCamera}
                >
                  {cameras && cameras.map(cam => {
                    return <FormControlLabel key={cam} value={cam} control={<Radio />} label={cam} />
                  })}
                </RadioGroup>
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">Hủy</Button>
            <Button onClick={handlePreset} autoFocus>
              Chấp nhận
            </Button>
          </DialogActions>
        </Dialog>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MicroCard
MicroCard.defaultProps = {};

// Typechecking props for the MicroCard
MicroCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  preset: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default MicroCard;
