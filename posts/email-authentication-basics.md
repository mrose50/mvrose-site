---
title: "Email Authentication Basics"
date: "2023-09-01"
year: "2023"
description: "SPF, DKIM, and DMARC explained simply."
---

## SPF (Sender Policy Framework)

SPF operates as a security gatekeeper. It establishes a list of approved senders for a domain that receiving servers verify when emails arrive.

### Example SPF Record

SPF records are added to DNS as TXT records:

```
v=spf1 include:_spf.google.com ~all
```

Key components:
- **v=spf1** — Version specification
- **include** — Authorizes third parties to send on your domain's behalf
- **ipv4** — Alternative tag for IP address ranges

## DKIM (DomainKeys Identified Mail)

While SPF prevents spoofed senders, it doesn't guarantee message integrity during transit. DKIM addresses this using cryptographic signatures — the sender's private key signs messages, which recipients verify using the sender's public key.

### Example DKIM Record

```
Name: something._domainkey
Value: v=DKIM1; k=rsa; p=MITBIjAXCgaqhkiG9w1BAQEFAAOCAQ8AMIIBCgKCAQEBmHIL2Q4RdLK...
```

Record elements include version, key type (RSA), and public key data.

## DMARC (Domain-based Message Authentication, Reporting, and Conformance)

DMARC functions as an oversight mechanism for both SPF and DKIM, establishing handling rules for authentication failures and generating compliance reports.

### DMARC Policies

1. **None** — Monitoring only; no action taken
2. **Quarantine** — Failed messages sent to spam
3. **Reject** — Failed messages blocked entirely

Experts recommend gradually escalating from None to Reject based on DMARC reporting insights.

### Example DMARC Record

```
v=DMARC1; p=reject; rua=mailto:email@dmarc-service.com;
```

## BIMI Integration

Successfully authenticated emails with BIMI configuration display organizational logos, reinforcing sender authenticity.

## Conclusion

These protocols work sequentially: SPF verifies sender legitimacy, DKIM ensures message integrity, DMARC supervises both and provides insights, and BIMI adds visual verification through logos. Broader organizational adoption strengthens security for everyone.
