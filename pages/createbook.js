import React from 'react'
import styled from 'styled-components'
import {AGREEMENT_CONFIG} from '../config/agreement'
import {COLORS} from '../styles/colors'
import Layout from '../components/Layout'
import Divider from '../components/Divider'

const TitleList = styled.h2`
  font-size: 24px;
  line-height: 1.5em;
  font-weight: 600;
  color: ${COLORS.PRIMARY};
`

const List = styled.li`
  display: flex;
`

const createbook = () => {
  return (
    <Layout>
      {AGREEMENT_CONFIG.map((agreement, i) => (
        <React.Fragment key={`agreement${i}`}>
          <TitleList>{agreement.title}</TitleList>
          <ul>
            {agreement.list.map((item, j) => (
              <List key={`item${j}`}>
                <span> {j + 1 + '.'}</span>
                <span>{item}</span>
              </List>
            ))}
          </ul>
          <Divider lineMargin="8px 0"/>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default createbook
