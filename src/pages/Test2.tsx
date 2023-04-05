import React from 'react'
import Avatar from '../components/Avatar'
import PageWrapper from '../styles/PageWrapper'

const AvatarContainer = styled.div`
    position: absolute;
    top: 14em;
    left: 16em;
`

function Test2() {
  return (
    <PageWrapper>
        <p> test ;) </p>

        <Avatar size={100}/>
    </PageWrapper>
  )
}

export default Test2