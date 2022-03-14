import React from 'react'
import Switch from 'react-switch'
import { shade } from 'polished'
import { Search } from '../Search'

import IconFavorite from 'assets/favorito_01.svg'
import IconFavorite2 from 'assets/favorito_01.svg'

import { useTheme } from 'styled-components'

import {
  Container,
  Content,
  Order,
  Favorite,
  ContentOrder,
  TextResults
} from './styles'

type Props = {
  teste(): void
  lengthResults?: number
  setSwitch(checked: boolean): void
  switchState: boolean
  setFavorite(): void
}

const HomeFilter = ({
  teste,
  lengthResults,
  setSwitch,
  switchState,
  setFavorite
}: Props) => {
  const theme = useTheme()
  return (
    <Container>
      <Search />

      <Content>
        <div>
          <TextResults>
            {lengthResults && `Encontrados ${lengthResults} resultados`}
          </TextResults>
        </div>

        <Order>
          <ContentOrder>
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
            <img src={IconFavorite} />
            <span>Somente Favoritos</span>
          </Favorite>
        </Order>
      </Content>
    </Container>
  )
}

export { HomeFilter }
