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

        const { count: total, error: countError } = await supabase
            .from('products')
            .select('product_id', { count: 'exact', head: true });

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

        let list: any[] = [];

        if (isRandom) {
            const safeTotal = total ?? 0;
            const randomCount = Math.min(limit, safeTotal);

            const offsets = new Set<number>();
            while (offsets.size < randomCount) {
                offsets.add(Math.floor(Math.random() * safeTotal));
            }

            const rows = await Promise.all(
                [...offsets].map(async (offset) => {
                    const { data: rowData, error: rowError } = await supabase
                        .from('products')
                        .select('*')
                        .order('updated', { ascending: false })
                        .range(offset, offset)
                        .maybeSingle();

                    if (rowError) {
                        throw rowError;
                    }

                    return rowData;
                })
            );

            list = rows.filter(Boolean);
        } else {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('updated', { ascending: false })
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

            list = Array.isArray(data) ? data : [];
        }

        if (!Array.isArray(list)) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: 'Unable to fetch products.',
                }),
                { status: 502 }
            );
        }
        const safeTotal = total ?? 0;
        const hasRows = safeTotal > 0;
        const totalPages = limit > 0 ? Math.ceil(safeTotal / limit) : 0;
        const query = isRandom
            ? `Returning ${list.length} random ${list.length === 1 ? 'result' : 'results'} from ${safeTotal} total.`
            : `Returning ${list.length} ${list.length === 1 ? 'result' : 'results'} ordered by updated (newest first), page ${page}, number ${limit}.`;
        const message = list.length > 0
            ? 'Products retrieved successfully.'
            : hasRows
                ? 'Products exist but none matched the current query window.'
                : 'No visible products found. The table may be empty, or RLS/policies may block this key.';

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
        const message = error instanceof Error ? error.message : 'Unable to fetch products.';

        return NextResponse.json(
            makeRes({
                severity: 'error',
                message,
            }),
            { status: 500 }
        );
    }
}