# Glossary

One line per keyword. Format:

```
- term — why you chose it
```

Rules that actually matter:

- **Ten words or fewer.** It has to be readable in one glance and sayable out loud.
- Answer *why*, not *what*. "Compact binary with schema evolution" beats "a serialization format".
- The `term` must match the text you wrapped in `<K>` in `app/page.tsx` (case-insensitive).
- Separator can be `—`, `–`, `-`, or `:`. The first one on the line wins, so the
  explanation itself can contain dashes.

Only `-` lines under a `##` heading count as definitions. Everything above the first
`##` — including this list — is notes, so add whatever you want up here. Sections are
just grouping; rename and reorder them freely.

Run `npm run check` after editing. It flags duplicate terms, keywords on the page with
no definition, and definitions nothing uses.

---

## Miovision · RAUC firmware streaming

- RAUC — A/B slot updater with atomic rollback on failed boot
- Yocto — Custom embedded Linux build; ship only what devices need
- x86-64 — Gateway-class device architecture, unlike the ARM64 camera devices
- MioconnectOS — Miovision's Yocto-based Linux distro for network-core devices
- Node.js — Existing updater's language; streams are first-class, no rewrite
- adaptive block hash index — Hash blocks, fetch only changed ones — rsync-style delta
- HTTP streaming — Install block (chunks) by block as they arrive over continuous HTTP connection, comes with risks
- AWS IoT — Device shadows converge "desired" versus "reported" firmware version
- OTA — Over-the-air update - cellular bandwidth is billed per device

## Miovision · HIL soak pipeline

- HIL — Hardware-in-the-loop; real devices catch faults emulators miss
- ARM64 — Camera-class device architecture; needs its own native pipeline
- GitLab CI — Miovision's existing runner fleet; no new CI system
- Terraform — Map/blueprint; declares runner infrastructure; state file makes rebuilds reproducible
- Ansible — Decorator/contractor; config software inside runners before running software
- CV — Computer-vision device doing on-edge vehicle detection
- 48h — Long enough to surface thermal and memory-leak drift
- frame-drop — CV pipeline health signal; drops mean missed detections

## Miovision · Virtual camera emulator

- Firecracker-microVM — Firecracker microVM over Docker - guest kernel, fast 125ms boot, only 5MB RAM, safe concurrency
- Go — Static ARM64 binary, small image, native concurrency for RTSP
- Docker — OCI packaging from ECR; the VM draws the boundary
- H.264 — Industry standard encoding; what production cameras emit; decoder stays unchanged
- RTSP — Production camera's :554 contract; Camera Manager needs no changes
- camera-API — Mirrors real camera's HTTP :80 so callers stay unchanged
- CTM — Core Traffic Module — embedded host running the microVM

## Miovision · Device search

- dual lookup — PDRS primary, guarded DataLink fallback for unmigrated organizations
- Kotlin — Existing service's language; null-safety on the JVM
- Spring Boot — Team's standard JVM framework; DI and Kafka clients built-in
- schema-registry — Central contract so producers can't break index consumers
- Avro — Data serialization framework; Compact binary with schema evolution; JSON wastes Kafka bandwidth
- Kafka — Collect/store/process data. Replayable log lets the index rebuild from scratch
- Kubernetes — Manages many distributed containers. Used locally. Rolling replacement rebuilds index behind a stable ClusterIP
- stale results — Search hit cached org data devices had already left

## Allocate

- Rust — Memory safety across the FFI boundary, no runtime
- XNU QoS — Supported way to ask the scheduler to demote work
- Darwin API — Apple's user-space surface: libproc, sysctl, Mach traps
- Mach IPC — Kernel-mediated messaging; the only sanctioned privileged channel
- POSIX — Portable thread-policy calls instead of private kernel APIs
- P/E cores — Performance versus efficiency cores; wrong placement wastes battery
- default scheduling — macOS optimizes for latency, not for background restraint
- POSIX thread policies — Standard per-thread scheduling hints the kernel already honors
- Rust FFI — Call C Darwin APIs directly with no bridging layer
- NSWorkspace — AppKit fires app-switch events, so no polling needed
- proc pidinfo — One cheap syscall per process snapshot per tick
- Mach CPU ticks — Raw kernel counters; deltas give true core utilization
- 500ms — Fast enough to react, slow enough to stay cheap
- libxpc — C XPC API callable from Rust; Swift bridge unavailable
- override IPC — Daemon holds privilege; the app only sends requests
- SwiftUI — Native macOS chrome with minimal code and system look
- AppKit — Fills SwiftUI's gaps: menu bar, workspace events, windows
- Charts — First-party live plotting; no charting dependency to maintain
- Mach/XPC IPC — Two-way channel between sandboxed app and root daemon

## Albedo

- PID-level — Per-process-ID targeting — not a PID control loop
- launchd — System supervisor that starts and restarts the privileged daemon
- XPC Mach service — Named service lets Albedo reach Allocate's privileged daemon
- AppleSMC — System Management Controller; the only real thermal sensor source
- IOKit — User-space gateway into kernel drivers for sensor access
- IOReport — Kernel's existing power counters; near-zero sampling cost
- ANE — Apple Neural Engine; its power shows up in thermals
- SoC energy — Whole-chip power draw, the actual source of heat
- DVFS residency — Time spent per clock state; reveals throttling directly
- thermal-throttling — Clock loss under heat; the thing I measured reducing
- PPW — Performance per watt; the real efficiency metric
- thermostat — Setpoint plus hysteresis gap prevents oscillating between states
- E-core override — Park hot processes on efficiency cores to shed heat
- Prometheus — Pull-based time series; standard for fleet metric scraping
- Grafana — Visualizes before/after thermal effects across labeled devices

## CrawlStars

- Golang — Goroutines make producer-consumer crawling cheap and readable
- producer-consumer — Decouples fetch rate from database writes; neither blocks
- concurrent crawlers — Ten worker goroutines share one queue and visited set
- sync.Map — Lock-free reads for a read-heavy shared visited set
- O(1) — Hash lookup keeps dedup flat as URL count grows
- <15MB — Pointers over channels avoid copying every page body
- MongoDB — Schemaless pages plus Atlas Search, no separate index
- aggregation pipeline — Score relevance in the database, not application code
- SEO — Proxy relevance signal ranking pages without click data
- REST API — Plain JSON over HTTP; frontend needs nothing special
