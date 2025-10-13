import fs from 'fs';
import path from 'path';

const targetPath = path.join(process.cwd(), '/node_modules/.cache');

try {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log('Кэш успешно удален');
} catch (e) {
    console.log('Ошибка при удалении: ', e);
};
