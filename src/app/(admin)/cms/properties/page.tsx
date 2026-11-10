import { getPropertiesAction } from "@/app/(admin)/cms/actions";
import { PropertiesManager } from "@/components/cms/properties-manager";

export default async function CMSPropertiesPage() {
  const { data } = await getPropertiesAction();

  return <PropertiesManager initialProperties={data || []} />;
}
