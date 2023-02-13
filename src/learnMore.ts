interface learnMore {
  person: Person | null
  api: URL
  search: (query: string) => any
}

interface Person {
  name: string
  image: URL
}

export default {
  person: null,
  api: new URL('https://api.wikimedia.org/core/v1/wikipedia/en/search/page?limit=1'),
  search: async function (query) {
    query = encodeURIComponent(query)
    this.api.searchParams.append('q', query)

    try {
      const response = await (await fetch(this.api)).json()
      const [person] = response.pages

      const image = person.thumbnail.url.replace(/\d+?(?=px)/gm, '250')
      console.log(image)
    } catch (error) {
      console.error(error)
    }
  },
} satisfies learnMore
