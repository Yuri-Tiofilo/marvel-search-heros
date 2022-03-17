import React from 'react'
import { useQuery } from 'react-query'

import { useTheme } from 'styled-components'
import { useParams } from 'react-router-dom'
import { loadCharactersNew } from 'common/query/useCharacters'
import ComicsIcon from 'assets/ic_quadrinhos.svg'
import TrailerIcon from 'assets/ic_trailer.svg'
import { Header } from 'components/Controllers/Header'

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
  LastComics
} from './styles'

type Params = {
  id?: string
}

const Details = () => {
  const { id: characterId } = useParams<Params>()
  const theme = useTheme()

  const { data, isFetching } = useQuery(
    'character-details',
    () => loadCharactersNew({ url: `/characters/${characterId}?` }),
    { refetchOnWindowFocus: false }
  )

  return (
    <Container>
      <Header isHome={false} />

      <Content>
        {isFetching && <div>Loading...</div>}

        {data && (
          <>
            <Info>
              <ContentTitle>
                <Title>{data && data.results[0].name}</Title>
              </ContentTitle>

              <Text>{data && data.results[0].description}</Text>

              <ContentNumbers>
                <Comics>
                  <span>Quadrinhos</span>
                  <div className="box">
                    <img src={ComicsIcon} alt="Icon Comics" />
                    3.000
                  </div>
                </Comics>

                <Comics>
                  <span>Filmes</span>

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
                10 de outubro de 2022
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
        )}
      </Content>
    </Container>
  )
}

export default Details
