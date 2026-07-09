export function ageFromDoB(dateInput: Date | string | number): string {
	const dateOfBirth = new Date(dateInput);

	if (Number.isNaN(dateOfBirth.getTime())) {
		return 'Invalid age';
	}

	const today = new Date();
	let age = today.getFullYear() - dateOfBirth.getFullYear();
	const monthDiff = today.getMonth() - dateOfBirth.getMonth();

	if (
		monthDiff < 0
		|| (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
	) {
		age -= 1;
	}

	if (age < 0) {
		return 'Invalid age';
	}

	return `${age} years old`;
}
