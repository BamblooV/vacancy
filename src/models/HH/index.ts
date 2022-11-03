export type HHVacanciesApi = {
  items: [
    {
      id: string;
      employer: {
        url: string;
      };
    }
  ];
};

export type HHVacancyApi = {
  id: string;
  name: string;
  address: {
    raw: string;
  } | null;
  schedule: {
    id: string;
    name: string;
  };
  description: string;
  employer: {
    name: string;
    logo_urls: {
      90: string;
      240: string;
      original: string;
    } | null;
  };
  site_url: string;
};

export type HHEmployerApi = {
  site_url: string;
  area: {
    name: string;
  };
};

export type HHModel = {
  id: string;
  logo: {
    90: string;
    240: string;
    original: string;
  } | null;
  schedule: {
    name: string;
    id: string;
  };
  company: string;
  linkToSite: string;
  address: string;
  jobName: string;
  description: string;
};

export const normalizeHH = (
  from1: HHVacancyApi,
  from2: HHEmployerApi
): HHModel => ({
  id: from1.id,
  jobName: from1.name,
  logo: from1.employer.logo_urls,
  schedule: from1.schedule,
  company: from1.employer.name,
  linkToSite: from2.site_url,
  address: from2.area.name,
  description: from1.description,
});
