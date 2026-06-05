---
title: "Configuring MTA-STS and TLS Reporting"
date: "2024-03-01"
year: "2024"
description: "Step-by-step guide to setting up MTA-STS and TLS-RPT for your domain."
---

## Introduction

This post covers strategies for securing incoming email messages through Mail Transfer Agent-Strict Transport Security (MTA-STS) and Transport Layer Security (TLS) reporting, based on my organizational implementation experience.

## What is MTA-STS?

MTA-STS is a standard that ensures messages are transmitted securely between email servers. It allows domains to mandate encrypted connections (TLS) for incoming mail and specify fallback procedures when secure connections fail, preventing man-in-the-middle attacks during SMTP communications.

## What is TLS Reporting?

TLS reporting provides visibility into connection issues that external mail servers encounter when delivering messages to your domain. Similar to DMARC reporting, these daily reports help organizations monitor the effectiveness of their MTA-STS policies.

## Configuration Steps

### Step 1: Create an MTA-STS Policy

The policy file is a text-based configuration with key-value pairs:

- **Filename** — Must be named `mta-sts.txt`
- **Version** — Requires STSv1 as the first line
- **Mode** — Choose between enforce, testing, or none
- **MX** — All mail exchange records for the domain
- **Max_Age** — Policy validity duration (86,400 to 31,557,600 seconds)

Mode options:
- *Enforce* — Requires TLS; failures block delivery
- *Testing* — Allows delivery failures for troubleshooting
- *None* — Policy remains inactive

### Step 2: Publish the MTA-STS Policy

Host the policy file on a publicly accessible web server with:

- SSL/HTTPS support with third-party signed certificates
- A `.well-known/` directory structure
- Policy accessible at `https://mta-sts.your-domain/.well-known/mta-sts.txt`

You can use commercial hosting or AWS infrastructure (S3, CloudFront, Certificate Manager). Each policy update requires incrementing the policy ID.

### Step 3: Enable MTA-STS and TLS Reporting

Two DNS TXT records activate the functionality:

**TLS Reporting Record:**
```
_smtp._tls.your-domain IN TXT "v=TLSRPTv1; rua=mailto:tls-reports@your-domain.com"
```

**MTA-STS Record:**
```
_mta-sts.your-domain.com IN TXT "v=STSv1;id=1530345213456;"
```

The ID tag should contain 1-32 alphanumeric characters. You can receive JSON-formatted reports directly or use parsing services like Mailhardener.

### Step 4: Verify and Monitor

Before enforcing the policy, review TLS reports for issues. Common failures to watch for:

- *sts-policy-fetch-error* — HTTPS retrieval failed
- *sts-policy-invalid* — Syntax errors in policy
- *sts-webpki-invalid* — Certificate validation problems

## Integration with Email Security Stack

MTA-STS fits into the broader email security picture:

- **SPF/DKIM** — Authenticate message origin and integrity
- **DMARC** — Defines handling for authentication failures
- **MTA-STS** — Encrypts server-to-server transport
- **BIMI** — Provides visual trust indicators to recipients

These protocols create a multi-layered defense against email fraud.
