# [Camera Tracking](http://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/material-dashboard-react&text=Check%20Material%20Dashboard%202%20react%20made%20by%20@CreativeTim%20#webdesign%20#dashboard%20#materialdesign%20#react%20https://www.creative-tim.com/product/material-dashboard-react)

![version](https://img.shields.io/badge/version-2.2.0-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/material-dashboard-react.svg)](https://github.com/creativetimofficial/material-dashboard-react/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/material-dashboard-react.svg)](https://github.com/creativetimofficial/material-dashboard-react/issues?q=is%3Aissue+is%3Aclosed)

## 📋 Tài liệu cho Developer

**Hướng dẫn dành cho người mới bắt đầu:**
- 🚀 **[QUICK_START.md](./QUICK_START.md)** - Hướng dẫn chạy ứng dụng trong 5 phút
- 📖 **[DEVELOPER_DOCS.md](./DEVELOPER_DOCS.md)** - Tài liệu chi tiết cho developer
- 🔌 **[API_DOCS.md](./API_DOCS.md)** - Tài liệu API backend requirements

## Tổng quan hệ thống

Đây là frontend React cho hệ thống Camera Tracking dựa trên microphone. Ứng dụng quản lý:
- **Microphone Management**: Theo dõi trạng thái các microphone
- **Camera Integration**: Gán và gọi camera từ microphone
- **Auto Tracking**: Tự động tracking camera theo vị trí microphone
- **Real-time Monitoring**: Cập nhật trạng thái real-time

## Công nghệ chính

- **React 18.2.0** với Material-UI
- **Docker** ready với Nginx
- **Real-time polling** từ backend API
- **Toast notifications** cho user feedback


## Table of Contents

- [Versions](#versions)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)

## Documentation

The documentation for the Material Dashboard is hosted at our [website](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr).

### What's included

Within the download you'll find the following directories and files:

```
material-dashboard-react
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   └── theme
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── authentication
    │   │   ├── billing
    │   │   ├── dashboard
    │   │   ├── notifications
    │   │   ├── profile
    │   │   ├── rtl
    │   │   └── tables
    │   ├── App.js
    │   ├── index.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE.md
    ├── package.json
    └── README.md
```

