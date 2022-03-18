import React from 'react'
import Switch from 'react-switch'
import { useTranslation } from 'react-i18next'
import { shade } from 'polished'
import { useTheme } from 'styled-components'

import { Search } from '../Search'
import IconFavorite from 'assets/favorito_01.svg'
import Hero from 'assets/ic_heroi.svg'
import {
  Container,
  Content,
  Order,
  Favorite,
  ContentOrder,
  TextResults
} from './styles'

type Props = {
  lengthResults?: number
  setSwitch(checked: boolean): void
  switchState: boolean
  setFavorite(): void
  onblur(element: React.FocusEvent<HTMLInputElement>): void
  isSearched?: boolean
  onChangeText(element: React.ChangeEvent<HTMLInputElement>): void
  cleanSearch(): void
  value: string
  pageFavorites: boolean
}

const HomeFilter = ({
  lengthResults,
  setSwitch,
  switchState,
  setFavorite,
  onblur,
  isSearched,
  onChangeText,
  cleanSearch,
  value,
  pageFavorites
}: Props) => {
  const theme = useTheme()
  return (
    <Container>
      <Search
        onblur={element => onblur(element)}
        isSearched={isSearched}
        onChangeText={element => onChangeText(element)}
        cleanSearch={cleanSearch}
        value={value}
      />

      <Content>
        <div>
          <TextResults>
            {lengthResults && `Encontrados ${lengthResults} resultados`}
          </TextResults>
        </div>

        <Order>
          <ContentOrder>
            <img src={Hero} alt="Hero Icon" />
            <span>Ordernar por - A/Z</span>
            <Switch
              onChange={checked => {
                setSwitch(checked)
              }}
              checked={switchState}
              checkedIcon={false}
              uncheckedIcon={false}
              offColor={shade(0.15, theme.COLORS.SUBTEXT)}
              onColor={theme.COLORS.PRIMARY}
              handleDiameter={20}
              height={25}
              width={50}
            />
          </ContentOrder>

          <Favorite onClick={() => setFavorite()}>
            <img src={IconFavorite} alt="Icon Favorite" />
            <span>{pageFavorites ? 'Ver todos' : 'Somente Favoritos'}</span>
          </Favorite>
        </Order>
      </Content>
    </Container>
  )
}

export { HomeFilter }
