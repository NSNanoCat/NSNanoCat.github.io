import { NavIcon } from "@nsnanocat/doc-ui";
import { Layout as BaseLayout } from "@rspress/core/theme-original";

export * from "@rspress/core/theme-original";

export const Layout = (props: React.ComponentProps<typeof BaseLayout>) => {
  return <BaseLayout {...props} beforeNavTitle={<NavIcon />} />;
};
