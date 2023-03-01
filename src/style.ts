import styled from 'styled-components'

const colorGreen = `rgba(35, 181, 227, 0.9)`


export const ContentContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-variant: small-caps;
`

// Pagination

export const PaginateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: end;
  align-content: start;
  margin: 3px;
`

export const PageButton = styled.button<{current: number}>`
  margin: 2px;
  background: none;
  padding: 0 5px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.9em;
  border: 2px solid ${colorGreen};
  border-radius: 4px;
  transition: ease 0.5s;
  :hover{
    cursor: pointer;
    background: ${colorGreen};
    color: white;
  }
  :nth-child(${(props: any) => +props.current}) {
    background: ${colorGreen};
    color: white;
  }
`


// Footer