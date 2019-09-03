import limits from '../limits';

import faunadb from "faunadb"

const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

const size = +process.env.REACT_APP_FAUNADB_QUERY_LIMIT

export default async (user, instance) => {
  const instanceToIndex = (instance) => `indexes/all_${instance}_by_key`
  const userLimit = limits[instance] || 0
  return client
    .query(q.Paginate(q.Match(q.Ref(instanceToIndex(instance)), user.key), { size }))
    .then((response) => {
      let length = response.data.length;
      return length < userLimit;
    })
    .catch(async (error) => {
      throw new Error(error);
    })
}