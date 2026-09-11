// Allocate — System Design
title Allocate System Design
direction right

"Mac User" [shape: oval, icon: user, color: blue]

"Allocate.app\nSwiftUI + Swift Charts" [icon: layout-dashboard, color: blue]

"Mach IPC / XPC" [shape: cylinder, icon: cycle, color: purple]

"Allocate Core Daemon + Governor" [icon: cpu, color: orange]

"macOS Observability\nlibproc • Mach • IOKit" [icon: activity, color: green]

"Foreground & Background Apps" [shape: oval, icon: monitor, color: blue]

"AppKit / NSWorkspace\nForeground-app events" [icon: eye, color: green]

"taskpolicy\nApple scheduling control" [shape: oval, icon: terminal, color: yellow]

"XNU QoS Policy" [shape: oval, icon: scale, color: red]

"Apple Silicon Scheduler\nPerformance + Efficiency Cores" [shape: oval, icon: cpu, color: red]

// User control and live dashboard
"Mac User" > "Allocate.app\nSwiftUI + Swift Charts": "View CPU usage; set rules"
"Allocate.app\nSwiftUI + Swift Charts" > "Mach IPC / XPC": "Thresholds, pause, manual overrides"
"Mach IPC / XPC" > "Allocate Core Daemon + Governor": "Configuration"
"Allocate Core Daemon + Governor" > "Mach IPC / XPC": "Live telemetry"
"Mach IPC / XPC" > "Allocate.app\nSwiftUI + Swift Charts": "Process table + CPU chart"

// macOS signals and measurement
"Foreground & Background Apps" > "AppKit / NSWorkspace\nForeground-app events": "App switch event"
"AppKit / NSWorkspace\nForeground-app events" > "Allocate Core Daemon + Governor": "Protect active app"
"Foreground & Background Apps" > "macOS Observability\nlibproc • Mach • IOKit": "CPU, memory, threads, battery"
"macOS Observability\nlibproc • Mach • IOKit" > "Allocate Core Daemon + Governor": "System snapshot"

// Decision and enforcement
"Allocate Core Daemon + Governor" > "taskpolicy\nApple scheduling control": "Throttle heavy background work"
"taskpolicy\nApple scheduling control" > "XNU QoS Policy": "Apply background / restore policy"
"XNU QoS Policy" > "Apple Silicon Scheduler\nPerformance + Efficiency Cores": "Prioritize foreground"
"Apple Silicon Scheduler\nPerformance + Efficiency Cores" > "Foreground & Background Apps": "Schedule work across cores"
"Apple Silicon Scheduler\nPerformance + Efficiency Cores" > "Foreground & Background Apps": "Schedule work across cores"