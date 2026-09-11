title Tuba CV Soak
direction right

"CI Control" {
  "GitLab Trigger" [icon: gitlab, color: orange]
  "Soak Pipeline" [icon: workflow, color: orange]
}

"Test Harness" {
  "Test Infrastructure" [icon: settings, color: purple]
  "Tuba Runner" [icon: server, color: purple]
  "Test Framework" [icon: terminal, color: blue]
  "AWS IoT" [icon: cloud, color: yellow]
}

"Device Pair" {
  "Tuba Radio" [icon: radio, color: green]
  "Tuba CV" [icon: camera, color: green]
}

"Results" {
  "Soak Metrics" [icon: activity, color: blue]
  "Slack Result" [shape: oval, icon: send, color: blue]
}

"GitLab Trigger" > "Soak Pipeline": "Manual or StreamAgent"
"Test Infrastructure" > "Tuba Runner": "Provision tags and config"
"Test Infrastructure" > "AWS IoT": "Provision test access"
"Soak Pipeline" > "Tuba Runner": "Route soak-test,tuba"
"Tuba Runner" > "Test Framework": "Run version 3.2.1"
"Test Framework" > "AWS IoT": "Set desired bundle"
"AWS IoT" > "Tuba Radio": "Deliver shadow delta"
"Tuba Radio" > "Tuba CV": "Stage and reboot"
"Tuba CV" > "Soak Metrics": "Monitor through Radio"
"Soak Metrics" > "Slack Result": "Pass or fail"
