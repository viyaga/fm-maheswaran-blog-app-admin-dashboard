import PageContainer from '@/components/layout/page-container';
import SiteSettingForm from './site-setting-form';

export default function SiteSettingsViewPage({ siteSettingData }) {
  return (
    <PageContainer>
      <SiteSettingForm siteSettingData={siteSettingData} />
    </PageContainer>
  );
}
