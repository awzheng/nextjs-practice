title Albedo System Design
direction down

"Mac User" [shape: oval, icon: user, color: blue]
"SwiftUI Menu Bar" [icon: layout-dashboard, color: blue]
"Ratatui CLI" [icon: terminal, color: blue]
"Rust Thermal Engine" [icon: cpu, color: orange]
"Metrics HTTP API" [icon: activity, color: purple]
"Prometheus TSDB" [shape: cylinder, icon: database, color: purple]
"Grafana Dashboards" [icon: chart-line, color: blue]
"AppleSMC / IOKit" [icon: thermometer, color: green]
"IOReport / libproc" [icon: activity, color: green]
"Allocate XPC Daemon" [icon: cycle, color: yellow]
"Apple Silicon Scheduler" [shape: oval, icon: cpu, color: red]
"Grafana Alloy" [icon: send, color: purple]

"Mac User" > "SwiftUI Menu Bar": "View and control"
"Mac User" > "Ratatui CLI": "Inspect and govern"
"SwiftUI Menu Bar" > "Rust Thermal Engine": "C ABI snapshots"
"Ratatui CLI" > "Rust Thermal Engine": "Native Rust calls"
"AppleSMC / IOKit" > "Rust Thermal Engine": "Sensor readings"
"IOReport / libproc" > "Rust Thermal Engine": "Power and processes"
"Rust Thermal Engine" > "Metrics HTTP API": "Expose derived metrics"
"Metrics HTTP API" > "Prometheus TSDB": "Local scrape"
"Prometheus TSDB" > "Grafana Dashboards": "Fleet visualization"
"Metrics HTTP API" > "Grafana Alloy": "Scrape host metrics"
"Grafana Alloy" > "Prometheus TSDB": "Remote write"
"Rust Thermal Engine" > "Allocate XPC Daemon": "Request E-core hold"
"Allocate XPC Daemon" > "Apple Silicon Scheduler": "Apply QoS policy"