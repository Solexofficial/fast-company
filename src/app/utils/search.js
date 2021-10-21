export default function searchBy(data, query, config = { searchBy: 'name' }) {
  return data.filter((el) => el[config.searchBy].toLowerCase().includes(query.toLowerCase()));
}
