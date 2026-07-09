'use client';
import * as React from 'react';
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Collapse,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import { useDispatch } from '../../../NX/Uberedux';
import { setRoutines, useClients } from '../../index';

type RoutineStage = 'AM' | 'PM' | 'Both';

type RoutineDraft = {
	clientId: string;
	clientName: string;
	goals: string;
	amSteps: string;
	pmSteps: string;
	stage: RoutineStage;
	reviewDate: string;
};

const FLOW_STEPS = ['Client', 'Goals', 'Build', 'Review'];
const NEW_CLIENT_OPTION = '__new_client__';

const INITIAL_DRAFT: RoutineDraft = {
	clientId: '',
	clientName: '',
	goals: '',
	amSteps: '',
	pmSteps: '',
	stage: 'Both',
	reviewDate: '',
};

export default function RoutineFlow() {
	const dispatch = useDispatch();
	const clientsState = useClients() as {
		clients?: {
			list?: Array<{
				client_id?: string;
				title?: string;
				data?: {
					display_name?: string | null;
					email?: string | null;
				};
			}>;
		};
	} | undefined;
	const [isExpanded, setIsExpanded] = React.useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	const [saved, setSaved] = React.useState(false);
	const [draft, setDraft] = React.useState<RoutineDraft>(INITIAL_DRAFT);

	const clientOptions = React.useMemo(() => {
		const list = Array.isArray(clientsState?.clients?.list) ? clientsState.clients.list : [];

		return list.map((client, index) => {
			const value = client.client_id || `client-${index + 1}`;
			const label = client.data?.display_name || client.title || client.data?.email || client.client_id || `Client ${index + 1}`;

			return { value, label };
		});
	}, [clientsState]);

	const updateDraft =
		(key: keyof RoutineDraft) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setDraft((current) => ({ ...current, [key]: event.target.value }));
		};

	const isFirstStepValid = Boolean(draft.clientId.trim());
	const isSecondStepValid = Boolean(draft.goals.trim());
	const isThirdStepValid = Boolean(
		(draft.stage === 'AM' && draft.amSteps.trim())
		|| (draft.stage === 'PM' && draft.pmSteps.trim())
		|| (draft.stage === 'Both' && draft.amSteps.trim() && draft.pmSteps.trim()),
	);

	function canMoveForward(step: number) {
		if (step === 0) {
			return isFirstStepValid;
		}

		if (step === 1) {
			return isSecondStepValid;
		}

		if (step === 2) {
			return isThirdStepValid;
		}

		return true;
	}

	function resetFlow() {
		setActiveStep(0);
		setDraft(INITIAL_DRAFT);
	}

	function handleOpen() {
		setSaved(false);
		setIsExpanded(true);
	}

	function handleClose() {
		setIsExpanded(false);
		resetFlow();
	}

	function handleBack() {
		setActiveStep((current) => Math.max(current - 1, 0));
	}

	function handleNext() {
		if (!canMoveForward(activeStep)) {
			return;
		}

		setActiveStep((current) => Math.min(current + 1, FLOW_STEPS.length - 1));
	}

	async function handleSave() {
		const payload = {
			...draft,
			createdAt: new Date().toISOString(),
		};

		await dispatch(setRoutines('draftRoutine', payload));
		await dispatch(setRoutines('lastCreatedRoutineAt', payload.createdAt));
		setSaved(true);
		setIsExpanded(false);
		resetFlow();
	}

	const showAm = draft.stage === 'AM' || draft.stage === 'Both';
	const showPm = draft.stage === 'PM' || draft.stage === 'Both';

	return (
		<>
			<Card className="lookAndFeelCard">
				<CardContent>
					<Stack spacing={2}>
						<Typography variant="h5">Routine Builder</Typography>
						<Typography variant="body2" color="text.secondary">
							Turn routine creation into a guided sequence so each plan is consistent and easy to complete.
						</Typography>
						<Box>
							<Button variant="contained" onClick={handleOpen}>
								Create a reoutine
							</Button>
						</Box>
					</Stack>
				</CardContent>
			</Card>

			{saved ? (
				<Alert severity="success" sx={{ mt: 2 }}>
					Routine draft saved.
				</Alert>
			) : null}

			<Collapse in={isExpanded} timeout="auto" unmountOnExit>
				<Card className="lookAndFeelCard" sx={{ mt: 2 }}>
					<CardContent>
						<Stack spacing={3}>
							<Typography variant="h6">Create routine flow</Typography>
							<Stepper activeStep={activeStep} alternativeLabel>
								{FLOW_STEPS.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>

							{activeStep === 0 ? (
								<Stack spacing={2}>
									<FormControl fullWidth required>
										<InputLabel id="routine-client-label">Select client</InputLabel>
										<Select
											labelId="routine-client-label"
											label="Select client"
											value={draft.clientId}
											onChange={(event) => {
												const nextClientId = event.target.value as string;
												if (nextClientId === NEW_CLIENT_OPTION) {
													setDraft((current) => ({
														...current,
														clientId: NEW_CLIENT_OPTION,
														clientName: 'New client',
													}));
													return;
												}

												const selectedClient = clientOptions.find((option) => option.value === nextClientId);
												setDraft((current) => ({
													...current,
													clientId: nextClientId,
													clientName: selectedClient?.label || '',
												}));
											}}
										>
											<MenuItem value={NEW_CLIENT_OPTION}>New client</MenuItem>
											{clientOptions.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>
							) : null}

							{activeStep === 1 ? (
								<Stack spacing={2}>
									<TextField
										label="Primary goals"
										value={draft.goals}
										onChange={updateDraft('goals')}
										fullWidth
										required
										multiline
										minRows={4}
										placeholder="Example: calm breakouts, improve hydration, reduce redness"
									/>
								</Stack>
							) : null}

							{activeStep === 2 ? (
								<Stack spacing={2}>
									<FormControl fullWidth>
										<InputLabel id="routine-stage-label">Stage</InputLabel>
										<Select
											labelId="routine-stage-label"
											label="Stage"
											value={draft.stage}
											onChange={(event) => {
												setDraft((current) => ({ ...current, stage: event.target.value as RoutineStage }));
											}}
										>
											<MenuItem value="AM">AM only</MenuItem>
											<MenuItem value="PM">PM only</MenuItem>
											<MenuItem value="Both">AM and PM</MenuItem>
										</Select>
									</FormControl>

									{showAm ? (
										<TextField
											label="AM steps"
											value={draft.amSteps}
											onChange={updateDraft('amSteps')}
											multiline
											minRows={4}
											fullWidth
											placeholder="1. Cleanser\n2. Vitamin C\n3. Moisturiser\n4. SPF"
										/>
									) : null}

									{showPm ? (
										<TextField
											label="PM steps"
											value={draft.pmSteps}
											onChange={updateDraft('pmSteps')}
											multiline
											minRows={4}
											fullWidth
											placeholder="1. Cleanser\n2. Treatment\n3. Moisturiser"
										/>
									) : null}
								</Stack>
							) : null}

							{activeStep === 3 ? (
								<Stack spacing={2}>
									<TextField
										label="Review date"
										type="date"
										value={draft.reviewDate}
										onChange={updateDraft('reviewDate')}
										fullWidth
										InputLabelProps={{ shrink: true }}
									/>
									<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
										<Chip label={`Client: ${draft.clientName || 'Not set'}`} />
										<Chip label={`Stage: ${draft.stage}`} />
									</Box>
									<Typography variant="body2" color="text.secondary">
										Confirm this summary, then save to continue iterating on routine details.
									</Typography>
								</Stack>
							) : null}

							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
								<Button onClick={handleClose}>Cancel</Button>
								<Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
								{activeStep < FLOW_STEPS.length - 1 ? (
									<Button variant="contained" onClick={handleNext} disabled={!canMoveForward(activeStep)}>
										Next
									</Button>
								) : (
									<Button variant="contained" onClick={handleSave}>
										Save routine
									</Button>
								)}
							</Stack>
						</Stack>
					</CardContent>
				</Card>
			</Collapse>
		</>
	);
}
