import { NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';
import { getSupabasePublicClient } from '../lib/getSupabasePublicClient';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const requestedNumber = Number(searchParams.get('number'));
        const requestedPage = Number(searchParams.get('page'));
        const randomParam = searchParams.get('random');
        const isRandom = randomParam !== null && ['true', '1', 'yes', 'on'].includes(randomParam.toLowerCase());
        const limit = Number.isInteger(requestedNumber) && requestedNumber > 0 ? requestedNumber : 100;
        const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const supabase = getSupabasePublicClient();

        let total = 0;

        let list: Record<string, unknown>[] = [];

        if (isRandom) {
            const { count, error: countError } = await supabase
                .from('clients')
                .select('*', { count: 'planned', head: true });

            if (countError) {
                return NextResponse.json(
                    makeRes({
                        severity: 'error',
                        message: countError.message,
                        other: countError,
                    }),
                    { status: 502 }
                );
            }

            total = count ?? 0;
            const safeTotal = total ?? 0;
            const randomCount = Math.min(limit, safeTotal);

            const offsets = new Set<number>();
            while (offsets.size < randomCount) {
                offsets.add(Math.floor(Math.random() * safeTotal));
            }

            const rows = await Promise.all(
                [...offsets].map(async (offset) => {
                    const { data: rowData, error: rowError } = await supabase
                        .from('clients')
                        .select('*')
                        .range(offset, offset)
                        .maybeSingle();

                    if (rowError) {
                        throw rowError;
                    }

                    return rowData;
                })
            );

            list = rows.filter((row): row is Record<string, unknown> => Boolean(row));
        } else {
            const { data, error, count } = await supabase
                .from('clients')
                .select('*', { count: 'planned' })
                .range(from, to);

            if (error) {
                return NextResponse.json(
                    makeRes({
                        severity: 'error',
                        message: error.message,
                        other: error,
                    }),
                    { status: 502 }
                );
            }

            list = Array.isArray(data) ? data as Record<string, unknown>[] : [];
            total = count ?? list.length;
        }

        if (!Array.isArray(list)) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: 'Unable to fetch clients.',
                }),
                { status: 502 }
            );
        }

        const safeTotal = total;
        const hasRows = safeTotal > 0;
        const totalPages = limit > 0 ? Math.ceil(safeTotal / limit) : 0;
        const query = isRandom
            ? `Returning ${list.length} random ${list.length === 1 ? 'result' : 'results'} from ${safeTotal} total.`
            : `Returning ${list.length} ${list.length === 1 ? 'result' : 'results'}, page ${page}, number ${limit}.`;
        const message = list.length > 0
            ? 'Clients retrieved successfully.'
            : hasRows
                ? 'Clients exist but none matched the current query window.'
                : 'No visible clients found. The table may be empty, or RLS/policies may block this key.';

        return NextResponse.json(
            makeRes({
                severity: 'success',
                message,
                data: {
                    query,
                    pagination: {
                        total: safeTotal,
                        page: isRandom ? 1 : page,
                        number: limit,
                        returned: list.length,
                        totalPages: isRandom ? 1 : totalPages,
                        hasMore: isRandom ? false : page < totalPages,
                        random: isRandom,
                    },
                    list,
                },
            })
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to fetch clients.';

        return NextResponse.json(
            makeRes({
                severity: 'error',
                message,
            }),
            { status: 500 }
        );
    }
}