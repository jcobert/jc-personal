import { StrapiAPIResponse } from '@/lib/strapi/types/general'

export type Project = StrapiAPIResponse<'api::project.project'>['data'][number]
