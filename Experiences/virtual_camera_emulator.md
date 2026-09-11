title Virtual 360° Camera Emulator
direction down

"Build" [color: orange] {
  "GitLab CI / Device Tools" [icon: git-branch, color: orange]
  "Go Camera Emulator" [icon: code, color: blue]
  "H.264 Test Media" [icon: video, color: green]
  "Docker Image" [icon: box, color: blue]
}

"Package & Deploy" [color: purple] {
  "AWS ECR" [shape: cylinder, icon: aws, color: orange]
  "MioApp Manifest" [icon: file-json, color: purple]
  "mioappctl" [icon: terminal, color: blue]
}

"CTM Runtime" [color: purple] {
  "mioappd" [icon: server, color: purple]
  "Firecracker microVM" [icon: cpu, color: purple]
}

"Production Camera Contract" [color: green] {
  "HTTP Camera API :80" [icon: globe, color: blue]
  "H.264 over RTSP :554" [icon: video, color: green]
}

"Existing Camera Stack" [color: blue] {
  "CTM Firewall / DNAT" [icon: shield, color: red]
  "Camera Manager" [icon: workflow, color: blue]
  "Miovision One" [shape: oval, icon: monitor, color: blue]
}

"GitLab CI / Device Tools" > "Go Camera Emulator": "Build ARM64 Linux app"
"H.264 Test Media" > "Go Camera Emulator": "Provide reproducible video input"
"Go Camera Emulator" > "Docker Image": "Package app + dependencies"

"Docker Image" > "AWS ECR": "Push versioned image"
"GitLab CI / Device Tools" > "MioApp Manifest": "Record image digest + runtime config"
"MioApp Manifest" > "mioappctl": "Image, ports, CPU/memory, MQTT entitlements"

"mioappctl" > "mioappd": "Deploy application"
"mioappd" < "AWS ECR": "Pull Docker image"
"mioappd" > "Firecracker microVM": "Launch isolated workload"

"Firecracker microVM" > "HTTP Camera API :80": "Emulate production camera API"
"Firecracker microVM" > "H.264 over RTSP :554": "Serve 1080p camera stream"

"HTTP Camera API :80" > "CTM Firewall / DNAT": "DNAT to :20080"
"H.264 over RTSP :554" > "CTM Firewall / DNAT": "DNAT to :20554"

"CTM Firewall / DNAT" > "Camera Manager": "Expose expected camera endpoints"
"Camera Manager" > "Miovision One": "Use virtual camera unchanged"