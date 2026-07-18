import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Recursively collects all markdown slugs from frontmatter in a directory.
 * @param dir Directory to search (default: public markdown dir)
 * @returns Array of slug arrays
 */
export function serverUseAllMd(dir?: string): string[][] {
    // If no directory is provided, default to public/markdown
    if (!dir) {
        dir = path.resolve(process.cwd(), "public", "markdown");
    } else if (!path.isAbsolute(dir)) {
        // If dir is relative, resolve it from the project root
        dir = path.resolve(process.cwd(), dir);
    }

    let slugs: string[][] = [];
    if (!fs.existsSync(dir)) {
        return slugs;
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            slugs = slugs.concat(serverUseAllMd(path.join(dir, entry.name)));
        } else if (entry.name.endsWith(".md")) {
            const filePath = path.join(dir, entry.name);
            const { data } = matter(fs.readFileSync(filePath, "utf-8"));
            let slug = data.slug;
            if (typeof slug === "string") {
                slug = slug.replace(/^\/+/, '');
                if (slug === "") {
                    slugs.push([]);
                } else {
                    const splitSlug = slug.split("/");
                    slugs.push(splitSlug);
                }
            }
        }
    }
    return slugs;
}
