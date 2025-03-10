import { useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import OrganizationContext from "@/contexts/organization";

const OrganizationOverviewPage = () => {
  const orgCtx = useContext(OrganizationContext);
  const { t } = useTranslation();

  return (
    <>
      <div>Organization Overview</div>
    </>
  );
};

export default OrganizationOverviewPage;