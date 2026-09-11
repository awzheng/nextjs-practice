title Network Core RAUC Streaming
direction right

"Build Path" [color: orange] {
  "GitLab CI" [icon: git-branch, color: orange]
  "Bundle S3" [shape: cylinder, icon: database, color: yellow]
}

"Trigger Path" [color: purple] {
  "Upgrade Service" [icon: send, color: purple]
  "AWS IoT Shadow" [icon: cloud, color: orange]
  "Node Upgrader" [icon: cpu, color: blue]
  "Settings Lambda" [icon: workflow, color: purple]
}

"Install Path" [color: green] {
  "RAUC Service" [icon: download, color: green]
  "A/B Slots" [shape: cylinder, icon: hard-drive, color: red]
}

"GitLab CI" > "Bundle S3": "Publish bundle"

"Upgrade Service" > "AWS IoT Shadow": "Set desired version"
"AWS IoT Shadow" > "Node Upgrader": "Send shadow delta"
"Node Upgrader" > "Settings Lambda": "Get signed URL"
"Settings Lambda" > "Bundle S3": "Validate bundle"

"Node Upgrader" > "RAUC Service": "Pass signed URL"
"Bundle S3" > "RAUC Service": "Stream bundle ranges"
"RAUC Service" > "A/B Slots": "Reuse and install"
