// Diagram 1 - Write Path

title CrawlStars Write Path
direction right

"User Input" [shape: oval, icon: user, color: blue]

"cmd/crawler/" [color: green] {
  "main.go" [icon: play-circle, color: green]
  "Initialize DB" [shape: oval, icon: database]
  "Spawn Workers" [shape: oval, icon: users]
}

"internal/crawler/crawler.go" [color: purple] {
  "Work Queue" [shape: cylinder, icon: layers, color: purple]
  "Visited Check" [shape: diamond, icon: git-commit]
  "Fetch HTML" [shape: oval, icon: download]
  "Parse <body>" [shape: oval, icon: code]
  "Extract Links" [shape: oval, icon: link]
  "Results Channel" [shape: cylinder, icon: inbox, color:purple]
}

"internal/database/" [color: orange] {
  "mongo.go" [icon: database, color: orange]
  "InsertPage()" [shape: oval, icon: save]
}

"MongoDB Atlas" [shape: cylinder, icon: cloud, color: blue]

// Setup Flow
"User Input" > "main.go": "Set SEED_URL"
"main.go" > "Initialize DB": database. Connect()
"Initialize DB" > "Spawn Workers": "Start(10 workers)"
"Spawn Workers" > "Work Queue": "Push seed URL"

// Worker Loop (10 concurrent goroutines)
"Work Queue" > "Visited Check": "Worker pops URL"
"Visited Check" > "Fetch HTML": "If new URL"

// Processing
"Fetch HTML" > "Parse <body>": "Tokenize HTML"
"Parse <body>" > "Extract Links": "Find tags"
"Parse <body>" > "Results Channel": "Send page data"

// Feedback Loop
"Extract Links" > "Work Queue": "Queue new URLs"

// Storage
"Results Channel" > "mongo.go": "Read from channel"
"mongo.go" > "InsertPage()": "Upsert page"
"InsertPage()" > "MongoDB Atlas": Store page 

// Diagram 2 - Read Path

title CrawlStars Read Path
direction right

"User" [shape: oval, icon: user, color: blue]

"web/" [color: green] {
  "index.html" [icon: layout, color: green]
  "Type Query" [shape: oval, icon: search]
  "Send Request" [shape: oval, icon: send]
  "Display Results" [shape: oval, icon: eye]
}

"cmd/server/" [color: purple] {
  "main.go" [icon: server, color: purple]
  "Receive Request" [shape: oval, icon: inbox]
  "Parse Query" [shape: oval, icon: filter]
}

"internal/database/" [color: orange] {
  "mongo.go" [icon: database, color: orange]
  "SearchPages()" [shape: oval, icon: search]
  "Calculate Stars" [shape: oval, icon: star]
}

"MongoDB Atlas" [shape: cylinder, icon: cloud, color: blue]

"User" > "index.html": "Enter search term"
"index.html" > "Type Query"
"Type Query" > "Send Request": "performSearch()"
"Send Request" > "main.go": "GET /search?q=..."
"main.go" > "Receive Request": "searchHandler()"
"Receive Request" > "Parse Query": "Get query param"
"Parse Query" > "mongo.go": "db.SearchPages()"
"mongo.go" > "SearchPages()": "Build pipeline"
"SearchPages()" > "MongoDB Atlas": "Atlas Search"
"MongoDB Atlas" > "Calculate Stars": "Return scores"
"Calculate Stars" > "Display Results": Send JSON
"Display Results" > "User": Show results