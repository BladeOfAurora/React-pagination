import React, {useState, useEffect} from 'react';
import * as UI from './style'


function App() {

  // Hide blocks if length pages lower then 9
  const [ showEscape, setShowEscape ] = useState<boolean>(false)
  const [ showEnd, setShowEnd ] = useState<boolean>(false)

  // First paginate array (start)
  const [ paginateInArray, setPaginateInArray ] = useState<number[]>([0])

  // Second paginate array (middle)
  const [ middlePaginateArray, setMiddlePaginateArray ] = useState<number[]>([0])

  // Third paginate array (end)
  const [ endPaginateInArray, setEndPaginateInArray ] = useState<number[]>([0])


  // PROPS
  // quantity of pages
  const pages: number = 50
  // currentPage for get on this page number
  const [ currentPage, setCurrentPage ] = useState(1) // Need ADD CURRENT Page

  // END PROPS

  // edit background color for currentPage
  const [ activePage, setActivePage ] = useState<number>(currentPage)

  useEffect(() => {
    if (pages > 0) {
      const pagesInArray: number[] = []
      for (let i: number = pages; i !== 0; i--) {
        pagesInArray.unshift(i)
      }
      if (pagesInArray.length <= 9) {
        setPaginateInArray(pagesInArray)
        setShowEscape(false)
      } else {
        setPaginateInArray(pagesInArray.slice(0, 3))
        setMiddlePaginateArray(pagesInArray.slice(3, 6))
        setEndPaginateInArray(pagesInArray.slice(pagesInArray.length - 1))
        setShowEscape(true)
        setShowEnd(true)
      }
    }
  }, [pages])
  const getLeft = () => {
    if (middlePaginateArray.length !== 3) {
      const newMiddleArray :number[] = []
      middlePaginateArray.map((page: number) => newMiddleArray.push(page - 3))
      newMiddleArray.push(newMiddleArray[0] + 1)
      newMiddleArray[2] = newMiddleArray[1] + 1
      setMiddlePaginateArray(newMiddleArray)
    } else {
      if (!middlePaginateArray.includes(paginateInArray[2] + 3)) {
        const newArray: number[] = []
        middlePaginateArray.map((page: number) => newArray.push(page - 3))
        setMiddlePaginateArray(newArray)
      }
    }
    setActivePage(0)
  }
  const getRight = () => {
    if (middlePaginateArray.includes(endPaginateInArray[0] - 3)) {
      if (middlePaginateArray[middlePaginateArray.length -1] + 1 === endPaginateInArray[0]){

      } else {
        const newMiddleArray: number[] = []
        middlePaginateArray.map((page: number) => newMiddleArray.push(page +3))
        const indexInMiddle = newMiddleArray.findIndex((item: number) => item === endPaginateInArray[0])
        setMiddlePaginateArray(newMiddleArray.slice(0, indexInMiddle))
      }
    } else {
      if (middlePaginateArray.length === 1 || middlePaginateArray.length === 2) {

      } else {
        const newArray: number[] = []
        middlePaginateArray.map((page: number) => newArray.push(page + 3))
        setMiddlePaginateArray(newArray)
      }
    }
    setActivePage(0)
  }
  return (
      <UI.ContentContainer style={{marginLeft: "10px"}}>
        <UI.PaginateContainer>
          {paginateInArray.map((item, index) => {
            return (
                <UI.PageButton
                    current={activePage}
                    key={index}
                    type="button"
                    onClick={() => {setCurrentPage(item-1); setActivePage(index+1)}}
                >{item}</UI.PageButton>
            )
          })}
          { showEscape ?
              <>
                { showEnd ?
                    <>
                      <span></span>
                      <UI.PageButton current={0} onClick={() => getLeft()}>
                        &lt;
                      </UI.PageButton>
                      <span>...</span>
                    </>
                    :
                    <span></span>
                }
                {middlePaginateArray.map((item, index) => {
                  return (
                      <UI.PageButton
                          current={activePage}
                          key={index}
                          type="button"
                          onClick={() => {setCurrentPage(item - 1); setActivePage(index+7)}}
                      >{item}</UI.PageButton>
                  )
                })}
                { showEnd ?
                    <>
                      <span>...</span>
                      <UI.PageButton current={0} onClick={() => getRight()}>
                        &gt;
                      </UI.PageButton>
                      {endPaginateInArray.map((item, index) => {
                        return (
                            <UI.PageButton
                                current={activePage}
                                key={index}
                                type="button"
                                onClick={() => {setCurrentPage(item - 1); setActivePage(index + 12)}}
                            >{item}</UI.PageButton>
                        )
                      })}
                    </>
                    :
                    <span></span>
                }
              </>
              :
              <span></span>
          }
        </UI.PaginateContainer>
      </UI.ContentContainer>
  );
}

export default App;
