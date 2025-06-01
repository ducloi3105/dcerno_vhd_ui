# Tài liệu Developer - Camera Tracking System

## Tổng quan dự án

Đây là một ứng dụng React quản lý hệ thống tracking camera dựa trên microphone. Ứng dụng cho phép:
- Quản lý các microphone và camera
- Thiết lập preset gán microphone với camera
- Tự động tracking camera theo vị trí microphone
- Gọi camera tự động khi có tín hiệu từ microphone

## Công nghệ sử dụng

### Frontend
- **React 18.2.0**: Framework chính
- **Material-UI (MUI) 5.12.3**: Thư viện UI components
- **React Router 6.11.0**: Routing
- **Chart.js & React-ChartJS-2**: Biểu đồ
- **React Toastify**: Thông báo
- **Yup**: Validation

### Build & Deploy
- **React Scripts 5.0.1**: Build tool
- **Docker**: Containerization
- **Nginx**: Web server
- **Docker Compose**: Orchestration

## Cấu trúc thư mục

```
src/
├── components/           # Custom Material Dashboard components
│   ├── MDBox/           # Container component với styles
│   ├── MDButton/        # Custom button
│   ├── MDInput/         # Custom input
│   ├── MDTypography/    # Text components
│   ├── MDBadge/         # Badge/Label components
│   └── ...
├── examples/            # Reusable example components
│   ├── Cards/
│   │   └── MicroCard/   # Component hiển thị thông tin microphone
│   ├── Navbars/
│   │   └── DashboardNavbar/ # Navigation bar chính
│   ├── Configurator/    # Cấu hình auto tracking
│   └── ...
├── layouts/             # Page layouts
│   ├── dashboard/       # Trang chính hiển thị danh sách microphone
│   ├── authentication/ # Trang đăng nhập (không sử dụng)
│   └── ...
├── context/             # React Context cho state management
├── assets/              # Static assets (images, themes)
├── App.js              # Root component
├── routes.js           # Routing configuration
└── index.js            # Entry point
```

## Cài đặt và chạy

### 1. Yêu cầu hệ thống
- Node.js >= 18
- npm hoặc yarn
- Docker (tùy chọn)

### 2. Cài đặt dependencies

```bash
# Clone repository
git clone <repository-url>
cd dcerno_vhd_ui

# Cài đặt packages
npm install
```

### 3. Cấu hình environment

Tạo file `.env` trong thư mục gốc:

```env
REACT_APP_SERVICE_URL=http://localhost:8000
```

**Lưu ý**: `REACT_APP_SERVICE_URL` là URL của backend API server.

### 4. Chạy development

```bash
# Chạy development server
npm start

# Ứng dụng sẽ chạy tại http://localhost:3000
```

### 5. Build production

```bash
# Build for production
npm run build

# Kết quả build sẽ ở thư mục build/
```

### 6. Chạy với Docker

```bash
# Build và chạy với Docker Compose
docker-compose up -d

# Ứng dụng sẽ chạy tại http://localhost:3000
```

### 7. Deploy riêng lẻ với Docker

```bash
# Build image
docker build -t dcerno_vhd_ui:latest .

# Chạy container
docker run -p 3000:80 dcerno_vhd_ui:latest
```

## API Endpoints

Ứng dụng kết nối với backend qua các endpoints sau:

### Microphone Management
- `GET /microphones` - Lấy danh sách microphone
- `POST /microphones/{id}/preset?camera_ip={ip}` - Thiết lập preset
- `DELETE /microphones/{id}/preset` - Xóa preset
- `POST /microphones/{id}/call` - Gọi camera
- `POST /microphones/ping` - Ping microphone service

### Camera Management  
- `GET /cameras` - Lấy danh sách camera
- `POST /camera/ping` - Ping camera service

### Auto Tracking
- `GET /tracking` - Lấy trạng thái tracking
- `POST /tracking?tracking_enabled={boolean}&camera_ip={ip}` - Bật/tắt tracking

### General
- `POST /ping` - Health check

## Components chính

### 1. MicroCard (`src/examples/Cards/MicroCard/index.js`)

Component hiển thị thông tin từng microphone:

**Props:**
- `id`: Serial number microphone
- `image`: Hình ảnh microphone
- `status`: Trạng thái ("0" = tắt, "1" = bật)
- `preset`: Boolean, đã thiết lập preset hay chưa
- `title`: Tên hiển thị
- `cameraIp`: IP camera đang được gán

**Chức năng:**
- Hiển thị trạng thái microphone (bật/tắt)
- Hiển thị trạng thái preset (đã set/chưa set)
- Button "Preset": Mở dialog chọn camera để gán
- Button "Call": Gọi camera (yêu cầu đã có preset)

### 2. Dashboard (`src/layouts/dashboard/index.js`)

Trang chính hiển thị danh sách microphone:

**Chức năng:**
- Fetch danh sách microphone từ API mỗi 1 giây
- Hiển thị grid các MicroCard
- Tích hợp ToastContainer cho thông báo

### 3. Configurator (`src/examples/Configurator/index.js`)

Panel cấu hình auto tracking:

**Chức năng:**
- Toggle bật/tắt auto tracking
- Chọn camera cho auto tracking
- Cấu hình giao diện (theme, colors)

### 4. DashboardNavbar (`src/examples/Navbars/DashboardNavbar/index.js`)

Navigation bar với:
- Ping các services (camera, microphone, general)
- Hiển thị trạng thái kết nối
- Menu và breadcrumbs

## State Management

Sử dụng React Context (`src/context/index.js`) để quản lý:

### Global State
- `miniSidenav`: Thu gọn sidebar
- `transparentSidenav`: Sidebar trong suốt  
- `whiteSidenav`: Sidebar màu trắng
- `sidenavColor`: Màu sidebar
- `darkMode`: Chế độ tối
- `layout`: Layout hiện tại
- `direction`: Hướng text (ltr/rtl)

### State Actions
```javascript
import { useMaterialUIController, setDarkMode } from "context";

function MyComponent() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  
  const handleToggleDarkMode = () => {
    setDarkMode(dispatch, !darkMode);
  };
}
```

## Routing

Cấu hình trong `src/routes.js`:

```javascript
const routes = [
  {
    type: "collapse",        // Loại menu item
    name: "Home",           // Tên hiển thị
    key: "home",            // Key unique
    icon: <Icon>home</Icon>, // Icon
    route: "/home",         // URL path
    component: <Dashboard />, // Component render
  }
];
```

**Loại route:**
- `collapse`: Menu item thường
- `hide`: Ẩn khỏi menu
- `title`: Tiêu đề section
- `divider`: Phân cách

## Styling & Theming

### Material-UI Theme
- Theme được định nghĩa trong `src/assets/theme/`
- Hỗ trợ light/dark mode
- Hỗ trợ RTL (right-to-left)

### Custom Components
Tất cả component đều prefix `MD` (Material Dashboard):
- `MDBox`: Container với Material styling
- `MDButton`: Button với theme integration
- `MDTypography`: Text với typography scale
- `MDBadge`: Labels và badges

### Responsive Design
- Sử dụng MUI Grid system
- Breakpoints: xs, sm, md, lg, xl
- Mobile-first approach

## Best Practices

### 1. Component Structure
```javascript
import PropTypes from "prop-types";

function MyComponent({ prop1, prop2 }) {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Logic
  };
  
  // Render
  return (
    <MDBox>
      {/* JSX */}
    </MDBox>
  );
}

// PropTypes
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.bool,
};

// Default props
MyComponent.defaultProps = {
  prop2: false,
};

export default MyComponent;
```

### 2. API Calls
```javascript
const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}/endpoint`, {
      method: "GET",
    });
    const status = response.status;
    const data = await response.json();
    
    if (status >= 300) {
      throw new Error(data.error);
    }
    
    // Handle success
    setData(data);
    toast.success("Thành công");
    
  } catch (error) {
    console.error(error);
    toast.error("Có lỗi xảy ra");
  }
};
```

### 3. Error Handling
- Luôn wrap API calls trong try-catch
- Sử dụng toast notifications cho user feedback
- Log errors cho debugging
- Graceful degradation khi API không khả dụng

## Debugging

### Development Tools
- React Developer Tools
- Redux DevTools (cho Context debugging)
- Network tab để monitor API calls

### Common Issues
1. **CORS errors**: Kiểm tra backend CORS configuration
2. **API connection**: Verify REACT_APP_SERVICE_URL
3. **Build failures**: Clear node_modules và npm install lại
4. **Docker issues**: Kiểm tra port conflicts

### Logging
```javascript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## Deployment

### Environment Variables
Production cần set:
```env
REACT_APP_SERVICE_URL=https://your-api-domain.com
```

### Docker Production
```bash
# Build
docker build -t dcerno_vhd_ui:prod .

# Run với environment
docker run -e REACT_APP_SERVICE_URL=https://api.domain.com \
  -p 80:80 dcerno_vhd_ui:prod
```

### CI/CD Considerations
1. Build và test trước khi deploy
2. Environment-specific configs
3. Health checks
4. Rolling updates

## Mở rộng tính năng

### Thêm component mới
1. Tạo folder trong `src/components/` hoặc `src/examples/`
2. Implement component với PropTypes
3. Export từ index.js
4. Import và sử dụng

### Thêm page mới
1. Tạo layout trong `src/layouts/`
2. Thêm route vào `src/routes.js`
3. Component sẽ tự động xuất hiện trong sidebar

### Thêm API endpoint
1. Thêm function call API
2. Handle loading và error states
3. Update UI state
4. Thêm toast notifications

## Troubleshooting

### Lỗi thường gặp
1. **Module not found**: Kiểm tra import paths
2. **Props validation**: Kiểm tra PropTypes
3. **API timeout**: Kiểm tra network và backend status
4. **Build size**: Optimize imports, lazy loading

### Performance
- Sử dụng React.memo cho components không thay đổi thường xuyên
- Lazy loading cho routes
- Optimize bundle size
- Minimize re-renders

## Contributing

### Code Style
- Sử dụng ESLint và Prettier configs có sẵn
- Follow existing naming conventions
- Comment code phức tạp
- PropTypes cho tất cả components

### Git Workflow
```bash
# Tạo feature branch
git checkout -b feature/new-feature

# Commit với message rõ ràng
git commit -m "feat: add new microphone status indicator"

# Push và tạo Pull Request
git push origin feature/new-feature
```

### Testing
```bash
# Chạy tests
npm test

# Test coverage
npm run test:coverage
``` 