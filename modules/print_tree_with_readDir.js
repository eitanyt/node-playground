import fs from 'fs';
import path from 'path';

export function getDirectoryTree(dirPath, prefix = '') {
    let tree = '';
    const items = fs.readdirSync(dirPath, { withFileTypes: true });//withFileTypes: true מחזיר אובייקט - fs.dirnet

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const newPrefix = prefix + (isLast ? '└── ' : '├── ');

        // הוספת שם הפריט למחרוזת
        tree += newPrefix + item.name + '\n';

        if (item.isDirectory()&& item.name != 'node_modules') {
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');
            tree += getDirectoryTree(path.join(dirPath, item.name), nextPrefix);
        }
    });

    return tree;
}

// שימוש בפונקציה והדפסת התוצאה
const tree = getDirectoryTree();
console.log(tree);
