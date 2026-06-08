---
title: "Email Authentication Basics"
date: "2023-10-01"
year: "2023"
description: "A primer on SPF, DKIM, DMARC, and how they work together."
---

## SPF (Sender Policy Framework)

SPF acts like a bouncer at a fancy club; if you're not on the list, you can't enter. This protocol establishes a roster of permitted mail servers for your domain. Incoming mail servers verify whether the sender's server appears on this approved list.

### SPF Record Example

SPF records are added to DNS as TXT records. A basic example:

```
v=spf1 include:_spf.google.com ~all
```

Key components include:

- **v=spf1**: Indicates the SPF version
- **include**: Authorizes third-party domains to send emails on your behalf
- **ipv4**: Can be used to authorize specific IP addresses instead of domain names

## DKIM (DomainKeys Identified Mail)

While SPF prevents spoofed sender addresses, it cannot guarantee message integrity during transit. DKIM addresses this gap through digital signatures. The sender's private key signs messages, and recipients verify authenticity using the sender's public key.

### DKIM Record Example

Email service providers supply DKIM records containing Name and Value fields:

```
Name: something._domainkey
Value: v=DKIM1; k=rsa; p=MITBIjAXCgaqhkiG9w1BAQEFAAOCAQ8AMIIBCgKCAQEBmHIL2Q4RdLKmXGzjFosz...
```

Key elements:

- **something._domainkey**: Specialized value enabling DNS lookups
- **v=DKIM1**: Version specification
- **k=rsa**: Key type designation
- **p=**: Contains the public key

## DMARC (Domain-based Message Authentication, Reporting, and Conformance)

DMARC acts as a supervisor for both SPF and DKIM. It establishes handling policies for authentication failures and generates compliance reports.

### DMARC Policies

1. **None**: Monitoring only; no action taken on failed messages
2. **Quarantine**: Failed messages directed to spam folders
3. **Reject**: Failed messages blocked entirely

Rollout follows a recommended progression: start with None, advance to Quarantine, then Reject once confident in sender identification.

### DMARC Reports

DMARC instructs email servers to send authentication reports to designated addresses, revealing all sources sending from your domain. Many organizations use third-party monitoring services to parse these XML reports.

### DMARC Record Example

```
v=DMARC1; p=reject; rua=mailto:email@dmarc-service.com;
```

Components:

- **v=DMARC1**: Record version designation
- **p=reject**: Your authentication policy
- **rua=mailto**: Address receiving DMARC reports

## BIMI Integration

When emails pass DMARC validation and BIMI is configured, brand logos display alongside authenticated messages, enhancing credibility.

## How They Work Together

The authentication chain functions as follows:

- **SPF**: Sender's server appears on the approval list
- **DKIM**: Message carries a cryptographic signature matching the domain's key
- **DMARC**: Policy validator approves the SPF and DKIM results
- **BIMI**: Displays your brand logo in compatible email clients

## Key Takeaway

A common misconception is that implementing DMARC protects the organization from phishing and spoofing attempts. However, in reality, it protects the email recipients. Widespread DMARC adoption benefits the entire email ecosystem by reducing fraudulent activity.
