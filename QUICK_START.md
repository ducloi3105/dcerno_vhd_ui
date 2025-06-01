# Quick Start Guide - Camera Tracking System

## Bắt đầu nhanh (5 phút)

### Bước 1: Clone và cài đặt
```bash
git clone <repository-url>
cd dcerno_vhd_ui
npm install
```

### Bước 2: Cấu hình environment
Tạo file `.env`:
```env
REACT_APP_SERVICE_URL=http://localhost:8000
```

### Bước 3: Chạy ứng dụng
```bash
npm start
```

Truy cập: http://localhost:3000

## Chạy với Docker (1 phút)

```bash
# Với Docker Compose
docker-compose up -d

# Hoặc build riêng
docker build -t dcerno_vhd_ui .
docker run -p 3000:80 dcerno_vhd_ui
```

## Cấu trúc cơ bản

### Frontend (React)
- **Trang chính**: Dashboard hiển thị danh sách microphone
- **Component chính**: MicroCard - quản lý từng microphone
- **Cấu hình**: Panel settings cho auto tracking

### API Requirements
Backend cần cung cấp các endpoints:
- `GET /microphones` - Danh sách microphone
- `GET /cameras` - Danh sách camera  
- `POST /microphones/{id}/preset` - Thiết lập preset
- `POST /microphones/{id}/call` - Gọi camera
- `GET /tracking` - Trạng thái tracking
- `POST /tracking` - Bật/tắt tracking

## Scripts chính

```bash
npm start          # Development server
npm run build      # Production build  
npm test           # Run tests
npm run eject      # Eject from create-react-app
```

## Thay đổi thường gặp

### 1. Thay đổi URL API
File `.env`:
```env
REACT_APP_SERVICE_URL=http://your-backend-url
```

### 2. Thêm microphone mới
Không cần thay đổi code, chỉ cần backend trả về trong API `/microphones`

### 3. Thay đổi interval polling
File `src/layouts/dashboard/index.js`, line 71:
```javascript
let interval = setInterval(() => fetchData(), (1000)) // 1 giây
```

### 4. Thay đổi theme colors
File `src/routes.js` hoặc `src/context/index.js`

## Cấu trúc data API

### Microphone response
```json
{
  "micros": [
    {
      "uid": "001",
      "stat": "1",  
      "preset": true,
      "camera_ip": "192.168.0.88"
    }
  ]
}
```

### Camera response
```json
["192.168.0.88", "192.168.0.89"]
```

### Tracking response  
```json
{
  "tracking_enabled": true,
  "camera_ip": "192.168.0.88"
}
```

## Troubleshooting nhanh

### API không kết nối được
1. Kiểm tra `REACT_APP_SERVICE_URL` trong `.env`
2. Kiểm tra backend có chạy không
3. Kiểm tra CORS settings của backend

### Build lỗi
```bash
rm -rf node_modules package-lock.json
npm install
```

### Docker lỗi
```bash
docker system prune -f
docker-compose down && docker-compose up --build
```

### Performance chậm
- Tăng interval polling (giảm tần suất gọi API)
- Kiểm tra Network tab trong DevTools
- Optimize backend response time

## Demo Data

Nếu chưa có backend, comment dòng `fetchData()` trong `src/layouts/dashboard/index.js` và uncomment phần demo data:

```javascript
// Uncomment this for demo
data = {
  micros: [
    {
      uid: "001",
      stat: "1",
      preset: true,
      camera_ip: '192.168.0.88'
    },
    {
      uid: "002", 
      stat: "0",
      preset: false,
      camera_ip: ''
    },
  ],
};
```

## Production Deploy

### Environment variables cần thiết:
```env
REACT_APP_SERVICE_URL=https://your-production-api.com
```

### Docker production:
```bash
docker build -t dcerno_vhd_ui:prod .
docker run -e REACT_APP_SERVICE_URL=https://api.domain.com -p 80:80 dcerno_vhd_ui:prod
```

## Liên hệ

Nếu gặp vấn đề, check:
1. Console errors trong browser
2. Network tab để xem API calls
3. Backend logs
4. File `DEVELOPER_DOCS.md` để biết chi tiết 