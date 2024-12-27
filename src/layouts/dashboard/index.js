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
import Header from "layouts/profile/components/Header";
import Wrapper from "./components/Wrapper";
import MicroCard from "examples/Cards/MicroCard";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Routes
import routes from "routes";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  let microItems = [
    {
      id: "01-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "1",
        color: "info",
        label: "view information",
      },
    },
    {
      id: "02-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "/dashboard/2",
        color: "info",
        label: "view information",
      },
    },
    {
      id: "03-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "/dashboard/3",
        color: "info",
        label: "view information",
      },
    },
    {
      id: "04-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "/dashboard/4",
        color: "info",
        label: "view information",
      },
    },
    {
      id: "05-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "/dashboard/5",
        color: "info",
        label: "view information",
      },
    },
    {
      id: "06-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "/dashboard/6",
        color: "info",
        label: "view information",
      },
    },
    {
      id: "07-23-45-67-89-ab",
      status: "active",
      image: homeDecor1,
      title: "Mic 1",
      description: "Lorem ipsum is placeholder text commonly used in the graphic",
      action: {
        type: "internal",
        route: "/dashboard/7",
        color: "info",
        label: "view information",
      },
    },
  ];

  microItems = microItems.map((item) => {
    item.action.route = `/dashboard/${item.id}`;
    return item;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Wrapper>
        <MDBox py={3} px={2}>
          <Grid container spacing={3}>
            {microItems.map((item) => (
              <Grid item xs={12} md={6} lg={2} key={item.id}>
                <MDBox mb={1.5}>
                  <MicroCard
                    id={item.id}
                    image={item.image}
                    status={item.status}
                    title={item.title}
                    description={item.description}
                    action={item.action}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Wrapper>
    </DashboardLayout>
  );
}

export default Dashboard;
