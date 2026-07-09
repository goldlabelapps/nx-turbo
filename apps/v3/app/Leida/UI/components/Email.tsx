'use client';
import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { EmailFormState } from '../../../types';
import { useDispatch } from '../../../NX/Uberedux';
import { emailClient, useClients } from '../../index';

const initialFormState: EmailFormState = {
  toName: 'Chris Dorward',
    toEmail: 'listingslab@gmail.com',
  subject: 'Your practitioner check-in',
  body: `<h1>Hello Chris,</h1>
<p>I wanted to share a quick follow-up from today's session.</p>
<p>Please keep up your hydration, light movement, and evening wind-down routine this week.</p>
<p>Warmly,<br />Leida Practitioner</p>`,
};

export default function Email() {
  const dispatch = useDispatch();
  const clients = useClients();
  const [form, setForm] = React.useState<EmailFormState>(initialFormState);
  const isSending = Boolean(clients?.emailSending);
  const feedback = clients?.emailFeedback as { severity?: 'success' | 'error' | 'info' | 'warning'; message?: string } | null | undefined;

  const handleChange =
    (key: keyof EmailFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(emailClient(form));
  };

  return (
    <Card className="lookAndFeelCard">
      <CardContent>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Box>
            <Typography variant="overline" className="lookAndFeelOverline">
              Practitioner Outreach
            </Typography>
            <Typography variant="h4" gutterBottom>
              Send a Client Email
            </Typography>
            <Typography variant="body2">
              This simulates a practitioner sending a formatted follow-up email to a client through the new Resend API route.
            </Typography>
          </Box>

          {feedback?.message ? <Alert severity={feedback.severity || 'info'}>{feedback.message}</Alert> : null}

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label="Client name"
              value={form.toName}
              onChange={handleChange('toName')}
              fullWidth
              required
            />
            <TextField
              label="Client email"
              type="email"
              value={form.toEmail}
              onChange={handleChange('toEmail')}
              fullWidth
              required
            />
          </Stack>

          <TextField
            label="Subject"
            value={form.subject}
            onChange={handleChange('subject')}
            fullWidth
            required
          />

          <TextField
            label="HTML body"
            value={form.body}
            onChange={handleChange('body')}
            fullWidth
            required
            multiline
            minRows={10}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Button type="submit" variant="contained" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Email'}
            </Button>
            {isSending ? <CircularProgress size={20} /> : null}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}