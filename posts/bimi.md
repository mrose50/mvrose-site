---
title: "Configuring Brand Indicators for Message Identification (BIMI)"
date: "2023-11-01"
year: "2023"
description: "How to configure BIMI to display your logo in email clients."
---

## What is BIMI?

Brand Indicators for Message Identification (BIMI) functions as an email standard enabling organizations to display their brand logo alongside authenticated messages from their domain. The feature operates similarly to verification checkmarks found on social media platforms.

## How to Configure BIMI?

Successfully implementing BIMI requires four essential steps:

- Configuring DMARC
- Obtaining a BIMI Logo
- Obtaining a Verified Mark Certificate (VMC)
- Publishing the DNS Record

### Configuring DMARC

The foundational requirement involves establishing a DMARC policy for your domain. You can verify existing policies using the MxToolbox DMARC Check Tool.

**Example DMARC Policy:**
```
_dmarc.example.com TXT v=DMARC1; p=reject; rua=mailto:example@dmarc-service.com
```

If your organization lacks an existing DMARC policy with "reject" or "quarantine" settings, Microsoft offers comprehensive configuration guidance. Implementation timelines vary significantly based on the quantity of services sending emails on your organization's behalf.

### Obtaining a BIMI Logo

Logo acquisition requires meeting specific technical specifications:

- The logo must be in SVG Tiny Portable/Secure format
- The logo must be hosted on a publicly accessible web server

Collaborate with your marketing team to obtain the company logo in the appropriate format. Organizations using Google Workspace should note that registered trademark documentation is necessary for VMC applications.

### Obtaining a Verified Mark Certificate

Google Workspace users must secure a Verified Mark Certificate (VMC) to verify logo ownership. Two Certificate Authorities provide this service: DigiCert and Entrust.

**DigiCert's Process involves five steps:**

1. Choose payment plan — annual plans range from one to six years, currently ~$1500/year
2. Upload formatted logo in SVG Tiny Portable/Secure format
3. Provide trademark information — registrar office details and registration number
4. Decide hosting — self-hosting or DigiCert-managed
5. Select email domains — multiple domains sharing one logo require only a single VMC

### Publishing the DNS Record

**Step 1: Create the BIMI Record**

```
v=BIMI1;l=https://logo.example.com/brand-logo.svg;a=https://logo.example.com/certificate.pem
```

**Step 2: Add the DNS TXT Record**

- Type: **TXT**
- Host: **default._bimi.[YOUR DOMAIN].com**
- Value: **v=BIMI1;l=https://[URL FOR YOUR LOGO];a=https://[URL FOR YOUR VMC]**
- TTL: **1 hour (3600 seconds)**

DNS propagation may require up to 48 hours.

## Conclusion

Organizations maintaining DMARC policies should consider BIMI implementation. Key benefits:

- **Enforce trust and credibility** — Your logo appears directly in recipient inboxes
- **Mitigate phishing risks** — Recipients can verify message authenticity
- **Enhance email visibility** — BIMI adoption remains limited, making branded emails more visually distinctive
