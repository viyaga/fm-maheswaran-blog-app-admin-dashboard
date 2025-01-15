import SiteSettingsViewPage from "@/components/site-setting/site-setting-view-page"
import { getSettingData } from "@/lib/actions/site-setting"

const page = async () => {
    const siteSettingData = await getSettingData()
    return <SiteSettingsViewPage siteSettingData={siteSettingData} />
}

export default page
