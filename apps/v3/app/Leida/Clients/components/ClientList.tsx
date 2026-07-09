'use client';
import * as React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
	Alert,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import { useDispatch } from '../../../NX/Uberedux';
import { setClients } from '../../index';
import { useClients } from '../hooks/useClients';
import type { T_ClientListItem, T_ClientsFetchFeedback, T_ClientsPayload } from '../lib/types';

function formatUpdatedDate(value?: string): string {
	if (!value) {
		return 'No update timestamp';
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return 'Updated date unavailable';
	}

	return `Updated ${date.toLocaleDateString()}`;
}

export default function ClientList() {
	const dispatch = useDispatch();
	const clientsState = useClients();
	const payload = (clientsState?.clients || {}) as T_ClientsPayload;
	const list = Array.isArray(payload?.list) ? payload.list : [];
	const feedback = clientsState?.fetchFeedback as T_ClientsFetchFeedback | null | undefined;
	const activeClientId = clientsState?.activeClientId as string | undefined;
  const shouldShowFeedback = Boolean(feedback?.message && feedback?.severity !== 'success');

	const handleSelectClient = (client: T_ClientListItem) => () => {
		dispatch(setClients('activeClientId', client?.client_id || null));
		dispatch(setClients('activeClient', client));
	};

	return (
		<>
			<CardContent>
				<Stack spacing={2}>
					{shouldShowFeedback ? <Alert severity={feedback?.severity || 'info'}>{feedback?.message}</Alert> : null}

					<List dense disablePadding>
						{list.map((client) => {
							const primary = client?.data?.display_name || client?.title || 'Unnamed client';
							const secondaryParts = [
								client?.data?.email || 'No email',
								formatUpdatedDate(client?.updated),
							];

							return (
								<ListItem key={client?.client_id || `${primary}-${client?.data?.email || 'unknown'}`} disablePadding>
									<ListItemButton selected={activeClientId === client?.client_id} onClick={handleSelectClient(client)}>
										<ListItemIcon>
											<PersonOutlineIcon />
										</ListItemIcon>
										<ListItemText
											primary={primary}
											// secondary={secondaryParts.join(' • ')}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>

					{!list.length ? (
						<Typography variant="overline">
							No clients yet
						</Typography>
					) : null}

				
				</Stack>
			</CardContent>
		</>
	);
}
