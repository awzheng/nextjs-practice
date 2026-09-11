Andrew Zheng
andrew.zheng1@uwaterloo.ca | in/andrewzheng2007 | github.com/awzheng | awzheng.me
Education
University of Waterloo | BASc, Computer Engineering | GPA: 3.7 Experience
Sep 2025 – Apr 2030
Software Engineer Intern | Miovision | Waterloo, ON May 2026 – Aug 2026
• Re-engineered RAUC firmware update path for Yocto-based x86-64 MioconnectOS Linux devices in Node.js via adaptive
block hash index HTTP streaming through AWS IoT to reduce OTA bandwidth cost by 98% (1.4GB to 21MB)
• Built end-to-end HIL release pipeline for ARM64 Linux CV devices in Node.js and GitLab CI on Terraform-provisioned,
Ansible-configured OTA runners via AWS IoT to poll 15 health metrics over 48h with <1% frame-drop
• Deployed virtual 360° camera emulator app on Firecracker-microVM (Go/Docker); shipped H.264 RTSP + camera-API
to ARM64 embedded Linux CTM devices to enable camera-free HIL development and cut hardware costs
• Architected fleet-wide dual lookup for device search engine in Kotlin/Spring Boot to stream schema-registry-backed Avro
events over Kafka to Kubernetes-hosted index, eliminating 100% of stale results across 43K+ devices
Embedded Systems Developer | Waterloo Rocketry | Waterloo, ON Sep 2025 – Apr 2026
• Designed 4-layer Remote Arming PCB integrating dual 9V LiPo power stages, INA180 current-sense amplifiers, and
15V/4.1V ADC voltage scaling for uninterrupted 5V logic power during primary CAN harness dropouts
• Implemented hardware fail-safe where PIC18 microcontroller drives a P/N-channel MOSFET network to arm dual
altimeters, using passive gate biasing to guarantee parachute deployment during complete MCU Hi-Z faults
Founder & Software Engineer | Independent Venture | Toronto, ON May 2024 – Apr 2026
• Developed React/Next.js AI study app with adaptive spaced repetition algorithm to tutor 150+ high school students
• Drove $10K+ revenue through GTM campaign for self-founded case coaching service, scaling across 10+ schools
• Achieved 50+ international competitors and 30+ world finalists for North America’s largest case contest (230K+)
Projects
Allocate | macOS CPU Core Governor | Rust, XNU QoS, Darwin API, Mach IPC, POSIX GitHub
• Built system-level macOS orchestrator to intelligently thread processes across P/E cores and override default scheduling,
using XNU QoS and POSIX thread policies to cut background CPU consumption by 79% with 100% app uptime
• Developed Rust FFI daemon to monitor NSWorkspace lifecycle events, sample Darwin proc pidinfo and Mach CPU ticks
per 500ms, using raw libxpc configuration and override IPC to reroute processes to appropriate CPU cores
• Released end-to-end SwiftUI/AppKit/Charts macOS app with 60-sample live CPU chart, compute telemetry, battery
monitoring, configurable CPU thresholds, and two-way Mach/XPC IPC for real-time, app-specific P/E core control
Albedo | macOS Thermal Control Agent | Rust, AppleSMC, IOKit, Prometheus, Grafana GitHub
• Built Apple Silicon fleet thermal controller to send metrics and PID-level E-core override commands to Allocate via
launchd XPC Mach service; achieved 12°C/22°F CPU cooling with 100% app uptime without hardware fans
• Engineered 18-sensor Rust thermostat that samples AppleSMC and IOReport to translate CPU/GPU/ANE telemetry,
SoC energy, DVFS residency, and per-process CPU time into thermal-throttling, clock-loss, and PPW insights
• Shipped end-to-end SwiftUI menu-bar app + Prometheus/Grafana fleet observability pipeline to derive telemetry, record
before and after thermal effects, and remotely write device-labeled metrics for throttling and performance analysis
SageWall | Cloud Infrastructure IDS | AWS, Python, Streamlit, Machine Learning GitHub
• Architected IDS on AWS SageMaker (XGBoost) to classify network traffic with 99.9% accuracy and <100ms latency
• Designed Boto3 infrastructure for automated Lambda ETL pipeline to transform 125K+ NSL–KDD records in S3
• Deployed Streamlit web dashboard secured with AWS IAM, CloudWatch, and SNS for live email/SMS alerts
CrawlStars | Distributed Search Engine | Go, JavaScript, MongoDB, REST API GitHub
• Engineered concurrent crawlers in Golang producer-consumer architecture to process 2000+ pages/min in <15MB
• Optimized sync.Map deduplication to enable O(1) lookup for 50K+ URLs and filter 70% of redundant crawls
• Deployed web search engine to calculate SEO relevance via MongoDB Atlas aggregation pipeline for 50K+ URLs
Skills
Languages: C, C++, Python, Rust, Go, Java, Kotlin, Swift, JavaScript, TypeScript, HTML, CSS, Ruby, Verilog, Bash
Infrastructure: AWS, Linux, Docker, Kubernetes, Terraform, Ansible, Kafka, CI/CD, Git, Prometheus, Grafana
Backend: Node.js, Express.js, FastAPI, Spring Boot, Ruby on Rails, REST API, MongoDB, Jupyter
Frontend/Other: React, Next.js, Tailwind, Streamlit, XGBoost, Ubuntu, XNU Kernel, Mach, Apple IOKit