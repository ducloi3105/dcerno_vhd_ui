# API Documentation - Camera Tracking System Backend

## Tổng quan

Frontend Camera Tracking System cần backend cung cấp các API endpoints để quản lý microphone, camera và auto tracking. Tất cả API calls được thực hiện qua `fetch()` với base URL từ `REACT_APP_SERVICE_URL`.

## Base Configuration

```javascript
const baseUrl = process.env.REACT_APP_SERVICE_URL; // e.g., "http://localhost:8000"
```

## CORS Requirements

Backend cần cấu hình CORS để cho phép requests từ frontend domain:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Endpoints

### 1. Microphone Management

#### GET /microphones
Lấy danh sách tất cả microphone

**Request:**
```
GET /microphones
```

**Response:**
```json
{
  "micros": [
    {
      "uid": "001",
      "stat": "1",
      "preset": true,
      "camera_ip": "192.168.0.88"
    },
    {
      "uid": "002", 
      "stat": "0",
      "preset": false,
      "camera_ip": ""
    }
  ]
}
```

**Fields:**
- `uid` (string): Unique identifier của microphone
- `stat` (string): Trạng thái microphone ("0" = tắt, "1" = bật)
- `preset` (boolean): Đã thiết lập preset camera hay chưa
- `camera_ip` (string): IP address của camera đang được gán (có thể rỗng)

**Error Response:**
```json
{
  "error": "Error message"
}
```

---

#### POST /microphones/{id}/preset
Thiết lập preset gán microphone với camera

**Request:**
```
POST /microphones/001/preset?camera_ip=192.168.0.88
```

**Response Success (200):**
```json
{
  "message": "Preset created successfully"
}
```

**Response Error (400+):**
```json
{
  "error": "Lỗi khi thiết lập preset"
}
```

---

#### DELETE /microphones/{id}/preset
Xóa preset của microphone

**Request:**
```
DELETE /microphones/001/preset
```

**Response Success (200):**
```json
{
  "message": "Preset deleted successfully"  
}
```

**Response Error (400+):**
```json
{
  "error": "Lỗi khi xóa preset"
}
```

---

#### POST /microphones/{id}/call
Gọi camera từ microphone (yêu cầu đã có preset)

**Request:**
```
POST /microphones/001/call
```

**Response Success (200):**
```json
{
  "message": "Camera called successfully"
}
```

**Response Error (400+):**
```json
{
  "error": "Chưa cài preset" 
}
```

---

#### POST /microphones/ping
Health check cho microphone service

**Request:**
```
POST /microphones/ping
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 2. Camera Management

#### GET /cameras
Lấy danh sách tất cả camera có sẵn

**Request:**
```
GET /cameras
```

**Response:**
```json
["192.168.0.88", "192.168.0.89", "192.168.0.90"]
```

**Note:** Response là array of strings, mỗi string là IP address của camera

---

#### POST /camera/ping  
Health check cho camera service

**Request:**
```
POST /camera/ping
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 3. Auto Tracking

#### GET /tracking
Lấy trạng thái hiện tại của auto tracking

**Request:**
```
GET /tracking
```

**Response:**
```json
{
  "tracking_enabled": true,
  "camera_ip": "192.168.0.88"
}
```

**Fields:**
- `tracking_enabled` (boolean): Auto tracking có được bật hay không
- `camera_ip` (string): IP của camera đang được sử dụng cho tracking

---

#### POST /tracking
Bật/tắt auto tracking

**Request:**
```
POST /tracking?tracking_enabled=true&camera_ip=192.168.0.88
```

**Query Parameters:**
- `tracking_enabled` (boolean): true để bật, false để tắt
- `camera_ip` (string): IP của camera sử dụng cho tracking

**Response Success (200):**
```json
{
  "tracking_enabled": true,
  "camera_ip": "192.168.0.88"
}
```

**Response Error (400+):**
```json
{
  "error": "Lỗi khi cấu hình tracking"
}
```

### 4. General Health Check

#### POST /ping
General health check cho toàn bộ system

**Request:**
```
POST /ping
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "microphone": "ok",
    "camera": "ok", 
    "tracking": "ok"
  }
}
```

## Error Handling

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `404`: Not Found (microphone/camera not found)
- `500`: Internal Server Error

### Error Response Format
```json
{
  "error": "Detailed error message in Vietnamese"
}
```

### Frontend Error Handling
Frontend sẽ:
1. Check HTTP status code
2. Parse JSON response
3. Hiển thị toast notification với error message
4. Log error ra console

## Implementation Notes

### Polling Behavior
- Frontend polls `GET /microphones` mỗi 1 giây
- Nếu API không khả dụng, frontend vẫn hoạt động bình thường
- Không có authentication hiện tại

### Concurrent Requests
- Frontend có thể gửi multiple requests cùng lúc
- Backend nên handle concurrent requests properly
- Implement rate limiting nếu cần thiết

### Response Time Requirements
- API responses nên < 500ms để UX tốt
- Polling interval có thể điều chỉnh nếu backend chậm
- Loading states được handle trong frontend

## Sample Backend Implementation (Express.js)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data
let microphones = [
  { uid: "001", stat: "1", preset: true, camera_ip: "192.168.0.88" },
  { uid: "002", stat: "0", preset: false, camera_ip: "" }
];

let cameras = ["192.168.0.88", "192.168.0.89"];
let tracking = { tracking_enabled: false, camera_ip: "" };

// Microphone endpoints
app.get('/microphones', (req, res) => {
  res.json({ micros: microphones });
});

app.post('/microphones/:id/preset', (req, res) => {
  const { id } = req.params;
  const { camera_ip } = req.query;
  
  const mic = microphones.find(m => m.uid === id);
  if (!mic) return res.status(404).json({ error: "Microphone not found" });
  
  mic.preset = true;
  mic.camera_ip = camera_ip;
  res.json({ message: "Preset created successfully" });
});

app.delete('/microphones/:id/preset', (req, res) => {
  const { id } = req.params;
  
  const mic = microphones.find(m => m.uid === id);
  if (!mic) return res.status(404).json({ error: "Microphone not found" });
  
  mic.preset = false;
  mic.camera_ip = "";
  res.json({ message: "Preset deleted successfully" });
});

app.post('/microphones/:id/call', (req, res) => {
  const { id } = req.params;
  
  const mic = microphones.find(m => m.uid === id);
  if (!mic) return res.status(404).json({ error: "Microphone not found" });
  if (!mic.preset) return res.status(400).json({ error: "Chưa cài preset" });
  
  // Implement camera calling logic here
  res.json({ message: "Camera called successfully" });
});

// Camera endpoints
app.get('/cameras', (req, res) => {
  res.json(cameras);
});

// Tracking endpoints
app.get('/tracking', (req, res) => {
  res.json(tracking);
});

app.post('/tracking', (req, res) => {
  const { tracking_enabled, camera_ip } = req.query;
  
  tracking.tracking_enabled = tracking_enabled === 'true';
  tracking.camera_ip = camera_ip || '';
  
  res.json(tracking);
});

// Health checks
app.post('/ping', (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    services: { microphone: "ok", camera: "ok", tracking: "ok" }
  });
});

app.post('/microphones/ping', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post('/camera/ping', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(8000, () => {
  console.log('Backend running on port 8000');
});
```

## Testing

### Manual Testing
```bash
# Test microphones endpoint
curl http://localhost:8000/microphones

# Test preset creation
curl -X POST "http://localhost:8000/microphones/001/preset?camera_ip=192.168.0.88"

# Test camera call
curl -X POST http://localhost:8000/microphones/001/call

# Test tracking
curl http://localhost:8000/tracking
curl -X POST "http://localhost:8000/tracking?tracking_enabled=true&camera_ip=192.168.0.88"
```

### Integration Testing
1. Start backend server
2. Start frontend với REACT_APP_SERVICE_URL pointing to backend
3. Verify all functionality works through UI
4. Check browser Network tab for API calls
5. Verify error handling với invalid requests 