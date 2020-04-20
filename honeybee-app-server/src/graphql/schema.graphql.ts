import { buildSchema } from 'graphql'
import { inputs } from './inputs.graphql'
import { mutations } from './mutations.graphql'
import { queries } from './queries.graphql'
import { scalars } from './scalars.graphql'
import { types } from './types.graphql'

export const schema = buildSchema(`
    ${scalars}
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`)
