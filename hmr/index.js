import HMRAdderAcorn from './HMRAdderAcorn';
export const hmrAdder = new HMRAdderAcorn();
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
                console.log(hmrAdder.transform(code, id));
                return hmrAdder.transform(code, id);
            }
        }
    };
};
