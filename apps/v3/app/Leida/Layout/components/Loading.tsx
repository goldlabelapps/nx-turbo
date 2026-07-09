'use client';
import * as React from 'react';
import { 
    Backdrop, 
    Box,
    Typography,
} from '@mui/material';
import { CleverText } from '../../../NX/DesignSystem'
import { useLayout } from '../../../Leida';

const CleverLoadingText = React.memo(function CleverLoadingText({ text }: { text: string }) {
	return (
		<CleverText
			options={{
				id: 'loadingext',
				markdown: text,
				onFinish: () => {
					console.log('Loading text finished typing.');
				},
			}}
		/>
	);
});

export default function Loading() {
	const layout = useLayout() as { isLoading?: boolean; loadingText?: string } | undefined;
	const isLoading = Boolean(layout?.isLoading);
	const loadingText = typeof layout?.loadingText === 'string' ? layout.loadingText.trim() : '';
	const [isTextReady, setIsTextReady] = React.useState(false);
	const [lockedLoadingText, setLockedLoadingText] = React.useState('');

	React.useEffect(() => {
		const timer = window.setTimeout(() => {
			setIsTextReady(true);
		}, 500);

		return () => {
			window.clearTimeout(timer);
		};
	}, []);

	React.useEffect(() => {
		if (!isTextReady || lockedLoadingText || !loadingText) {
			return;
		}

		setLockedLoadingText(loadingText);
	}, [isTextReady, loadingText, lockedLoadingText]);

	if (!isLoading) {
		return null;
	}

	return (
		<Backdrop
			open
			sx={(theme) => ({
				color: '#2c2c2a',
				zIndex: theme.zIndex.modal + 1,
				bgcolor: '#DDDFD2',
				backdropFilter: 'blur(4px)',
				WebkitBackdropFilter: 'blur(4px)',
				transition: 'opacity 0.3s ease-in-out',
			})}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Box
					component="img"
                    src="/askleida/svg/logo-dark.svg"
					alt="Loading..."
					sx={{
                        width: 256,
					}}
				/>

				<Box
					sx={{
						mt: 2,
						minHeight: 50,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{lockedLoadingText ? (
						<Typography variant="overline">
							<CleverLoadingText text={lockedLoadingText} />
						</Typography>
					) : null}
				</Box>
			</Box>
		</Backdrop>
	);
}