'use client';
import * as React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  XShareButton,
} from 'react-share';
import { 
  Box,
  IconButton,
  Popover,
  Tooltip,
  Typography, 
  ButtonBase,
} from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

type ShareSize = 'small' | 'medium' | 'large';

type ShareProps = {
  size?: ShareSize;
};

export default function Share({ size = 'medium' }: ShareProps) {
  const [copied, setCopied] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
      setTitle(window.document.title);
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      setDescription(meta?.content || '');
    }
  }, []);

  if (size === 'small') {
    return (
      <Box id="share" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <XShareButton url={url}>
          <Tooltip title="X/Twitter">
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            >
              <Icon icon="twitter" color="primary" />
            </Box>
          </Tooltip>
        </XShareButton>

        <FacebookShareButton url={url}>
          <Tooltip title="Facebook">
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            >
              <Icon icon="facebook" color="primary" />
            </Box>
          </Tooltip>
        </FacebookShareButton>

        <LinkedinShareButton
          url={url}
          summary={description}
        >
          <Tooltip title="LinkedIn">
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            >
              <Icon icon="linkedin" color="primary" />
            </Box>
          </Tooltip>
        </LinkedinShareButton>

        <WhatsappShareButton
          url={url}
          separator=" - "
        >
          <Tooltip title="WhatsApp">
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            >
              <Icon icon="whatsapp" color="primary" />
            </Box>
          </Tooltip>
        </WhatsappShareButton>

        <Tooltip title="Copy link">
          <IconButton
            size="small"
            color="primary"
            aria-label="Copy link"
            onClick={e => {
              navigator.clipboard.writeText(url);
              setCopied(true);
              setAnchorEl(e.currentTarget);
              setTimeout(() => {
                setCopied(false);
                setAnchorEl(null);
              }, 3500);
            }}
          >
            <Icon icon="copy" color="primary" />
          </IconButton>
        </Tooltip>

        <Popover
          open={copied}
          anchorEl={anchorEl}
          onClose={() => {
            setCopied(false);
            setAnchorEl(null);
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          disableRestoreFocus
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body1">
              {url} copied to clipboard
            </Typography>
          </Box>
        </Popover>
      </Box>
    );
  }

  return <Box id="share">
        {/* <pre>{JSON.stringify({ url, title, description }, null, 2)}</pre>     */}
        <Box sx={{ my: 1 }}>
          <XShareButton url={url}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="twitter" color={'primary'} />
              <Typography variant="body2" sx={{ mx: 1 }}>
                X/Twitter
              </Typography>
            </Box>
          </XShareButton>
        </Box>

        <Box sx={{ my: 1 }}>
          <FacebookShareButton url={url} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="facebook" color={'primary'} />
              <Typography variant="body2" sx={{ mx: 1 }}>
                Facebook
              </Typography>
            </Box>
          </FacebookShareButton>
        </Box>

        <Box sx={{ my: 1 }}>
          <LinkedinShareButton
            url={url}
            summary={description}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="linkedin" color={'primary'} />
              <Typography variant="body2" sx={{ mx: 1 }}>
                LinkedIn
              </Typography>
            </Box>
          </LinkedinShareButton>
        </Box>

        <Box sx={{ my: 1 }}>
          <WhatsappShareButton
            url={url}
            separator=" - "
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon="whatsapp" color={'primary'} />
              <Typography variant="body2" sx={{ mx: 1 }}>
                WhatsApp
              </Typography>
            </Box>
          </WhatsappShareButton>
        </Box>

        <Box sx={{ ml: 0 }}>
          <ButtonBase
            onClick={e => {
              console.log('title', title)
              navigator.clipboard.writeText(url);
              setCopied(true);
              setAnchorEl(e.currentTarget);
              setTimeout(() => {  
                setCopied(false);
                setAnchorEl(null);
              }, 3500);
            }}
          >
            <Icon icon="copy" color="primary" />
            <Typography
              variant="body2"
              sx={{
                ml: 1,
              }}
            >
              Copy link
            </Typography>
          </ButtonBase>
          <Popover
            open={copied}
            anchorEl={anchorEl}
            onClose={() => {
              setCopied(false);
              setAnchorEl(null);
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            disableRestoreFocus
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body1">
                {url} copied to clipboard
              </Typography>
            </Box>
          </Popover>
        </Box>
      </Box>
}
