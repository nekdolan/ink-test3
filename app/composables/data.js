export const useCategories = async () => {
    const appConfig = useAppConfig();
    const { navbar } = appConfig;
    return navbar;
}