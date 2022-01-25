import HMRAdderAcorn from './HMRAdderAcorn';
import path from 'path';
import fs from 'fs';
const resolveFilePath = (filepath, fromPath)=>{
    const dPath = path.resolve(fromPath, '../', filepath);
    try {
        const stat = fs.statSync(dPath);
        if (stat.isDirectory()) {
            const filenames = fs.readdirSync(dPath);
            for(let i = filenames.length; i--;){
                const filename = filenames[i];
                if (/index\.(?:[jt]sx|mdx?)$/.test(filename)) return filepath + '/' + filename;
            }
        } else {
            if (stat.isFile()) return filepath;
            return false;
        }
    } catch (e) {
        const filenames = fs.readdirSync(path.resolve(dPath, '../'));
        const targetFileName = path.basename(filepath);
        const parentDirName = path.dirname(filepath);
        for(let i = filenames.length; i--;){
            const filename = filenames[i];
            if (filename.indexOf(targetFileName) === 0 && /\.(?:[jt]sx|mdx?)$/.test(filename)) return parentDirName + '/' + filename;
        }
    }
    return false;
};
const hmrAdder = new HMRAdderAcorn({
    resolveFilePath
});
export const transform = (code, path1)=>hmrAdder.transform(code, path1)
;
export default function HMRLoader({ enabled  } = {
    enabled: true
}) {
    return {
        name: 'vite-plugin-blue-hmr',
        apply (config, { command  }) {
            return enabled && command === 'serve';
        },
        transform (code, id) {
            if (!id.includes('node_modules') && /\.[jt]sx$/.test(id)) {
                return hmrAdder.transform(code, id);
            }
        }
    };
};
