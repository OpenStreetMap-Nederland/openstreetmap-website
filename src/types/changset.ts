export interface Changeset {
  id: number;
  type: string;
  created_at: string;
  closed_at: string;
  open: boolean;
  user: string;
  uid: number;
  minlat: number;
  minlon: number;
  maxlat: number;
  maxlon: number;
  comments_count: number;
  changes_count: number;
  tags: {
    comment: string;
    created_by: string;
    source: string;
  };
}

export interface ChangesetData {
  version: string;
  generator: string;
  copyright: string;
  attribution: string;
  license: string;
  elements: Changeset[];
}
