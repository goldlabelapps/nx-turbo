'use client';
import * as React from 'react';
import moment from 'moment';
import {
	Box,
	Avatar,
	Card,
	CardContent,
	Typography,
	Link,
} from '@mui/material';
import { T_HistoryEntry } from '../types';

interface HistoryProps {
	history?: T_HistoryEntry[];
}

export default function History({ history }: HistoryProps) {
	if (!history || history.length === 0) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography variant="body2" color="textSecondary">
					No history yet
				</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{history.map((entry, index) => (
				<Box key={`${entry.url}-${entry.timestamp}`}>
						<Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
							{entry.favicon && (
								<Avatar
									src={entry.favicon}
									sx={{ width: 24, height: 24 }}
									alt={entry.siteName || 'Site'}
								/>
							)}
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Link
									href={entry.url}
									target="_blank"
									rel="noopener noreferrer"
									underline="hover"
									sx={{ display: 'block', mb: 0.5 }}
								>
									<Typography
										variant="body1"
										sx={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										{entry.title}
									</Typography>
								</Link>
								
								{/* <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
									{entry.siteName && (
										<Typography variant="caption" color="textSecondary">
											{entry.siteName}
										</Typography>
									)}
									{entry.tenant && (
										<Typography variant="caption" color="textSecondary">
											({entry.tenant})
										</Typography>
									)}
								</Box> */}
								{/* <Typography variant="body2" color="textSecondary">
									{entry.timestamp ? moment(entry.timestamp).fromNow() : ''}
								</Typography>

								<Typography variant="body2" color="textSecondary">
									entry.favicon {entry.favicon}
								</Typography> */}
							</Box>
						</Box>
				</Box>
			))}
		</Box>
	);
}
