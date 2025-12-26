import { Shield, Eye, Brain } from "lucide-react";
import DetailSection from "./DetailSection";

const pillarDetails = [
  {
    icon: Shield,
    header: "Always-on resilience for your data pipelines",
    subheader:
      "Ensure uninterrupted data flow with autonomous agents that proactively monitor, diagnose, and resolve pipeline failures before they impact the business.",
    bullets: [
      "Real-time pipeline health monitoring with predictive failure detection",
      "Automatic schema drift detection and self-healing remediation",
      "Dependency tracing and intelligent root-cause analysis (RCA)",
      "SLA tracking, retries, and impact-aware alerting for stakeholders",
    ],
    imagePosition: "left" as const,
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Eye,
    header: "Continuous trust assurance across your data estate",
    subheader:
      "Move beyond manual governance with agents that continuously profile data, enforce policies, and measure trust in real time across all datasets.",
    bullets: [
      "Automated data quality checks for freshness, completeness, and anomalies",
      "Continuous trust scoring and enterprise-wide trust index",
      "Built-in compliance enforcement with audit trails and approvals",
      "Role-based access control and governance workflows by design",
    ],
    imagePosition: "right" as const,
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Brain,
    header: "Make AI decisions transparent, traceable, and auditable",
    subheader:
      "Empower business and risk teams with agents that explain how data and AI models arrive at decisions — clearly, contextually, and in business terms.",
    bullets: [
      "End-to-end lineage from source data to model predictions",
      "Model explainability with feature attribution and counterfactuals",
      "Bias, fairness, and compliance simulations for regulated use cases",
      "Business-friendly narratives and natural-language explanations",
    ],
    imagePosition: "left" as const,
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80",
  },
];

const PillarDetailsSection = () => {
  return (
    <>
      {pillarDetails.map((pillar, index) => (
        <DetailSection key={index} {...pillar} index={index} />
      ))}
    </>
  );
};

export default PillarDetailsSection;
