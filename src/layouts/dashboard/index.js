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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Wrapper from "./components/Wrapper";
import MicroCard from "examples/Cards/MicroCard";

// Images
import microphone from "assets/images/microphone.png";

// Hooks
import React, { useEffect, useState } from "react";

import { ToastContainer } from 'react-toastify';

function Dashboard() {
  const [microItems, setMicroItems] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}/microphones`, {
          method: "GET",
        });
        let data = await response.json();
        setMicroItems(data.micros.map((micro) => {
          return {
            id: micro.uid,
            status: micro.stat,
            title: micro.uid,
            preset: micro.preset,
            image: microphone,
            action: {
              type: "internal",
              color: "info",
              label: "",
            },
          }
        }));
      } catch (e) {
        console.log(e)
      }
    }
    // fetchData()
    let interval = setInterval(() => fetchData(), (1000))

    return () => clearInterval(interval);
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Wrapper>
        <MDBox py={3} px={2}>
          <Grid container spacing={3}>
            {microItems.map((item) => (
              <Grid item xs={12} md={6} lg={3} key={item.id}>
                <MDBox mb={1.5}>
                  <MicroCard
                    id={item.id}
                    image={item.image}
                    status={item.status}
                    title={item.title}
                    description={item.description}
                    action={item.action}
                    preset={item.preset}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Wrapper>
      <ToastContainer />
    </DashboardLayout>
  );
}

export default Dashboard;
