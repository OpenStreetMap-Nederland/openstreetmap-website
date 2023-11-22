export type UserData = {
  version: string;
  generator: string;
  copyright: string;
  attribution: string;
  license: string;
  user: User;
};

export type User = {
  id: number;
  display_name: string;
  account_created: string;
  description: string;
  contributor_terms: {
    agreed: boolean;
  };
  img: {
    href: string;
  };
  roles: string[];
  changesets: {
    count: number;
  };
  traces: {
    count: number;
  };
  blocks: {
    received: Record<string, unknown>;
  };
};
