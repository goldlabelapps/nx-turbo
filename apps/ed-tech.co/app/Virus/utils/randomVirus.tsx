export const pandemicPhases = [
    {
        name: 'Emergence',
        description: 'A new virus emerges, with only isolated infections.',

    },
    {
        name: 'Localized Transmission',
        description: 'The virus spreads in a small area with limited outbreaks.',
    },
    {
        name: 'Community Outbreaks',
        description: 'Community spread takes hold and epidemic risk rises.',
    },
    {
        name: 'Regional Epidemic',
        description: 'The virus spreads across regions and strains containment.',
    },
    {
        name: 'Pandemic Phase',
        description: 'Global spread is underway and the outbreak is now a pandemic.',
    },
    {
        name: 'Post-Peak / Endemic Phase',
        description: 'Cases ease off as the virus fades or settles into endemic spread.',
    },
]

const randomDecimal = (min: number, max: number, precision = 2) => {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(precision));
};

const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const transmissionModePool = [
    'Airborne',
    'Contact',
    'Droplet',
    'Waterborne',
    'Foodborne',
    'Bloodborne',
    'Surface',
    'Vector-borne',
    'Animal-to-human',
];

const randomTransmissionModes = () => {
    const shuffled = [...transmissionModePool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, randomInt(2, 4));
};

const virusNamePrefixes = [
    'Black',
    'Crimson',
    'Vanta',
    'Silent',
    'Grim',
    'Razor',
    'Ashen',
    'Night',
    'Pale',
    'Dire',
];

const virusNameRoots = [
    'Plague',
    'Spore',
    'Blight',
    'Fever',
];

const virusNameSuffixes = [
    'VX',
    'Variant',
    'Strain',
    'Syndrome',
    'Vector',
    'Agent',
    'Complex',
    'Lineage',
    'Event',
    'Signal',
];

const randomItem = <T,>(items: T[]) => items[randomInt(0, items.length - 1)];


export function randomVirus(): string {
    const prefix = randomItem(virusNamePrefixes);
    const root = randomItem(virusNameRoots);
    const suffix = randomItem(virusNameSuffixes);
    const serial = randomInt(7, 99);
    return `${prefix} ${root} ${suffix}-${serial}`;
}
