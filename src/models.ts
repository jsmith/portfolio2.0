import * as t from 'io-ts';

export const SocialsType = t.type({
  github: t.string,
  linkedin: t.string,
  twitter: t.string,
});

export type Socials = t.TypeOf<typeof SocialsType>;

export const ProjectRequiredType = t.type({
  name: t.string,
  link: t.string,
  repo: t.string,
  description: t.string,
  tags: t.array(t.string),
  imageUrl: t.string,
});

export const ProjectOptionalType = t.partial({
  stretch: t.boolean,
});

export const ProjectType = t.union([ProjectRequiredType, ProjectOptionalType]);

export type Project = t.TypeOf<typeof ProjectType>;

export const PortfolioType = t.type({
  name: t.string,
  overviewText: t.string,
  socials: SocialsType,
  projects: t.array(ProjectType),
});

export type Portfolio = t.TypeOf<typeof PortfolioType>;
