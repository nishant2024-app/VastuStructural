// Puter.js global type declarations
export { };

declare global {
    interface Window {
        puter: {
            ai: {
                chat: (prompt: string | object, options?: object) => Promise<any>;
                txt2img: (promptOrOptions: string | object, options?: object) => Promise<any>;
            };
        };
    }
}
