---
title: "Configuring Brand Indicators for Message Identification (BIMI)"
date: "2023-11-01"
year: "2023"
description: "How to configure BIMI to display your logo in email clients."
---

## What is BIMI?

BIMI, or Brand Indicators for Message Identification, is an email standard that allows you to include your brand logo on authenticated messages sent from your domain. Think of it as the email equivalent of the checkmark commonly seen on social media platforms.

## How to Configure BIMI?

Depending on who you ask, there are **four** steps required to implement BIMI successfully:

- **Configuring DMARC**
- **Obtaining a BIMI Logo**
- **Obtaining a Verified Mark Certificate (VMC)**
- **Publishing the DNS Record**

### Configuring DMARC

To implement BIMI, the initial step is to configure a DMARC policy for your domain. You can check whether a DMARC policy is already active by using the [MxToolbox DMARC Check Tool](https://mxtoolbox.com/DMARC.aspx).

**Example DMARC Policy:**

```
_dmarc.example.com TXT v=DMARC1; p=reject; rua=mailto:example@dmarc-service.com
```

If you already have a DMARC policy of "reject" or "quarantine," feel free to move on to the next section.

If you haven't set up a DMARC policy yet, I recommend reading [Microsoft's article](https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/email-authentication-dmarc-configure?view=o365-worldwide) on how to configure it, as explaining the process is beyond the scope of this post. The amount of time it will take to implement DMARC effectively depends on your specific organization.

I recently went through a DMARC rollout, which took three months to reach a DMARC reject policy. However, the timeline may differ based on the number of services you identify that send emails on behalf of your organization.

### Obtaining a BIMI Logo

Obtaining a logo may seem easier than setting up DMARC, but there can be challenges during initial deployment. To ensure compatibility with BIMI, the logo must meet certain requirements:

- **The logo must be in SVG Tiny Portable/Secure format**
- **The logo must be available from a public web server**

To accomplish this, collaborate with your marketing team to acquire your company's logo in the appropriate format. You can use this [conversion tool](https://github.com/authindicators/svg-ps-converters/) if you're not proficient in Adobe Illustrator. The logo should be formatted correctly and hosted on a publicly accessible URL, which will be added to the BIMI DNS record.

**Important Note:** If your organization uses **Google Workspace** as its email provider, you will need a registered trademark for your logo in order to apply for a VMC.

Since many organizations already have DMARC configured, acquiring and formatting the logo was the most tedious part of implementing BIMI.

### Obtaining a Verified Mark Certificate

Google requires you to obtain a Verified Mark Certificate (VMC) to verify logo ownership. Depending on your budget and whether you have a registered Trademark number for your logo, this process could be easy or difficult.

To request a VMC, you can use the Certificate Authorities [DigiCert](https://www.digicert.com/tls-ssl/verified-mark-certificates) and [Entrust](https://www.entrust.com/digital-security/certificate-solutions/products/digital-certificates/verified-mark-certificates). The steps to obtain one are as follows:

**Step 1: Choose payment plan**

- They offer plans between one and six years
- The one year plan price is currently $1500

**Step 2: Upload formatted logo**

- The logo must be in SVG Tiny Portable/Secure format
- They will provide a preview of what your logo will look like in email inboxes

**Step 3: Provide trademark information**

- They will ask for the Trademark Registrar Office and the Trademark registration number

**Step 4: Decide if DigiCert should host your files**

- You can choose to self host or have DigiCert host the logo and certificate files for you

**Step 5: Select email domains**

- If you have multiple domains that share a single logo, then you only need one VMC for those domains
- If each domain you send email from has its own unique logo, then you need to order a separate VMC for each domain

### Publishing the DNS Record

Now that you have your logo and VMC hosted on a publicly accessible URL it's time to enable it. To do this, you must add a DNS TXT record for it on your domain provider.

#### Step 1: Create the BIMI Record

**Example BIMI Record:**

```
v=BIMI1;l=https://logo.example.com/brand-logo.svg;a=https://logo.example.com/certificate.pem
```

As you can see there are two requirements for this record:

- **URL for your organization logo SVG file**
- **URL for your VMC Privacy Enhanced Mail (PEM) files**

#### Step 2: Add the DNS TXT Record for BIMI

- Sign in to the management console for your domain provider
- Navigate to the page where you configure DNS records for your domain
- Enter the following values:
  - Type = **TXT**
  - Host = **default._bimi.[YOUR DOMAIN].com**
  - Value = **v=BIMI1;l=https://[URL FOR YOUR LOGO];a=https://[URL FOR YOUR VMC]**
  - TTL = **1 hour (3600 seconds)**
- It can take up to 48 hours for BIMI to start working

## Conclusion

Organizations with a DMARC policy in place should also consider implementing BIMI. If your organization doesn't have a DMARC policy, it's recommended to do that as soon as possible.

The process of deploying BIMI is generally straightforward, and there are many advantages to doing so:

- **Enforce trust and credibility** — Your logo will be displayed directly in your recipients' inbox, which promotes trust
- **Mitigate the risk of phishing** — By using both BIMI and DMARC, your email recipients can ensure that the emails they receive are truly from you
- **Make your email stand out** — BIMI has not been widely adopted yet. Therefore, recipients will be more attracted to your email with the new visual cue of your company logo
