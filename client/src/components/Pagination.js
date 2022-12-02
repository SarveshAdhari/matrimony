import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from "../context/appContext"
import '../assets/css/pagination.css'

const Pagination = () => {
    let { pages, page, changePage } = useAppContext()
    const pagesArr = Array.from({ length: pages }, (_, index) => {
        return index + 1
    })

    const nextPage = () => {
        if(page === pages){
            page = 1
        }
        else page++
        changePage(page)
    }
    const prevPage = () => {
        if(page === 1){
            page = pages
        }
        else page--
        changePage(page)
    }
    return (
        <div className='pagination-container'>
            <div className="prev-cont" onClick={prevPage}>
                <HiChevronDoubleLeft /><p>Prev</p>
            </div>
            <div className="pages-cont">
                {pagesArr.map((p) => {
                    return <button 
                            key={p} 
                            type="button" 
                            className={page === p ? "pag-btn active" : "pag-btn"}
                            onClick={()=>changePage(p)}
                            >
                                {p}
                            </button>
                })}
            </div>
            <div className="next-cont" onClick={nextPage}>
                <p>Next</p><HiChevronDoubleRight />
            </div>
        </div>
    )
}
export default Pagination