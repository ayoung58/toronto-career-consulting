# EmailJS Setup Guide

Your contact form is ready! Follow these steps to set up EmailJS so that contact messages are sent to your email.

## Step 1: Create a Free EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Create an Email Service

Choose your email provider below:

### Option A: Gmail Setup

1. In the EmailJS dashboard, go to **Email Services** (left sidebar)
2. Click **Add Service**
3. Select **"Gmail"** from the list
4. Click **"Connect with Gmail"**
5. Sign in with your Google account
6. Grant EmailJS permission to send emails
7. Once connected, you'll get a **Service ID** (e.g., `service_xxxxx`)

### Option B: 163.com Setup

1. In the EmailJS dashboard, go to **Email Services** (left sidebar)
2. Click **Add Service**
3. Select **"Other SMTP"** (not the preset Gmail/Outlook options)
4. Fill out the SMTP configuration for 163.com:

**For 163.com Email:**

- **Name**: SMTP server (or any name you prefer)
- **Host**: `smtp.163.com`
- **Port**: `465`
- **Use SSL**: ✅ Check this box
- **User**: `secondcareerconsulting@gmail.com` (your full email address)
- **App Password**: Generate an app-specific password (see instructions below)
- Keep **"Send test email to verify configuration"** checked

#### How to Get Your 163.com App Password:

Since 163.com requires an app-specific password:

1. Go to [163.com mail settings](https://mail.163.com)
2. Log in to your account
3. Go to **Settings** → **POP3/SMTP/IMAP**
4. Look for **"Authorization Code"** or **"Generate Authorization Code"**
5. Generate a new code (this is what you'll use as your App Password in EmailJS)
6. Copy this code and paste it into the **App Password** field in EmailJS

7. Once filled out, click **"Create Service"** button
8. You'll get a **Service ID** (e.g., `service_xxxxx`)

**Note**: Don't uncheck the test email option - let it verify your configuration works.

## Step 3: Create an Email Template

1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Name it something like "Contact Form"
4. Replace the template content with this:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}

Message:
{{message}}

---
Reply-to: {{reply_to}}
```

5. In the "Send to" field at the top, enter your email: `secondcareerconsulting@gmail.com`
6. Click "Save"
7. You'll get a **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** (left sidebar) → **API Keys**
2. Copy your **Public Key** (starts with something like `xxxxxxxxxxxxxxx`)

## Step 5: Add Environment Variables

Create or update `.env.local` in your project root with:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

Replace:

- `your_public_key_here` - Your Public Key from Step 4
- `your_service_id_here` - Your Service ID from Step 2
- `your_template_id_here` - Your Template ID from Step 3

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/contact
3. Fill out the form and click "Send Message"
4. Check the email address (secondcareerconsulting@gmail.com) for the message

## Troubleshooting

### "Failed to send message"

- Check that all environment variables are correctly set in `.env.local`
- Verify your Service ID and Template ID in the EmailJS dashboard
- Make sure your email service is properly connected

### Emails not arriving

- Check spam/junk folder
- In EmailJS dashboard, go to **Activity** to see if emails were sent
- Verify the "Send to" email in your template is correct

### Free Tier Limits

- **200 emails/month** (free tier)
- Upgrade to Premium for more if needed

## To Change the Recipient Email

The contact form currently sends to `secondcareerconsulting@gmail.com`. To change this:

1. Edit the template in EmailJS dashboard
2. Change the "Send to" email address
3. **OR** update the hardcoded email in `src/components/ContactForm.tsx` (line 62)

---

That's it! Your contact form is now ready to receive messages.
