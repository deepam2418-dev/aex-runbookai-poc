# Security Policy

This document outlines the security practices and reporting procedures for this internal enterprise project. It is intended for use by employees, contractors, and authorized users within the organization.

## Reporting a Suspected Security Issue

If you identify a potential security concern, such as sensitive data exposure or malicious code, please report it immediately via the following channels:

**Submit a Service-Now ticket using the “Information Security Requests” form. Select the “Information Security Concern” support category.
**Escalate via email: <DL_Cyber_Threat_Ops@syneoshealth.com>

## Reporting a Vulnerability

If you identify a security vulnerability or misconfiguration in this project, please report it immediately to:

- **Email:** <DL_Vulnerability_Management@syneoshealth.com>

Please include:

- A clear description of the issue
- Steps to reproduce (if applicable)
- Affected environments or modules
- Potential impact or risk level

## CI/CD Security Checks

Security is integrated into our CI/CD pipeline to ensure vulnerabilities are caught early in the development lifecycle.

### ✅ Automated Checks Include

- **Static Application Security Testing (SAST):** Scans source code for vulnerabilities using tools like Qwiet.ai.
- **Software Composition Analysis (SCA):** Detects vulnerable dependencies using tools like Qwiet.ai.
- **Secrets Detection:** Prevents hardcoded secrets using tools like Qwiet.ai.
- **Container Scanning:** Ensures Docker images are free of known vulnerabilities using tools like WIZ CLI.
- **Infrastructure as Code (IaC) Scanning:** Validates Terraform, CloudFormation, etc., using tools like Qwiet.ai.
- **Access Control Validation:** Ensures least privilege principles in deployment scripts and cloud configurations.

### 🔄 Manual Reviews

- Security-sensitive code changes require peer review and approval from a security champion.
- All production deployments must pass security gates defined in the pipeline.

## Security Practices

- Dependencies managed via internal artifact repositories - GitLab AppSec Library
- Secrets stored securely using [Vault/Secrets Manager]
- Role-based access control enforced via [IAM/SSO system]
- Audit logging enabled for all critical operations
- Regular vulnerability scans and penetration testing

## Disclosure and Communication

This project follows **internal responsible disclosure**. Vulnerabilities are communicated to affected teams and stakeholders only after a fix is available and validated in staging.
