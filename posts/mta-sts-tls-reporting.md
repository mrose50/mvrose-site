---
title: "Configuring MTA-STS and TLS Reporting"
date: "2024-02-01"
year: "2024"
description: "How to configure MTA-STS and TLS reporting to secure your inbound email."
---

## Overview

MTA-STS is a standard that ensures messages are transmitted securely between email servers. Together with TLS Reporting, these technologies protect incoming messages and give you visibility into connection issues.

## What is MTA-STS?

Mail Transfer Agent-Strict Transport Security allows domains to require encrypted connections for incoming email. The system enables TLS encryption between SMTP servers and helps prevent man-in-the-middle attacks by specifying actions when secure connections fail.

## What is TLS Reporting?

TLS reporting generates daily reports about connection issues external servers encounter when sending mail to your domain. The reports function similarly to DMARC reports and help monitor MTA-STS policy effectiveness.

## Configuration Steps

### Step 1: Create MTA-STS Policy File

The policy is a plain text file (`mta-sts.txt`) containing key-value pairs with these components:

- **Version**: Must be STSv1
- **Mode**: Choose testing, enforce, or none
  - *Testing*: Allows administrators to identify TLS problems without rejecting mail
  - *Enforce*: Requires TLS; delivery fails if encryption cannot be established
  - *None*: Policy is inactive
- **MX**: All MX records for the domain
- **Max_Age**: Policy validity period (86,400 to 31,557,600 seconds)

### Step 2: Publish Policy

The policy file must be hosted on an HTTPS server at `https://mta-sts.your-domain/.well-known/mta-sts.txt`.

Requirements include:

- SSL/HTTPS support with valid third-party certificate
- Proper `.well-known/` directory structure
- Policy ID update whenever file contents change

### Step 3: Enable MTA-STS and TLS Reporting

Create DNS TXT records:

**For TLS reporting:**
```
_smtp._tls.your-domain IN TXT "v=TLSRPTv1; rua=mailto:tls-reports@your-domain.com"
```

**For MTA-STS:**
```
_mta-sts.your-domain.com IN TXT "v=STSv1;id=1530345213456;"
```

The ID should contain 1-32 alphanumeric characters and change whenever the policy updates.

### Step 4: Verify Configuration

Use MTA-STS validator tools to confirm proper setup. Monitor TLS reports before transitioning from testing to enforce mode.

## Common Failures

- **sts-policy-fetch-error**: Policy cannot be retrieved via HTTPS
- **sts-policy-invalid**: Policy syntax contains errors
- **sts-webpki-invalid**: Certificate validation problems with the policy server

## Integration with Other Protocols

MTA-STS works alongside other email security measures:

- SPF and DKIM authenticate message origin
- DMARC handles authentication failures
- MTA-STS secures transport between servers
- BIMI provides visual trust indicators

Together, these create a multi-layered defense against email fraud.
