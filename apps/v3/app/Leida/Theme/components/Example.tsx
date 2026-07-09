import * as React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SpaIcon from '@mui/icons-material/Spa';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

export default function Example() {
  return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" className="lookAndFeelOverline">
            How Leida Will Look & Feel
          </Typography>
          <Typography variant="h2" className="lookAndFeelHeading">
            Example
          </Typography>
          <Typography variant="body1" className="lookAndFeelLead">
            This page is a simple preview of your fonts, colors, buttons, forms, and cards.
            It helps us quickly check that everything feels right before launch.
          </Typography>
        </Box>

			  <Stack direction="column" spacing={2}>
				  
				  <Card className="lookAndFeelCard">
					  <CardContent>
						  <Typography variant="h6" gutterBottom>
							  Lists
						  </Typography>
						  <List dense disablePadding>
							  <ListItem disablePadding>
								  <ListItemButton>
									  <ListItemIcon>
										  <WbSunnyOutlinedIcon />
									  </ListItemIcon>
									  <ListItemText primary="Page background" secondary="How the background looks behind content" />
								  </ListItemButton>
							  </ListItem>
							  <ListItem disablePadding>
								  <ListItemButton>
									  <ListItemIcon>
										  <AutoAwesomeIcon />
									  </ListItemIcon>
									  <ListItemText primary="Text styling" secondary="How headings and paragraphs feel" />
								  </ListItemButton>
							  </ListItem>
							  <ListItem disablePadding>
								  <ListItemButton>
									  <ListItemIcon>
										  <MenuBookIcon />
									  </ListItemIcon>
									  <ListItemText primary="Inputs and controls" secondary="Buttons, fields, switches, and selectors" />
								  </ListItemButton>
							  </ListItem>
						  </List>
					  </CardContent>
				  </Card>
			  </Stack>

			  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
				  <Card className="lookAndFeelCard">
					  <CardContent>
						  <Typography variant="h5" gutterBottom>
							  Card style preview
						  </Typography>
						  <Typography variant="body2">
							  This card shows how spacing, border, and text look together in a content block.
						  </Typography>

						  <FormControl fullWidth className="lookAndFeelSelectControl">
							  <InputLabel id="theme-preview-select-label">
								  Drop down menu
							  </InputLabel>
							  <Select
								  labelId="theme-preview-select-label"
								  defaultValue="steady"
								  label="Drop down menu"
							  >
								  <MenuItem value="steady">Drop Down Menu</MenuItem>
								  <MenuItem value="gentle">Balanced</MenuItem>
								  <MenuItem value="focused">Detailed</MenuItem>
							  </Select>
						  </FormControl>
					  </CardContent>
				  </Card>
				  <Card className="lookAndFeelCard">
					  <CardContent>
						  <Typography variant="h6" gutterBottom>
							  Text size preview
						  </Typography>
						  <Typography variant="subtitle1">Subtitle text example</Typography>
						  <Typography variant="body1">Main paragraph text example.</Typography>
						  <Typography variant="body2">Secondary paragraph text example.</Typography>
					  </CardContent>
				  </Card>
			  </Stack>

        <Stack spacing={1.5}>
          <Alert severity="success">Success message: This is what a positive update looks like.</Alert>
          <Alert severity="info">Info message: This is for helpful updates and context.</Alert>
          <Alert severity="warning">Warning message: This is for things to double-check.</Alert>
          <Alert severity="error">Error message: This is for something that needs fixing.</Alert>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField label="Client name" defaultValue="Millie" fullWidth />
          <TextField label="Client email" defaultValue="hello@askleida.com" fullWidth />
        </Stack>

			  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
				  <Button variant="outlined">Outlined Button</Button>
				  <Button variant="contained" color="primary">Primary Button</Button>
				  <Button variant="contained" color="secondary">Secondary Button</Button>
			  </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Button variant="text" color="inherit">Text-only button</Button>
        </Stack>

			  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
				  <ButtonGroup variant="contained" aria-label="theme preview button group">
					  <Button color="secondary">Option 1</Button>
					  <Button color="secondary">Option 2</Button>
					  <Button color="secondary">Option 3</Button>
				  </ButtonGroup>
			  </Stack>

        

        <Divider />

       

			  <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} useFlexGap flexWrap="wrap">
				  <Typography variant="h6" gutterBottom>
					 Chipsavigation row style
				  </Typography>
				  <Chip label="Default color" />
				  <Chip label="Primary color" color="primary" />
				  <Chip label="Secondary color" color="secondary" />
				  <Chip label="Outlined color" variant="outlined" />
			  </Stack>

			  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
				  <FormControlLabel control={<Switch defaultChecked />} label="Switch example (on)" />
				  <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />

				  <Box className="lookAndFeelSliderBox">
					  <Typography variant="caption" display="block" gutterBottom>
						  Slider
					  </Typography>
					  <Slider defaultValue={65} aria-label="theme preview slider" />
				  </Box>

			  </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Card className="lookAndFeelCard">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Navigation row style
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LightModeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Morning routine" secondary="Example of icon, title, and helper text" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SelfImprovementIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pause and reset" secondary="Shows row spacing and readability" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <BedtimeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Evening routine" secondary="Another example of list rows in the app" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card className="lookAndFeelCard">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Icon style preview
              </Typography>
              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <Chip icon={<AutoAwesomeIcon />} label="Glow" variant="outlined" />
                <Chip icon={<SpaIcon />} label="Calm" variant="outlined" />
                <Chip icon={<FavoriteBorderIcon />} label="Care" variant="outlined" />
                <Chip icon={<MenuBookIcon />} label="Guide" variant="outlined" />
                <Chip icon={<WbSunnyOutlinedIcon />} label="Day" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
       
      </Stack>
  );
}
