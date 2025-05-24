This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setting Up Communication Channels

OneVisit supports automated messaging via Email, SMS, and WhatsApp. Follow these instructions to set up each channel:

### Email Setup

1. **Create an account with an email service provider:**
   - [SendGrid](https://sendgrid.com/) (recommended)
   - [Mailgun](https://www.mailgun.com/)
   - [Amazon SES](https://aws.amazon.com/ses/)

2. **Configure environment variables:**
   ```
   # For SendGrid
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=your_api_key
   EMAIL_FROM=your_verified_sender@example.com
   ```

3. **Verify sender domain/email** with your chosen provider to ensure deliverability.

### SMS Setup

1. **Create an account with an SMS provider:**
   - [Twilio](https://www.twilio.com/) (recommended)
   - [Vonage](https://www.vonage.com/) (formerly Nexmo)
   - [MessageBird](https://messagebird.com/)

2. **Configure environment variables:**
   ```
   # For Twilio
   SMS_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

3. **Purchase a phone number** from your provider to send SMS messages.

### WhatsApp Setup

1. **Create a WhatsApp Business API account:**
   - [WhatsApp Business API](https://www.whatsapp.com/business/api)
   - [Twilio WhatsApp API](https://www.twilio.com/whatsapp)
   - [MessageBird WhatsApp API](https://messagebird.com/products/whatsapp)

2. **Configure environment variables:**
   ```
   # For WhatsApp via Twilio
   WHATSAPP_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
   ```

3. **Complete verification process** which involves:
   - Setting up your business profile
   - Verifying your business identity
   - Requesting approval for message templates

### Testing the Integration

After setting up your providers, you can test each channel:

1. Navigate to Settings > Communication Channels
2. Click "Test" button next to each configured channel
3. Check delivery and appearance on actual devices

### Message Scheduling

OneVisit uses a task queue for scheduled messages:

1. **Install and configure a task queue:**
   ```bash
   npm install @bull-board/api @bull-board/express bull
   ```

2. **Configure Redis** (required for Bull queue):
   ```
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_password  # if applicable
   ```

3. **Start the worker process** to process the message queue:
   ```bash
   npm run start:worker
   ```

For production deployments, consider using a managed service like [Upstash](https://upstash.com/) or [Redis Labs](https://redis.com/) for hosting Redis.
