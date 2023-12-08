export class TinyIconsCompatibility {
    private static _globalIconsEnabled: Boolean = false;

    /** Register non-dynamic custom modifiers */
    public static initialize(ctx: Modding.ModContext): void {
        ctx.onInterfaceReady(() => {
            if (!this.isLoaded()) {
                return;
            }

            const modContext = mod.getContext('tinyIcons');
            if (!modContext) {
                return;
            }

            const section = modContext.settings?.section('Tiny Icons');
            if (!section) {
                return;
            }

            const value = section.get('global-icons');
            if (typeof value === 'boolean') {
                TinyIconsCompatibility._globalIconsEnabled = value;
            }
        });
    }

    public static globalIconsEnabled(): Boolean {
        return TinyIconsCompatibility._globalIconsEnabled;
    }

    private static isLoaded(): Boolean {
        return mod.manager.getLoadedModList().includes('Tiny Icons');
    }
}