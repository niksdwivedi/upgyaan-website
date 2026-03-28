import type { APIRoute } from 'astro';

export const prerender = false;

interface InterestPayload {
  firstName?: string;
  name?: string;       // from /join full form
  email?: string;
  country?: string;
  city?: string;
  message?: string;
  context?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const POST: APIRoute = async ({ request }) => {
  let payload: InterestPayload;

  try {
    payload = await request.json() as InterestPayload;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { firstName, name, email, country, city, message, context } = payload;
  const displayName = firstName ?? name;

  // Validate: email is required and must be a valid format
  if (!email || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({
        error: 'A valid email address is required. Please check the format (e.g. you@example.com).',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Log submission to console (server-side)
  console.log('[UpGyaan /api/interest] New submission:', {
    name: displayName ?? '(not provided)',
    email: email.trim(),
    country: country ?? '(not provided)',
    city: city ?? '(not provided)',
    message: message ? `${message.slice(0, 100)}…` : '(not provided)',
    context: context ?? 'unknown',
    timestamp: new Date().toISOString(),
  });

  // ──────────────────────────────────────────────────────────────
  // TO ACTIVATE GOOGLE SHEETS INTEGRATION:
  //
  // 1. Create a Google Cloud project at https://console.cloud.google.com
  // 2. Enable the Google Sheets API for your project
  // 3. Create a Service Account: IAM & Admin → Service Accounts → Create
  // 4. Grant the service account Editor access to your Google Sheet
  //    (Share the sheet with the service account email)
  // 5. Download a JSON key for the service account
  // 6. Add the following environment variables in Vercel:
  //    - GOOGLE_SHEETS_ID  → The sheet ID from the URL (the long alphanumeric string)
  //    - GOOGLE_CREDENTIALS → The full contents of the service account JSON key file
  //      (paste the entire JSON as a single line, or set it as a JSON string)
  // 7. Run: npm install googleapis
  // 8. Uncomment the code block below
  // ──────────────────────────────────────────────────────────────

  /*
  import { google } from 'googleapis';

  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS ?? '{}');
  const sheetId = process.env.GOOGLE_SHEETS_ID ?? '';

  if (!sheetId || !credentials.client_email) {
    console.error('[UpGyaan] Google Sheets env vars are not configured.');
  } else {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:G',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date().toISOString(),
            (name ?? '').trim(),
            (email ?? '').trim(),
            country ?? '',
            city ?? '',
            message ?? '',
            context ?? '',
          ]],
        },
      });

      console.log('[UpGyaan] Row appended to Google Sheet successfully.');
    } catch (sheetsError) {
      // Log error but do not fail the request — the submission is captured in logs
      console.error('[UpGyaan] Failed to write to Google Sheets:', sheetsError);
    }
  }
  */

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
