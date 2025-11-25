import { Project } from 'ts-morph';
import path from 'path';

// создаем проект ts-morph
const project = new Project();

// добавляем файлы ts tsx в проект ts-morph
// src/**/*.ts - glob регулярка,
// src/ - начальная папка, откуда ведется поиск
// ** - значит, "искать во всех подпапках"
// *.ts - искать все файлы ts
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы из проекта
const files = project.getSourceFiles();

// получаем путь до папки shared относительно текущего скрипта
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');

// получаем Directory-объект
const sharedUiDirectory = project.getDirectory(uiPath);
// получаем список всех поддиректорий (каждая — ожидаемо отдельный компонент).
const componentsDirs = sharedUiDirectory?.getDirectories();

// пишем фунцию, проверяющую аболютный ли импорт
function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entity', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
}

// создаем index.ts в shared директориях при необходимости
componentsDirs?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`;
    const indexFile = directory.getSourceFile(indexFilePath);

    // если файл index.ts не найден, создаем его
    if (!indexFile) {
        // создаем код, наполняющий index.ts
        const sourceCode = `export * from './${directory.getBaseName()}';`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        });

        file.save();
    }
});

// проходим по файлам, меняем импорты в них на публичные
files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
