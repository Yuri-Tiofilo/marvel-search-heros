import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { useTheme } from 'styled-components'
import { useParams } from 'react-router-dom'
import { loadCharactersNew } from 'common/query/useCharacters'
import ComicsIcon from 'assets/ic_quadrinhos.svg'
import TrailerIcon from 'assets/ic_trailer.svg'
import { Header } from 'components/Controllers/Header'
import ListDetails, { Results } from 'components/Lists/Details'
import { queryClient } from 'common/services/query'

import {
  Container,
  Content,
  Image,
  Stars,
  Comics,
  Info,
  ContentNumbers,
  ContentRating,
  ContentImage,
  ContentTitle,
  Text,
  Title,
  TitlePerson,
  LastComics,
  ListLast,
  ListLastTilte,
  ButtonFavorite
} from './styles'
import { Footer } from 'components/Controllers/Footer'
import { useFavorites } from 'hooks/favorites'
import { DataResultsAPI as DataApi } from 'containers/Home/home.types'

type Params = {
  id?: string
}

const Details = () => {
  const { id: characterId } = useParams<Params>()
  const theme = useTheme()

  const { saveFavorites, favorites } = useFavorites()
  const [isActiveFavorite, setsActiveFavorite] = useState(false)

  const { data, isFetching } = useQuery<DataApi>(
    'character-details',
    () => loadCharactersNew({ url: `/characters/${characterId}?` }),
    { refetchOnWindowFocus: false }
  )

  const { data: dataOnSaleComic, isFetching: isFetchingComics } = useQuery(
    'character-details-comics',
    () =>
      loadCharactersNew({
        url: `/characters/${characterId}/comics?orderBy=onsaleDate`
      }),
    { refetchOnWindowFocus: false }
  )

  useEffect(() => {
    if (data) {
      if (favorites.results) {
        const filtered = favorites.results.filter(element => {
          return element.id === data.results[0].id
        })

        if (filtered.length !== 0) {
          setsActiveFavorite(true)
        }
      }
    }
  }, [data, favorites])

  async function setFavoriteStorage(element: Results) {
    if (favorites.results) {
      if (favorites.results.length <= 4) {
        const filtered = favorites.results.filter(element => {
          return element.id === data?.results[0].id
        })
        const indexFavorite = favorites.results.findIndex(element => {
          return element.id === data?.results[0].id
        })
        if (filtered.length === 0) {
          const data = {
            ...favorites,
            count: favorites.count + 1,
            results: [...favorites.results, { ...element, isFavorite: true }]
          }
          saveFavorites(data as DataApi)
        } else {
          const filteredRemove = favorites.results.filter((element, index) => {
            if (index !== indexFavorite) {
              return element
            }
          })

          const data = {
            ...favorites,
            count: favorites.count - 1,
            results: filteredRemove
          }

          saveFavorites(data as DataApi)
        }

        await queryClient.fetchQuery('character-details', () =>
          loadCharactersNew({ url: `/characters/${characterId}?` })
        )

        setsActiveFavorite(!isActiveFavorite)
      } else {
        alert('Você possui mais seu limite de favoritos')
      }
    } else {
      const data = {
        limit: 20,
        offset: 0,
        count: 1,
        results: [{ ...element, isFavorite: true }]
      }

      saveFavorites(data as DataApi)

      await queryClient.fetchQuery('character-details', () =>
        loadCharactersNew({ url: `/characters/${characterId}?` })
      )

      setsActiveFavorite(!isActiveFavorite)
    }
  }
  return (
    <Container>
      <Header isHome={false} />

      <Content>
        {isFetching || isFetchingComics ? (
          <div>Loading...</div>
        ) : (
          data && (
            <>
              <Info>
                <ContentTitle>
                  <Title>{data && data.results[0].name}</Title>

                  <ButtonFavorite
                    isActive={isActiveFavorite}
                    onClick={() => setFavoriteStorage(data.results[0])}
                  />
                </ContentTitle>

                <Text>{data && data.results[0].description}</Text>

                <ContentNumbers>
                  <Comics>
                    <span style={{ fontWeight: 'bold' }}>Quadrinhos</span>
                    <div className="box">
                      <img src={ComicsIcon} alt="Icon Comics" />
                      22
                    </div>
                  </Comics>

                  <Comics>
                    <span style={{ fontWeight: 'bold' }}>Filmes</span>

                    <div className="box">
                      <img src={TrailerIcon} alt="Icon Trailer" />
                      40
                    </div>
                  </Comics>
                </ContentNumbers>
                <ContentRating>
                  <span>Rating: </span>
                  <Stars
                    count={5}
                    value={5}
                    size={25}
                    color2={theme.COLORS.PRIMARY}
                    edit={false}
                  />
                </ContentRating>

                <LastComics>
                  <span>Ultimos lançamentos: </span>
                  {dataOnSaleComic && (
                    <>
                      {format(
                        new Date(dataOnSaleComic.results[0].modified),
                        'dd',
                        {
                          locale: ptBr
                        }
                      )}{' '}
                      de{' '}
                      {format(
                        new Date(dataOnSaleComic.results[0].modified),
                        'MMMM yyyy',
                        {
                          locale: ptBr
                        }
                      )}
                    </>
                  )}
                </LastComics>
              </Info>
              <TitlePerson>
                {' '}
                <h1>{data && data.results[0].name}</h1>
              </TitlePerson>
              <ContentImage>
                <Image
                  src={
                    data &&
                    `${data.results[0].thumbnail.path}.${data.results[0].thumbnail.extension}`
                  }
                />
              </ContentImage>
            </>
          )
        )}
      </Content>
      <ListLast
        style={{
          maxWidth: '70rem',
          width: '100%',
          margin: '20px auto',
          color: theme.COLORS.SUBTEXT
        }}
      >
        <ListLastTilte>Ultimos lançamentos</ListLastTilte>
      </ListLast>
      {dataOnSaleComic && (
        <ListDetails resultsCharacters={dataOnSaleComic.results} />
      )}

      {!(isFetching || isFetchingComics) && dataOnSaleComic && (
        <ListDetails resultsCharacters={dataOnSaleComic.results} />
      )}

      {!(isFetching || isFetchingComics) && <Footer />}
    </Container>
  )
}

export default Details
