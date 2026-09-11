import { AccentToggle } from "@/components/AccentToggle";
import { K, TooltipProvider } from "@/components/Tooltip";
import { loadGlossary } from "@/lib/glossary";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Layout primitives
 * ------------------------------------------------------------------ */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Entry({
  role,
  org,
  meta,
  stack,
  children,
}: {
  role: string;
  org?: string;
  meta: string;
  stack?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="entry">
      <div className="entry-head">
        <span className="entry-title">
          {role}
          {org && (
            <>
              {" "}
              <span className="org">· {org}</span>
            </>
          )}
        </span>
        <span className="entry-meta">{meta}</span>
      </div>
      {stack && <div className="stack">{stack}</div>}
      {children && <ul className="bullets">{children}</ul>}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default function Page() {
  const glossary = loadGlossary();

  return (
    <TooltipProvider glossary={glossary}>
      <AccentToggle />

      <main className="page">
        <header>
          <h1 className="name">Andrew Zheng</h1>
          <p className="contact">
            <a href="mailto:andrew.zheng1@uwaterloo.ca">andrew.zheng1@uwaterloo.ca</a>
            <span className="sep">·</span>
            <a href="https://linkedin.com/in/andrewzheng2007">in/andrewzheng2007</a>
            <span className="sep">·</span>
            <a href="https://github.com/awzheng">github.com/awzheng</a>
            <span className="sep">·</span>
            <a href="https://awzheng.me">awzheng.me</a>
          </p>
        </header>

        <Section title="Education">
          <Entry
            role="BASc, Computer Engineering"
            org="University of Waterloo"
            meta="Sep 2025 – Apr 2030"
            stack="GPA 3.7"
          />
        </Section>

        <Section title="Experience">
          <Entry role="Software Engineer Intern" org="Miovision" meta="May 2026 – Aug 2026">
            <li>
              Re-engineered <K>RAUC</K> firmware update path for <K k="Yocto">Yocto-based</K>{" "}
              <K>x86-64</K> <K>MioconnectOS</K> Linux devices in <K>Node.js</K> via{" "}
              <K>adaptive block hash index</K> <K>HTTP streaming</K> through <K>AWS IoT</K> to reduce{" "}
              <K>OTA</K> bandwidth cost by 98% (1.4GB to 21MB)
            </li>
            <li>
              Built end-to-end <K>HIL</K> release pipeline for <K>ARM64</K> Linux <K>CV</K> devices
              in <K>Node.js</K> and <K>GitLab CI</K> on <K k="Terraform">Terraform-provisioned</K>,{" "}
              <K k="Ansible">Ansible-configured</K> <K>OTA</K> runners via <K>AWS IoT</K> to poll 15
              health metrics over <K>48h</K> with &lt;1% <K>frame-drop</K>
            </li>
            <li>
              Deployed virtual 360° camera emulator app on <K>Firecracker-microVM</K> (<K>Go</K>/
              <K>Docker</K>); shipped <K>H.264</K> <K>RTSP</K> + <K>camera-API</K> to <K>ARM64</K>{" "}
              embedded Linux <K>CTM</K> devices to enable camera-free <K>HIL</K> development and cut
              hardware costs
            </li>
            <li>
              Architected fleet-wide <K>dual lookup</K> for device search engine in <K>Kotlin</K>/
              <K>Spring Boot</K> to stream <K k="schema-registry">schema-registry-backed</K>{" "}
              <K>Avro</K> events over <K>Kafka</K> to <K k="Kubernetes">Kubernetes-hosted</K> index,
              eliminating 100% of <K>stale results</K> across 43K+ devices
            </li>
          </Entry>

          <Entry
            role="Embedded Systems Developer"
            org="Waterloo Rocketry"
            meta="Sep 2025 – Apr 2026"
          >
            <li>
              Designed 4-layer Remote Arming PCB integrating dual 9V LiPo power stages, INA180
              current-sense amplifiers, and 15V/4.1V ADC voltage scaling for uninterrupted 5V logic
              power during primary CAN harness dropouts
            </li>
            <li>
              Implemented hardware fail-safe where PIC18 microcontroller drives a P/N-channel MOSFET
              network to arm dual altimeters, using passive gate biasing to guarantee parachute
              deployment during complete MCU Hi-Z faults
            </li>
          </Entry>

          <Entry
            role="Founder & Software Engineer"
            org="Independent Venture"
            meta="May 2024 – Apr 2026"
          >
            <li>
              Developed React/Next.js AI study app with adaptive spaced repetition algorithm to tutor
              150+ high school students
            </li>
            <li>
              Drove $10K+ revenue through GTM campaign for self-founded case coaching service,
              scaling across 10+ schools
            </li>
            <li>
              Achieved 50+ international competitors and 30+ world finalists for North America&rsquo;s
              largest case contest (230K+)
            </li>
          </Entry>
        </Section>

        <Section title="Projects">
          <Entry
            role="Allocate"
            org="macOS CPU Core Governor"
            meta="GitHub"
            stack={
              <>
                <K>Rust</K>, <K>XNU QoS</K>, <K>Darwin API</K>, <K>Mach IPC</K>, <K>POSIX</K>
              </>
            }
          >
            <li>
              Built system-level macOS orchestrator to intelligently thread processes across{" "}
              <K k="P/E cores">P/E cores</K> and override <K>default scheduling</K>, using{" "}
              <K>XNU QoS</K> and <K>POSIX thread policies</K> to cut background CPU consumption by
              79% with 100% app uptime
            </li>
            <li>
              Developed <K k="Rust FFI">Rust FFI</K> daemon to monitor <K>NSWorkspace</K> lifecycle
              events, sample Darwin <K>proc pidinfo</K> and <K>Mach CPU ticks</K> per <K>500ms</K>,
              using raw <K>libxpc</K> configuration and <K>override IPC</K> to reroute processes to
              appropriate CPU cores
            </li>
            <li>
              Released end-to-end <K>SwiftUI</K>/<K>AppKit</K>/<K>Charts</K> macOS app with
              60-sample live CPU chart, compute telemetry, battery monitoring, configurable CPU
              thresholds, and two-way <K>Mach/XPC IPC</K> for real-time, app-specific{" "}
              <K k="P/E cores">P/E core</K> control
            </li>
          </Entry>

          <Entry
            role="Albedo"
            org="macOS Thermal Control Agent"
            meta="GitHub"
            stack={
              <>
                <K>Rust</K>, <K>AppleSMC</K>, <K>IOKit</K>, <K>Prometheus</K>, <K>Grafana</K>
              </>
            }
          >
            <li>
              Built Apple Silicon fleet thermal controller to send metrics and <K>PID-level</K>{" "}
              <K k="E-core override">E-core override</K> commands to Allocate via <K>launchd</K>{" "}
              <K>XPC Mach service</K>; achieved 12°C/22°F CPU cooling with 100% app uptime without
              hardware fans
            </li>
            <li>
              Engineered 18-sensor Rust <K>thermostat</K> that samples <K>AppleSMC</K> and{" "}
              <K>IOReport</K> to translate CPU/GPU/<K>ANE</K> telemetry, <K>SoC energy</K>,{" "}
              <K>DVFS residency</K>, and per-process CPU time into <K>thermal-throttling</K>,
              clock-loss, and <K>PPW</K> insights
            </li>
            <li>
              Shipped end-to-end <K>SwiftUI</K> menu-bar app + <K>Prometheus</K>/<K>Grafana</K>{" "}
              fleet observability pipeline to derive telemetry, record before and after thermal
              effects, and remotely write device-labeled metrics for throttling and performance
              analysis
            </li>
          </Entry>

          <Entry
            role="SageWall"
            org="Cloud Infrastructure IDS"
            meta="GitHub"
            stack="AWS, Python, Streamlit, Machine Learning"
          >
            <li>
              Architected IDS on AWS SageMaker (XGBoost) to classify network traffic with 99.9%
              accuracy and &lt;100ms latency
            </li>
            <li>
              Designed Boto3 infrastructure for automated Lambda ETL pipeline to transform 125K+
              NSL–KDD records in S3
            </li>
            <li>
              Deployed Streamlit web dashboard secured with AWS IAM, CloudWatch, and SNS for live
              email/SMS alerts
            </li>
          </Entry>

          <Entry
            role="CrawlStars"
            org="Distributed Search Engine"
            meta="GitHub"
            stack={
              <>
                <K k="Golang">Go</K>, JavaScript, <K>MongoDB</K>, <K>REST API</K>
              </>
            }
          >
            <li>
              Engineered <K>concurrent crawlers</K> in <K>Golang</K> <K>producer-consumer</K>{" "}
              architecture to process 2000+ pages/min in <K k="<15MB">&lt;15MB</K>
            </li>
            <li>
              Optimized <K>sync.Map</K> deduplication to enable <K k="O(1)">O(1)</K> lookup for 50K+
              URLs and filter 70% of redundant crawls
            </li>
            <li>
              Deployed web search engine to calculate <K>SEO</K> relevance via <K>MongoDB</K> Atlas{" "}
              <K>aggregation pipeline</K> for 50K+ URLs
            </li>
          </Entry>
        </Section>

        <Section title="Skills">
          <div className="skills">
            <p>
              <span className="label">Languages</span> · C, C++, Python, Rust, Go, Java, Kotlin,
              Swift, JavaScript, TypeScript, HTML, CSS, Ruby, Verilog, Bash
            </p>
            <p>
              <span className="label">Infrastructure</span> · AWS, Linux, Docker, Kubernetes,
              Terraform, Ansible, Kafka, CI/CD, Git, Prometheus, Grafana
            </p>
            <p>
              <span className="label">Backend</span> · Node.js, Express.js, FastAPI, Spring Boot,
              Ruby on Rails, REST API, MongoDB, Jupyter
            </p>
            <p>
              <span className="label">Frontend / Other</span> · React, Next.js, Tailwind, Streamlit,
              XGBoost, Ubuntu, XNU Kernel, Mach, Apple IOKit
            </p>
          </div>
        </Section>
      </main>
    </TooltipProvider>
  );
}
