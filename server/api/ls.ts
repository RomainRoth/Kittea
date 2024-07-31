import { defineEventHandler, readBody, H3Event } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

import type IDirectoryItem from '~/types/IDirectoryItem';

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);
    const queryPath = body.path as string;

    if (!queryPath) {
        return { error: 'Path parameter is required' };
    }

    try {
        const absolutePath = path.resolve(queryPath);
        const items = await fs.readdir(absolutePath, { withFileTypes: true });

        const contents: IDirectoryItem[] = await Promise.all(items.map(async (item) => {
            const itemPath = path.join(absolutePath, item.name);
            const stats = await fs.stat(itemPath);

            return {
                name: item.name,
                type: item.isDirectory() ? 'directory' : 'file',
                creationDate: stats.birthtime,
                modificationDate: stats.mtime
            };
        }));

        return contents;
    } catch (err) {
        return { error: `Error reading directory: ${(err as Error).message}` };
    }
});