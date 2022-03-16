import React from 'react'
import { useQuery } from 'react-query'
import { loadCharacters } from 'common/query/useCharacters'

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
  Movies,
  Text,
  Title,
  TitlePerson
} from './styles'

import { useParams } from 'react-router-dom'
import { Header } from 'components/Controllers/Header'
import { useTheme } from 'styled-components'

type Params = {
  id?: string
}

const Details = () => {
  const { id: characterId } = useParams<Params>()
  const theme = useTheme()

  const { data, isFetching } = useQuery(
    'character-details',
    () =>
      loadCharacters(
        `/characters/${characterId}?ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2`
      ),
    { refetchOnWindowFocus: false }
  )

  return (
    <Container>
      <Header isHome={false} />

      <Content>
        {isFetching && <div>Loading...</div>}

        <Info>
          <ContentTitle>
            <Title>{data && data.results[0].name}</Title>
          </ContentTitle>

          <Text>{data && data.results[0].description}</Text>
          <Movies />
          <ContentRating />
          <ContentNumbers />
          <Comics />
          <Stars
            count={5}
            value={5}
            size={28}
            color2={theme.COLORS.PRIMARY}
            edit={false}
          />
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
      </Content>
    </Container>
  )
}

export default Details
