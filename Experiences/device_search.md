title Nautilus Organization Search
direction down

"Device Search" [icon: search, color: blue]
"DUS API" [icon: server, color: blue]
"Device Locator" [icon: route, color: orange]
"Org Resolver" [icon: git-branch, color: orange]
"PDRS" [icon: database, color: green]
"DataLink" [icon: database, color: yellow]
"Org Mapping" [icon: link, color: green]
"Identity Service" [icon: building, color: purple]
"Organization Cache" [shape: cylinder, icon: database, color: purple]
"Search Result" [shape: oval, icon: check-circle, color: blue]

"Device Search" > "DUS API": "Search by serial"
"DUS API" > "Device Locator": "Resolve organization"
"Device Locator" > "Org Resolver": "Portable device"
"Org Resolver" > "PDRS": "1. Primary lookup"
"Org Resolver" > "DataLink": "2. Guarded fallback"
"PDRS" > "Org Mapping": "MioOne organization ID"
"DataLink" > "Org Mapping": "Unmigrated organization ID"
"Identity Service" > "Organization Cache": "Scheduled metadata sync"
"Org Mapping" > "Organization Cache": "Match organization ID"
"Organization Cache" > "Search Result": "Return ID and name"
